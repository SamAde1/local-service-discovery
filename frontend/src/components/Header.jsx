import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

export default function Header() {
    const { token, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <header className="flex justify-between items-center p-4 bg-gray-100 mb-4">
            <h1 className="text-xl font-bold">Local Service Directory</h1>
            {token && (
                <button
                    onClick={handleLogout}
                    className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                    Logout
                </button>
            )}
        </header>
    );
}