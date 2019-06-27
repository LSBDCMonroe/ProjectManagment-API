"use strict";
let mongoose = require('mongoose'), utils = require('../utils/utils.js'), Schema = mongoose.Schema;
let schema = new Schema({
    tokens: {
        type: [{
                _id: false,
                identifier: String,
                createdAt: Date,
            }],
        default: []
    },
    imageUrl: { type: String, default: "v1555894582/a/zvw5nufptxzutn9yo7yc.png" },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true },
    password: String,
    dob: String,
});
schema.pre('save', function (next) {
    if (!this.createdAt) {
        this.createdAt = new Date();
        this.tokens.push(utils.createToken());
    }
    next();
});
schema.statics.findUserWithToken = function (tokenIdentifer, email) {
    return this.findOne({ email })
        .then(user => {
        if (!user)
            return undefined;
        return user.tokens.find(t => t.identifier === tokenIdentifer) ? user : undefined;
    });
};
schema.methods.toJson = function () {
    let obj = this.toObject();
    delete obj.tokens;
    delete obj.password;
    return obj;
};
module.exports = mongoose.model("users", schema);
//# sourceMappingURL=userModel.js.map