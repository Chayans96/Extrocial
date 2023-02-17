// this controller can control many/multiple  users


const User = require('../models/user');
const fs = require('fs');
const path = require('path');
const { render } = require("ejs");
const { response } = require('express');

module.exports.profile = function(req,res){
    User.findById(req.params.id,function(err,user){

        return res.render('user_profile', {
            title:"user Profile",
            profile_user:user      
    });
    })
    
}

module.exports.update = async function(req,res){
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
    //         return res.redirect('back');
    //     })
    // }
    // else{
    //     return res.status(401).send('Unauthorized');
    // }
    if(req.user.id == req.params.id){
            let user = await User.findById(req.params.id, req.body) 
            User.uploadedAvatar(req,res, function(err){
                if(err){
                    console.log("*****Multer Error******",err);
                }
                // console.log(req.file);
                user.name = req.body.name;
                user.email = req.body.email;
                if(req.file){

                    //if user already has an avatar then we will delte the old avatar and will save a new avatar
                    // if(user.avatar){
                    //     fs.unlinkSync(path.join(__dirname,'..', user.avatar))
                    // }


                    //saving the path of the uploaded file into the avatar field in the user 
                   user.avatar = User.avatarPath + '/' + req.file.filename
                }
                user.save();
                return res.redirect('back');
            });
        }
        else{
            return res.status(401).send('Unauthorized');
        }
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
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    //logout is passport js inbuild function with the help of which user is loggedout
        req.logout(function(err){
            if(err){
                console.log('Error while loggin out the user ', err );
            }
        });
       
        req.flash('success', 'Logged out Successfully');
        return res.redirect('/');
       
    //    return res.redirect('/');
}