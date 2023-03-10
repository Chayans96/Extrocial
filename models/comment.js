    //importing mongoose
    const mongoose = require('mongoose');

    //creating schema named commentSchema
    const commentSchema = new mongoose.Schema({
        content:{
            type:String,
            required:true
        },
        //as comment belongs to user so refering to user
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        post:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'Post'
        }
    },{
        timestamps:true
    });


    const Comment = mongoose.model('Comment', commentSchema);
    module.exports = Comment;