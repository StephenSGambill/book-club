import { getMembers, getClubs, getClubMembersAndClub, updateMemberInfo, deleteMember } from "../ApiManager";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./MembersList.css"


export const MembersList = () => {
    const [members, setMembers] = useState([])
    const [clubsInfo, setClubsInfo] = useState([])
    const [clubMembers, setClubMembers] = useState([])


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

    const ConfirmModal = ({ message, onConfirm, onCancel }) => {
        return (
            <div className="modal-container">
                <div className="modal-content">
                    <p>{message}</p>
                    <div className="modal-buttons">
                        <button className="confirm" onClick={onConfirm}>Confirm</button>
                        <button className="cancel" onClick={onCancel}>Cancel</button>
                    </div>
                </div>
            </div>
        );
    };

    const handleAdminAddButton = (memberInfo) => {
        const copy = { ...memberInfo }
        copy.isAdmin = true
        updateMemberInfo(copy.id, copy)
        getMembers()
            .then((membersArray) => {
                setMembers(membersArray)
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
            <div>
                {
                    members
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
                                    {member.isAdmin ? <div >(Administrator)</div> : null}

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
                                    <button className="btn delete"
                                        onClick={() => {
                                            handleDeleteMemberButton(member)
                                        }}>Delete Member</button>
                                    {(userObject.isAdmin && !member.isAdmin)
                                        ? <button className="btn"
                                            onClick={() => {
                                                handleAdminAddButton(member)
                                            }}>Add Admin</button>
                                        : null
                                    }


                                </div>
                            </section>

                        })
                }
            </div>
        </article>
    </>
}
