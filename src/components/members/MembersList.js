import { getMembers, getClubs, getClubMembersAndClub } from "../ApiManager";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./MembersList.css"

export const MembersList = () => {
    const [members, setMembers] = useState([])
    const [clubsInfo, setClubsInfo] = useState([])
    const [clubMembers, setClubMembers] = useState([])


    useEffect(() => {
        Promise.all([getMembers(), getClubs(), getClubMembersAndClub()])
            .then(([membersArray, clubsArray, clubMembersArray]) => {
                setMembers(membersArray)
                setClubsInfo(clubsArray)
                setClubMembers(clubMembersArray)
            })

    },
        []
    )

    return <>
        <article className="members" >
            <h2>Members List</h2>
            <div>
                {
                    members
                        .sort((a, b) => b.lastName > a.lastName ? -1 : 1)
                        .map((member) => {

                            return <section className="member" key={`member--${member.id}`} >
                                <div>
                                    <img className="profilePic" src={member?.profilePic} alt="Profile Picture" />
                                </div>
                                <div className="infoContainer">
                                    <div><b>Name: {member.firstName} {member.lastName}</b></div>
                                    <div><b>Email:</b> {member.email} </div>
                                    {member.isAdmin ? <div>(Administrator)</div> : null}
                                    <div className="bookClubListing"><b>Book Clubs</b></div>
                                    {
                                        clubMembers
                                            .sort((a, b) => b.club?.name > a.club?.name ? -1 : 1)
                                            .map((clubMember) => {
                                                if (clubMember.memberId === member.id) {
                                                    const foundClub = clubsInfo
                                                        .find(clubInfo => clubInfo.id === clubMember.clubId)
                                                    return <li key={foundClub.id}>{foundClub.name}</li>
                                                }
                                            })
                                    }
                                </div>
                            </section>

                        })
                }
            </div>
        </article>
    </>
}
