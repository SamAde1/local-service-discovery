export default function ServiceCard({ service }) {
  return (
    <div className="border p-4 rounded-xl shadow bg-white dark:bg-gray-800">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{service.name}</h2>
        <span className={`text-sm font-bold ${service.healthy ? "text-green-600" : "text-red-600"}`}>
          {service.healthy ? "Online" : "Offline"}
        </span>
      </div>
      <p className="text-gray-600 dark:text-gray-300">{service.url}</p>
      <p className="text-xs text-gray-400">{service.tag}</p>
    </div>
  );
}