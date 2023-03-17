import { getClubMembers, getMembers } from "../ApiManager"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getBookClubs } from "../ApiManager"
import "./BookClubsList.css"

export const BookClubsList = () => {
    const [clubs, setClubs] = useState([])
    const [clubMembers, setClubMembers] = useState([])


    const localUser = localStorage.getItem("bookclub_member")
    const userObject = JSON.parse(localUser)

    const navigate = useNavigate()


    useEffect(
        () => {
            getBookClubs()
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

    return (
        <>
            <article className="clubs">
                <h2>Clubs List   <button className="btn btn-primary"
            onClick={() => navigate("/clubs/create")}>Add Club</button></h2>


                {clubs.map((club) => {
                    let foundClubMembers = clubMembers.filter((clubMember) => club.id === clubMember.clubId)

                    return (
                        <section className="club" key={`club--${club.id}`}>
                            <div>
                                <b>Club Name: {club.name}</b>
                            </div>
                            <img className="bookCover" src={club.book.image} />
                            <div>Title: {club.book.title}</div>
                            <div>Author: {club.book.author}</div>
                            <div>Synopsis: {club.book.synopsis}</div>
                            <div className="clubMemberContainer"><b>Club Members:</b></div>
                            <article className="clubMembers">
                                {foundClubMembers.map((foundClubMember) => (
                                    <div key={foundClubMember.id}>
                                        <li>{foundClubMember.member?.firstName} {foundClubMember.member?.lastName}</li>
                                    </div>
                                ))}
                            </article>
                        </section>
                    )
                })}
            </article>
        </>
    )

}
