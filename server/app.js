const createServer = require('./server');
const connect = require('./dbconnect.js');
const {createAdminUserIfNotExists} = require("./services/user");
const Quiz = require("./models/quizes.model");
const mongoose = require("mongoose");
const fs = require("fs");

const app = createServer();

const seedData = async () => {
    try {
        const data = JSON.parse(fs.readFileSync('seed-data.json', 'utf8'));
        await Quiz.deleteMany({}); // Clear existing data
        await Quiz.insertMany(data); // Insert new data
        console.log('Data seeded successfully');
    } catch (err) {
        console.error('Error seeding data:', err);
    }
};

app.listen(6000, async () => {
    console.log("server running: 6000");
    await connect();
    await createAdminUserIfNotExists();
    await seedData();
});