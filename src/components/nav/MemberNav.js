import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const MemberNav = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/purchases">Past Orders</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/locations">Locations</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/inventory">Inventory</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/products">Products</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/cart">My Cart</Link>
            </li>
            


            <li className="navbar__item navbar__logout">
                <Link className="navbar__link" to="" onClick={() => {
                    localStorage.removeItem("bookclub_member")
                    navigate("/", {replace: true})
                }}>Logout</Link>
            </li>
        </ul>
    )
}


