"use client";

import { FormEvent, useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import {
  UserRole,
  useAuth,
} from "@/context/AuthContext";

type AuthMode = "login" | "signup";

type AuthModalProps = {
  open: boolean;
  mode: AuthMode;
  onClose: () => void;
};

export default function AuthModal({
  open,
  mode: initialMode,
  onClose,
}: AuthModalProps) {
  const { login, signup } = useAuth();

  const [mode, setMode] =
    useState<AuthMode>(initialMode);

  const [role, setRole] =
    useState<UserRole>("customer");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  if (!open) {
    return null;
  }

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const result =
      mode === "login"
        ? login(email, password, role)
        : signup(
            name,
            email,
            password,
            role
          );

    if (!result.success) {
      setError(result.message);
      return;
    }

    setSuccess(result.message);

    setTimeout(() => {
      onClose();
    }, 700);
  };

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    setError("");
    setSuccess("");
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[460px] rounded-3xl bg-white p-7 shadow-2xl"
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">
            {mode === "login"
              ? "Log in"
              : "Create account"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-[#f7f7f7]"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <p className="mt-2 text-sm text-[#717171]">
          Choose your account type.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-2 rounded-xl bg-[#f7f7f7] p-1">
          <button
            type="button"
            onClick={() => setRole("customer")}
            className={`rounded-lg px-4 py-3 text-sm font-medium transition ${
              role === "customer"
                ? "bg-white shadow-sm"
                : "text-[#717171]"
            }`}
          >
            Customer
          </button>

          <button
            type="button"
            onClick={() => setRole("manager")}
            className={`rounded-lg px-4 py-3 text-sm font-medium transition ${
              role === "manager"
                ? "bg-white shadow-sm"
                : "text-[#717171]"
            }`}
          >
            Manager
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-4"
        >
          {mode === "signup" && (
            <div>
              <label className="mb-1 block text-sm font-medium">
                Full name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="Enter your name"
                className="w-full rounded-xl border border-[#b0b0b0] px-4 py-3 outline-none focus:border-black"
                required
              />
            </div>
          )}

          <div>
            <label className="mb-1 block text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="Enter your email"
              className="w-full rounded-xl border border-[#b0b0b0] px-4 py-3 outline-none focus:border-black"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Password
            </label>

            <div className="relative">
              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Enter your password"
                className="w-full rounded-xl border border-[#b0b0b0] px-4 py-3 pr-12 outline-none focus:border-black"
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    (value) => !value
                  )
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#717171]"
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <EyeOff size={19} />
                ) : (
                  <Eye size={19} />
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {success && (
            <div className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
              {success}
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-[#ff385c] py-3.5 font-semibold text-white transition hover:bg-[#e31c5f]"
          >
            {mode === "login"
              ? `Log in as ${
                  role === "manager"
                    ? "Manager"
                    : "Customer"
                }`
              : `Sign up as ${
                  role === "manager"
                    ? "Manager"
                    : "Customer"
                }`}
          </button>
        </form>

        <div className="mt-6 border-t border-[#dddddd] pt-5 text-center text-sm">
          {mode === "login" ? (
            <>
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() =>
                  switchMode("signup")
                }
                className="font-semibold underline"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() =>
                  switchMode("login")
                }
                className="font-semibold underline"
              >
                Log in
              </button>
            </>
          )}
        </div>

        <div className="mt-4 rounded-xl bg-[#f7f7f7] p-3 text-xs text-[#717171]">
          Demo customer: customer@demo.com /
          customer123
          <br />
          Demo manager: manager@demo.com /
          manager123
        </div>
      </div>
    </div>
  );
}