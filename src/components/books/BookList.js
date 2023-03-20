import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getBooks, deleteBook } from "../ApiManager"
import { BookForm } from "./BookForm"
import "./BookList.css"

export const BookList = () => {
    const [books, setBooks] = useState([])

    const localUser = localStorage.getItem("bookclub_member")
    const userObject = JSON.parse(localUser)

    const navigate = useNavigate()


    useEffect(
        () => {
            getBooks()
                .then((booksArray) => {
                    setBooks(booksArray)

                })
        },
        []
    )


    const deleteButtonHandle = (bookId) => {
        deleteBook(bookId)
            .then(setBooks)
        //window.location.reload(false)
    }


    return <>
        <article className="books" >
            <h2 className="page-heading">Books List<button className="btn btn-primary"
                onClick={() => navigate("/books/create")}>Add Book</button></h2>
            {
                books
                    .sort((a, b) => b.title > a.title ? -1 : 1)
                    .map((book) => {

                        return <section className="bookContainer" key={`book--${book.id}`} >
                            <div>
                                <img className="bookCover" src={book.image} alt="Book Cover" />
                            </div>
                            <div className="bookInfo">
                                <div><b>Title: {book.title}</b></div>
                                <div><b>Author: </b>{book?.author}</div>
                                <div className="synopsis"><b>Synopsis: </b><em>{book.synopsis}</em></div>
                            </div>
                            {userObject.isAdmin
                                ? <div>
                                    <button className="btn"
                                        onClick={() => {
                                            deleteButtonHandle(book.id)
                                        }}>Delete Book</button>
                                </div>
                                : <></>
                            }
                        </section>

                    })
            }
        </article>
    </>
}
