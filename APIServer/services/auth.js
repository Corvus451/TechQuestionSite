const { AUTH_ENDPOINT } = require("../config/config");

const authenticate = async(token) => {
    const result = await fetch(AUTH_ENDPOINT, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            authToken: token
        })
    });

    const data = await result.json();

    if(result.status != 200){
        const error = Error(result);
        error.name = "auth error";
        throw error;
    }
    return data.user;
}

const authHandler = async(req, res, next) => {
    try {
        const token = req.cookies.authToken;
        if(!token){
            return res.status(401).send("authToken missing.");
        }

        const user = authenticate(token);

        if(!user){
            return res.status(403).send("Invalid token");
        }

        req.body.user = user;
        next();

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error.");
    }
}

module.exports = { authHandler };