const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    username: String,
    email: String,
    password: String,
    role: {
        type: String,
        default: 'user'
    }
});
const db = mongoose.connection.useDb('UserDB');
const userModel = db.model('user', userSchema);
module.exports = userModel;