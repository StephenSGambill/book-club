import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getBooks, deleteBook, getChaptersByBookId } from "../ApiManager"
import { BookForm } from "./BookForm"
import "./BookList.css"

export const BookList = () => {
    const [books, setBooks] = useState([])
    const [chapterCounts, setChapterCounts] = useState([])
    const [searchTitle, setSearchTitle] = useState('')



    const localUser = localStorage.getItem("bookclub_member")
    const userObject = JSON.parse(localUser)

    const navigate = useNavigate()


    useEffect(() => {
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
    }, [])

    const chapterCount = (bookId) => chapterCounts[bookId] || 0;


    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTitle.toLowerCase())
    )

    const editButtonHandler = (bookId) => {
        navigate(`/book/edit/${bookId}`)

    }

    const deleteButtonHandle = (bookId) => {
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


    return <>

        <article className="books" >

            <h2 className="page-heading">Book List
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

                            <div className="bookInfo">
                                <div><b>Title: {book.title}</b></div>
                                <div><b>Author: </b>{book?.author}</div>
                                <div><b>Chapters: </b>{chapterCount(book.id)}</div><div className="synopsis"><b>Synopsis: </b><em>{book.synopsis}</em></div>

                            </div>

                            {userObject.isAdmin
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
