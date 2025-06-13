import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router";

//Check if a token exists before rendering the page
export default function ProtectedRoute({ children }) {
    const { token } = useAuth();
    return token ? children : <Navigate to="/login" />;
}