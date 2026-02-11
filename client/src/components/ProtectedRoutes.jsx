import { useContext, useEffect } from "react";
import { ProviderContext } from "../context/ProviderContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { pToken, loading } = useContext(ProviderContext);

  if (loading) {
    return <div className="h-screen flex justify-center items-center text-xl">
      Checking Login...
    </div>;
  }

  return pToken ? <Outlet /> : <Navigate to="/auth/login" replace />;
};

export default ProtectedRoute;
