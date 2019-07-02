//import * as Mongoose from 'mongoose';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
 name: String
});

//this refers to query handle
schema.statics.test = function() {
  return this.find({});
}

module.exports = mongoose.model("test", schema);
