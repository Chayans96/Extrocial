const express = require('express');
const app = express();
const port = 8000;
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

//by default websites run on port 80

//using cookieparser
app.use(cookieParser());

app.use(express.urlencoded());

//adding static files to out site
app.use(express.static('./assets'));

// use express layouts lib
app.use(expressLayouts);



//setup of view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//setting links and scrypt tag to head and body using layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// use express router
app.use('/', require(`./routes/index`));


app.listen(port,function(err){
    if(err){
        console.log(`Error while listening : ${error} `);
        return;
    }
    console.log(`Server is running on port: ${port} `);
});