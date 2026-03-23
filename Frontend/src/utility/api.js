import { isLoggedIn, user } from "./status";

export async function register(username, password) {
    try {
        const resp = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        if (!resp.ok) {
            return false;
        }
        const data = await resp.json();
        user.value = data.user;

        alert("Registered successfully")
        return true;


    } catch (error) {
        console.log(error)
    }
}

export async function login(username, password) {
    try {
        const resp = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            }),
        });

        if (!resp.ok) {
            console.log("login not ok");
            return false;
        }


        const data = await resp.json();
        user.value = data.user;

        alert("Logged in successfully")
        return true;


    } catch (error) {
        console.log(error)
    }
}

export async function logout() {
    try {
        const resp = await fetch('/api/auth/logout', {
            method: 'POST'
        });

        if (!resp.ok) {
            alert("error")
            return false;
        }

        user.value = null;

        alert("Logged out")
        return true;

    } catch (error) {

    }
}

export async function authenticate() {
    if (!isLoggedIn()) {
        return;
    }
    try {
        const resp = await fetch('/api/authenticate', {
            method: 'POST'
        });

        if (!resp.ok) {

        }

        const data = await resp.json();

        user.value = data.user;

    } catch (error) {
        console.log(error)
    }
}

export async function postQuestion(title, details) {
    if (isLoggedIn() && title && details) {

        const payload = JSON.stringify({
            question: {
                title,
                details
            }
        });
        try {
            const resp = await fetch('/api/question', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: payload
            });
    
            if (!resp.ok) {
                alert("error")
                return false;
            }
    
            return true;

        } catch (error) {
            console.log(error)
            return false;
        }

    }
}