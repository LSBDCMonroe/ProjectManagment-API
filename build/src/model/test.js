"use strict";
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let schema = new Schema({
    name: String
});
schema.statics.test = function () {
    return this.find({});
};
module.exports = mongoose.model("test", schema);
//# sourceMappingURL=test.js.map