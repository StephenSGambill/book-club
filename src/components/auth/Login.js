import React, { useState, useRef } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import { loginUser } from "../managers/AuthManager"

import "./Login.css"


export const Login = () => {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        const user = {
            username: userName,
            password: password


        }

        loginUser(user)
            .then(res => {
                if ("valid" in res && res.valid && "token" in res) {
                    const data = {
                        id: res.id,
                        token: res.token,
                        is_staff: res.is_staff
                    }
                    localStorage.setItem("bookclub_member", JSON.stringify(data))
                    navigate("/")
                }
            })
    }

    return (
        <main className="container--login">
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1 >The Book Club</h1>
                    <h2 className="page-heading">Please sign in</h2>
                    <fieldset>
                        <label htmlFor="userName"> User Name </label>
                        <input
                            type="text"
                            id="userName"
                            className="form-control"
                            placeholder="Enter your user Name..."
                            onChange={evt => setUserName(evt.target.value)}
                            required autoFocus
                        />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="password"> Password </label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            placeholder="Password"
                            onChange={evt => setPassword(evt.target.value)}
                            required
                            autoComplete="current-password" />
                    </fieldset>
                    <fieldset>
                        <button type="submit">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Not a member yet?</Link>
            </section>
        </main>
    )
}

