
export const getMemberByEmail = (email) => {
    return fetch(`http://localhost:8088/members?email=${email}`)
    .then(res => res.json())
}

export const setNewMember = (member) => {
    return  fetch("http://localhost:8088/members", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(member)
    })
        .then(res => res.json())
}

export const getBooks = () => {
    return fetch(`http://localhost:8088/books`)
    .then(res => res.json())
}


export const getMembers = () => {
    return fetch(`http://localhost:8088/members`)
    .then(res => res.json())
}


export const getCurrentUser = (id) => {
    return fetch(`http://localhost:8088/members?id=${id}`)
    .then(res => res.json())
}

export const getBookClubs = () => {
    return fetch(`http://localhost:8088/bookClubs?&_expand=book`)
    .then(res => res.json())
}

export const getClubMembers = () => {
    return fetch (`http://localhost:8088/clubMember?&_expand=member`)
    .then(res => res.json())
}

