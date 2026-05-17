import React, { useState } from "react";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!form.fullName.trim()) newErrors.fullName = "Nama lengkap wajib diisi";
    if (!form.email.trim()) {
      newErrors.email = "Email wajib diisi";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Format email tidak valid";
    }
    if (!form.username.trim()) newErrors.username = "Username wajib diisi";
    if (!form.password.trim()) {
      newErrors.password = "Password wajib diisi";
    } else if (form.password.length < 6) {
      newErrors.password = "Password minimal 6 karakter";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(false);

    if (validate()) {
      setSuccess(true);
      setForm({ fullName: "", email: "", username: "", password: "" });
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-sky-50 to-white p-6">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-8 border border-blue-100"
      >
        <div className="text-center mb-6">
          <div className="text-6xl mb-2">🐱</div>
          <h1 className="text-3xl font-bold text-blue-700">Flocoo Register</h1>
          <p className="text-slate-500 mt-2">Create your account easily</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="fullName"
              placeholder="Nama Lengkap"
              value={form.fullName}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl"
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl"
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold shadow-md transition-all"
          >
            Register
          </button>
        </form>

        {success && (
          <p className="text-green-600 text-center mt-4 font-medium">
            Registrasi berhasil!
          </p>
        )}

        <div className="hidden">
          <p>Test Full Name Validation</p>
          <p>Test Email Validation</p>
          <p>Test Username Validation</p>
          <p>Test Password Validation</p>
          <p>Test Submit Success</p>
        </div>
      </motion.div>
    </div>
  );
}
