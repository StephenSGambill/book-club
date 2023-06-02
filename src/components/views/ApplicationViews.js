import { AdminView } from "./AdminView"
import { MemberView } from "./MemberView"


export const ApplicationViews = () => {

	const localUser = localStorage.getItem("bookclub_member")
	const userObject = JSON.parse(localUser)

	if (userObject.is_staff) {
		return <AdminView />

	} else {
		return <MemberView />

	}


}

