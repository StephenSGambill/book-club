import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getBookById, getBookClubById, getClubMembers, updateClubInfo, deleteClubMember } from "../ApiManager"
import "./ClubEdit.css"

export const ClubEdit = () => {
    const { clubId } = useParams()
    const [club, setClub] = useState([])
    const [book, setBook] = useState([])
    const [clubMembers, setClubMembers] = useState([])




    const navigate = useNavigate()


    useEffect(() => {
        getBookClubById(clubId)
            .then((clubInfo) => {
                const club = clubInfo[0]
                setClub(club)
                getBookById(club.bookId)
                    .then((bookInfo) => {
                        const book = bookInfo[0]
                        setBook(book)

                    })
                getClubMembers()
                    .then((clubMembersArray) => {
                        setClubMembers(clubMembersArray)

                    })
            })

    }, [])


    const deleteMemberButton = (clubMemberId) => {
        deleteClubMember(clubMemberId)
    }


    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        updateClubInfo(club)

        navigate(`/clubs`)
    }

    return (<form>
        <article className="clubs">
            <h2 className="page-heading">Edit Club</h2>

            <section className="clubEditContainer" key={club?.id}>
                <button className="btn"
                    onClick={(evt) => {
                        handleSaveButtonClick(evt)
                    }
                    }
                >Save Club Info</button>

                <div><b>Book:</b> {book.title}</div>

                <div className="clubName">
                    <label htmlFor="clubName"><b>Club Name:</b></label>
                    <input
                        required autoFocus
                        type="text"
                        className="firstName"
                        value={club.name}
                        onChange={(evt) => {
                            const copy = { ...club }
                            copy.name = evt.target.value
                            setClub(copy)
                        }} />
                </div>
                <div className="clubPurpose">
                    <label htmlFor="clubPurpose"><b>Purpose/Goals:</b></label>
                    <textarea
                        type="text"
                        className="purpose"
                        value={club.purpose}
                        onChange={(evt) => {
                            const copy = { ...club }
                            copy.purpose = evt.target.value
                            setClub(copy)
                        }} />
                </div>
                <div className="clubMembers">
                    <label htmlFor="clubMembers"><b>Club Members:</b></label>
                    {
                        clubMembers
                            .map(clubMember => {
                                return clubMember.clubId === club.id
                                    ? <div className="memberContainer" key={clubMember.id}>
                                        <li >{clubMember.member.firstName} {clubMember.member.lastName}
                                        </li>
                                        <button className="btn remove-btn"
                                            onClick={(event) => {
                                                deleteMemberButton(clubMember.id)

                                            }
                                            }
                                        >Remove {clubMember.member.firstName}</button>
                                    </div>

                                    : null
                            })
                    }


                </div>
            </section>
        </article>
    </form >
    )
}