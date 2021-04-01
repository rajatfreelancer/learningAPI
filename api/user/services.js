var User   =   require('../../models/user');

  
exports.userLogin = function(username)
{
    return new Promise(function(resolve, reject) {
      User.findOne({ "local.name": username })
      .exec(function (err,data) {
        if (err) {
            console.log("err", err);
            reject(err);
          } else {
            resolve(data);
          }
        });
    });
};

module.exports;