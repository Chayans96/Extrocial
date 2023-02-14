const Post = require('../models/post');
// const user = 


module.exports.home = function(req,res){
    
    // post.find({ },function(err,posts){
    //     return res.render('home',{
    //         title:"Extrocial's Home",
    //         posts: posts
    //     })
    // })
    // return res.render('home', {title:"Extrocial's Home"});


    //populate the user with populate property of mongoose
    Post.find({})
    .populate('user')
        .populate({
            path:'comments',
            populate:{
                path:'user'
            }
        })
        .exec(function(err,posts){
        // console.log(posts);
        if(err){
            console.log(err)
        }
        return res.render('home',{
            title:"Extrocial's Home",
            posts: posts
        })
    })

}

// module.exports.post=function(req,res){
//     console.log(req.body);
//     res.render('home',{title:"Extrocial's Home"})
// }



//module.export.actionName = function(req,res){  }