const mongoose = require('mongoose');

//importing multer
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars'); 

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
        
    },
    name: {
        type:String,
        required : true
    },
    avatar:{
        type:String
    }

},{ 
    timestamps:true
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..', AVATAR_PATH))
    },
    //file name we will attach date in milisecs also so that name of each file is different 
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix);

    }
  });
  
//   defining staric functions userSchema.statics is used to declare static function and after that we give static function name
userSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar');
//single states that only single file will be uploaded as avatar at a time. 
userSchema.statics.avatarPath = AVATAR_PATH;
//making avatar path available staticly 

//   const upload = multer({ storage: storage })


const User = mongoose.model('User', userSchema);

module.exports = User;