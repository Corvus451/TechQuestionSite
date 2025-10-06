const { hashPassword, verifyPassword } = require("../utilities/password");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRES_IN } = require("../config/config");
const dbTool = require("../services/dbTool");

async function authenticate(req, res) {
    try {
        const token = req.body.authToken;

        if(!token){
            return res.status(400).send("No auth token provided.");
        }

        // const decodedUser = jwt.verify(token, JWT_SECRET, (error, user)=>{
        //     if (error) return res.status(403).send("Invalid AuthToken.");
        // });
        let decodedUser;
        try {
            decodedUser = jwt.verify(token, JWT_SECRET);
            console.log("DECODED USER:");
            console.log(decodedUser);
            
        } catch (error) {
            console.error(error);
            return res.status(401).send("invalid authToken.");
        }
        // const result = await query("SELECT username, user_id, admin FROM users WHERE user_id = $1", [decodedUser.user_id]);
        // const user = result[0];


        // const user = await dbTool.getUserById(decodedUser.user_id);
        // console.log(user);

        // if(!decodedUser){
        //     return res.status(401).send("User does not exist.");
        // }

        res.status(200).json({
            user: {
                username: decodedUser.username,
                user_id: decodedUser.user_id,
                admin: decodedUser.admin,
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).send("internal server error.");
    }
}

async function register(req, res) {
    try {
        const { username, password } = req.body;

        if(!username || !password){
            return res.status(400).send("error at registration");
        }

        // const existingUsername = await query("SELECT username FROM users WHERE username = $1", [username]);
        const usernameExists = await dbTool.findUsername(username);

        if(usernameExists){
            return res.status(409).send("Username already exists.");
        }

        const hashedPassword = await hashPassword(password);

        // const User = {
        //     username,
        //     password: hashedPassword,
        //     admin: false,
        // };

        // const result = await query("INSERT INTO users(username, password) VALUES($1, $2) RETURNING *", [username, hashedPassword]);
        // const createdUser = result[0];

        const createdUser = await dbTool.createUser(username, hashedPassword);

        const token = jwt.sign(createdUser, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});


        res.cookie('authToken', token, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
        });


        res.status(201).send("Registered successfully");


    } catch (error) {
        res.status(500).send("internal server error", error);
    }
}

async function login(req, res) {

try {
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).send("username or password is missing.");
    }
    
    const user = await dbTool.getUserByName(username);
    
    if(!user){
        return res.status(401).send("Username does not exist.");
    }
    
    const passwordResult = await dbTool.getHashedPasswordByid(user.user_id);
    const hashedPassword = passwordResult.password;
    
    const isPasswordValid = await verifyPassword(password, hashedPassword);

    if(!isPasswordValid){
        return res.status(401).send("Invalid credentials.");
    }

    const token = jwt.sign(user, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.cookie('authToken', token, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
    });

    res.status(200).send("Login successful.");
    
} catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
}

}

async function logout(req, res) {
    try {
        res.clearCookie('authToken', {
            httpOnly: true,
            sameSite: 'strict'
        });

        res.status(200).send("Logout successful.");
    } catch (error) {
        console.error(error);
        res.status(500).send("internal server error.");
    }
}

module.exports = { authenticate, register, login, logout };