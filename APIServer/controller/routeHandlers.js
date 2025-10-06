const dbTool = require("../services/dbTool");

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
    
}

module.exports = {
    getQuestionList,
    getQuestionById,
    postQuestion,
    updateQuestion,
    deleteQuestion,
    upVote,
    setSolved,
    postAnswer
}