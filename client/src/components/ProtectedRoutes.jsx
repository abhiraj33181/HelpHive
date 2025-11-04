import { useContext } from "react"
import { AdminContext } from "../context/AdminContext"
import { Navigate } from "react-router-dom"

const ProtectedRoutes = ({children}) => {
    const {aToken} = useContext(AdminContext)

    if (!aToken){
        return <Navigate to='/admin' replace/>
    }

    return children;
}

export default ProtectedRoutes;