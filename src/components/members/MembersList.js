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
        <article className="members" >
        <h2>Members List</h2>
        <div>
            { 
                members.sort((member1, member2) => {
                    if (member1.lastName < member2.lastName) {
                        return -1;
                      } else if (member1.lastName > member2.lastName) {
                        return 1;
                      } else {
                        return 0;
                      }
                    }).map((member) => {
                   
                    return <section className="member" key={`member--${member.id}`} >
                        <div>
                            <img className="profilePic" src={member?.profilePic} alt="Profile Picture" />
                        </div>
                        <div className="infoContainer"> 
                            <div><b>Name: {member.firstName} {member.lastName}</b></div>
                            <div>Email: {member.email} </div>
                            {member.isAdmin ? <div>(Administrator)</div>: null}
                        </div>
                    </section>

                })
            }
            </div>
        </article>
    </>
}
