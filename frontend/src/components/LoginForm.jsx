import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

export default function LoginForm() {
    const { login } = useAuth();
    const navigate = useNavigate();
    // Make form reactive when user is typing in username or password
    const [form, setForm] = useState({ username: "", password: ""})
    const [error, setError] = useState("");

    // Sync input fields with state
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    //Log into backend
    const handleSubmit = async (e) => {
        e.preventDefault();     //Prevent form from reloading the page
        setError("");

        const res = await fetch("http://localhost:8000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"  
            },
            body: new URLSearchParams(form), //Convert object to FastAPI OAuth2PasswordRequestForm format
        });

        if (res.ok) {
            const data = await res.json();
            login(data.access_token);
            navigate("/dashboard");
        } else {
            setError("Invalid username or password");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Login</h2>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <input name="username" value={form.username} onChange={handleChange} className="block w-full p-2 my-2 border rounded" placeholder="Username" />
            <input type="password" name="password" value={form.password} onChange={handleChange} className="block w-full p-2 my-2 border rounded" placeholder="Password" />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Login</button>
        </form>
    );

}