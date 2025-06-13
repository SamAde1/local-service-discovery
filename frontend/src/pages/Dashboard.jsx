import { useEffect, useState } from "react";
import ServiceCard from "../components/ServiceCard";
import ServiceForm from "../components/ServiceForm";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { token } = useAuth();
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/services", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(setServices)
      .catch(console.error);
  }, [token]);

  return (
    <div>
      <h1 className="text-2xl">Service List</h1>
      <ul>
        {services.map(svc => <li key={svc.id}>{svc.name}</li>)}
      </ul>
    </div>
  );
}