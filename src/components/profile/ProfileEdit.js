
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getCurrentMember, updateMemberInfo } from "../managers/ApiManager";
import { Link } from "react-router-dom";
import "./ProfileEdit.css"


export const ProfileEdit = () => {
    const [member, updateMember] = useState([])

    const localUser = localStorage.getItem("bookclub_member")
    const userObject = JSON.parse(localUser)


    const navigate = useNavigate()


    useEffect(
        () => {
            getCurrentMember(userObject.id)
                .then((res) => {
                    updateMember(res)

                })
        },
        []
    )


    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        updateMemberInfo(userObject.id, member)
        navigate("/profile")
    }


    return <>
        <article  >
            <section className="profile" key={member?.id}>
                <button className="btn save-profile-btn save-btn"
                    onClick={(evt) => {
                        handleSaveButtonClick(evt)
                    }
                    }
                >Save</button>

                <div >
                    <h2>Profile of {member?.firstName} {member?.lastName}</h2>

                    <div className="topContainer">
                        <div className="image-container">
                            <img className="profilePic" src={member?.profilePic} alt="Profile Picture" />
                        </div>
                        <div className="infoContainer">
                            <div>
                                <label htmlFor="firstName">First:    </label>
                                <input
                                    required autoFocus
                                    type="text"
                                    className="firstName"
                                    value={member?.firstName}
                                    onChange={(evt) => {
                                        const copy = { ...member }
                                        copy.firstName = evt.target.value
                                        updateMember(copy)
                                    }} />
                            </div>
                            <div>
                                <label htmlFor="lastName">Last:    </label>
                                <input
                                    required
                                    type="text"
                                    className="lastName"
                                    value={member?.lastName}
                                    onChange={(evt) => {
                                        const copy = { ...member }
                                        copy.lastName = evt.target.value
                                        updateMember(copy)
                                    }} />
                            </div>
                            <div>
                                <label htmlFor="email">Email:</label>
                                <input
                                    required
                                    type="text"
                                    className="email"
                                    value={member?.email}
                                    onChange={(evt) => {
                                        const copy = { ...member }
                                        copy.email = evt.target.value
                                        updateMember(copy)
                                    }} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="bio" >Bio:</label>
                        <textarea
                            required
                            type="text"
                            className="bio"
                            value={member?.bio}

                            onChange={(evt) => {
                                const copy = { ...member }
                                copy.bio = evt.target.value
                                updateMember(copy)
                            }} />
                    </div>
                    <div>
                        <label htmlFor="pic">Profile Picture URL:</label>
                        <input
                            required
                            type="textarea"
                            className="pic"
                            value={member.profilePic}
                            onChange={(evt) => {
                                const copy = { ...member }
                                copy.profilePic = evt.target.value
                                updateMember(copy)
                            }} />
                    </div>


                </div>


            </section>
        </article>




    </>
}
