const express = require("express");
const { query } = require("./services/db");
const cookieParser = require("cookie-parser");

const {
    authenticate,
    register,
    login,
    logout
} = require("./controller/auth");

const { SERVER_PORT, ENDPOINT_PREFIX } = require("./config/config");

const app = express();

app.use(express.json());
app.use(cookieParser());


// endpoints
app.post(ENDPOINT_PREFIX + "/authenticate", authenticate);
app.post(ENDPOINT_PREFIX + "/register", register);
app.post(ENDPOINT_PREFIX + "/login", login);
app.post(ENDPOINT_PREFIX + "/logout", logout);



try {
    app.listen(SERVER_PORT, '0.0.0.0', ()=>{
    console.log(`Server is listening at PORT ${SERVER_PORT}`);
});
} catch (error) {
    console.error(error);
    process.exit(1);
}