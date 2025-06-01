import { useEffect, useState } from "react";
import ServiceCard from "../components/ServiceCard";
import ServiceForm from "../components/ServiceForm";

export default function Dashboard() {
  const [services, setServices] = useState([]);

  // Fetch services from API on page load
  useEffect(() => {
    fetch("http://localhost:8000/api/services")
      .then((res) => res.json())
      .then(setServices)
      .catch(console.error);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Local Service Discovery</h1>

      <ServiceForm onServiceAdded={setServices} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        {services.map((svc) => (
          <ServiceCard key={svc.id} service={svc} />
        ))}
      </div>
    </div>
  );
}