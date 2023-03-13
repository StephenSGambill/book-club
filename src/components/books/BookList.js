import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getBooks } from "../ApiManager"
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

    return <>
        {
            userObject.isStaff
                ?
                <>
                   
                    <button onClick={() => navigate("/book/create")}>Create New</button>
                </>
                : ""
        }

        <h2>List of Books</h2>

        <article className="books" >
            {
                books.map((book) => {
                   
                    return <section className="book" key={`book--${book.id}`} >
                        <img className="bookCover" src={book.image} alt="Book Cover"/>
                        <div><b>Titlew: {book.title}</b></div>
                        <div>Author: {book?.author} </div>
                        <div>Synopsis: {book.description}</div>


                    </section>

                })
            }
        </article>
    </>
}
