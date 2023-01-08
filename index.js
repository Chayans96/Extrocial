const express = require('express');
const router = require('./routes/index');

const app = express();

const port = 8000;
//by default websites run on port 80

// use express router
app.use('/',require('./routes/index'));

//

// router.get('/',)

app.listen(port,function(err){
    if(err){
        console.log('Error while listening : ${error}');
        return;
    }
    console.log('Server is running on port: ${port} ');
});