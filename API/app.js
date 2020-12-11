const rutas=require('./rutas')
const express=require('express')
const cors = require('cors')
const puerto=3001
const app=express()
const bodyParser=require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded(
    {
    extended:true
    }
))

app.use(express.static(__dirname + '/public'));
app.use(cors())

rutas(app)

const server=app.listen(puerto, (error)=>{
    if(error) return console.log(`error: ${error}`)
    console.log(`Puerto ${server.address().port}`)
})

