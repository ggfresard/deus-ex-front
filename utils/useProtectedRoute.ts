import { useRouter } from "next/router"
import { useAuth } from "providers/AuthProvider"
import { useEffect } from "react"

const useProtectedRoute = () => {
    const { isAuthenticated, isLoading } = useAuth()
    const router = useRouter()
    useEffect(() => {
        !isLoading && !isAuthenticated && router.push('/login')
    }, [isAuthenticated, isLoading])
    useEffect(() => {
        !isLoading && !isAuthenticated && router.push('/login')
    }, [])
}

export default useProtectedRoute