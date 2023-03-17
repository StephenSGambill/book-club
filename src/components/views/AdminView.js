import { Outlet, Route, Routes } from "react-router-dom"
import { BookList } from "../books/BookList"
import { BookClubsList } from "../clubs/BookClubsList"
import { MembersList } from "../members/MembersList"
import { Profile } from "../profile/Profile"
import { BookClub } from "../clubs/BookClub"
import { BookChapter } from "../chapters/BookChapter"
import { BookForm } from "../books/BookForm"
import { BookClubForm } from "../clubs/BookClubForm"

export const AdminView = () => {

    return (
        <Routes>
            <Route path="/" element={
                <>
                    <h2 className="pageTitle">The Book Club</h2>

                    <Outlet />
                </>
            }>
                <Route path="bookList" element={<BookList />} />

                <Route path="members" element={<MembersList />} />

                <Route path="profile" element={<Profile />} />

                <Route path="bookClubs" element={<BookClubsList />} />

                <Route path="club/:clubId" element={<BookClub />} />

                <Route path="chapter/:chapterId/club/:clubId" element={<BookChapter />} />

                <Route path="books/create" element={<BookForm />} />

                <Route path="clubs/create" element={<BookClubForm />} />




            </Route>
        </Routes>
    )
}