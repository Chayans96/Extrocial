//post controller
const Post = require('../models/post');

module.exports.create = function(req,res){
   Post.create({
    content : req.body.content,
    user : req.body._id,  
},function(err,post){
    if(err){
        console.log('err while creating post',err);
    }

    return res.redirect('back');
});
}