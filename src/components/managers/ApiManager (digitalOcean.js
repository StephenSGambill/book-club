//****************SETTERS****************

export const setNewMember = (member) => {
    return fetch("https://the-book-club-hl8o3.ondigitalocean.app/members", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(member)
    })
        .then(res => res.json())
}

export const setNewClubMember = (memberObject) => {
    return fetch("https://the-book-club-hl8o3.ondigitalocean.app/clubMembers", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(memberObject)
    })
        .then(res => res.json())
}

export const setNewChapterComment = (commentInfo) => {
    return fetch(`https://the-book-club-hl8o3.ondigitalocean.app/chapterComments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(commentInfo)
    })
        .then(response => response.json())
}

export const setNewBook = (bookInfo) => {
    return fetch(`https://the-book-club-hl8o3.ondigitalocean.app/books`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(bookInfo)
    })
        .then(response => response.json())
}

export const updateMemberInfo = (memberId, memberInfo) => {
    return fetch(`https://the-book-club-hl8o3.ondigitalocean.app/members/${memberId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(memberInfo)
    })
        .then(response => response.json())
}

export const updateClubInfo = (clubInfo) => {
    return fetch(`https://the-book-club-hl8o3.ondigitalocean.app/clubs/${clubInfo.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(clubInfo)
    })
        .then(response => response.json())
}

export const setNewClub = (clubInfo) => {
    return fetch(`https://the-book-club-hl8o3.ondigitalocean.app/clubs`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(clubInfo)
    })
        .then(response => response.json())
}

export const updateBookChapterTitle = (bookChapters) => {
    bookChapters.map(chapter => {
        return fetch(`https://the-book-club-hl8o3.ondigitalocean.app/bookChapters/${chapter.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(chapter)
        })
    }
    )
}

export const createBookChapters = (chapter) => {
    return fetch("https://the-book-club-hl8o3.ondigitalocean.app/bookChapters", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(chapter),
    })

}

export const updateBookInfo = (book) => {
    return fetch(`https://the-book-club-hl8o3.ondigitalocean.app/books/${book.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(book)
    })
}

export const deleteBook = (bookId) => {
    return fetch(`https://the-book-club-hl8o3.ondigitalocean.app/books/${bookId}`,
        { method: "DELETE" })

}

export const deleteClub = (clubId) => {
    return fetch(`https://the-book-club-hl8o3.ondigitalocean.app/clubs/${clubId}`,
        { method: "DELETE" })

}

export const deleteClubMember = (clubMemberId) => {
    return fetch(`https://the-book-club-hl8o3.ondigitalocean.app/clubMembers/${clubMemberId}`,
        { method: "DELETE" })
}

export const deleteMember = (member) => {
    return fetch(`https://the-book-club-hl8o3.ondigitalocean.app/members/${member.id}`,
        { method: "DELETE" })
}
export const deleteComment = (commentId) => {
    return fetch(`https://the-book-club-hl8o3.ondigitalocean.app/chapterComments/${commentId}`,
        { method: "DELETE" })
}


//****************GETTERS****************
export const getBooks = () => {
    return fetch(`https://the-book-club-hl8o3.ondigitalocean.app/books`)
        .then(res => res.json())
}


export const getMembers = () => {
    return fetch(`https://the-book-club-hl8o3.ondigitalocean.app/members`)
        .then(res => res.json())
}


export const getCurrentUser = (id) => {
    return fetch(`https://the-book-club-hl8o3.ondigitalocean.app/members?id=${id}`)
        .then(res => res.json())
}

export const getClubs = () => {
    return fetch(`https://the-book-club-hl8o3.ondigitalocean.app/clubs?&_expand=book`)
        .then(res => res.json())
}

export const getClubMembers = () => {
    return fetch(`https://the-book-club-hl8o3.ondigitalocean.app/clubMembers?&_expand=member`)
        .then(res => res.json())
}


export const getClubMembersAndClub = () => {
    return fetch(`https://the-book-club-hl8o3.ondigitalocean.app/clubMembers?&_expand=club`)
        .then(res => res.json())
}

export const getClubMemberById = (id) => {
    return fetch(`https://the-book-club-hl8o3.ondigitalocean.app/clubMembers?&_expand=club&memberId=${id}`)
        .then(res => res.json())
}

export const getBookClubById = (id) => {
    return fetch(`https://the-book-club-hl8o3.ondigitalocean.app/clubs?&id=${id}`)
        .then(res => res.json())
}

export const getBookById = (id) => {
    return fetch(`https://the-book-club-hl8o3.ondigitalocean.app/books?&id=${id}`)
        .then(res => res.json())
}

export const getCommentsByClub = (id) => {
    return fetch(`https://the-book-club-hl8o3.ondigitalocean.app/books?`)
        .then(res => res.json())
}

export const getChaptersByBook = () => {
    return fetch(`https://the-book-club-hl8o3.ondigitalocean.app/bookChapters`)
        .then(res => res.json())
}

export const getChaptersByBookId = (bookId) => {
    return fetch(`https://the-book-club-hl8o3.ondigitalocean.app/bookChapters?&bookId=${bookId}`)
        .then(res => res.json())
}


export const getChapterComments = (id) => {
    return fetch(`https://the-book-club-hl8o3.ondigitalocean.app/chapterComments?&bookChapterId=${id}`)
        .then(res => res.json())
}

export const getBookByChapter = (chapterId) => {
    return fetch(`https://the-book-club-hl8o3.ondigitalocean.app/bookChapters?&id=${chapterId}&_expand=book`)
        .then(res => res.json())
}

export const getClubById = (id) => {
    return fetch(`https://the-book-club-hl8o3.ondigitalocean.app/clubs?&id=${id}`)
        .then(res => res.json())
}


export const getMemberByEmail = (email) => {
    return fetch(`https://the-book-club-hl8o3.ondigitalocean.app/members?email=${email}`)
        .then(res => res.json())
}

