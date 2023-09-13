import { getToken } from "../utils/getToken"


export const loginUser = (member) => {
    return fetch("http://127.0.0.1:8080/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(member)
    })
        .then(res => res.json())
}

export const registerUser = (member) => {
    return fetch("http://127.0.0.1:8080/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(member)
    })
        .then(res => res.json())
}