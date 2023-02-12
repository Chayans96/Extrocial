const comment = require('../models/comment');
//importing post just to validate if there existas a post with the id same as post.id passed with comment 
const post = require('../models/post');

module.exports.create = function(req,res){
          //post inside () is the post passed in input tag as hidden 
    post.findById(req.body.post, function(err,post){
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