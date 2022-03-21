const express = require("express");
const app = express();
let apiRouter = require('./routes/apiRouter');
const cors = require("cors");


// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.listen(3001, ()=>{
    console.log("Server running in port 3001");
});


app.use('/api', apiRouter);