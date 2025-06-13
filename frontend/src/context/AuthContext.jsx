import { createContext, useState, useContext } from "react";

const AuthContext = createContext();
// Wrap the app in auth provider component to hold auth state
export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem("token"))
    const [user, setUser] = useState(null);

    const login = (jwt) => {
        localStorage.setItem("token", jwt);
        setToken(jwt);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ token, login, logout, user, setUser}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}


