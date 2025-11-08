import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { ProviderContext } from "../context/ProviderContext";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children, role }) => {
    const { aToken } = useContext(AdminContext);
    const { pToken } = useContext(ProviderContext);

    if (role === "admin" && !aToken) {
        return <Navigate to="/admin" replace />;
    }

    if (role === "provider" && !pToken) {
        return <Navigate to="/provider" replace />;
    }

    return children;
};

export default ProtectedRoutes;
