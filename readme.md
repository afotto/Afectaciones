# Afectaciones
Onix - afectaciones, gestión de archivos

Generador de archivos de afectaciones y envío de archivos por mail por empresa

# Instalación
npm install

# Ejecución
npx nodemon

# Congiguración
config/camposEmpresa.json 
Los campos requeridos por c/empresa

config/encabezadoArch.json 
Datos del encabezado del archivo requerido por c/empresa

config/nombreArch.json 
Detalle del nombre del archivo requerido por c/empresa

# Datos para test
data/deudores.js 
En el futuro será reemplazado por una BD's

# Test

Utilizando Postman:
Generar archivo SIISA: http://localhost:3000/arch/SIISA
El archivo generado quedará en 
files/nombre empresa/nombre archivo afectación

Envío por mail archivo SIISA: http://localhost:3000/mail/SIISA


