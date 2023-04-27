import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import { getMemberByEmail } from "../managers/ApiManager";
import "./Login.css"


export const Login = () => {
    const [email, set] = useState("")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        getMemberByEmail(email)


            .then(foundMembers => {
                if (foundMembers.length === 1) {
                    const member = foundMembers[0]
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
                    <h1 >The Book Club</h1>
                    <h2 className="page-heading">Please sign in</h2>
                    <fieldset>
                        <label htmlFor="inputEmail"> Email address </label>
                        <input type="email"
                            value={email}
                            onChange={evt => set(evt.target.value)}
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
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

