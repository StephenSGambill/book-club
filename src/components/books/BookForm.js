import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { setNewBook } from "../ApiManager"
import "./BookForm.css"

export const BookForm = () => {

    const [newBook, updateNewBook] = useState([])
    const navigate = useNavigate()

    const localUser = localStorage.getItem("bookClub_member")
    const userObject = JSON.parse(localUser)



    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        setNewBook(newBook)
            .then(() => {
                navigate("/bookList")
            })
    }




    return (<form
        className="bookForm">
        <h2>Add New Book</h2>

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
            </div>
            <button
                className="btn btn-primary"
                onClick={(evt) => {
                    const copy = { ...newBook }
                    handleSaveButtonClick(evt)
                }
                }>Save Book
            </button>
        </fieldset>

    </form>
    )
}