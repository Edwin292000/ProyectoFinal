const mysql= require('mysql')

const cadena={
    host:'localhost',
    user:'root',
    password:'',
    database:'proyectofinal',
    port:3306,
}

const pool = mysql.createPool(cadena);

module.exports= pool