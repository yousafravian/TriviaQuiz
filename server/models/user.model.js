const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    scores: [{
        points: Number,
        quiz: {
            type: mongoose.Types.ObjectId,
            ref: 'Quiz'
        }
    }]
}, 
{
    collection: 'users'
});

const UserModel = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback) {
    UserModel.findById(id, callback);
}

module.exports.getUsers = async function(id) {
    try {
        const users = await UserModel.find({});
        return users;        
    }catch (error) {
        throw error;
    }
}

module.exports.getUserByUsername = async function(username) {
    const query = {username: username}
    try {
        const user = await UserModel.findOne(query);
        return user;
    } catch (error) {
        throw error;    
    }
}

module.exports.addUser = async function(newUser) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newUser.password, salt);
        newUser.password = hash;
        const createdUser = await newUser.save();
        return createdUser;
    }catch (error) {
        throw error;
    }
}