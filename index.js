const express = require('express');
const app = express();
const port = 8002;
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const sass = require('sass');

// const connect = require('connect');

// const sassMiddleware = require('node-sass-middleware');
// app.use(sassMiddleware({
//       /* Options */
//       src: '/assets/scss'
//     , dest: '/assets/css'
//     , debug: true
//     , outputStyle: 'expanded'
//     , prefix:  '/css'  
//     // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
//   })
// );

// const mongoStore = require('connect-mongo')(session);

const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');


//setting up mongo store it takes session as argument
const MongoStore = require('connect-mongo');

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

//using express session
app.use(session({
    //name of cookie
    name:'extrocial',
    //secret is used to encrypt and decrypt so it is never shared with anyone
    secret: 'blahsomething',
    //if the user is not logged in then if we want to save extra data to cookie then we can set 
    //save unintialized to true
    saveUninitialized:false,
    resave:false,
    //giveing age to cookie afet which it expires
    cookie:{
        //max age should be specified in milli sec
        maxAge:( 1000*60*100 )
    },
    // store: new MongoStore({
    //     mongooseConnection: db,
    //     autoRemove:'disabled',
    // },function(err){
    //     console.log(err || 'connect-mongo setup ok');
    // })

    store:MongoStore.create({ 
        // client: require("./db") 
        // clientPromise,
        // dbName: 'extrocial_development'
        mongoUrl : 'mongodb://127.0.0.1:27017/extrocial_development'
    }),
    
}));

//we need to tell app to use passport and passport session
app.use(passport.initialize());
app.use(passport.session());

//this is throwing error need to be fixed
app.use(passport.setAuthenticatedUser);


// use express router
app.use('/', require(`./routes/index`));


//setting links and scrypt tag to head and body using layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);






app.listen(port,function(err){
    if(err){
        console.log(`Error while listening : ${error} `);
        return;
    }
    console.log(`Server is running on port: ${port} `);
});