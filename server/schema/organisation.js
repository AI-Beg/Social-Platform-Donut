const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bycrypt = require('bcrypt')
const OrgSchema = new Schema({
    type: {
        type: Number,
        required: true
      },
    name: {
        type: String
      },
      profilepic:{
        type:String
      },
      email: {
        type: String,
        unique:true
      },
      adminName: {
          type: String
      },
      website : {
        type : String
      },
      pass: {
        type: String
      },
      followersList: {
        type : [Number]
      },
      followingList: {
        type : [Number]
      },
      bio: {
        type: String
      },
      lang: {
        type: [String]
      },
      location:{
        country:{
          type:String
        },
        city:{
          type:String
        }
      },
      last_login:{
        lat:{
          type:String
        },
        long:{
          type:String
        }
      },
      social:{
        type:Schema.Types.ObjectId,
        ref:'social'
      },
      contributors:{
          type:[String],
          default : []
      }
})
OrgSchema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('pass')) return next();
    bycrypt.genSalt(10, function(err, salt) {
      if (err) {
        return next(err);
      }
      bycrypt.hash(user.pass, salt, function(err, hash) {
        user.pass = hash;
        next();
      });
    });
  });
  
OrgSchema.methods.compare = function(pass) {
    return bycrypt.compareSync(pass, this.password);
  };

const OrgModel = mongoose.model('organisation',OrgSchema)
module.exports = OrgModel