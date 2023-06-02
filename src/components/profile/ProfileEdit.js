
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
                    updateMember(res[0])
                })
        },
        []
    )


    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        updateMemberInfo(userObject.id, member)
        console.log(member)
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
                >Save</button>
                <div >
                    <h2>Profile of {member?.user?.first_name} {member?.user?.last_name}</h2>

                    <div className="topContainer">

                        <img className="profilePic" src={member?.profile_pic} alt="Profile Picture" />


                        <div className="infoContainer">
                            <div>
                                <label htmlFor="firstName">First:    </label>
                                <input
                                    required autoFocus
                                    type="text"
                                    className="firstName"
                                    value={member?.user?.first_name}
                                    onChange={(evt) => {
                                        const copy = { ...member }
                                        copy.user.first_name = evt.target.value
                                        updateMember(copy)
                                    }} />
                            </div>
                            <div>
                                <label htmlFor="lastName">Last:    </label>
                                <input
                                    required
                                    type="text"
                                    className="lastName"
                                    value={member?.user?.last_name}
                                    onChange={(evt) => {
                                        const copy = { ...member }
                                        copy.user.last_name = evt.target.value
                                        updateMember(copy)
                                    }} />
                            </div>
                            <div>
                                <label htmlFor="email">Email:</label>
                                <input
                                    required
                                    type="text"
                                    className="email"
                                    value={member?.user?.email}
                                    onChange={(evt) => {
                                        const copy = { ...member }
                                        copy.user.email = evt.target.value
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
                            type="textarea"
                            className="pic"
                            value={member.profile_pic}
                            onChange={(evt) => {
                                const copy = { ...member }
                                copy.profile_pic = evt.target.value
                                updateMember(copy)
                            }} />
                    </div>


                </div>


            </section>
        </article>




    </>
}
