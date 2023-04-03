import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { setNewClub, getBooks, getClubs, getMembers, setNewClubMember } from "../ApiManager"
import "./ClubForm.css"

export const ClubForm = () => {

    const [newClub, updateNewClub] = useState({
        active: true
    })
    const navigate = useNavigate()
    const [members, setMembers] = useState([])
    const [clubs, setClubs] = useState([])
    const [books, setBooks] = useState([])
    const [checkedMembers, setCheckedMembers] = useState([])
    const [newClubMemberObject, setNewClubMemberObject] = useState({
        memberId: 0,
        clubId: 0
    })


    const localUser = localStorage.getItem("bookClub_member")
    const userObject = JSON.parse(localUser)


    useEffect(() => {
        Promise.all([getBooks(), getMembers(), getClubs()])
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
                for (let checkedMember of checkedMembers) {
                    const copy = { ...newClubMemberObject }
                    copy.memberId = checkedMember
                    copy.clubId = newClubReturn.id
                    setNewClubMember(copy)
                }
                navigate("/clubs")
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
        <h2 className="page-heading">Add New Club</h2>

        <div className="newClubContainer">
            <div>
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
                <label htmlFor="purpose">Club Purpose/Goals</label>
                <textarea
                    className="purpose_box"
                    onChange={
                        (evt) => {
                            const copy = { ...newClub }
                            copy.purpose = evt.target.value
                            updateNewClub(copy)
                        }}>


                </textarea>
            </fieldset>
            <fieldset>
                <h3>Choose club members</h3>
                {
                    members
                        .sort((member1, member2) => member1.lastName > member2.lastName ? 1 : -1)
                        .map((member) => {
                            return (
                                <div key={member.id}>
                                    <input key={member.id}
                                        type="checkbox"
                                        value={member.id}
                                        checked={checkedMembers.includes(member.id)}
                                        onChange={handleCheckboxChange}
                                    />
                                    {member.firstName} {member.lastName}
                                </div>
                            )
                        })

                }
                <button
                    className="btn btn-primary"
                    onClick={(evt) => {
                        const copy = { ...newClub }
                        copy.bookId = evt.target.value
                        handleSaveButtonClick(evt)
                    }
                    }>Save
                </button>
                <button className="btn"
                    onClick={() => {
                        navigate('/clubs')
                    }

                    }>Cancel</button>
            </fieldset>

        </div>
    </form>
    )
}