"use client";

import Hooky from "@/components/molecules/Hooky";
import UIButton from "@/components/UI/UIButton";
import UIInput from "@/components/UI/UIInput";
import { onChangeHandler } from "@/helpers/handlers";
import { PostCall } from "@/helpers/PostCall";
import { validateRegister } from "@/helpers/validations";
import { useUserStore } from "@/providers/UserProvider";
import { UserRegisterI } from "@/types/Auth";
import { ArrowRight, Webhook } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

const defaultForm: UserRegisterI = {
  email: "",
  name: "",
  password: "",
};
export default function RegisterPage() {
  const { login } = useUserStore((state) => state);
  const router = useRouter();

  const [userForm, setUserForm] = useState<UserRegisterI>(defaultForm);
  const [loading, setLoading] = useState(false);

  const handleCreateUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validateRegister(userForm);

    if (validationErrors.length > 0) {
      validationErrors.forEach((element) => {
        toast.error(element.message);
      });
      return;
    }

    const response = await PostCall({ url: "/auth/register", data: userForm });
    if (response.success) {
      login(response.data);
      setLoading(false);
      router.push("/in");
      return;
    }
    setLoading(false);
    toast.error(response.message);
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-12 text-foreground">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />

      {/* Background grid */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(242,139,54,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(242,139,54,0.035)_1px,transparent_1px)] bg-size-[40px_40px]" />

      {/* Decorative stars */}
      <div className="pointer-events-none absolute left-[8%] top-[12%] text-primary/70">
        <span className="text-2xl animate-pulse">✦</span>
      </div>

      <div className="pointer-events-none absolute right-[12%] top-[20%] text-primary/50">
        <span className="text-lg">✧</span>
      </div>

      <div className="pointer-events-none absolute bottom-[18%] left-[14%] text-primary/50">
        <span className="text-xl">✦</span>
      </div>

      <div className="pointer-events-none absolute bottom-[12%] right-[10%] text-primary/70">
        <span className="text-2xl animate-pulse">✧</span>
      </div>

      {/* Floating pixels */}
      <div className="pointer-events-none absolute left-[20%] top-[30%] h-2 w-2 bg-primary/40" />
      <div className="pointer-events-none absolute right-[22%] top-[42%] h-1.5 w-1.5 bg-primary/50" />
      <div className="pointer-events-none absolute bottom-[30%] right-[18%] h-2 w-2 bg-primary/30" />

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

        {/* Register card */}
        <div className="rounded-2xl border border-border bg-surface/95 p-6 shadow-2xl shadow-black/40 backdrop-blur-sm sm:p-8">
          {/* Welcome banner */}
          <div className="relative mb-7 flex items-center gap-4 overflow-hidden rounded-xl border border-primary/20 bg-primary-soft/40 p-4">
            <div className="absolute right-3 top-2 text-primary/30">
              <span className="text-xl">✦</span>
            </div>

            <div className="h-16 w-16 shrink-0 drop-shadow-[0_0_12px_rgba(242,139,54,0.2)]">
              <Hooky />
            </div>

            <div className="relative">
              <p className="font-semibold text-foreground">
                Hi there, developer!
              </p>

              <p className="mt-1 text-xs leading-relaxed text-muted">
                Hooky is happy you're here. Let's create your account!
              </p>
            </div>
          </div>

          {/* Heading */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Create your account</h2>

            <p className="mt-1 text-sm text-muted">
              Start receiving and inspecting webhook events.
            </p>
          </div>

          <form onSubmit={handleCreateUser} className="flex flex-col gap-5">
            <UIInput
              label="Your name"
              name="name"
              placeholder="e.g. Alex"
              autoComplete="name"
              required
              onChange={(e) =>
                onChangeHandler({
                  e,
                  setState: setUserForm,
                  state: userForm,
                })
              }
            />

            <UIInput
              label="Email address"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
              onChange={(e) =>
                onChangeHandler({
                  e,
                  setState: setUserForm,
                  state: userForm,
                })
              }
            />

            <UIInput
              label="Password"
              name="password"
              type="password"
              placeholder="Create a strong password"
              autoComplete="new-password"
              required
              helperText="Use a password that's difficult to guess."
              onChange={(e) =>
                onChangeHandler({
                  e,
                  setState: setUserForm,
                  state: userForm,
                })
              }
            />

            <UIButton
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              fullWidth
              rightIcon={<ArrowRight size={16} />}
            >
              Create account
            </UIButton>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted">✦</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Sign in */}
          <p className="text-center text-sm text-muted">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-primary transition hover:text-primary-hover"
            >
              Sign in
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
