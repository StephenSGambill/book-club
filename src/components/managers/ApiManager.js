import { getToken } from "../utils/getToken"


export const getMemberByEmail = (email) => {
    return fetch(`http://127.0.0.1:8000/members?email=${email}`, {
        headers: {
            "Authorization": `Token ${getToken()}`
        }
    })
        .then(res => res.json())
}

export const getMemberByUsername = (username) => {
    return fetch(`http://127.0.0.1:8000/members?username=${username}`, {
        headers: {
            "Authorization": `Token ${getToken()}`,
        }
    })
        .then(res => res.json())
}

export const setNewClubMember = (memberObject) => {
    return fetch("http://127.0.0.1:8000/clubMembers", {
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
    return fetch(`http://127.0.0.1:8000/members/${memberId}`, {
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
    return fetch(`http://127.0.0.1:8000/clubMembers/${clubMemberId}`,
        { method: "DELETE" })
}

export const deleteMember = (member) => {
    return fetch(`http://127.0.0.1:8000/members/${member.id}`,
        { method: "DELETE" })
}

export const getMembers = () => {
    return fetch(`http://127.0.0.1:8000/members`)
        .then(res => res.json())
}


export const getCurrentMember = (id) => {
    return fetch(`http://127.0.0.1:8000/members?id=${id}`,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${getToken()}`
            }
        })
        .then(res => res.json())
}


export const setNewBook = (bookInfo) => {
    return fetch(`http://127.0.0.1:8000/books`, {
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
    return fetch(`http://127.0.0.1:8000/books/${book.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${getToken()}`
        },
        body: JSON.stringify(book)
    })
}

export const deleteBook = (bookId) => {
    return fetch(`http://127.0.0.1:8000/books/${bookId}`,
        { method: "DELETE" })

}

export const getBookById = (id) => {
    return fetch(`http://127.0.0.1:8000/books?&id=${id}`)
        .then(res => res.json())
}

export const getBooks = () => {
    return fetch(`http://127.0.0.1:8000/books`, {
        headers: {
            "Authorization": `Token ${getToken()}`
        }
    }
    )
        .then(res => res.json())
}

export const getBookByChapter = (chapterId) => {
    return fetch(`http://127.0.0.1:8000/bookChapters?&id=${chapterId}&_expand=book`)
        .then(res => res.json())
}



export const getChaptersByBook = () => {
    return fetch(`http://127.0.0.1:8000/bookChapters`)
        .then(res => res.json())
}

export const getChaptersByBookId = (bookId) => {
    return fetch(`http://127.0.0.1:8000/bookChapters?&bookId=${bookId}`)
        .then(res => res.json())
}

export const updateBookChapterTitle = (bookChapters) => {
    bookChapters.map(chapter => {
        return fetch(`http://127.0.0.1:8000/bookChapters/${chapter.id}`, {
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
    return fetch("http://127.0.0.1:8000/bookChapters", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${getToken()}`
        },
        body: JSON.stringify(chapter),
    })

}


export const getChapterComments = (id) => {
    return fetch(`http://127.0.0.1:8000/chapterComments?&bookChapterId=${id}`)
        .then(res => res.json())
}

export const getCommentsByClub = (id) => {
    return fetch(`http://127.0.0.1:8000/books?`)
        .then(res => res.json())
}

export const deleteComment = (commentId) => {
    return fetch(`http://127.0.0.1:8000/chapterComments/${commentId}`,
        { method: "DELETE" })
}

export const setNewChapterComment = (commentInfo) => {
    return fetch(`http://127.0.0.1:8000/chapterComments`, {
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
    return fetch(`http://127.0.0.1:8000/clubs/${clubInfo.id}`, {
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
    return fetch(`http://127.0.0.1:8000/clubs`, {
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
    return fetch(`http://127.0.0.1:8000/clubs/${clubId}`,
        { method: "DELETE" })

}


export const getClubs = () => {
    return fetch(`http://127.0.0.1:8000/clubs?&_expand=book`)
        .then(res => res.json())
}

export const getClubMembers = () => {
    return fetch(`http://127.0.0.1:8000/clubMembers?&_expand=member`)
        .then(res => res.json())
}


export const getClubMembersAndClub = () => {
    return fetch(`http://127.0.0.1:8000/clubMembers?&_expand=club`)
        .then(res => res.json())
}

export const getClubMemberById = (id) => {
    return fetch(`http://127.0.0.1:8000/clubMembers?&_expand=club&memberId=${id}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${getToken()}`
        }
    })
        .then(res => res.json());
};



export const getBookClubById = (id) => {
    return fetch(`http://127.0.0.1:8000/clubs?&id=${id}`)
        .then(res => res.json())
}


export const getClubById = (id) => {
    return fetch(`http://127.0.0.1:8000/clubs?&id=${id}`)
        .then(res => res.json())
}


// ************DIGITAL OCEAN CODE BELOW****************
//****************SETTERS****************

// export const setNewMember = (member) => {
//     return fetch("https://the-book-club-hl8o3.ondigitalocean.app/members", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(member)
//     })
//         .then(res => res.json())
// }

// export const setNewClubMember = (memberObject) => {
//     return fetch("https://the-book-club-hl8o3.ondigitalocean.app/clubMembers", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(memberObject)
//     })
//         .then(res => res.json())
// }

// export const setNewChapterComment = (commentInfo) => {
//     return fetch(`https://the-book-club-hl8o3.ondigitalocean.app/chapterComments`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },

//         body: JSON.stringify(commentInfo)
//     })
//         .then(response => response.json())
// }

// export const setNewBook = (bookInfo) => {
//     return fetch(`https://the-book-club-hl8o3.ondigitalocean.app/books`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },

//         body: JSON.stringify(bookInfo)
//     })
//         .then(response => response.json())
// }

// export const updateMemberInfo = (memberId, memberInfo) => {
//     return fetch(`https://the-book-club-hl8o3.ondigitalocean.app/members/${memberId}`, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json"
//         },

//         body: JSON.stringify(memberInfo)
//     })
//         .then(response => response.json())
// }

// export const updateClubInfo = (clubInfo) => {
//     return fetch(`https://the-book-club-hl8o3.ondigitalocean.app/clubs/${clubInfo.id}`, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json"
//         },

//         body: JSON.stringify(clubInfo)
//     })
//         .then(response => response.json())
// }

// export const setNewClub = (clubInfo) => {
//     return fetch(`https://the-book-club-hl8o3.ondigitalocean.app/clubs`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },

//         body: JSON.stringify(clubInfo)
//     })
//         .then(response => response.json())
// }

// export const updateBookChapterTitle = (bookChapters) => {
//     bookChapters.map(chapter => {
//         return fetch(`https://the-book-club-hl8o3.ondigitalocean.app/bookChapters/${chapter.id}`, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(chapter)
//         })
//     }
//     )
// }

// export const createBookChapters = (chapter) => {
//     return fetch("https://the-book-club-hl8o3.ondigitalocean.app/bookChapters", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(chapter),
//     })

// }

// export const updateBookInfo = (book) => {
//     return fetch(`https://the-book-club-hl8o3.ondigitalocean.app/books/${book.id}`, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(book)
//     })
// }

// export const deleteBook = (bookId) => {
//     return fetch(`https://the-book-club-hl8o3.ondigitalocean.app/books/${bookId}`,
//         { method: "DELETE" })

// }

// export const deleteClub = (clubId) => {
//     return fetch(`https://the-book-club-hl8o3.ondigitalocean.app/clubs/${clubId}`,
//         { method: "DELETE" })

// }

// export const deleteClubMember = (clubMemberId) => {
//     return fetch(`https://the-book-club-hl8o3.ondigitalocean.app/clubMembers/${clubMemberId}`,
//         { method: "DELETE" })
// }

// export const deleteMember = (member) => {
//     return fetch(`https://the-book-club-hl8o3.ondigitalocean.app/members/${member.id}`,
//         { method: "DELETE" })
// }
// export const deleteComment = (commentId) => {
//     return fetch(`https://the-book-club-hl8o3.ondigitalocean.app/chapterComments/${commentId}`,
//         { method: "DELETE" })
// }


// //****************GETTERS****************
// export const getBooks = () => {
//     return fetch(`https://the-book-club-hl8o3.ondigitalocean.app/books`)
//         .then(res => res.json())
// }


// export const getMembers = () => {
//     return fetch(`https://the-book-club-hl8o3.ondigitalocean.app/members`)
//         .then(res => res.json())
// }


// export const getCurrentMember = (id) => {
//     return fetch(`https://the-book-club-hl8o3.ondigitalocean.app/members?id=${id}`)
//         .then(res => res.json())
// }

// export const getClubs = () => {
//     return fetch(`https://the-book-club-hl8o3.ondigitalocean.app/clubs?&_expand=book`)
//         .then(res => res.json())
// }

// export const getClubMembers = () => {
//     return fetch(`https://the-book-club-hl8o3.ondigitalocean.app/clubMembers?&_expand=member`)
//         .then(res => res.json())
// }


// export const getClubMembersAndClub = () => {
//     return fetch(`https://the-book-club-hl8o3.ondigitalocean.app/clubMembers?&_expand=club`)
//         .then(res => res.json())
// }

// export const getClubMemberById = (id) => {
//     return fetch(`https://the-book-club-hl8o3.ondigitalocean.app/clubMembers?&_expand=club&memberId=${id}`)
//         .then(res => res.json())
// }

// export const getBookClubById = (id) => {
//     return fetch(`https://the-book-club-hl8o3.ondigitalocean.app/clubs?&id=${id}`)
//         .then(res => res.json())
// }

// export const getBookById = (id) => {
//     return fetch(`https://the-book-club-hl8o3.ondigitalocean.app/books?&id=${id}`)
//         .then(res => res.json())
// }

// export const getCommentsByClub = (id) => {
//     return fetch(`https://the-book-club-hl8o3.ondigitalocean.app/books?`)
//         .then(res => res.json())
// }

// export const getChaptersByBook = () => {
//     return fetch(`https://the-book-club-hl8o3.ondigitalocean.app/bookChapters`)
//         .then(res => res.json())
// }

// export const getChaptersByBookId = (bookId) => {
//     return fetch(`https://the-book-club-hl8o3.ondigitalocean.app/bookChapters?&bookId=${bookId}`)
//         .then(res => res.json())
// }


// export const getChapterComments = (id) => {
//     return fetch(`https://the-book-club-hl8o3.ondigitalocean.app/chapterComments?&bookChapterId=${id}`)
//         .then(res => res.json())
// }

// export const getBookByChapter = (chapterId) => {
//     return fetch(`https://the-book-club-hl8o3.ondigitalocean.app/bookChapters?&id=${chapterId}&_expand=book`)
//         .then(res => res.json())
// }

// export const getClubById = (id) => {
//     return fetch(`https://the-book-club-hl8o3.ondigitalocean.app/clubs?&id=${id}`)
//         .then(res => res.json())
// }


// export const getMemberByEmail = (email) => {
//     return fetch(`https://the-book-club-hl8o3.ondigitalocean.app/members?email=${email}`)
//         .then(res => res.json())
// }





