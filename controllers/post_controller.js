//post controller
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function(req,res){
   Post.create({
    content : req.body.content,
    user : req.body._id,  
},function(err,post){
    if(err){
        console.log('err while creating post',err);
        return;
    }

    return res.redirect('back');
    });
}

module.exports.destroy = function(req,res){
    Post.findById(req.params.id, function(err,post){// .id means converting object id into string mongoose gives us this featrure)
        if(post.user == req.user.id)
        {
            post.remove();
            Comment.deleteMany({post: req.params.id},function(err){
                return res.redirect('back');
            });
        }else{
            return res.redirect('back');
        }
    })
}