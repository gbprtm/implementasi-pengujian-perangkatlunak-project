"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { FormField } from "@/components/form-field";

type AuthMode = "login" | "register";

interface AuthFormProps {
  mode: AuthMode;
}

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

function validateEmail(email: string): string | undefined {
  if (!email) return "Email wajib diisi.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return "Format email tidak valid.";
}

function validatePassword(password: string): string | undefined {
  if (!password) return "Kata sandi wajib diisi.";
  if (password.length < 8) return "Kata sandi minimal 8 karakter.";
}

function validateConfirmPassword(
  password: string,
  confirm: string
): string | undefined {
  if (!confirm) return "Konfirmasi kata sandi wajib diisi.";
  if (password !== confirm) return "Kata sandi tidak cocok.";
}

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isLogin = mode === "login";

  function validate(): boolean {
    const newErrors: FormErrors = {};

    const emailErr = validateEmail(email);
    if (emailErr) newErrors.email = emailErr;

    const passwordErr = validatePassword(password);
    if (passwordErr) newErrors.password = passwordErr;

    if (!isLogin) {
      const confirmErr = validateConfirmPassword(password, confirmPassword);
      if (confirmErr) newErrors.confirmPassword = confirmErr;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) return;

    setLoading(true);

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setServerError(
          error.message?.includes("Invalid login")
            ? "Email atau kata sandi salah."
            : "Gagal masuk. Coba lagi."
        );
        setLoading(false);
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } else {
      const { error } = await supabase.auth.signUp({ email, password });

      if (error) {
        setServerError(
          error.message?.includes("already registered")
            ? "Email ini sudah terdaftar. Silakan masuk."
            : "Gagal mendaftar. Coba lagi."
        );
        setLoading(false);
      } else {
        router.push("/onboarding");
        router.refresh();
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-slate-50">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 border border-slate-200">
        {/* Header */}
        <h1 className="text-2xl font-bold text-center text-slate-800 mb-1">
          Daily Tracker
        </h1>
        <p className="text-sm text-center text-slate-500 mb-6">
          {isLogin ? "Masuk ke akun Anda" : "Buat akun baru"}
        </p>

        {/* Server Error */}
        {serverError && (
          <div
            role="alert"
            className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded text-sm"
          >
            {serverError}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <FormField
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            placeholder="nama@email.com"
            required
            autoComplete="email"
          />

          <FormField
            id="password"
            label="Kata Sandi"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            hint={!isLogin ? "Minimal 8 karakter." : undefined}
            placeholder="••••••••"
            required
            autoComplete={isLogin ? "current-password" : "new-password"}
          />

          {!isLogin && (
            <FormField
              id="confirm-password"
              label="Konfirmasi Kata Sandi"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={errors.confirmPassword}
              placeholder="••••••••"
              required
              autoComplete="new-password"
            />
          )}

          <button
            id={isLogin ? "btn-login" : "btn-register"}
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md text-sm transition disabled:opacity-50"
          >
            {loading
              ? "Memproses..."
              : isLogin
              ? "Masuk"
              : "Daftar"}
          </button>
        </form>

        {/* Footer link */}
        <p className="text-xs text-center text-slate-500 mt-6">
          {isLogin ? (
            <>
              Belum punya akun?{" "}
              <Link
                href="/register"
                id="link-to-register"
                className="text-indigo-600 font-medium hover:underline"
              >
                Daftar sekarang
              </Link>
            </>
          ) : (
            <>
              Sudah punya akun?{" "}
              <Link
                href="/login"
                id="link-to-login"
                className="text-indigo-600 font-medium hover:underline"
              >
                Masuk
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
