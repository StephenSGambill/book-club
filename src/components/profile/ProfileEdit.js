
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getCurrentUser, updateMemberInfo } from "../ApiManager";
import { Link } from "react-router-dom";
import "./ProfileEdit.css"


export const ProfileEdit = () => {
    const [member, updateMember] = useState([])

    const localUser = localStorage.getItem("bookclub_member")
    const userObject = JSON.parse(localUser)

    const navigate = useNavigate()


    useEffect(
        () => {
            getCurrentUser(userObject.id)
                .then((currentMemberReturn) => {
                    const Member = currentMemberReturn[0]
                    updateMember(Member)
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
                <button className="btn"
                    onClick={(evt) => {
                        handleSaveButtonClick(evt)
                    }
                    }
                >Save Profile</button>
                <div >
                    <h2>Profile of {member?.firstName} {member?.lastName}</h2>
                    <img className="profilePic" src={member?.profilePic} alt="Profile Picture" />


                    <div className="infoContainer">
                        <div>
                            <label htmlFor="firstName">First Name:</label>
                            <input
                                required autoFocus
                                type="text"
                                className="firstName"
                                value={member.firstName}
                                onChange={(evt) => {
                                    const copy = { ...member }
                                    copy.firstName = evt.target.value
                                    updateMember(copy)
                                }} />
                        </div>
                        <div>
                            <label htmlFor="lastName">Last Name:</label>
                            <input
                                required
                                type="text"
                                className="lastName"
                                value={member.lastName}
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
                                value={member.email}
                                onChange={(evt) => {
                                    const copy = { ...member }
                                    copy.email = evt.target.value
                                    updateMember(copy)
                                }} />
                        </div>
                        <div>
                            <label htmlFor="bio">Bio:</label>
                            <input
                                required
                                type="text"
                                className="bio"
                                value={member.bio}
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
                                type="text"
                                className="pic"
                                value={member.profilePic}
                                onChange={(evt) => {
                                    const copy = { ...member }
                                    copy.profilePic = evt.target.value
                                    updateMember(copy)
                                }} />
                        </div>
                    </div>

                </div>


            </section>
        </article>




    </>
}
