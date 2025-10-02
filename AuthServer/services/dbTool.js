const { query } = require("./db");

exports.createUser = async(username, hashedPassword) => {

    const result = await query("INSERT INTO users(username, password) VALUES($1, $2) RETURNING *", [username, hashedPassword]);
    return result[0];
}

exports.findUsername = async(username) => {

    const result = await query("SELECT username FROM users WHERE username = $1", [username]);
    return  result[0] != null;
}

exports.getUserById = async(id) => {
    const result = await query("SELECT * FROM users WHERE user_id = $1", [id]);
    if(result[0] == null){
        return null;
    }
    return {
        username: result[0].username,
        user_id: result[0].user_id,
        admin: result[0].admin
    };
}