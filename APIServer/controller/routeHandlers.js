const dbTool = require("../services/dbTool");
const {
    authRegister,
    authLogin
} = require("../services/auth");

const register = async(req, res) => {
    try {
        const { username, password } = req.body;

        if(!username || !password){
            return res.status(400).send("Missing username or password.");
        }

        let result;

        try {
            
            result = await authRegister(username, password);

        } catch (error) {
            console.log(error);
            return res.status(400).send(error.message);
        }

        const setCookies = result.headers.getSetCookie();

        res.set('SetCookie', setCookies);

        res.status(201).send(result.message);

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error.");
    }
}

const login = async(req, res) => {
    try {
        const { username, password } = req.body;

        if(!username || !password){
            return res.status(400).send("Missing username or password.");
        }

        let result;

        try {
            result = await authLogin(username, password);
        } catch (error) {
            console.log(error);
            return res.status(401).send(error.message);
        }

        const setCookies = result.headers.getSetCookie();

        res.set('SetCookie', setCookies);

        res.status(200).send(result.message);

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error.");
    }
}

const logout = async(req, res) => {
    try {
        
    } catch (error) {
        
    }
}

const getQuestionList = async(req, res) => {
    try {
        const result = await dbTool.dbGetQuestionList();
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error.");
    }
}

const getQuestionById = async(req, res) => {
    
    try {
        const id = req.params.id;
        const result = await dbTool.dbGetQuestionById(id);
        if(!result) {
            return res.status(404).send("question not found.");
        }

        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error.");
    }


}

const postQuestion = async(req, res) => {

    try {
        // const { user, question } = req.body;
        const user = req.user;
        const question = req.body.question;
        console.log("USER ACTIONS USER:");
        console.log(user);
    
        if(!user){
            return res.status(401).send("Missing user object.");
        }

        if(!question) {
            return res.status(400).send("Missing question object.");
        }

        const result = await dbTool.dbCreateQuestion(user.user_id, question.title, question.details);

        res.status(201).json(result);
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error.");
    }


}

const updateQuestion = async(req, res) => {

    try {
        const user = req.user;
        // const question = req.body.question;
        const { title, details } = req.body.question;
        const questionId = req.params.id;

        if(!title || !details) {
            return res.status(400).send("Question not provided.");
        }

        const questionToUpdate = await dbTool.dbGetQuestionById(questionId);

        if(!questionToUpdate){
            return res.status(404).send("Question not found.");
        }

        if(user.user_id != questionToUpdate.owner_id){
            return res.status(401).send("Question is not created by the requesting user.");
        }

        const result = await dbTool.dbUpdateQuestion(questionId, title, details);

        res.status(200).json(result);
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error.");
    }
    
}

const deleteQuestion = async(req, res) => {

    try {

        const user = req.user;
        const questionId = req.params.id;

        const questionToDelete = await dbTool.dbGetQuestionById(questionId);

        if(!questionToDelete){
            return res.status(404).send("Question not found.");
        }

        if(questionToDelete.owner_id != user.user_id){
            return res.status(401).send("Question is not created by the requesting user.");
        }

        const result = await dbTool.dbDeleteQuestion(questionId);

        res.status(200).json(result);
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error.");
    }
    
}

const upVote = async(req, res) => {
    try {
        const questionId = req.params.id;

        if(!questionId){
            return res.status(400).send("No question id provided.");
        }

        const questionToUpvote = await dbTool.dbGetQuestionById(questionId);

        if(!questionToUpvote){
            return res.status(404).send("Question not found.");
        }

        const result = await dbTool.dbAddUpvote(questionId);

        res.status(200).json(result);

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error.");
    }
}

const setSolved = async(req, res) => {
    try {
        const questionId = req.params.id;
        const userId = req.user.user_id;

        if(!questionId){
            return res.status(400).send("No question id provided.");
        }

        const questionToSolve = await dbTool.dbGetQuestionById(questionId);

        if(!questionToSolve){
            return res.status(404).send("Question not found.");
        }

        if(questionToSolve.owner_id != userId){
            return res.status(401).send("Question is not created by the requesting user.");
        }

        const result = await dbTool.dbSolve(questionId);

        res.status(200).json(result);

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error.");
    }
}

const postAnswer = async(req, res) => {

    try {
        const user = req.user;
        const answer = req.body.answer;
        const questionId = req.params.id;
    
        if(!answer || !answer.answer){
            return res.status(400).send("Missing answer object.");
        }
    
        const question = await dbTool.dbGetQuestionById(questionId);
    
        if(!question){
            return res.status(400).send("Question not found.");
        }
    
        const result = await dbTool.dbCreateAnswer(questionId, user.user_id, answer.answer);
    
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error.");
    }
}

const getAnswersOfQuestion = async(req, res) => {

    try {
        const questionId = req.params.id;
        const result = await dbTool.dbGetAnswersByQuestion(questionId);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error.");
    }
}

module.exports = {
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
}