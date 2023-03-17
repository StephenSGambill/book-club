import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { setNewClub, getBooks, getBookClubs, getMembers, setNewClubMember } from "../ApiManager"
import "./BookClubForm.css"

export const BookClubForm = () => {

    const [newClub, updateNewClub] = useState({
        active: true
    })
    const navigate = useNavigate()
    const [members, setMembers] = useState([])
    const [clubs, setClubs] = useState([])
    const [books, setBooks] = useState([])
    const [checkedMembers, setCheckedMembers] = useState([])
    const [newClubMemberObject, setNewClubMemberObject] = useState({})


    const localUser = localStorage.getItem("bookClub_member")
    const userObject = JSON.parse(localUser)


    useEffect(() => {
        Promise.all([getBooks(), getMembers(), getBookClubs()])
            .then(([booksArray, membersArray, clubsArray]) => {
                setBooks(booksArray)
                setMembers(membersArray)
                setClubs(clubsArray)
            })
    }, [])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        setNewClub(newClub)
            .then((newClubReturn) => {
                console.log(newClubReturn)
                for (let checkedMember of checkedMembers) {
                    setNewClubMemberObject({
                        memberId: checkedMember.id,
                        clubId: newClubReturn.id
                    })
                    setNewClubMember(newClubMemberObject)

                }
                navigate("/bookClubs")
            })
    }

    const handleCheckboxChange = (event) => {
        const itemId = parseInt(event.target.value)
        const isChecked = event.target.checked

        setCheckedMembers(prevCheckedUsers => {
            if (isChecked) {
                return [...prevCheckedUsers, itemId]
            } else {
                return prevCheckedUsers.filter((id) => id !== itemId)
            }
        })
    }



    return (<form
        className="clubForm">
        <h2>Add New Club</h2>

        <fieldset className="formContainer">
            <div className="form-group">
                <label htmlFor="title">New Club Name</label>
                <input
                    required autoFocus
                    type="text"
                    id="clubName"
                    className="form-control"
                    onChange={(evt) => {
                        const copy = { ...newClub }
                        copy.name = evt.target.value
                        updateNewClub(copy)
                    }} />
            </div>
        </fieldset>
        <fieldset>
            <select
                className="bookChoice"
                onChange={
                    (evt) => {
                        const copy = { ...newClub }
                        copy.bookId = parseInt(evt.target.value)
                        updateNewClub(copy)
                    }}>
                <option key="book" id="book">Choose a book...</option>
                {
                    books
                        .sort((a, b) => b.title > a.title ? -1 : 1)
                        .map((book) => {
                            return <option value={book.id} key={book.id}>{book.title} ({book.author})</option>
                        })
                }

            </select>
        </fieldset>
        <fieldset>
            <h3>Choose club members</h3>
            {
                members
                    .sort((a, b) => b.lastName > a.lastName ? -1 : 1)
                    .map((member) => {
                        return (
                            <div>
                                <label key={member.id}>
                                    <input key={member.id}
                                        type="checkbox"
                                        value={member.id}
                                        checked={checkedMembers.includes(member.id)}
                                        onChange={handleCheckboxChange}
                                    ></input>
                                    {member.firstName} {member.lastName}
                                </label>
                            </div>
                        )
                    })

            }
        </fieldset>


        <button
            className="btn btn-primary"
            onClick={(evt) => {
                const copy = { ...newClub }
                copy.bookId = evt.target.value
                handleSaveButtonClick(evt)
            }
            }>Save Club
        </button>

    </form>
    )
}