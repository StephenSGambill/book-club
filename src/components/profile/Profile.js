import { getCurrentUser, getClubMemberById, getClubs } from "../managers/ApiManager";
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react"

import "./Profile.css"


export const Profile = () => {
    const [currentMember, setCurrentMember] = useState({})
    const [memberClubs, setMemberClubs] = useState([])
    const [clubs, setClubs] = useState([])
    const [bookChapters, setBookChapters] = useState([])

    const localUser = localStorage.getItem("bookclub_member")
    const userObject = JSON.parse(localUser)

    const navigate = useNavigate()



    useEffect(
        () => {
            getCurrentUser(userObject.id)
                .then((currentMemberReturn) => {
                    const Member = currentMemberReturn[0]
                    setCurrentMember(Member)
                    getClubMemberById(Member.id)
                        .then((memberClubsArray) => {
                            setMemberClubs(memberClubsArray)
                        })
                    getClubs()
                        .then((clubsArray) => {
                            setClubs(clubsArray)

                        })


                })
        },
        []
    )



    return <>
        <article  >

            <section className="profile" key={currentMember.id}>
                <button className="btn"
                    onClick={(evt) => {
                        navigate("/profile/edit")
                    }
                    }
                >Edit</button>

                <div className="profileCard">
                    <h2>Welcome! {currentMember?.firstName} {currentMember?.lastName}</h2>


                    <div className="profileContainer">
                        <img className="profilePic" src={currentMember?.profilePic} alt="Profile Picture" />
                        <div className="infoContainer">
                            <div><b>Email:</b> {currentMember?.email}</div>
                            <div><b>Admin:</b> {currentMember?.isAdmin ? "Yes" : "No"}</div>
                            <div><b>Bio:</b> {currentMember?.bio} </div>
                            <div className="testimage" />
                        </div>

                    </div>
                    <div className="clubsContainer">
                        <h3>My Clubs:</h3>
                        {
                            memberClubs
                                .sort((memberClub1, memberClub2) => memberClub1.club?.name > memberClub2.club?.name ? 1 : -1)
                                .map(memberClub => {
                                    const foundBookClub = clubs.find(bookClub => memberClub.clubId === bookClub.id)
                                    return <Link className="club-link" key={memberClub.clubId} to={`/club/${foundBookClub?.id}`} ><li >{foundBookClub?.name}</li></Link>
                                })
                        }
                    </div>
                </div>
            </section>
        </article>




    </>
}
