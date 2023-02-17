//post controller
//IMPORTING POST SCHEMA 
const Post = require('../models/post');
const Comment = require('../models/comment');
try{
module.exports.create = async function(req,res){
  let post = await Post.create({
    content : req.body.content,
    //changed this line user:req.user._id
    // passing on the user
    user : req.user._id,    
});


//ajax req 
if(req.xhr){
    return res.status(200).json({
        data: {
            post: post
        },

        message:'Post Created'

    })
}

return res.redirect('back');
 
}
}
catch(err){
    console.log('err', err);
}

//                                      //action to delete the post and comments associated with it 
// module.exports.destroy = function(req,res){
//                                      //finding post to check if it exists in db or not 
//     Post.findById(req.params.id, function(err,post){
//                                      // .id means converting object id into string mongoose gives us this featrure)
//         if(post.user == req.user.id) // checking if the user deleting the post is the user who has created the post 
//                                      //post.user will return string id and req.user.id will also return string id 
//         {

//             post.remove();           //
//             Comment.deleteMany({post: req.params.id},function(err){
//                 return res.redirect('back');
//             });
//         }else{ 
//                                      //comming into else when post.user != req.user.id
//             return res.redirect('back');
//         }
//     })
// }
try{
module.exports.destroy = async function(req,res){
let post = await Post.findById(req.params.id);
if(post.user == req.user.id)  
   {
       post.remove();           //
       await Comment.deleteMany({post: req.params.id})

       if(req.xhr){
        console.log('delete xhr called');
        return res.status(200).json({
            data:{
                post_id: req.params.id
            },
            message: "Post Deleted!!"
        });
       }
       req.flash('success', 'Post Deleted');
       return res.redirect('back');
   }else{ 
        req.flash('error', 'Post deletion error');
        return res.redirect('back');
   }
}
}
catch(err){
    console.log('Error', err);
}