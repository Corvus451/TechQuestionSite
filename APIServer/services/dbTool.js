const { query } = require("./db");

exports.dbPostQuestion = async(owner_id, title, details) => {
    const result = await query("INSERT INTO questions(owner_id, title, details) VALUES($1, $2, $3) RETURNING *", [owner_id, title, details]);
    console.log(result);
    return result[0];
}

exports.dbGetQuestionList = async() => {
    const result = await query("SELECT * FROM questions");
    console.log(result);
    return result;
}

exports.dbGetQuestionById = async(id) => {
    const result = await query("SELECT * FROM questions WHERE question_id = $1", [id]);
    return result[0];
}

exports.dbUpdateQuestion = async(question_id, title, details) => {
    const result = await query("UPDATE questions SET title = $1, details = $2 WHERE question_id = $3 RETURNING *", [title, details, question_id]);
    return result[0];
}

exports.dbDeleteQuestion = async(id) => {
    const result = await query("DELETE FROM questions WHERE question_id = $1 RETURNING *", [id]);
    return result[0];
}

exports.dbCreateQuestion = async(owner_id, title, details) => {
    const result = await query("INSERT INTO questions(owner_id, title, details) VALUES($1, $2, $3) RETURNING *", [owner_id, title, details]);
    return result[0];
}



// exports.getUserById = async(id) => {
//     const result = await query("SELECT * FROM users WHERE user_id = $1", [id]);
//     if(result[0] == null){
//         return null;
//     }
//     return {
//         username: result[0].username,
//         user_id: result[0].user_id,
//         admin: result[0].admin
//     };
// }