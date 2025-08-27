"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { regisProcess } from "@/services/auth";
 
export default function RegisterPage() {
    const router = useRouter();
    const [form, setForm] = useState({ username: "", email: "", password: "" });
    const [errors, setErrors] = useState<{ username?: string; email?: string; password?: string }>({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const validate = () => {
        const newErrors: { username?: string; email?: string; password?: string } = {};
        if (!form.username) newErrors.username = "Username is required";
        if (!form.email) newErrors.email = "Email is required";
        else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) newErrors.email = "Invalid email format";
        if (!form.password) newErrors.password = "Password is required";
        else if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!validate()) return;
  setLoading(true);

  try {
    const { success, message } = await regisProcess(
      form.email,
      form.username,
      form.password
    );

    if (success) {
      router.push("/login");
    } else {
      setErrors({ password: message || "Registration failed" });
    }
  } catch (error: any) { 
    const backendMessage =
      error.response?.data?.message || "Registration failed";
    setErrors({ password: backendMessage });
  } finally {
    setLoading(false);
  }
};


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Card className="w-full max-w-md shadow-lg rounded-2xl">
                <CardContent className="p-6">
                    <h1 className="text-2xl font-bold text-center mb-6">Register</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium">Username</label>
                            <input
                                type="text"
                                name="username"
                                value={form.username}
                                onChange={handleChange}
                                className={`mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring ${errors.username ? "border-red-500 focus:ring-red-300" : "focus:ring-blue-300"}`}
                            />
                            {errors.username && (
                                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                className={`mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring ${errors.email ? "border-red-500 focus:ring-red-300" : "focus:ring-blue-300"}`}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                className={`mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring ${errors.password ? "border-red-500 focus:ring-red-300" : "focus:ring-blue-300"}`}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                            )}
                        </div>
                        <Button
                            type="submit"
                            className="w-full rounded-xl py-2"
                            disabled={loading}
                        >
                            {loading ? "Loading..." : "Register"}
                        </Button>
                    </form>
                    <div className="mt-4 text-center">
                        <span className="text-sm">Sudah punya akun? </span>
                        <Link href="/login" className="text-blue-600 hover:underline">Login</Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
