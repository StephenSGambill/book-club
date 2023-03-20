import { getClubMembers, getMembers } from "../ApiManager"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getClubs, deleteClub } from "../ApiManager"
import "./ClubsList.css"

export const ClubsList = () => {
    const [clubs, setClubs] = useState([])
    const [clubMembers, setClubMembers] = useState([])


    const localUser = localStorage.getItem("bookclub_member")
    const userObject = JSON.parse(localUser)

    const navigate = useNavigate()


    useEffect(
        () => {
            getClubs()
                .then((clubsArray) => {
                    setClubs(clubsArray)
                })
        },
        []
    )

    useEffect(
        () => {
            getClubMembers()
                .then((clubMembersArray) => {
                    setClubMembers(clubMembersArray)
                })
        },
        []
    )


    const deleteButtonHandle = (
        (clubId) => {
            deleteClub(clubId)
            getClubs()
                .then((clubsArray) => {
                    setClubs(clubsArray)
                })

        })


    return (
        <>
            <article className="clubs">

                {userObject.isAdmin ?
                    <h2 className="page-heading">Clubs List   <button className="btn btn-primary"
                        onClick={() => navigate("/clubs/create")}>Add Club</button></h2>
                    : <h2 className="page-heading">Clubs List</h2>
                }



                {
                    clubs
                        .sort((a, b) => b.name > a.name ? -1 : 1)
                        .map((club) => {
                            let foundClubMembers = clubMembers.filter((clubMember) => club.id === clubMember.clubId)

                            return (
                                <section className="club" key={`club--${club.id}`}>
                                    <div>
                                        <h2><b>Club Name: {club.name}</b></h2>
                                        <div><b>Purpose/Goals:</b>{club.purpose}</div>
                                    </div>
                                    <div className="bookInfoContainer">
                                        <div>
                                            <img className="bookCover" src={club.book.image} />
                                        </div>
                                        <div className="bookInfo">
                                            <div><b>Title:</b> {club.book.title}</div>
                                            <div><b>Author:</b> {club.book.author}</div>
                                            <div><b>Synopsis:</b><em>{club.book.synopsis}</em> </div>
                                        </div>
                                    </div>
                                    <div className="clubMemberContainer"><b>Club Members:</b></div>
                                    <article className="clubMembers">
                                        {
                                            foundClubMembers
                                                .sort((foundClubMember1, foundClubMember2) => foundClubMember1.member.lastName > foundClubMember2.member.lastName ? 1 : -1)
                                                .map((foundClubMember) => (
                                                    <div key={foundClubMember.id}>
                                                        <li>{foundClubMember.member?.firstName} {foundClubMember.member?.lastName}</li>
                                                    </div>
                                                ))
                                        }
                                    </article>

                                    {userObject.isAdmin
                                        ? <div className="edit-button-container">
                                            <button className="edit-button"
                                                onClick={(evt) => {
                                                    navigate("")
                                                }
                                                }  >Edit Club</button>

                                            <button className="delete-button"
                                                onClick={() => {
                                                    deleteButtonHandle(club.id)
                                                }}>Delete Club</button>
                                        </div>

                                        : <></>}

                                </section>
                            )
                        })}
            </article>
        </>
    )

}
