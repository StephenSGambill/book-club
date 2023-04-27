import { useParams } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getChapterComments, getMembers, setNewChapterComment, getBookByChapter, getClubById, deleteComment } from "../managers/ApiManager";
import "./Chapter.css"


export const Chapter = () => {

    const { chapterId, clubId } = useParams()
    const [chapterComments, setChapterComments] = useState([])
    const [commentInfo, setCommentInfo] = useState([])
    let [newComment, setNewComment] = useState({
        comment: ""
    })
    const [members, setMembers] = useState([])
    const [bookByChapter, setBookByChapter] = useState([])
    const [bookClub, setBookClub] = useState([])
    const navigate = useNavigate()

    const localUser = localStorage.getItem("bookclub_member")
    const memberObject = JSON.parse(localUser)


    useEffect(() => {
        Promise.all([getChapterComments(chapterId), getMembers(), getBookByChapter(chapterId), getClubById(clubId)])
            .then(([chapterCommentsArray, membersArray, bookByChapterArray, clubArray]) => {
                setChapterComments(chapterCommentsArray)
                setCommentInfo(chapterCommentsArray[0])
                setMembers(membersArray)
                setBookByChapter(bookByChapterArray[0])
                setBookClub(clubArray[0])

            })

    }, [clubId]
    )


    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        if (newComment === {}) {
            return
        } else {
            setNewChapterComment(newComment)
                .then(() => {
                    getChapterComments(chapterId)
                        .then((chapterCommentsArray) => {
                            (setChapterComments(chapterCommentsArray))
                        })

                    setNewComment({
                        comment: ""
                    })
                })


        }
    }

    const convertISODate = (ISODate) => {
        let date = new Date(ISODate)
        let month = date.getMonth() + 1
        let day = date.getDate()
        let year = date.getFullYear()
        let returnDate = `${month}/${day}/${year}`
        return returnDate
    }

    const findMember = (memberId) => {
        const foundMember = members.find(member => memberId === member.id)
        return `${foundMember.firstName} ${foundMember.lastName}`

    }


    return <>
        <section className="chapterCommentsContainer">
            <section className="bookClubInfo">
                <h1>Club: {bookClub.name}</h1>
                <h2>Book: {bookByChapter.book?.title}</h2>
                <h2>Chapter Title: {bookByChapter?.title}</h2>
            </section>
            <section className="commentsContainer">
                <button className="btn"
                    onClick={(evt) => {
                        navigate(`/club/${bookClub.id}`)
                    }
                    }
                >Return to Club</button>
                <h3>Club Member Comments</h3>


                {
                    chapterComments.map(chapterComment => {
                        return <React.Fragment key={chapterComment.id}>
                            <div key={chapterComment.id} className="card">
                                <p><b>Posted by: {findMember(chapterComment.memberId)
                                } on {convertISODate(chapterComment.commentDate)}</b></p>
                                {chapterComment.memberId === memberObject.id
                                    ? <button className="btn delete"
                                        onClick={() => {
                                            deleteComment(chapterComment.id)
                                            getChapterComments(chapterId)
                                                .then(chapterCommentsArray => {
                                                    (setChapterComments(chapterCommentsArray))
                                                })
                                        }}
                                    >Delete</button>
                                    : null
                                }

                                <p key={chapterComment.id}>{chapterComment.comment}</p>

                            </div>

                        </React.Fragment>
                    })
                }
            </section>

            <fieldset
                className="commentForm">
                <h3>Add your comment:</h3>
                <div className="comment-group">

                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Type your comment here..."
                        value={newComment.comment}
                        onChange={
                            (evt) => {
                                const copy = { ...newComment }
                                copy.bookChapterId = bookByChapter.id
                                copy.bookId = bookByChapter.bookId
                                copy.clubId = parseInt(clubId)
                                copy.memberId = memberObject.id
                                copy.comment = evt.target.value
                                copy.commentDate = Date()
                                setNewComment(copy)

                            }
                        } />
                    <button
                        onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                        className="btn btn-save">
                        Save
                    </button>
                </div>


            </fieldset>
        </section>
    </>



}