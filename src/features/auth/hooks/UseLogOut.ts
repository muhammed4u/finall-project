"use client"
import { useDispatch } from "react-redux";
import { setAuthInfo } from "../store/auth.slice";
import { clearToken } from "../server/Token.action";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function useLogout() {
    const router = useRouter()
    const dispatch = useDispatch()

    const logout = async () => {
        await clearToken()
        dispatch(setAuthInfo({ isAuthenticated: false, userInfo: null }))
        toast.success("Logged out successfully")
        router.push('/login')
        router.refresh()
    }

    return { logout }
}

