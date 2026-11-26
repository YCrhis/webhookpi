"use client";

import Hooky from "@/components/molecules/Hooky";
import UIButton from "@/components/UI/UIButton";
import UIInput from "@/components/UI/UIInput";
import { GetCall } from "@/helpers/GetCall";
import { onChangeHandler } from "@/helpers/handlers";
import { PostCall } from "@/helpers/PostCall";
import { LoginI } from "@/types/Auth";
import { ArrowRight, Link, Mail, Webhook } from "lucide-react";
import { FormEvent, useState } from "react";

const defaultForm: LoginI = {
  password: "",
  email: "",
};

export default function LoginPage() {
  const [loginForm, setLoginForm] = useState<LoginI>(defaultForm);
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await PostCall({ url: "/auth/login", data: loginForm });
    console.log(data);
  };

  

  // Keep your existing loginForm, setLoginForm,
  // handleSend and onChangeHandler logic here.

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-12 text-foreground">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />

      {/* Background grid */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(242,139,54,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(242,139,54,0.035)_1px,transparent_1px)] bg-size-[40px_40px]" />

      {/* Decorative stars */}
      <span className="pointer-events-none absolute left-[10%] top-[15%] animate-float-star text-2xl text-primary/70">
        ✦
      </span>

      <span className="pointer-events-none absolute right-[13%] top-[22%] animate-float-star text-xl text-primary/50">
        ✧
      </span>

      <span className="pointer-events-none absolute bottom-[20%] left-[16%] animate-float-star text-xl text-primary/50">
        ✦
      </span>

      <span className="pointer-events-none absolute bottom-[15%] right-[12%] animate-float-star text-2xl text-primary/70">
        ✧
      </span>

      {/* Floating pixels */}
      <div className="pointer-events-none absolute left-[20%] top-[35%] h-2 w-2 bg-primary/40" />
      <div className="pointer-events-none absolute right-[20%] top-[45%] h-1.5 w-1.5 bg-primary/50" />

      <section className="relative z-10 w-full max-w-md">
        {/* Brand */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/30 bg-primary-soft shadow-lg shadow-primary/10">
            <Webhook className="h-7 w-7 text-primary" />
          </div>

          <h1 className="text-2xl font-bold tracking-tight">
            Webhook <span className="text-primary">Inspector</span>
          </h1>

          <p className="mt-2 text-sm text-muted">
            Your little corner of the webhook universe.
          </p>
        </div>

        {/* Login card */}
        <div className="rounded-2xl border border-border bg-surface/95 p-6 shadow-2xl shadow-black/40 backdrop-blur-sm sm:p-8">
          {/* Welcome banner */}
          <div className="relative mb-7 flex items-center gap-4 overflow-hidden rounded-xl border border-primary/20 bg-primary-soft/40 p-4">
            <div className="absolute right-3 top-2 text-primary/30">✦</div>

            <div className="h-16 w-16 shrink-0 drop-shadow-[0_0_12px_rgba(242,139,54,0.2)]">
              <Hooky />
            </div>

            <div className="relative">
              <p className="font-semibold text-foreground">Welcome back!</p>

              <p className="mt-1 text-xs leading-relaxed text-muted">
                Hooky missed you! Ready to inspect some webhooks?
              </p>
            </div>
          </div>

          {/* Heading */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Sign in to your account</h2>

            <p className="mt-1 text-sm text-muted">
              Enter your credentials to continue.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSend} className="flex flex-col gap-5">
            <UIInput
              label="Email address"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
              leftIcon={<Mail size={18} />}
              value={loginForm.email}
              onChange={(e) =>
                onChangeHandler({
                  e,
                  setState: setLoginForm,
                  state: loginForm,
                })
              }
            />

            <div className="flex flex-col gap-2">
              <UIInput
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                value={loginForm.password}
                onChange={(e) =>
                  onChangeHandler({
                    e,
                    setState: setLoginForm,
                    state: loginForm,
                  })
                }
              />

             
            </div>

            {/* Submit */}
            <UIButton
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
              rightIcon={<ArrowRight size={16} />}
            >
              Sign in
            </UIButton>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted">✦</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Register */}
          <p className="text-center text-sm text-muted">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-primary transition hover:text-primary-hover"
            >
              Create account
            </Link>
          </p>
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted">
          <span className="text-primary">✦</span>
          Made with care, and a little bit of orange
          <span className="text-primary">✦</span>
        </div>
      </section>
    </main>
  );
}
