const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

async function getLeaderboard(token) {
    try {
        const users = await User.getUsers({});

        const usersScores = [];
        for (const user of users) {
            if (user.isAdmin) continue;
            const gamesPlayed = user.scores.length;
            const totalScores = user.scores.reduce((p, c) => p + c.points, 0);
            const averageScore = gamesPlayed ? totalScores / gamesPlayed : 0;

            usersScores.push({
                username: user.username,
                gamesPlayed: gamesPlayed,
                totalScores: totalScores,
                averageScore: averageScore
            });
        }

        usersScores.sort((a, b) => b.averageScore - a.averageScore);

        return usersScores;
    }catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    getLeaderboard
}