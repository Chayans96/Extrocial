const mongoose = require('mongoose');

// providing connection to DB
// mongoose.connect('mongodb://localhost/extrocial_development');  this gives error and dosent connect sometimes 

//instead we can use this 

mongoose.connect('mongodb://127.0.0.1:27017/extrocial_development');

//setting up db
const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB !!"));

db.once('open',function(){
    console.log('Connection to Database :: MongoDB');
})

module.export = db;
