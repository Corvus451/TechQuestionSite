const { AUTH_ENDPOINT, AUTH_HOST } = require("../config/config");

const authenticate = async (token) => {
    const result = await fetch(AUTH_HOST + AUTH_ENDPOINT + "/authenticate", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            authToken: token
        })
    });

    if (result.status != 200) {
        const error = Error(result);
        error.name = "Authentication error";
        throw error;
    }

    const data = await result.json();

    return data.user;
}

const authHandler = async (req, res, next) => {
    try {
        const token = req.cookies.authToken;
        if (!token) {
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

        if (!user) {
            return res.status(403).send("Invalid token");
        }

        req.user = user;
        next();

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error.");
    }
}

const authRegister = async (username, password) => {

    console.log("===SENDING DATA TO AUTH SERVER...===");

    const result = await fetch(AUTH_HOST + AUTH_ENDPOINT + "/register", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    });

    console.log("===RESPONSE RECEIVED FROM AUTH SERVER===");

    if (!result.ok) {
        const errorMessage = await result.text();
        const error = Error(errorMessage);
        error.name = "Registration error";
        throw error;
    }

    console.log("===RESULT IS OK===");

    const message = await result.text();
    console.log("REGISTRATION MESSAGE:");
    console.log(message);

    return {
        headers: result.headers,
        message: message
    };
}

const authLogin = async (username, password) => {
    const result = await fetch(AUTH_HOST + AUTH_ENDPOINT + "/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    });

    if (!result.ok) {
        const errorMessage = await result.text();
        const error = Error(errorMessage);
        error.name = "Registration error";
        throw error;
    }

    const message = await result.text();

    return {
        headers: result.headers,
        message: message
    };
}

module.exports = { authHandler, authRegister, authLogin };