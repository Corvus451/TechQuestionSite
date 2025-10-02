const express = require("express");
const { query } = require("./services/db");
require('dotenv').config();

// const path = require('path');
// const fs = require('fs');

const app = express();
const PORT = process.env.SERVER_PORT || 3000;

app.use(express.json());

app.get('/api/questionlist', async (req, res) => {
    try {
      const result = await query('SELECT question_id, title FROM questions');
      console.log(result);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  });

  app.get('/api/question/:id', async (req, res)=> {

    const id = req.params.id;

    try {
      const result = await query('SELECT * FROM questions WHERE question_id = $1', [id]);
      if(result.length == 0) {
        return res.status(404).send("question not found");
      }
      res.json(result[0]);
    } catch (error) {
      console.error(error);
      res.status(500).send(`Error getting question with id ${id}: ` + error);
    }
  });

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





app.listen(PORT, '0.0.0.0', ()=>{
    console.log(`Server is listening at PORT ${PORT}`);
});