"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Mail, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { registerSchema, type RegisterFormData } from "@/validations/auth.schema";
import { PasswordField } from "@/components/auth/PasswordField";
import { PasswordStrengthMeter } from "@/components/auth/PasswordStrengthMeter";
import { PasswordRequirements } from "@/components/auth/PasswordRequirements";
import { Logo } from "../shared/Logo";

export function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "", acceptTerms: false },
  });

  const password = watch("password") || "";

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.name, email: data.email, password: data.password }),
      });

      if (!res.ok) {
        const { error } = await res.json();
        if (error === "Email already exists") {
          setError("email", { message: "This email is already registered" });
          toast.error("Email already exists. Please login instead.");
        } else {
          toast.error(error || "Something went wrong. Please try again.");
        }
        return;
      }

      toast.success("Account created successfully!");
      router.push("/login?registered=true");
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
          <h1 className="text-2xl font-bold text-slate-900">Create your account</h1>
          <p className="text-slate-500 mt-2 text-sm">Start managing your store in minutes</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          {/* Name */}
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-slate-700">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-slate-400" aria-hidden="true" />
              </div>
              <input
                title="Full Name"
                id="name"
                type="text"
                placeholder="John Doe"
                autoComplete="name"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                disabled={isLoading}
                className={`w-full pl-10 pr-3 py-2.5 rounded-xl border bg-white text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 ${
                  errors.name ? "border-red-500" : "border-slate-200 hover:border-slate-300"
                }`}
                {...register("name")}
              />
            </div>
            {errors.name && (
              <p id="name-error" role="alert" className="text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
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
                placeholder="you@example.com"
                autoComplete="email"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                disabled={isLoading}
                className={`w-full pl-10 pr-3 py-2.5 rounded-xl border bg-white text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 ${
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

          {/* Password */}
          <div>
            <PasswordField
              label="Password"
              error={errors.password?.message}
              registration={register("password")}
              disabled={isLoading}
              autoComplete="new-password"
            />
            <div className="mt-4 space-y-1">
              <PasswordStrengthMeter password={password} />
              <PasswordRequirements password={password} />
            </div>
          </div>

          {/* Confirm Password */}
          <PasswordField
            label="Confirm Password"
            error={errors.confirmPassword?.message}
            registration={register("confirmPassword")}
            disabled={isLoading}
            autoComplete="new-password"
          />

          {/* Terms */}
          <div>
            <div className="flex items-start gap-3">
              <input
                title="Accept Terms and Conditions"
                type="checkbox"
                id="acceptTerms"
                className="h-4 w-4 mt-0.5 rounded border-slate-300 text-purple-600 focus:ring-purple-500 focus:ring-offset-2"
                aria-invalid={!!errors.acceptTerms}
                aria-describedby={errors.acceptTerms ? "terms-error" : undefined}
                {...register("acceptTerms")}
                disabled={isLoading}
              />
              <label htmlFor="acceptTerms" className="text-sm text-slate-600">
                I agree to the{" "}
                <Link href="/terms" className="text-purple-600 hover:text-purple-700 font-medium">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-purple-600 hover:text-purple-700 font-medium">
                  Privacy Policy
                </Link>
              </label>
            </div>
            {errors.acceptTerms && (
              <p id="terms-error" role="alert" className="text-sm text-red-500 mt-1">
                {errors.acceptTerms.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-purple-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-purple-500/25">
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                Creating account...
              </>
            ) : (
              <>
                Create Account
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </>
            )}
          </button>

          <p className="text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-purple-600 hover:text-purple-700">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
