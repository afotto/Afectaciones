var moment = require('moment');
let fs = require('fs');
let path = require('path');
/*Data */
const deudores = require('../data/deudores');
/*Config*/
const entFields = require('../config/camposEmpresa.json');
const entNomArch = require('../config/nombreArch.json');
const encArch = require('../config/encabezadoArch.json');


const arch = {
    longField: (field, value) => { 
        let str='';
        let numMax=0;

        if (field[1] == 'A' || field[1] == 'AN')
            value.length > field[0] ? value = value.substring(0,field[0]) :  value = ' '.repeat(field[0] - value.length) + value;
        if (field[1] == 'N'){
            str = value.toString();
            numMax = parseInt('9'.repeat(field[0]));
            value > numMax ? value = '9'.repeat(field[0]) :  value = ' '.repeat(field[0] - str.length) + str;
        }
        if (field[1] == 'F')
            value = ' '.repeat(field[0]);

        return value;
    },
    objToString: (debtor, fields) => {
        let str = '';

        for (var p in fields) {
            if (p != 'empresa'){
                str += arch.longField(fields[p], debtor[p]);
            }
        }
        str += '\n';
        console.log(str);

        return str;

    },
    findFields: (emp) => {
        let empTemp = new Object();

        entFields.forEach(empresa => {
            if (empresa.empresa === emp){
                empTemp = empresa;
            }
        })

        return empTemp;
    },
    encabezadoArch:(emp)=>{
        let encabezado = '';

       encArch.forEach(encab => {
            if (encab.empresa == emp){
                if (encab.enc[0] == 1) encabezado += encab.enc[1];
            }
        });

        return encabezado;
    },
    findNom: (emp) => {
        let nomTemp = new Object();

        entNomArch.forEach(arch => {
            if (arch.empresa == emp){
                nomTemp = arch;
            }
        });

        return nomTemp;
    },
    nomArch: (emp) => {

        let nom = arch.findNom(emp);
        let nombre = '';

        if (nom.pre[0] == 1) nombre += nom.pre[1];
        /*fijo*/
        if (nom.nom[0] == 0) nombre += nom.nom[1];
        /*variable*/
        if (nom.nom[0] == 1) 
            if (nom.nom[1] == 'MMYYYY') nombre += moment().format('MMYYYY');
        
        nombre += nom.ext[1];
        console.log(nombre);
        return nombre;

    },
    run:  (req, res)  => {

        let fields = arch.findFields(req.params.emp);
        let file = '';
        let filaUno = 0;

        let archivo = path.join('files',`${req.params.emp}`, arch.nomArch(req.params.emp) );
        let encabezado = arch.encabezadoArch(req.params.emp);
        if (encabezado.length > 0 ) {
            fs.writeFileSync(archivo, encabezado +  '\n');            
            filaUno ++;
        }

        deudores.forEach(deudor => {
            file += arch.objToString(deudor, fields);     
            if (filaUno == 0){
                fs.writeFileSync(archivo, arch.objToString(deudor, fields));        
                filaUno ++;
            }
            else 
                fs.appendFileSync(archivo, arch.objToString(deudor, fields));            
        });

        return res.status(200).json(file);
    }

}

module.exports = arch;