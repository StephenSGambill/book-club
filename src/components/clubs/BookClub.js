import { getClubMembers, getMembers } from "../ApiManager";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"
import { getBookClubById, getBookById, getChaptersByBook } from "../ApiManager";
import "./BookClub.css"

export const BookClub = () => {
    const { chapterId, clubId } = useParams()
    const [bookClub, setBookclub] = useState([])
    const [book, setBook] = useState([])
    const [clubMembers, setClubMembers] = useState([])
    const [bookChapters, setBookChapters] = useState([])

    useEffect(
        () => {
            getBookClubById(clubId)
                .then((clubArray) => {
                    const thisClub = clubArray[0]
                    setBookclub(thisClub)

                    getBookById(thisClub.bookId)
                        .then(bookArray => {
                            const thisBook = bookArray[0]
                            setBook(thisBook)
                        })

                    getClubMembers()
                        .then((membersArray) => {
                            setClubMembers(membersArray)
                        })
                    getChaptersByBook()
                        .then(bookChaptersArray => {
                            setBookChapters(bookChaptersArray)

                        }
                        )
                })

        },
        []
    )


    return (
        <>
            <article className="bookClubContainer">
                <h2>{bookClub.name} Book Club</h2>

                <section className="bookClub" key={`bookClub--${bookClub.id}`}>
                    <div>
                        <img className="bookCover" src={book.image} alt="Book Cover" />
                    </div>
                    <div className="bookInfo">
                        <div>Title: {book.title}</div>
                        <div>Author: {book.author}</div>
                        <div>Purpose: {bookClub.purpose}</div>
                    </div>
                </section>
                <section className="clubMembers">
                    <h3>Club Members:</h3>

                    {
                        clubMembers.map(clubMember => {
                            if (clubMember.clubId === bookClub.id) {
                                return <li key={clubMember.member.id} >{clubMember.member.firstName} {clubMember.member.lastName}</li>
                            }
                        })
                    }
                </section>
                <section>
                    <h3>Chapters (click to go to chapter comments)</h3>
                    {
                        bookChapters.map(bookChapter => {
                            if (bookChapter.bookId === book.id) {
                                return <Link key={bookChapter.id} to={`/chapter/${bookChapter.id}/club/${bookClub.id}`}><li >{bookChapter.title}</li></Link>
                            }
                        })
                    }
                </section>


            </article>
        </>
    )



}
