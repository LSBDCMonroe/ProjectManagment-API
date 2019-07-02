import * as Mongoose from 'mongoose';

let userSchema = new Mongoose.Schema({
  firstName:String,
//  lastName: { type: String, required: true },
  userName: String,
  email: { type: String, unique: true },
  password: String,
  phone: Number,
  organization: [{id: Number}],
  joinedDate: Date
});

//this refers to document
userSchema.pre('save', function(next) {
  if (!this.joinedDate) {
    //first time creating
    this.joinedDate = new Date();
//    this.joinedDate.push(utils.createToken());
  }
  next();
});

//this refers to document
userSchema.methods.toJson = function() {
  let obj = this.toObject();
  delete obj.tokens;
  delete obj.password;
  return obj;
}

module.exports = Mongoose.model("users", userSchema);
