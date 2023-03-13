import { getMembers } from "../ApiManager";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./MembersList.css" 

export const MembersList = () => {
    const [members, setMembers] = useState([])
    
    const localUser = localStorage.getItem("bookclub_member")
    const userObject = JSON.parse(localUser)

    const navigate = useNavigate()


        useEffect(
        () => {
            getMembers()
                .then((membersArray) => {
                    setMembers(membersArray)
                   
                })
        },
        []
    )

    return <>
        
        <h2>List of Members</h2>

        <article className="members" >
            {
                members.map((member) => {
                   
                    return <section className="member" key={`member--${member.id}`} >
                        <div>Name: {member.firstName} {member.lastName}</div>
                        <div>Email: {member.email} </div>
                        <div>Admin?: {member.isAdmin ? "Yes" : "No"}</div>
                        


                    </section>

                })
            }
        </article>
    </>
}
