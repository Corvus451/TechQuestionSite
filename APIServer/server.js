const express = require("express");
const { query } = require("./services/db.js");
const cookieParser = require("cookie-parser");
const { SERVER_PORT, ENDPOINT_PREFIX } = require("./config/config.js");
const { authHandler } = require("./services/auth.js");
const {
    getQuestionList,
    getQuestionById,
    postQuestion,
    updateQuestion,
    deleteQuestion,
    upVote,
    setSolved,
    postAnswer,
    getAnswersOfQuestion,
    register,
    login,
    logout
} = require("./controller/routeHandlers");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get(ENDPOINT_PREFIX + "/questionlist", getQuestionList);
app.get(ENDPOINT_PREFIX + "/question/:id", getQuestionById);
app.get(ENDPOINT_PREFIX + "/answers/:id", getAnswersOfQuestion);
app.post(ENDPOINT_PREFIX + "/question", authHandler, postQuestion);
app.patch(ENDPOINT_PREFIX + "/question/:id", authHandler, updateQuestion);
app.delete(ENDPOINT_PREFIX + "/question/:id", authHandler, deleteQuestion);
app.post(ENDPOINT_PREFIX + "/upvote/:id", authHandler, upVote);
app.post(ENDPOINT_PREFIX + "/solve/:id", authHandler, setSolved);
app.post(ENDPOINT_PREFIX + "/postanswer/:id", authHandler, postAnswer);

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
