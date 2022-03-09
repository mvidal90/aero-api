require('dotenv').config({
    path: `${__dirname}/.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ""}`
});
const express = require('express');
const { response } = require('express');
const path = require('path');
const cors = require('cors')

interface Request {}

// const setup = async () => {
//Crear el servidor de Express
const app = express();

//CORS
app.use(cors());

// Directorio Publico
app.use( express.static('public') );

//Lectura y parseo del body
app.use( express.json() );

//Rutas
app.use('/api/category_tree', require("./routes/categories"));
app.use('/api/products', require("./routes/products"));

const publicPath = path.join(__dirname, 'public');
app.get('*', (req: Request , res: typeof response) => {
    res.sendFile(path.join(publicPath, 'index.html')), (err: string) => {             
        if (err) {              
            res.status(500).send(err) 
        }        
    };
});

// Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ', process.env.PORT)
} )
// };

// setup();