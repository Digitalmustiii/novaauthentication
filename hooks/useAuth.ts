// hooks/useAuth.ts
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type User = { id: string; name: string; email: string };

export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // fetch current user on mount
  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => setUser(data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  async function signin(email: string, password: string) {
    setError(null);
    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.message || "Signin failed");
      throw new Error(data.message);
    }
    setUser(data.user);
    router.push("/dashboard"); // or wherever
  }

  async function signup(name: string, email: string, password: string) {
    setError(null);
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.message || "Signup failed");
      throw new Error(data.message);
    }
    setUser(data.user);
    router.push("/dashboard");
  }

  async function signout() {
    await fetch("/api/auth/signout", { method: "POST" });
    setUser(null);
    router.push("/");
  }

  return { user, loading, error, signin, signup, signout };
}
