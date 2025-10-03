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
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error.");
    }


}

const postQuestion = async(req, res) => {
    const user = req.body.user;
    const question = req.question;


}

const updateQuestion = async(req, res) => {
    
}

const deleteQuestion = async(req, res) => {
    
}

const upVote = async(req, res) => {
    
}

const setSolved = async(req, res) => {
    
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