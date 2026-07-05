"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { loginSchema, type LoginFormData } from "@/validations/auth.schema";
import { PasswordField } from "@/components/auth/PasswordField";
import { Logo } from "../shared/Logo";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", rememberMe: false },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const { error } = await res.json();
        setError("email", { message: "Invalid email or password" });
        setError("password", { message: "Invalid email or password" });
        toast.error(error || "Invalid credentials. Please try again.");
        return;
      }

      toast.success("Welcome back!");
      router.push(callbackUrl);
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md relative z-10">
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8 md:p-10">
        <div className="text-center mb-8">
          <Logo />
          <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
          <p className="text-slate-500 mt-2 text-sm">Sign in to manage your store</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-slate-400" aria-hidden="true" />
              </div>
              <input
                title="Email Address"
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                disabled={isLoading}
                className={`w-full pl-10 pr-3 py-2.5 rounded-xl border bg-white text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${
                  errors.email ? "border-red-500" : "border-slate-200 hover:border-slate-300"
                }`}
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p id="email-error" role="alert" className="text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between">
              <span />
              <Link
                href="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Forgot password?
              </Link>
            </div>
            <PasswordField
              label="Password"
              error={errors.password?.message}
              registration={register("password")}
              disabled={isLoading}
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="rememberMe"
              className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-2"
              {...register("rememberMe")}
              disabled={isLoading}
            />
            <label
              htmlFor="rememberMe"
              className="text-sm text-slate-600 select-none cursor-pointer">
              Remember me
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25">
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                Signing in...
              </>
            ) : (
              <>
                Sign in
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </>
            )}
          </button>

          <p className="text-center text-sm text-slate-600">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-medium text-blue-600 hover:text-blue-700">
              Create one now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
