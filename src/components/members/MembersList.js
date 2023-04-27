import { getMembers, getClubs, getClubMembersAndClub, updateMemberInfo, deleteMember } from "../managers/ApiManager";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./MembersList.css"


export const MembersList = () => {
    const [members, setMembers] = useState([])
    const [clubsInfo, setClubsInfo] = useState([])
    const [clubMembers, setClubMembers] = useState([])
    const [searchMembers, setSearchMembers] = useState('')


    const localUser = localStorage.getItem("bookclub_member")
    const userObject = JSON.parse(localUser)


    useEffect(() => {
        Promise.all([getMembers(), getClubs(), getClubMembersAndClub()])
            .then(([membersArray, clubsArray, clubMembersArray]) => {
                setMembers(membersArray)
                setClubsInfo(clubsArray)
                setClubMembers(clubMembersArray)

            })

    },
        []
    )

    const filteredMembers = members.filter(member =>
        member.lastName.toLowerCase().includes(searchMembers.toLowerCase())
    )


    const handleAdminAddButton = (memberInfo) => {
        const copy = { ...memberInfo }
        copy.isAdmin = true
        updateMemberInfo(copy.id, copy)
            .then(() => {
                getMembers()
                    .then((membersArray) => {
                        setMembers(membersArray)
                    })
            })

    }

    const confirmDelete = () => {
        const result = window.confirm("Are you sure you want to delete this member?")
        return result
    }


    const handleDeleteMemberButton = (member) => {
        const result = confirmDelete()
        if (result) {
            deleteMember(member)
                .then(() => {
                    getMembers()
                        .then((membersArray) => {
                            setMembers(membersArray)
                        })
                })
        }
    }

    return <>
        <article className="members" >
            <h2 className="page-heading">Members List</h2>
            <input
                className="member_search"
                type="text"
                placeholder="Search by last name"
                onChange={(e) => {
                    setSearchMembers(e.target.value);
                }}
            />
            <div>
                {
                    filteredMembers
                        .sort((a, b) => b.lastName > a.lastName ? -1 : 1)
                        .map((member) => {
                            return <section className="member" key={`member--${member.id}`} >
                                <div>
                                    <img className="profilePic" src={member?.profilePic} alt="Profile Picture" />
                                </div>
                                <div className="infoContainer">
                                    <div><b>Name: {member.firstName} {member.lastName}</b></div>
                                    <div><b>Email:</b> {member.email} </div>
                                    <div ><b>Bio: </b>
                                        {member.bio === "" ? <>No bio provided</> : member.bio}
                                    </div>


                                    <div className="bookClubListing"><b>Book Clubs</b></div>
                                    {
                                        clubMembers
                                            .sort((a, b) => b.club?.name > a.club?.name ? -1 : 1)
                                            .map((clubMember) => {
                                                if (clubMember.memberId === member.id) {
                                                    const foundClub = clubsInfo
                                                        .find(clubInfo => clubInfo.id === clubMember.clubId)
                                                    return <li key={foundClub.id}>{foundClub.name}</li>
                                                }
                                            })

                                    }


                                </div>

                                <div>
                                    {userObject.isAdmin && (
                                        <>
                                            <button
                                                className="btn delete"
                                                onClick={() => {
                                                    handleDeleteMemberButton(member)
                                                }}
                                            >Delete</button>

                                            {!member.isAdmin && (
                                                <button
                                                    className="btn"
                                                    onClick={() => {
                                                        handleAdminAddButton(member)
                                                    }}
                                                >Add Admin</button>
                                            )}
                                        </>
                                    )
                                    }
                                    {member.isAdmin &&
                                        <h4 className="btn admin-badge">Admin</h4>}
                                </div>




                            </section>

                        })
                }
            </div>
        </article>
    </>
}
