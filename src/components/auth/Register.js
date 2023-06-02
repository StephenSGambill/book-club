import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { getMemberByUsername } from "../managers/ApiManager"
import { registerUser } from "../managers/AuthManager"
import "./Login.css"

export const Register = (props) => {
    const username = useRef()
    const firstName = useRef()
    const lastName = useRef()
    const bio = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    const email = useRef()

    let navigate = useNavigate()


    const handleRegister = (e) => {
        e.preventDefault()

        const newMember = {
            "username": username.current.value,
            "first_name": firstName.current.value,
            "last_name": lastName.current.value,
            "email": email.current.value,
            "password": password.current.value,
            "is_staff": false
        }

        registerUser(newMember)
            .then(res => {
                if ("token" in res) {
                    const data = {
                        token: res.token,
                        is_staff: res.is_staff
                    }
                    localStorage.setItem("bookclub_member", JSON.stringify(data))
                    navigate("/login")
                }
            })
    }


    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Please Register for The Book Club</h1>
                <fieldset>
                    <label htmlFor="username"> User Name </label>
                    <input ref={username}
                        type="text" id="username" className="form-control"
                        placeholder="Enter your user Name..." required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="firstName"> First Name </label>
                    <input ref={firstName}
                        type="text" id="firstName" className="form-control"
                        placeholder="Enter your first name..." required />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"> Last Name </label>
                    <input ref={lastName}
                        type="text" id="lastName" className="form-control"
                        placeholder="Enter your last name..." required />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email </label>
                    <input ref={email}
                        type="email" id="email" className="form-control"
                        placeholder="Email" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="password"> Password </label>
                    <input ref={password}
                        type="password" id="password" className="form-control"
                        placeholder="Password" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="verifyPassword"> Verify Password </label>
                    <input ref={verifyPassword}
                        type="password" id="verifyPassword" className="form-control"
                        placeholder="Verify Password" required />
                </fieldset>
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}

