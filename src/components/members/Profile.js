import { getMembers } from "../ApiManager";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getCurrentUser } from "../ApiManager";


export const Profile = () => {
    const [currentMember, setCurrentMember] = useState({})
    
    const localUser = localStorage.getItem("bookclub_member")
    const userObject = JSON.parse(localUser)

    const navigate = useNavigate()


        useEffect(
        () => {
            getCurrentUser(userObject.id)
                .then((currentMemberReturn) => {
                    const Member = currentMemberReturn[0]
                    setCurrentMember(Member)

                })
        },
        []
    )

    return <>
        <article className="currentMember" >
            <h2>Profile of {currentMember?.firstName} {currentMember?.lastName}</h2>
            <div>Email: {currentMember?.email}</div>
            <div>Bio: {currentMember?.bio} </div>
            <div>Admin: {currentMember?.isAdmin ? "Yes" : "No"}</div>
            <img src={currentMember?.profilePic} alt="Profile Picture" />
        </article> 

        
           
       
    </>
}
