const comment = require('../models/comment');
//importing post just to validate if there existas a post with the id same as post.id passed with comment 
const Post = require('../models/post');

module.exports.create = function(req,res){
          //post inside () is the post passed in input tag as hidden 
    Post.findById(req.body.post, function(err,post){
        if(post){
            comment.create({
                content: req.body.content,
                post : req.body.post,
                user : req.user._id, 
            },function(err,content){
                // handle error and create a comment 

                post.comments.push(content);
                //update the comments in post using push method of mongodb 
                post.save();
                // if we update something we have to save it before saving its just in the ram and once saved its saved into DB

                res.redirect('/');
            });
        }
    });
    }

    module.exports.destroy = function(req,res){
        comment.findById(req.params.id,function(err,Comment){
            // console.log('comment.user', Comment.user);
            // console.log('req.user.id',req.user.id);
            if(Comment.user == req.user.id){
                console.log(Comment)
                //saving the id of comment so that we can delete it from post-schema also
                let postid = Comment.post;

                Comment.remove();
                console.log('remove called');
                //updating the post in post schema by pulling comment id with $pull we are pulling comments with params id  
                // Post.findByIdAndUpdate(postid, {$pull: {comments:req.params.id}, function(err,post){
                //     console.log('inside pull')
                //     //as we are not doing anything with the post so returning back.
                //     return res.redirect('back');
                // }});

            }else{
                console.log('inside else')
                return res.redirect('back');
            }
        })
    }