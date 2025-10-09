const { AUTH_ENDPOINT, AUTH_HOST } = require("../config/config");

const authenticate = async(token) => {
    const result = await fetch(AUTH_HOST + AUTH_ENDPOINT + "/authenticate", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            authToken: token
        })
    });

    if (result.status != 200){
        const error = Error(result);
        error.name = "Authentication error";
        throw error;
    }

    const data = await result.json();

    return data.user;
}

const authHandler = async(req, res, next) => {
    try {
        const token = req.cookies.authToken;
        if(!token){
            return res.status(401).send("authToken missing.");
        }

        let user;

        try {
            user = await authenticate(token);
        } catch (error) {
            console.error(error);
            return res.status(401).send("Invalid authToken.");
        }

        console.log("AUTH USER:");
        console.log(user);

        if(!user){
            return res.status(403).send("Invalid token");
        }

        req.user = user;
        next();

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error.");
    }
}

module.exports = { authHandler };