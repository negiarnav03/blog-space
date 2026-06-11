import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../store/authSlice";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import { Button, Input, Logo } from "./index";


function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(JSON.parse(JSON.stringify(userData))));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full py-12 animate-fade-in">
      <div
        className={`mx-auto w-full max-w-lg bg-[var(--card-bg)]/80 backdrop-blur-md rounded-2xl p-10 border border-[var(--border)] shadow-2xl`}
      >
        <div className="mb-4 flex justify-center">
          <span className="inline-block w-full max-w-[80px]">
            <Logo width="100%" />
          </span>
        </div>

        <h2 className="text-center text-3xl font-extrabold text-[var(--text-h)] tracking-tight leading-tight">
          Sign in to your account
        </h2>

        <p className="mt-2.5 text-center text-base text-[var(--text-muted)]">
          Don&apos;t have an account?&nbsp;
          <Link
            to="/signup"
            className="font-semibold text-indigo-400 transition-all duration-200 hover:text-indigo-300 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-rose-400 text-center mt-6 bg-rose-500/10 border border-rose-500/20 py-2 px-4 rounded-lg text-sm">{error}</p>}

        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <div>
              <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                autoComplete="email"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPattern: (value) =>
                      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                        value,
                      ) || "Please enter a valid email",
                  },
                })}
              />
              {errors.email && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.email.message || "Email is required"}
                </span>
              )}
            </div>

            <div>
              <Input
                label="password: "
                placeholder="Enter your password"
                type="password"
                autoComplete="current-password"
                {...register("password", {
                  required: true,
                })}
              />
              {errors.password && (
                <span className="text-red-500 text-sm mt-1 block">
                  Password is required
                </span>
              )}
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
