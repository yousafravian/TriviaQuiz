const createServer = require('./server');
const connect = require('./dbconnect.js');
const {createAdminUserIfNotExists} = require("./services/user");

const app = createServer();

app.listen(6000, async () => {
    console.log("server running: 6000");
    await connect();
    await createAdminUserIfNotExists();
});