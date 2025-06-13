import { useState } from "react";

export default function RegisterForm() {
    const [form, setForm] = useState({ username: "", password: "" });
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const res = await fetch("http://localhost:8000/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        if (res.ok) {
            setSuccess(true);
        } else {
            setError("Username may already exist.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Register</h2>
            {success && <p className="text-green-600">Registered! Please log in.</p>}
            {error && <p className="text-red-600">{error}</p>}
            <input name="username" value={form.username} onChange={handleChange} className="block w-full p-2 my-2 border rounded" placeholder="Username" />
            <input type="password" name="password" value={form.password} onChange={handleChange} className="block w-full p-2 my-2 border rounded" placeholder="Password" />
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Register</button>
        </form>
    );
}
