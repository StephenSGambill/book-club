import { getClubMembers, setNewClubMember, getClubs, deleteClub } from "../managers/ApiManager";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./ClubsList.css"

export const ClubsList = () => {
    const [clubs, setClubs] = useState([])
    const [clubMembers, setClubMembers] = useState([])
    const [newClubMemberObj, setNewClubMemberObj] = ([])
    const [searchTerm, setSearchTerm] = useState('')
    const filteredClubs = clubs.filter((club) =>
        club.book.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
    )

    const localUser = localStorage.getItem("bookclub_member")
    const userObject = JSON.parse(localUser)

    const navigate = useNavigate()



    useEffect(
        () => {
            getClubs()
                .then((clubsArray) => {
                    clubsArray.forEach(club => club.bookTitle = club.book.title)
                    setClubs(clubsArray)
                })
        },
        [clubMembers]
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


    const joinClubButtonHandler = (club) => {
        const copy = { ...newClubMemberObj }
        copy.memberId = userObject.id
        copy.clubId = club.id
        setNewClubMember(copy)
            .then(() => {
                getClubMembers()
                    .then((clubMembersArray) => {
                        setClubMembers(clubMembersArray)
                    })
            })

    }

    const confirmDelete = () => {
        const result = window.confirm("Are you sure you want to delete this club?")
        return result
    }

    const deleteButtonHandle = ((clubId) => {
        const result = confirmDelete()
        if (result) {
            deleteClub(clubId)
            getClubs()
                .then((clubsArray) => {
                    setClubs(clubsArray)
                })
        }


    })


    return (
        <>
            <article className="clubs">


                {userObject.isAdmin ? <>
                    <h2 className="page-heading">Clubs List</h2><button className="btn add-btn"
                        onClick={() => navigate("/clubs/create")}>Add Club</button></>
                    : <h2 className="page-heading">Clubs List</h2>
                }


                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Search by book title"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                {
                    filteredClubs
                        .sort((a, b) => b.name > a.name ? -1 : 1)
                        .map((club) => {
                            let foundClubMembers = clubMembers.filter((clubMember) => club.id === clubMember.clubId)

                            return (
                                <section className="club" key={`club--${club.id}`}>
                                    <div>
                                        <button
                                            onClick={((evt) => {
                                                joinClubButtonHandler(club)
                                            })}
                                            className="btn join-btn">Join</button>
                                        <h2><b>Club Name: {club.name}</b>
                                        </h2>
                                        <div><b>Purpose/Goals: </b>{club.purpose}</div>
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
                                            <button className="btn edit-btn"
                                                onClick={(evt) => {
                                                    navigate(`/club/edit/${club.id}`)
                                                }
                                                }  >Edit</button>

                                            <button className="btn delete-btn"
                                                onClick={() => {
                                                    deleteButtonHandle(club.id)
                                                }}>Delete</button>
                                        </div>

                                        : <></>}

                                </section>
                            )
                        })}
            </article>
        </>
    )

}
