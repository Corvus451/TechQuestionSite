import { user } from "./status";

export async function register(username, password) {
    try {
        const resp = await fetch('/api/auth/register', {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        if(!resp.ok) {

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
        const resp = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            }),
        });

        if(!resp.ok) {
            console.log("login not ok");
            return false;
        }

        console.log("setting user data");

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

        if(!resp.ok) {
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
    try {
        const resp = await fetch('/api/authenticate', {
            method: 'POST'
        });

        if(!resp.ok) {

        }

        const data = await resp.json();

        user.value = data.user;

    } catch (error) {
        console.log(error)
    }
}