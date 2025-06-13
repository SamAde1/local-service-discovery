import { BrowserRouter as Router, Routes, Route } from "react-router";
import './App.css'
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header /> {/* Optional: only show if token exists */}
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<p className="p-4">Page not found</p>} />
        </Routes>
      </div>
    </Router>
  );
}


