"use client";

import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { loginProcess } from "@/services/auth";

export default function LoginPage() {
    const router = useRouter();
    const [form, setForm] = useState({ username: "admin", password: "11111111" });
    const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    //   function untuk validasi form
    const validate = () => {
        const newErrors: { username?: string; password?: string } = {};

        if (!form.username) {
            newErrors.username = "username is required";
        } else if (!/\S+/.test(form.username)) {
            newErrors.username = "Invalid username format";
        }

        if (!form.password) {
            newErrors.password = "Password is required";
        } else if (form.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);

        const { data, success, message } = await loginProcess(form.username, form.password);

        console.log({ data, success, message })
        if (success == true) {

            const { token, expires_at, ...newData } = data;

            const now = new Date();
            const expiresDate = new Date(expires_at);
            const diffMs = expiresDate.getTime() - now.getTime();
            const expiresDays = diffMs / (1000 * 60 * 60 * 24);

            Cookies.set("token", token, { expires: expiresDays });
            Cookies.set("user", JSON.stringify(newData), { expires: expiresDays });

            router.push("/dashboard");
        } else {
            setErrors({ password: "Invalid credentials" });
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Card className="w-full max-w-md shadow-lg rounded-2xl">
                <CardContent className="p-6">
                    <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Username */}
                        <div>
                            <label className="block text-sm font-medium">Username</label>
                            <input
                                type="text"
                                name="username"
                                value={form.username}
                                onChange={handleChange}
                                className={`mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring ${errors.username ? "border-red-500 focus:ring-red-300" : "focus:ring-blue-300"
                                    }`}
                            />
                            {errors.username && (
                                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                className={`mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring ${errors.password ? "border-red-500 focus:ring-red-300" : "focus:ring-blue-300"
                                    }`}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                            )}
                        </div>

                        {/* Submit */}
                        <Button
                            type="submit"
                            className="w-full rounded-xl py-2"
                            disabled={loading}
                        >
                            {loading ? "Loading..." : "Login"}
                        </Button>
                    </form>
                    <div className="mt-4 text-center">
                        <span className="text-sm">Belum punya akun? </span>
                        <Link href="/register" className="text-blue-600 hover:underline">Register</Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
