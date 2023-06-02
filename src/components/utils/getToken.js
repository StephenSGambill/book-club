export const getToken = () => {
    const bookclub_member = localStorage.getItem("bookclub_member")
    const userObject = JSON.parse(bookclub_member)
    return userObject.token
}
