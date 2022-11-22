import jwtDecode from "jwt-decode";

export default function getUserId(){
    const access = localStorage.getItem("accessToken")
    const decoded = jwtDecode(access)
    return decoded.user_id
}