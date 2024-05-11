const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

async function getLeaderboard(token) {
    try {
        const users = await User.getUsers({});

        const usersScores = [];
        for (const user of users) {
            if (user.isAdmin) continue;
            usersScores.push({
                username: user.username,
                gamesPlayed: user.scores.length,
                totalScores: user.scores.reduce((p,c) => p + c.points, 0)
            })
        }
        usersScores.sort((a,b) => {
            return parseFloat(b.totalScores / b.gamesPlayed) - parseFloat(a.totalScores / a.gamesPlayed);
        });
        
        // const leaderboard = usersScores.slice(0, 100);
        return usersScores;
    }catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    getLeaderboard
}