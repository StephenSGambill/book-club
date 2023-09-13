import { getToken } from "../utils/getToken"



export const getCurrentMember = (id) => {
    return fetch(`http://localhost:8080/members/${id}`)
        .then(res => res.json())

}

export const getMemberByEmail = (email) => {
    return fetch(`http://localhost:8080/members?email=${email}`)
        .then(res => res.json())
}

export const getMemberByUsername = (username) => {
    return fetch(`http://localhost:8080/members?username=${username}`, {
        headers: {
            "Authorization": `Token ${getToken()}`,
        }
    })
        .then(res => res.json())
}



export const setNewClubMember = (memberObject) => {
    return fetch("http://localhost:8080/clubMembers", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${getToken()}`
        },
        body: JSON.stringify(memberObject)
    })
        .then(res => res.json())
}

export const updateMemberInfo = (memberId, memberInfo) => {
    return fetch(`http://localhost:8080/members/${memberId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${getToken()}`
        },

        body: JSON.stringify(memberInfo)
    })
    // .then(res => res.json(memberInfo))
}

export const deleteClubMember = (clubMemberId) => {
    return fetch(`http://localhost:8080/clubMembers/${clubMemberId}`,
        { method: "DELETE" })
}

export const deleteMember = (member) => {
    return fetch(`http://localhost:8080/members/${member.id}`,
        { method: "DELETE" })
}

export const getMembers = () => {
    return fetch(`http://localhost:8080/members`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${getToken()}`
        }
    })
        .then(res => res.json())
}




export const setNewBook = (bookInfo) => {
    return fetch(`http://localhost:8080/books`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${getToken()}`
        },

        body: JSON.stringify(bookInfo)
    })
        .then(res => res.json())
}


export const updateBookInfo = (book) => {
    return fetch(`http://localhost:8080/books/${book.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${getToken()}`
        },
        body: JSON.stringify(book)
    })
}

export const deleteBook = (bookId) => {
    return fetch(`http://localhost:8080/books/${bookId}`,
        { method: "DELETE" })

}

export const getBookById = (id) => {
    return fetch(`http://localhost:8080/books?&id=${id}`)
        .then(res => res.json())
}

export const getBooks = () => {
    return fetch(`http://localhost:8080/books`, {
        headers: {
            "Authorization": `Token ${getToken()}`
        }
    }
    )
        .then(res => res.json())
}

export const getBookByChapter = (chapterId) => {
    return fetch(`http://localhost:8080/bookChapters?&id=${chapterId}&_expand=book`)
        .then(res => res.json())
}



export const getChaptersByBook = () => {
    return fetch(`http://localhost:8080/bookChapters`)
        .then(res => res.json())
}

export const getChaptersByBookId = (bookId) => {
    return fetch(`http://localhost:8080/bookChapters?&bookId=${bookId}`)
        .then(res => res.json())
}

export const updateBookChapterTitle = (bookChapters) => {
    bookChapters.map(chapter => {
        return fetch(`http://localhost:8080/bookChapters/${chapter.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${getToken()}`
            },
            body: JSON.stringify(chapter)
        })
    }
    )
}

export const createBookChapters = (chapter) => {
    return fetch("http://localhost:8080/bookChapters", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${getToken()}`
        },
        body: JSON.stringify(chapter),
    })

}


export const getChapterComments = (id) => {
    return fetch(`http://localhost:8080/chapterComments?&bookChapterId=${id}`)
        .then(res => res.json())
}

export const getCommentsByClub = (id) => {
    return fetch(`http://localhost:8080/books?`)
        .then(res => res.json())
}

export const deleteComment = (commentId) => {
    return fetch(`http://localhost:8080/chapterComments/${commentId}`,
        { method: "DELETE" })
}

export const setNewChapterComment = (commentInfo) => {
    return fetch(`http://localhost:8080/chapterComments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${getToken()}`
        },

        body: JSON.stringify(commentInfo)
    })
        .then(res => res.json())
}

export const updateClubInfo = (clubInfo) => {
    return fetch(`http://localhost:8080/clubs/${clubInfo.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${getToken()}`
        },

        body: JSON.stringify(clubInfo)
    })
        .then(res => res.json())
}

export const setNewClub = (clubInfo) => {
    return fetch(`http://localhost:8080/clubs`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${getToken()}`
        },

        body: JSON.stringify(clubInfo)
    })
        .then(res => res.json())
}


export const deleteClub = (clubId) => {
    return fetch(`http://localhost:8080/clubs/${clubId}`,
        { method: "DELETE" })

}


export const getClubs = () => {
    return fetch(`http://localhost:8080/clubs?&_expand=book`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${getToken()}`
        }
    })
        .then(res => res.json())
}

export const getClubMembers = () => {
    return fetch(`http://localhost:8080/clubMembers?&_expand=member`)
        .then(res => res.json())
}


export const getClubMembersAndClub = () => {
    return fetch(`http://localhost:8080/clubMembers?&_expand=club`)
        .then(res => res.json())
}

export const getClubMemberById = (id) => {
    return fetch(`http://localhost:8080/clubMembers?&_expand=club&memberId=${id}`)
        .then(res => res.json());
};



export const getBookClubById = (id) => {
    return fetch(`http://localhost:8080/clubs?&id=${id}`)
        .then(res => res.json())
}


export const getClubById = (id) => {
    return fetch(`http://localhost:8080/clubs?&id=${id}`)
        .then(res => res.json())
}


