"use strict";
const uuidv4 = require('uuid/v4');
function createToken() {
    return {
        identifier: uuidv4(),
        created_at: new Date()
    };
}
module.exports = {
    createToken
};
//# sourceMappingURL=utils.js.map