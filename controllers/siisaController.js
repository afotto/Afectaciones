var moment = require('moment');
const deudores = require('../data/deudores');
let fs = require('fs');
let path = require('path');


const siisa = {
    longField: (field, value) => {
        if (field == 'apeynom') 
            value.length > 25 ? value = value.substring(0,25) :  value = ' '.repeat(25 - value.length) + value ;
        if (field == 'MtoMora' || field == 'Int') var str = value.toString();
        if (field == 'MtoMora') 
            value > 99999 ? value = '99999' :  value = ' '.repeat(5 - str.length) + str;
        if (field == 'Int')
            value > 99999 ? value = '99999' :  value = ' '.repeat(5 - str.length) + str;

        return value;
    },
    header: () => {
        let str = 'MOROSOSSIISAV3'  + '\n';

        return str;
    },
    objToString: (obj) => {
        var str = '';
        for (var p in obj) {
            // console.log(obj[p]);
            if (Object.prototype.hasOwnProperty.call(obj, p)) {
                // str += p + '::' + obj[p] + '\n';
                str +=   siisa.longField(p, obj[p]) ;
            }
        }
        str += '\n';
        return str;
    },
    list: (req, res) => {
        // console.log(moment().format('MMYYYY'));

        let archivoSiisa = path.join('files','siisa',`700_${moment().format('MMYYYY')}.txt`);
        // let deudoresJson = JSON.stringify(deudores);
        // fs.writeFileSync( archivoSiisa, deudoresJson);
        // fs.writeFileSync(archivoSiisa, deudores.join(","));
        fs.writeFileSync(archivoSiisa, siisa.header());

        deudores.forEach(deudor => {
            fs.appendFileSync(archivoSiisa, siisa.objToString(deudor));            
        });

        return res.status(200).json('Ok');
    }
}

module.exports = siisa;