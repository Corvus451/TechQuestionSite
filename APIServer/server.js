const express = require("express");
const { query } = require("./services/db");
const cookieParser = require("cookie-parser");
const { SERVER_PORT, ENDPOINT_PREFIX } = require("./config/config");
const { authHandler } = require("./services/auth");
const {
    getQuestionList,
    getQuestionById,
    postQuestion,
    updateQuestion,
    deleteQuestion,
    upVote,
    setSolved,
    postAnswer
} = require("./controller/userActions");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get(ENDPOINT_PREFIX + "/questionlist", getQuestionList);
app.get(ENDPOINT_PREFIX + "/question/:id", getQuestionById);

app.post(ENDPOINT_PREFIX + "/question", authHandler, postQuestion);
app.patch(ENDPOINT_PREFIX + "/question/:id", authHandler, updateQuestion);
app.delete(ENDPOINT_PREFIX + "/question/:id", authHandler, deleteQuestion);
app.post(ENDPOINT_PREFIX + "/upvote/:id", authHandler, upVote);
app.post(ENDPOINT_PREFIX + "/setsolved/:id", authHandler, setSolved);
app.post(ENDPOINT_PREFIX + "/postanswer", authHandler, postAnswer);


  app.post('/api/question', async (req, res)=> {
    const {owner_id, title, details} = req.body;
    try {
        const result = await query('INSERT INTO questions (owner_id, title, details) VALUES($1, $2, $3) RETURNING *', [owner_id, title, details]);
        res.status(201).json(result[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
  });

  app.patch('/api/question/:id', async (req, res)=> {
    const id = req.params.id;
    const {title, details} = req.body;
    try {
        const result = await query('UPDATE questions SET title = $1, details = $2 WHERE question_id = $3 RETURNING *', [title, details, id]);
        res.status(200).json(result[0]);
    } catch (error) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
  });

  app.delete('/api/question/:id', async (req, res)=>{
    const id = req.params.id;
    try {
        const result = await query('DELETE FROM questions WHERE question_id = $1', [id]);
        res.status(204).send();
    } catch (error) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
  });





app.listen(SERVER_PORT, '0.0.0.0', ()=>{
    console.log(`Server is listening at PORT ${SERVER_PORT}`);
});