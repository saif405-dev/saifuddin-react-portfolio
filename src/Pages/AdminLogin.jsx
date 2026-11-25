
import React, { useState } from "react";
import { adminLogin } from "../services/adminApi";
const AdminLogin = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await adminLogin(email, password);
      onLogin(data.token);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl"
      >
        <h1 className="mb-2 text-3xl font-bold text-white">
          Admin Login
        </h1>

        <p className="mb-8 text-sm text-slate-400">
          Sign in to manage your portfolio inbox.
        </p>

        <label className="mb-2 block text-sm text-slate-300">
          Email Address
        </label>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Admin email"
          required
          className="mb-5 w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white outline-none focus:border-indigo-500"
        />

        <label className="mb-2 block text-sm text-slate-300">
          Password
        </label>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Admin password"
          required
          className="mb-5 w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white outline-none focus:border-indigo-500"
        />

        {error && (
          <p className="mb-4 text-sm text-red-400">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-indigo-600 p-3 font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
