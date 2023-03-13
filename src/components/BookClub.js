import './BookClub.css';
import { Route, Routes } from 'react-router-dom';
import {Authorized} from "./views/Authorized"
import {ApplicationViews} from "./views/ApplicationViews"
import {NavBar} from "./nav/NavBar"
import {Register} from "./auth/Register"
import {Login} from "./auth/Login"

export const BookClub = () => {
  return <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    <Route path="*" element={
      <Authorized>
        <>
          <NavBar />
          <ApplicationViews />
        </>
      </Authorized>

  } />
</Routes>
}
