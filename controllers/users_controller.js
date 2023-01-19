// this controller can control many/multiple  users

module.exports.profile = function(req,res){
    return res.render('user_profile', {user:'User'});
}