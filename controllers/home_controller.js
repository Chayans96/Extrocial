const post = require('../models/post');



module.exports.home = function(req,res){
    
    // post.find({ },function(err,posts){
    //     return res.render('home',{
    //         title:"Extrocial's Home",
    //         posts: posts
    //     })
    // })
    // return res.render('home', {title:"Extrocial's Home"});


    //populate the user with populate property of mongoose
    post.find({}).populate('user').exec(function(err,posts){
        console.log(posts.user);
        if(err){
            console.log(err)
        }
        return res.render('home',{
            title:"Extrocial's Home",
            posts: posts
        })
    })

}

module.exports.post=function(req,res){
    console.log(req.body);
    res.render('home',{title:"Extrocial's Home"})
}



//module.export.actionName = function(req,res){  }