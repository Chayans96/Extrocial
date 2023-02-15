//post controller
//IMPORTING POST SCHEMA 
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function(req,res){
   Post.create({
    content : req.body.content,
    //changed this line user:req.user._id
    // passing on the user
    user : req.user._id,  
},function(err,post){
    if(err){
        console.log('err while creating post',err);
        return;
    }

    return res.redirect('back');
    });
}


                                     //action to delete the post and comments associated with it 
module.exports.destroy = function(req,res){
                                     //finding post to check if it exists in db or not 
    Post.findById(req.params.id, function(err,post){
                                     // .id means converting object id into string mongoose gives us this featrure)
        if(post.user == req.user.id) // checking if the user deleting the post is the user who has created the post 
                                     //post.user will return string id and req.user.id will also return string id 
        {

            post.remove();           //
            Comment.deleteMany({post: req.params.id},function(err){
                return res.redirect('back');
            });
        }else{ 
                                     //comming into else when post.user != req.user.id
            return res.redirect('back');
        }
    })
}