"use client";

import { useState, useEffect } from "react";
import { loginUser } from "@/lib/api";
import { normalizeData } from "@/lib/normalize";
import { useAppStore } from "@/store/useAppStore";
import {
  saveSession,
  saveData,
  getSession,
  getData,
} from "@/lib/storage";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const {
    setData,
    setSession,
    setCredentials,
    setLoading,
    setError,
    loading,
    error,
  } = useAppStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const savedData = getData();
    const session = getSession();

    if (savedData && session) {
      setData(savedData);
      setSession(session);

      setTimeout(() => {
        router.replace("/dashboard");
      }, 100);
    } else {
      setChecking(false);
    }
  }, [setData, setSession, router]);

  const handleLogin = async () => {
    if (!email?.trim() || !password?.trim()) {
      setError("Please enter email and password");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const session = getSession() || {};

      const raw = await loginUser(email.trim(), password, session);

      if (!raw || raw.status !== "success") {
        throw new Error("Authentication failed");
      }

      const normalized = normalizeData(raw);

      setData(normalized);
      setSession(raw.session_data || {});
      setCredentials({ email: email.trim(), password });

      saveSession(raw.session_data || {});
      saveData(normalized);

      router.replace("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !loading) {
      handleLogin();
    }
  };

  if (checking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Checking session...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md space-y-4">

        <h1 className="text-2xl md:text-3xl font-bold text-center">
          Student Portal
        </h1>

        <input
          className="border p-2 w-full rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError(null);
          }}
          onKeyDown={handleKeyDown}
        />

        <input
          className="border p-2 w-full rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (error) setError(null);
          }}
          onKeyDown={handleKeyDown}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="bg-blue-500 text-white py-2 rounded w-full disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && (
          <p className="text-red-500 text-sm text-center">
            {error}
          </p>
        )}

      </div>

    </div>
  );
}