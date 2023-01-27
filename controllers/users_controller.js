// this controller can control many/multiple  users


const User = require('../models/user');

const { render } = require("ejs");

module.exports.profile = function(req,res){
    return res.render('user_profile', {user:'User'});
}

//render sign up page
module.exports.signUp = function(req,res){
    //if the user is authenticated then redirect him to profile page 
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');    
    }
    return res.render('user_sign_up',{
        title: "Extrocial | Sign Up"
    })
}

//render sign in page
module.exports.signIn = function(req,res){
    //if the user is authenticated then redirect him to profile page 
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');    
    }
    return res.render('user_sign_in',{
        title: "Extrocial | Sign In"
    })
}


//get sign up data
module.exports.create = function(req,res){
   if(req.body.password != req.body.confirm_password){
    // console.log('******************user password not matching *********************',  req.body);
    return res.redirect('back');
   } 
   User.findOne({email:req.body.email}, function(err,user){
    
    // console.log('******************inside findone *********************');
    if(err){console.log('Error occured while finding user !!'); return res.render('back');}

    if(!user)
    {
        User.create(req.body , function(err,user){
            if(err) {console.log('Error while creating user in DB !!!' ); return res.render('back');}

            return res.redirect('/users/sign-in');
        });
    }
    else{
        return res.redirect('back');
    }
     

   })
}

//sign in and create session for the user
module.exports.createSession = function(req,res){
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    //logout is passport js inbuild function with the help of which user is loggedout
       req.logout(function(err){
            if(err){
                console.log('Error while loggin out the user ', err );
            }
            return res.redirect('/');
       });
    //    return res.redirect('/');
}