const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/user');

//creating authentication function
//we are telling passport to use local strategy where we are defining usernameFiled for passport
passport.use(new localStrategy({
    //we are using email as our username to authenticate the user 
    usernameField: 'email'
},function(email,password,done){
    //done is an inbuild passport function 

    //find a user and establish functionalities so import user
    User.findOne({email:email}, function(err,user){
        if(err){console.log('Error in finding user -> passport'); 
        return done(err);
        //generally done takes 2 arguments one is the error 
        }
    
        if(!user || user.password != password){
                console.log('invalid username or password');
                return done(null, false);
                //false means authentication is not done hence false
            }

            //if user is found and password is valiated then
        return done(null,user);
        
        });
}
));


//serializing the user to decide which key is to be kept in the cookie
passport.serializeUser(function(user,done){
    done(null,user.id);
});

//deserializing the user from the key in the cookie
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('Err while deserializing');
            return done(null);
        }
        return done(null,user);
    });
});


//check if user is authenticated 
passport.checkAuthentication = function(req,res,next){
    //if the user is signed in then pass on the request to the next function
    if(req.isAuthenticated()){
        return next();
    }

    //if the user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        // req.user containes current signed in user from session cookie and 
        // we are sending it to locals for the views
        res.locals.user = req.user;
    }
     next();
}



module.exports = passport;