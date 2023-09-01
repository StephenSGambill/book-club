import { Link, useNavigate } from "react-router-dom"
import { MemberNav } from "./MemberNav"
import { AdminNav } from "./AdminNav"
import "./NavBar.css"

export const NavBar = () => {
    const localUser = localStorage.getItem("bookclub_member")
    const userObject = JSON.parse(localUser)

    if (userObject.isAdmin) {
        return <AdminNav />

    } else {
        return <MemberNav />

    }
}


