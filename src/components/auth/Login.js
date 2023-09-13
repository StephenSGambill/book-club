import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import { getMemberByEmail } from "../managers/ApiManager";
import "./Login.css"


export const Login = () => {
    const [email, set] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        getMemberByEmail(email)

            .then(foundMember => {
                if (foundMember.length === 1 && foundMember[0].password === password) {
                    const member = foundMember[0]
                    localStorage.setItem("bookclub_member", JSON.stringify({
                        id: member.id,
                        isAdmin: member.isAdmin
                    }))

                    navigate("/profile")

                }
                else {
                    window.alert("Invalid login")
                }
            })
    }

    return (
        <main className="container--login">
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h2 className="page-heading">Please sign in</h2>
                    <h1 >The Book Club</h1>
                    <fieldset>
                        <input type="email"
                            id="inputEmail"
                            value={email}
                            onChange={evt => set(evt.target.value)}
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                        <input type="password"
                            id="inputPassword"
                            value={password}
                            onChange={evt => setPassword(evt.target.value)}
                            className="form-control"
                            placeholder="Password"
                            required />
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
