
const pool = require('./conexion');
const multer = require('multer')
const fs=require('fs');

const Storage = multer.diskStorage({
    destination(req, file, callback) {
      callback(null, './Temp')
    },
    filename(req, file, callback) {
      callback(null, `${file.originalname}`)
    },
  })
  
const upload = multer({ storage: Storage })

const ruteador=app=>{
    app.get('/',(request, response)=>{
        console.log('Api lista')
    })

    app.get('/categorias',(request, response)=>{
        pool.query('SELECT * FROM categorias', (error, result)=>{
            if(error) throw error
            response.send(result)
        })
    })

    app.get('/platillos',(request, response)=>{
        pool.query('SELECT * FROM platillos', (error, result)=>{
            if(error) throw error
            response.send(result)
        })
    })

    app.get('/usuarios',(request, response)=>{
        pool.query('SELECT * FROM usuarios', (error, result)=>{
            if(error) throw error
            response.send(result)
        })
    })

    //------------------------------------------------
    //insert
    app.post('/categorias',upload.single('foto'), async(request, response)=>{
        let b=request.body
        let f=request.file
        let ruta=__dirname+'/public/Imagenes/Categorias/'+f.originalname.replace(/ /g, "")
        fs.rename(__dirname+'/Temp/'+f.originalname, ruta,function (err) {
            if (err) throw err;
            console.log('renamed complete');
          });
        let query='INSERT INTO categorias(Nombre, Foto, Id_Usuario) values(?,?,?)'
        pool.query(query,[b.nombre, f.originalname ,b.usuario],(error, result)=>{
            if(error) throw error
            response.send('Registro insertado')
        })
    })

    app.post('/platillos',upload.single('foto'), async(request, response)=>{
        let b=request.body
        let f=request.file
        //let ext=f.originalname.split('.').pop();
        let ruta=__dirname+'/public/Imagenes/Platillos/'+f.originalname.replace(/ /g, "")
        fs.rename(__dirname+'/Temp/'+f.originalname, f.originalname,function (err) {
            if (err) throw err;
            console.log('renamed complete');
          });
        let query='INSERT INTO platillos(Nombre,Descripcion, Foto, Id_Categoria, Id_Usuario) values(?,?,?,?,?)'
        pool.query(query,[b.nombre, b.descripcion, f.originalname,b.categoria,b.usuario],(error, result)=>{
            if(error) throw error
            response.send('Registro insertado')
        })
    })

    app.post('/usuarios',(request, response)=>{
        let b=request.body
        console.log(b.nombre)
        let query='INSERT INTO usuarios(Nombre, Correo, Password) values(?,?,?)'
        pool.query(query,[b.nombre, b.correo, b.pass],(error, result)=>{
            if(error) throw error
            response.send('Registro insertado')
        })
    })

    app.post('/login',(request, response)=>{
        let b=request.body
        console.log(b)
        let query='SELECT * FROM usuarios WHERE Correo= ? and Password=?'
        pool.query(query,[b.user, b.pass],(error, result)=>{
            console.log(result)
            if(error) throw error
            response.send(result)
        })
    })
}

module.exports = ruteador

