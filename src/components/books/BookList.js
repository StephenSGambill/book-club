import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getBooks } from "../ApiManager"
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

    return <>
       

        <article className="books" >
        <h2>Book List  <button className="btn btn-primary"
            onClick={() => navigate("/books/create")}>Add Book</button></h2>
        
        

            {
                books.map((book) => {
                   
                    return <section className="bookContainer" key={`book--${book.id}`} >
                        <img className="bookCover" src={book.image} alt="Book Cover"/>
                        <div><b>Title: {book.title}</b></div>
                        <div>Author: {book?.author} </div>
                        <div>Synopsis: {book.synopsis}</div>
                    </section>

                })
            }
        </article>
    </>
}
