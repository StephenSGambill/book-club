//****************SETTERS****************

export const setNewMember = (member) => {
    return fetch("http://localhost:8088/members", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(member)
    })
        .then(res => res.json())
}

export const setNewClubMember = (memberObject) => {
    return fetch("http://localhost:8088/clubMembers", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(memberObject)
    })
        .then(res => res.json())
}

export const setNewChapterComment = (commentInfo) => {
    return fetch(`http://localhost:8088/chapterComments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(commentInfo)
    })
        .then(response => response.json())
}

export const setNewBook = (bookInfo) => {
    return fetch(`http://localhost:8088/books`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(bookInfo)
    })
        .then(response => response.json())
}

export const updateMemberInfo = (memberId, memberInfo) => {
    return fetch(`http://localhost:8088/members/${memberId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(memberInfo)
    })
        .then(response => response.json())
}

export const setNewClub = (clubInfo) => {
    return fetch(`http://localhost:8088/clubs`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(clubInfo)
    })
        .then(response => response.json())
}

export const deleteBook = (bookId) => {
    return fetch(`http://localhost:8088/books/${bookId}`,
        { method: "DELETE" })
        .then(() => {
            fetch(`http://localhost:8088/bookChapters/&bookId=${bookId}`,
                { method: "DELETE" })
        })
}

export const deleteClub = (clubId) => {
    return fetch(`http://localhost:8088/clubs/${clubId}`,
        { method: "DELETE" })

}


//****************GETTERS****************
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

export const getClubs = () => {
    return fetch(`http://localhost:8088/clubs?&_expand=book`)
        .then(res => res.json())
}

export const getClubMembers = () => {
    return fetch(`http://localhost:8088/clubMembers?&_expand=member`)
        .then(res => res.json())
}


export const getClubMembersAndClub = () => {
    return fetch(`http://localhost:8088/clubMembers?&_expand=club`)
        .then(res => res.json())
}

export const getClubMemberById = (id) => {
    return fetch(`http://localhost:8088/clubMembers?&_expand=club&memberId=${id}`)
        .then(res => res.json())
}

export const getBookClubById = (id) => {
    return fetch(`http://localhost:8088/clubs?&id=${id}`)
        .then(res => res.json())
}

export const getBookById = (id) => {
    return fetch(`http://localhost:8088/books?&id=${id}`)
        .then(res => res.json())
}

export const getCommentsByClub = (id) => {
    return fetch(`http://localhost:8088/books?`)
        .then(res => res.json())
}

export const getChaptersByBook = () => {
    return fetch(`http://localhost:8088/bookChapters`)
        .then(res => res.json())
}

export const getChapterComments = (id) => {
    return fetch(`http://localhost:8088/chapterComments?&bookChapterId=${id}`)
        .then(res => res.json())
}

export const getBookByChapter = (chapterId) => {
    return fetch(`http://localhost:8088/bookChapters?&id=${chapterId}&_expand=book`)
        .then(res => res.json())
}

export const getClubById = (id) => {
    return fetch(`http://localhost:8088/clubs?&id=${id}`)
        .then(res => res.json())
}


export const getMemberByEmail = (email) => {
    return fetch(`http://localhost:8088/members?email=${email}`)
        .then(res => res.json())
}

