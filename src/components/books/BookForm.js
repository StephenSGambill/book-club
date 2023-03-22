import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { setNewBook } from "../ApiManager"
import "./BookForm.css"

export const BookForm = () => {

    const [newBook, updateNewBook] = useState([])
    const navigate = useNavigate()
    const [bookChapterTitleArray, updateBookChapterTitleArray] = useState([])
    const [chapterInputs, setChapterInputs] = useState([])//for updating number of chapters
    const [chapterTitles, setChapterTitles] = useState([])

    const localUser = localStorage.getItem("bookClub_member")
    const userObject = JSON.parse(localUser)


    useEffect(() => {
        const chapterInputs = [];
        for (let i = 1; i <= bookChapterTitleArray.length; i++) {
            chapterInputs.push(
                <input
                    key={`chapter-${i}`}
                    type="text"
                    className="form-control"
                    placeholder={`Chapter ${i}`}
                    onChange={(evt) => {
                        const copy = [...bookChapterTitleArray]
                        copy[i - 1] = evt.target.value
                        updateBookChapterTitleArray(copy)
                    }}
                />
            )
        }
        setChapterInputs(chapterInputs)
    }, [bookChapterTitleArray])


    const handleChapterNumberChange = (evt) => {
        const numChapters = parseInt(evt.target.value)
        updateBookChapterTitleArray(new Array(numChapters).fill(""))
    }

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        const chapters = []

        console.log(bookChapterTitleArray)

        const copy = { ...newBook }
        copy.chapters = bookChapterTitleArray.length
        updateNewBook(copy)

        setNewBook(newBook)
            .then((newBookArray) => {
                for (let i = 0; i < bookChapterTitleArray.length; i++) {
                    const chapterTitle = bookChapterTitleArray[i] || `Chapter ${i + 1}`
                    const chapter = {
                        order: i + 1,
                        bookId: newBookArray.id,
                        title: chapterTitle || (`Chapter ${i + 1}`)
                    }
                    fetch("http://localhost:8088/bookChapters", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(chapter),
                    })

                }
            })

        navigate("/bookList")
    }

    return (<form
        className="bookForm">
        <h2 className="page-heading">Add New Book</h2>

        <fieldset>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                    required autoFocus
                    type="text"
                    id="title"
                    className="form-control"
                    onChange={(evt) => {
                        const copy = { ...newBook }
                        copy.title = evt.target.value
                        updateNewBook(copy)
                    }} />
                <label htmlFor="author">Author</label>
                <input
                    required
                    type="text"
                    id="author"
                    className="form-control"
                    onChange={(evt) => {
                        const copy = { ...newBook }
                        copy.author = evt.target.value
                        updateNewBook(copy)
                    }} />
                <label htmlFor="description">Synopsis</label>
                <input
                    required
                    type="text"
                    id="synopsis"
                    className="form-control"
                    onChange={(evt) => {
                        const copy = { ...newBook }
                        copy.synopsis = evt.target.value
                        updateNewBook(copy)
                    }} />
                <label htmlFor="bookCoverURL">Paste URL to book cover image</label>
                <input
                    required
                    type="text"
                    id="bookCoverURL"
                    className="form-control"
                    onChange={(evt) => {
                        const copy = { ...newBook }
                        copy.image = evt.target.value
                        updateNewBook(copy)
                    }} />
                <label htmlFor="chapterNumbers">How many chapters?</label>
                <input
                    required
                    type="number"
                    id="chapterNumbers"
                    className="form-control"
                    onChange={handleChapterNumberChange}
                />

                <label htmlFor="chapters">Chapter Titles</label>
                {chapterInputs}


            </div>
            <button
                className="btn btn-primary"
                onClick={(evt) => {
                    handleSaveButtonClick(evt)
                }
                }>Save Book
            </button>
            <button
                className="btn btn-primary"
                onClick={(evt) => {
                    navigate("/bookList")
                }
                }>Cancel
            </button>
        </fieldset>

    </form>
    )
}