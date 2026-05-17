import React, { useState, createContext, useContext } from "react";
import { motion } from "framer-motion";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [role, setRole] = useState(localStorage.getItem("role") || "user");

  const loginAs = (newRole) => {
    localStorage.setItem("role", newRole);
    setRole(newRole);
  };

  return (
    <AuthContext.Provider value={{ role, loginAs }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

function ProtectedRoute({ children, allowedRole }) {
  const { role } = useAuth();
  return role === allowedRole ? children : <Navigate to="/" replace />;
}

function Home() {
  const { role, loginAs } = useAuth();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-sky-50 to-white p-6"
    >
      <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-[32px] p-8 w-full max-w-lg text-center border border-blue-100">
        <div className="text-7xl mb-3 animate-bounce">🐱</div>
        <h1 className="text-3xl font-bold text-blue-700">Flocoo App</h1>
        <p className="text-slate-500 mt-2">Smart access management for admin & users</p>

        <p className="mt-4 font-medium">Current Role: {role}</p>

        <div className="flex gap-3 mt-4 justify-center">
          <button
            onClick={() => loginAs("user")}
            className="bg-slate-200 px-4 py-2 rounded-xl"
          >
            Login User
          </button>
          <button
            onClick={() => loginAs("admin")}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl"
          >
            Login Admin
          </button>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <Link to="/profile" className="bg-blue-50 hover:bg-blue-100 transition-all text-blue-700 font-semibold py-3 rounded-2xl shadow-sm">
            Profile
          </Link>
          <Link to="/admin" className="bg-blue-50 hover:bg-blue-100 transition-all text-blue-700 font-semibold py-3 rounded-2xl shadow-sm">
            Admin Dashboard
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

function Profile() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 to-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white shadow-2xl p-10 rounded-[32px] text-center max-w-md border border-blue-100"
      >
        <div className="text-6xl mb-3">👤</div>
        <h2 className="text-3xl font-bold text-blue-700">User Profile</h2>
        <p className="text-slate-500 mt-2">Accessible by all users</p>
        <Link to="/" className="bg-blue-600 text-white px-5 py-3 rounded-2xl inline-block mt-5 shadow-md">
          Back Home
        </Link>
      </motion.div>
    </div>
  );
}

function AdminDashboard() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-2xl p-10 rounded-[32px] text-center max-w-md border border-blue-100"
      >
        <div className="text-6xl mb-3">🛡️</div>
        <h2 className="text-3xl font-bold text-blue-700">Admin Dashboard</h2>
        <p className="text-slate-500 mt-2">Only admin can access this page</p>
        <Link to="/" className="bg-blue-600 text-white px-5 py-3 rounded-2xl inline-block mt-5 shadow-md">
          Back Home
        </Link>
      </motion.div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
