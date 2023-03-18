import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const AdminNav = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/profile"><b>My Profile</b></Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/bookList">Books</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/clubs">Clubs</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/members">Members</Link>
            </li>

            <li className="navbar__item navbar__logout">
                <Link className="navbar__link" to="" onClick={() => {
                    localStorage.removeItem("bookclub_member")
                    navigate("/", { replace: true })
                }}>Logout</Link>
            </li>
        </ul>

    )
}


