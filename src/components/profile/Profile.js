import { getMembers, getClubMemberById, getBookClubs } from "../ApiManager";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getCurrentUser } from "../ApiManager";
import { Link } from "react-router-dom";
import "./Profile.css"


export const Profile = () => {
    const [currentMember, setCurrentMember] = useState({})
    const [memberClubs, setMemberClubs] = useState([])
    const [bookClubs, setBookclubs] = useState([])
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
                    getBookClubs()
                        .then((bookClubsArray) => {
                            setBookclubs(bookClubsArray)
                        })
                    
                
                })
        },
        []
    )



    return <>
        <article className="profile" >
            <section key={currentMember.id}>
            <h2>Profile of {currentMember?.firstName} {currentMember?.lastName}</h2>
            <img className="profilePic" src={currentMember?.profilePic} alt="Profile Picture" />
            <div>Email: {currentMember?.email}</div>
            <div>Bio: {currentMember?.bio} </div>
            <div>Admin: {currentMember?.isAdmin ? "Yes" : "No"}</div>
            <section className="clubsContainer">
            <h3><b>My Clubs:</b></h3>
            {
                memberClubs.map(memberClub => {
                    const foundBookClub = bookClubs.find(bookClub => memberClub.clubId === bookClub.id)
                    return <Link key={memberClub.clubId} to={`/club/${foundBookClub?.id}`} ><li >{foundBookClub?.name}</li></Link>
                })
            }
            </section>
        </section>
        </article>




    </>
}
