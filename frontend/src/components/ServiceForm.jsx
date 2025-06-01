import { useState } from "react";

export default function ServiceForm({ onServiceAdded }) {
  const [form, setForm] = useState({ name: "", url: "", icon: "", tag: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8000/api/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      const updated = await fetch("http://localhost:8000/api/services").then(r => r.json());
      onServiceAdded(updated);
      setForm({ name: "", url: "", icon: "", tag: "" });
    } else {
      alert("Failed to add service");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-xl shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input className="p-2 border rounded" name="name" placeholder="Service Name" value={form.name} onChange={handleChange} required />
        <input className="p-2 border rounded" name="url" placeholder="URL" value={form.url} onChange={handleChange} required />
        <input className="p-2 border rounded" name="icon" placeholder="Icon (optional)" value={form.icon} onChange={handleChange} />
        <input className="p-2 border rounded" name="tag" placeholder="Tag" value={form.tag} onChange={handleChange} />
      </div>
      <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Add Service
      </button>
    </form>
  );
}