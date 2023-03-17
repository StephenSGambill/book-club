import { getClubMembers, getMembers } from "../ApiManager"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getClubs } from "../ApiManager"
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

    return (
        <>
            <article className="clubs">
                <h2>Clubs List   <button className="btn btn-primary"
                    onClick={() => navigate("/clubs/create")}>Add Club</button></h2>
                {
                    clubs
                        .sort((a, b) => b.name > a.name ? -1 : 1)
                        .map((club) => {
                            let foundClubMembers = clubMembers.filter((clubMember) => club.id === clubMember.clubId)

                            return (
                                <section className="club" key={`club--${club.id}`}>
                                    <div>
                                        <b>Club Name: {club.name}</b>
                                    </div>
                                    <div className="bookInfoContainer">
                                        <div>
                                            <img className="bookCover" src={club.book.image} />
                                        </div>
                                        <div className="bookInfo">
                                            <div>Title: {club.book.title}</div>
                                            <div>Author: {club.book.author}</div>
                                            <div>Synopsis: {club.book.synopsis}</div>
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
                                </section>
                            )
                        })}
            </article>
        </>
    )

}
