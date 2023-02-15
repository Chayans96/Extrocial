const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        type:String,
        required:true
    },
    user :{
        //type is a reference which should refer to user schema
        type: mongoose.Schema.Types.ObjectId,
        // ref is used to refer to schema 
        ref:'User'
    } ,   
    //include array of ids of all comments in this post schema itself
    comments:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment'
        }
    ]
},
{
    timestamps:true   
});


//telling this is going to be a model in db 
const Post = mongoose.model('Post',postSchema);

module.exports = Post;