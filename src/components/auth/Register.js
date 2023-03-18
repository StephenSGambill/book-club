import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { getMemberByEmail, setNewMember } from "../ApiManager"
import "./Login.css"

export const Register = (props) => {
    const [member, setMember] = useState({
        email: "",
        firstName: "",
        lastName: "",
        isAdmin: false,
        image: "",
        bio: "",
        "current-password": ""
    })
    let navigate = useNavigate()

    const registerNewMember = () => {
        setNewMember(member)
            .then(createdMember => {
                if (createdMember.hasOwnProperty("id")) {
                    localStorage.setItem("bookclub_member", JSON.stringify({
                        id: createdMember.id,
                        admin: createdMember.isAdmin
                    }))

                    navigate("/login")
                }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()

        getMemberByEmail(member.email)
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists")
                }
                else {
                    // Good email, create user.
                    registerNewMember()
                }
            })
    }

    const updateMember = (evt) => {
        const copy = { ...member }
        copy[evt.target.id] = evt.target.value
        setMember(copy)
    }

    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Please Register for The Book Club</h1>
                <fieldset>
                    <label htmlFor="firstName"> First Name </label>
                    <input onChange={updateMember}
                        type="text" id="firstName" className="form-control"
                        placeholder="Enter your first name..." required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"> Last Name </label>
                    <input onChange={updateMember}
                        type="text" id="lastName" className="form-control"
                        placeholder="Enter your last name..." required />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateMember}
                        type="email" id="email" className="form-control"
                        placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="current-password"> Password </label>
                    <input onChange={updateMember}
                        type="current-password" id="current-password" className="form-control"
                        placeholder="Password" required />
                </fieldset>
                <fieldset>
                    <input onChange={(evt) => {
                        const copy = { ...member }
                        copy.isAdmin = evt.target.checked
                        setMember(copy)
                    }}
                        type="checkbox" id="isAdmin" />
                    <label htmlFor="email"> I am an Admin </label>
                </fieldset>
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}

