import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { login as authLogin } from "../store/authSlice";
import Button from "./Button";
import Input from "./Input";
import Logo from "./Logo";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
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
          Create a new account
        </h2>

        <p className="mt-2.5 text-center text-base text-[var(--text-muted)]">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-semibold text-indigo-400 transition-all duration-200 hover:text-indigo-300 hover:underline"
          >
            Sign In
          </Link>
        </p>

        {error && <p className="text-rose-400 text-center mt-6 bg-rose-500/10 border border-rose-500/20 py-2 px-4 rounded-lg text-sm">{error}</p>}

        <form onSubmit={handleSubmit(create)} className="mt-8">
          <div className="space-y-5">
            <div>
              <Input
                label="Full Name: "
                placeholder="Enter your full name"
                type="text"
                autoComplete="name"
                {...register("name", {
                  required: true,
                })}
              />
              {errors.name && (
                <span className="text-red-500 text-sm mt-1 block">
                  Name is required
                </span>
              )}
            </div>

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
                      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
                      "Email address must be valid",
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
                label="Password: "
                type="password"
                placeholder="Create a password"
                autoComplete="new-password"
                {...register("password", {
                  required: true,
                  validate: {
                    minLength: (value) =>
                      value.length >= 8 ||
                      "Password must be at least 8 characters",
                  },
                })}
              />
              {errors.password && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.password.message || "Password is required"}
                </span>
              )}
            </div>

            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
