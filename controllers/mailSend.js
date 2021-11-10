// ("2_l3lpoB9M-Z3Al3Z8s8Aw");
var mandrill = require('node-mandrill')('2_l3lpoB9M-Z3Al3Z8s8Aw');
var moment = require('moment');
let fs = require('fs');
let path = require('path');
const empresas = require('../config/empresasAfectadas.json');


const mailSend =  {
    readEnterprise: (req, res) => {
        let find=0;
        
        empresas.forEach(empresa => {
            if (empresa.empresa === req.params.emp){
                find = 1;
                return res.json(empresa);
            }
        });

        if (!find) return res.status(200).json(JSON.stringify('Not found'));
    },
    readEnt: (emp) => {
        let empTmp;
        empresas.forEach(empresa => {
            if (empresa.empresa === emp){
                empTmp = empresa;
            }
        })

        return empTmp;
    },
    run: async (req, res) => {

        let empresa = mailSend.readEnt(req.params.emp);

        var filePath = path.join('files', `${empresa.empresa}`, `700_${moment().format('MMYYYY')}.txt`);
        var fileName = `700_${moment().format('MMYYYY')}.txt`;

        mandrill('/messages/send', {
            message: {
                to: [{email: empresa.emailaddress1, name: 'Andres Ottonello'}],
                from_email: 'no-reply@onixcreditos.com',
                subject: `${empresa.emailsubject} ${fileName}`,
                text: `AFECTACIONES ${fileName} `,
                attachments: [{            
                    "type": 'application/txt',
                    "name": fileName,
                    "content": new Buffer(fs.readFileSync(filePath)).toString('base64'),
                }]
            }
        }, function(error, response)  {
            //uh oh, there was an error
            if (error) console.log( JSON.stringify(error) );
        
            //everything's good, lets see what mandrill said
            else {
                console.log(response);
                return res.status(200).json(response);
            }
        });     

    }
}

module.exports = mailSend;