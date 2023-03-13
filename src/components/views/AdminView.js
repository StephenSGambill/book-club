import { Outlet, Route, Routes } from "react-router-dom"
import { BookList } from "../books/BookList"
import { BookClubs } from "../clubs/BookClubs"
import {MembersList} from "../members/MembersList"
import { Profile } from "../members/Profile"

export const AdminView = () => {

return (
    <Routes>
        <Route path="/" element={
            <>
                <h2>The Book Club - Admin</h2>
                                
                <Outlet />
        </>
    }>
        <Route path="bookList" element={ <BookList /> } />

        <Route path="members" element={ <MembersList /> } />

        <Route path="profile" element= { <Profile /> } /> 

        <Route path="bookClubs" element= { <BookClubs />} />

         
    </Route>
</Routes>
)}