// importing post schema 
const Post = require('../models/post');
const User = require('../models/user')


module.exports.home = async function(req,res){
    
    // post.find({ },function(err,posts){
    //     return res.render('home',{
    //         title:"Extrocial's Home",
    //         posts: posts
    //     })
    // })
    // return res.render('home', {title:"Extrocial's Home"});


    //populate the user with populate property of mongoose
    // Post.find({})
    // .populate('user')
    //     .populate({
    //         path:'comments',
    //         populate:{
    //             path:'user'
    //         }
    //     })
    //     .exec(function(err,posts){
    //     // console.log(posts);
    //     if(err){
    //         console.log(err)
    //     }
    //     return res.render('home',{
    //         title:"Extrocial's Home",
    //         posts: posts
    //     })
    // })

    // Post.find({},function(err,posts){
    //     // console.log(locals.user);
    //     return res.render('home',{
    //         title: "Extrocial's Home",
    //         posts: posts
    //     })
    // })

try{
    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    });

    let users = await User.find({});
        
    return res.render('home',{
        title:'Extrocials Home',
        posts:posts,
        all_users:users
        })
    }
catch(err){
    console.log('Error !!', err );
    return;
}

}

// module.exports.post=function(req,res){
//     console.log(req.body);
//     res.render('home',{title:"Extrocial's Home"})
// }


