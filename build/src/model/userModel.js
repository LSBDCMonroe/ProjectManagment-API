"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mongoose = require("mongoose");
let userSchema = new Mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: String,
    email: { type: String, unique: true },
    password: String,
    phone: Number,
    organization: [{ id: Number }],
    joinedDate: Date
});
userSchema.pre('save', function (next) {
    if (!this.joinedDate) {
        this.joinedDate = new Date();
    }
    next();
});
userSchema.methods.toJson = function () {
    let obj = this.toObject();
    delete obj.tokens;
    delete obj.password;
    return obj;
};
module.exports = Mongoose.model("users", userSchema);
//# sourceMappingURL=userModel.js.map