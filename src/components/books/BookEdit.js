import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getBookById, updateBookInfo, getChaptersByBookId, updateBookChapterTitle } from "../ApiManager"
import "./BookEdit.css"

export const BookEdit = () => {
    const { bookId } = useParams()
    const [book, setBook] = useState({
        title: "",
        author: "",
        synopsis: "",
    })
    const [bookChapters, setBookChapters] = useState([])
    const navigate = useNavigate()


    useEffect(() => {
        getBookById(bookId)
            .then((bookArray) => {
                setBook(bookArray[0])
            })
        getChaptersByBookId(bookId)
            .then((chaptersArray) => {
                setBookChapters(chaptersArray)
            })
    }, [])


    const handleSaveButtonClick = () => {
        updateBookChapterTitle(bookChapters)
        updateBookInfo(book)
        window.alert("Info saved for this book!")

    }

    const returnButton = () => {
        navigate("/bookList")
    }

    const handleChapterChange = (event, bookChapterId) => {
        const updatedChapters = bookChapters.map((chapter) => {
            if (chapter.id === bookChapterId) {
                return { ...chapter, title: event.target.value }
            }
            return chapter;
        })
        setBookChapters(updatedChapters)

    }

    return (<form>
        <h2 className="page-header">Book Edit Page</h2>
        <div className="bookEditForm">
            <article className="bookEditContainer">
                <button
                    className="btn save-btn"
                    onClick={() => {
                        handleSaveButtonClick()
                    }}
                >Save Info</button>
                <button
                    className="btn return-btn"
                    onClick={() => {
                        returnButton()
                    }}
                >Return to Books</button>

                <div>
                    <div>
                        <label htmlFor="book-box" ><b>Title:</b></label>
                    </div>
                    <input
                        type="text"
                        className="book-box"
                        autoFocus
                        value={book.title}
                        onChange={(event) => {
                            const copy = { ...book }
                            copy.title = event.target.value
                            setBook(copy)
                        }}>
                    </input>
                </div>
                <div>
                    <div>
                        <label htmlFor="author-box" ><b>Author:</b></label>
                    </div>
                    <input
                        type="text"
                        className="author-box"
                        value={book.author}
                        onChange={(event) => {
                            const copy = { ...book }
                            copy.author = event.target.value
                            setBook(copy)
                        }}>
                    </input>
                </div>
                <div className="synopsis-container">
                    <div>
                        <label htmlFor="synopsis-box"><b>Synopsis:</b></label>
                    </div>
                    <div className="textarea-container">
                        <textarea
                            id="synopsis-box"
                            type="text"
                            className="synopsis-box"
                            value={book.synopsis}
                            onChange={(event) => {
                                const copy = { ...book }
                                copy.synopsis = event.target.value
                                setBook(copy)
                            }}>
                        </textarea>
                    </div>
                </div>

                <div><b>Chapters:</b></div>
                {
                    bookChapters
                        .sort((chapter1, chapter2) => chapter1.order > chapter2.order ? 1 : -1)
                        .map((bookChapter) => {
                            return (
                                <div key={bookChapter.id}>
                                    <input
                                        type="text"
                                        className="chapter-box"
                                        value={bookChapter.title}
                                        onChange={(event) => {
                                            handleChapterChange(event, bookChapter.id)
                                        }}>
                                    </input>
                                </div>

                            )
                        })
                }


            </article>
        </div>

    </form >



    )

}