import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { ProviderContext } from "../context/ProviderContext";
import { AppContext } from "../context/AppContext";

const ProtectedRoutes = ({ role, children }) => {

    const { aToken } = useContext(AdminContext);
    const { pToken } = useContext(ProviderContext);
    const { token } = useContext(AppContext);

    const roleTokens = {
        admin: aToken,
        provider: pToken,
        user: token,
    };

    const loginRoutes = {
        admin: "/admin",
        provider: "/provider",
        user: "/auth/login",
    };

    const isAuthenticated = roleTokens[role];

    if (!isAuthenticated) {
        return <Navigate to={loginRoutes[role]} replace />;
    }

    return children;
};

export default ProtectedRoutes;
