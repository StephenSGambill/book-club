import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getBooks, deleteBook, getChaptersByBookId } from "../managers/ApiManager";
import { BookForm } from "./BookForm"
import { Book } from "./Book"
import "./BookList.css"

export const BookList = () => {
    const [books, setBooks] = useState([])
    const [chapterCounts, setChapterCounts] = useState([])
    const [searchTitle, setSearchTitle] = useState('')
    const [searchAuthor, setSearchAuthor] = useState('')




    const localUser = localStorage.getItem("bookclub_member")
    const userObject = JSON.parse(localUser)

    const navigate = useNavigate()


    useEffect(() => {
        getBooks()
            .then((booksArray) => {
                setBooks(booksArray)
                // Promise.all(
                //     booksArray.map((book) =>
                //         getChaptersByBookId(book.id).then((chaptersArray) => ({
                //             bookId: book.id,
                //             chapterCount: chaptersArray.length,
                //         }))
                //     )
                // ).then((counts) => {
                //     const newCounts = {}
                //     counts.forEach((count) => {
                //         newCounts[count.bookId] = count.chapterCount;
                //     })
                //     setChapterCounts(newCounts)
                // })
            })
    }, [])

    const chapterCount = (bookId) => chapterCounts[bookId] || 0;


    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
        book.author.toLowerCase().includes(searchAuthor.toLowerCase())
    )


    const editButtonHandler = (bookId) => {
        navigate(`/book/edit/${bookId}`)

    }


    const confirmDelete = () => {
        const result = window.confirm("Are you sure you want to delete this book?")
        return result
    }
    const deleteButtonHandle = (bookId) => {
        const result = confirmDelete()
        if (result) {
            deleteBook(bookId)
                .then(() => {
                    getBooks()
                        .then((booksArray) => {
                            setBooks(booksArray)
                            Promise.all(
                                booksArray.map((book) =>
                                    getChaptersByBookId(book.id).then((chaptersArray) => ({
                                        bookId: book.id,
                                        chapterCount: chaptersArray.length,
                                    }))
                                )
                            ).then((counts) => {
                                const newCounts = {}
                                counts.forEach((count) => {
                                    newCounts[count.bookId] = count.chapterCount;
                                })
                                setChapterCounts(newCounts)
                            })
                        })
                })
        }

    }


    return <>

        <article className="books" >

            <h2 className="page-heading">Books List
                <button className="btn btn-primary"
                    onClick={() => navigate("/books/create")}>Add Book</button></h2>


            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search by title"
                    onChange={(e) => {
                        setSearchTitle(e.target.value);
                    }}
                />
                <input
                    type="text"
                    placeholder="Search by author"
                    onChange={(e) => {
                        setSearchAuthor(e.target.value);
                    }}
                />
            </div>
            {
                filteredBooks
                    .sort((a, b) => {
                        const titleA = a.title.toLowerCase()
                        const titleB = b.title.toLowerCase()
                        return titleA < titleB ? -1 : titleA > titleB ? 1 : 0
                    })
                    .map((book) => {

                        return <section className="bookContainer" key={`book--${book.id}`} >
                            <div>
                                <img className="bookCover" src={book.image} alt="Book Cover" />
                            </div>

                            <Book
                                title={book.title}
                                author={book.author}
                                chapterCount={chapterCount(book.id)}
                                synopsis={book.synopsis}
                            />

                            {
                                userObject.is_staff
                                    ? <><div>
                                        <button className="btn"
                                            onClick={() => {
                                                editButtonHandler(book.id)
                                            }}>Edit</button>
                                    </div>
                                        <div>
                                            <button className="btn, delete-btn"
                                                onClick={() => {
                                                    deleteButtonHandle(book.id)
                                                }}>Delete</button>
                                        </div>
                                    </>
                                    : <></>
                            }
                        </section>

                    })
            }
        </article>
    </>
}
