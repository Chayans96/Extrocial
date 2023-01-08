const express = require('express');
const app = express();
const port = 8000;

//by default websites run on port 80

// use express router
app.use('/', require('./routes'));

//setup of view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port,function(err){
    if(err){
        console.log('Error while listening : ${error}');
        return;
    }
    console.log('Server is running on port: ${port} ');
});