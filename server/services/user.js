const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

async function register(userInput) {
    try {
        const user = await User.getUserByUsername(userInput.username);
        if (user){
            return;
        }

        const newUser = new User({
            username: userInput.username,
            password: userInput.password,
        });
        const createdUser = await User.addUser(newUser);
        return createdUser;
    }catch (error) {
        console.log(error);
        throw error;
    }
};

async function login(userInput) {
    try {
        const user = await User.getUserByUsername(userInput.username);
        if (!user){
            return;
        }

        const isPasswordCorrect = await bcrypt.compare(userInput.password, user['_doc'].password);

        if (!isPasswordCorrect) {
            return;
        }

        const token = jwt.sign({user: user}, 'secretkey');
        return {user, token};
    }catch (error) {
        console.log(error);
        throw error;
    }
}

async function addScore(userInput, username) {
    try {
        const { points, quizId } = userInput;
        const user = await User.getUserByUsername(username);
        if (!user){
            return;
        }

        user.scores.push({points: parseInt(points), quiz: quizId});
        user.save();
        return user;
    }catch (error) {
        console.log(error);
        throw error;
    }
}

async function getScore(username, token) {
    try {
        const payload = jwt.decode(token);
        const { user } = payload;
        if (!user){
            return;
        }

        return user.score;
    }catch (error) {
        console.log(error);
        throw error;
    }
}

async function createAdminUserIfNotExists() {
    try {
        const user = await User.getUserByUsername("admin");
        if (user){
            console.log("Admin user found");
            return;
        }

        console.log("No Admin user found, creating admin user");

        const newUser = new User({
            username: 'admin',
            password: 'admin@123',
            isAdmin: true,
        });
        const createdUser = await User.addUser(newUser);
        return createdUser;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    register,
    login,
    addScore,
    getScore,
    createAdminUserIfNotExists
}