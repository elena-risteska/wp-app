"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { POST } from "@/client";
import Image from "next/image";
import logo from "../../../public/fikt-logo.png";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    try {
      const response: any = await POST("/api/login", {
        body: {
          email: formData.get("email")?.valueOf().toString(),
          password: formData.get("password")?.valueOf().toString(),
        },
      });

      console.log(response);

      if (response.response.status === 200) {
        router.push("/employees");
      } else {
        setError(`Error: ${response.response.statusText || "Unknown error"}`);
      }
      localStorage.setItem("token", response.data.access_token);
    } catch (err) {
      setError("An unexpected error occurred.");
      console.error(err);
    }
  }
  return (
    <>
      <div className="font-[sans-serif] bg-stone-950 md:h-screen">
        <div className="grid md:grid-cols-2 items-center gap-8 h-full">
          <div className="max-md:order-1 p-4">
            <Image priority className="mx-auto w-2/4" src={logo} alt="logo" />
          </div>
          <div className="flex items-center bg-white rounded-l-full h-full">
            <form
              className="max-w-lg w-full mx-auto"
              method="post"
              onSubmit={onSubmit}
            >
              <div className="mb-12">
                <h1 className="text-stone-950 text-4xl font-extrabold">
                  Sign in
                </h1>
              </div>
              <div>
                <label className="text-stone-950 text-xs block mb-2">
                  Email
                </label>
                <div className="relative flex items-center">
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full text-sm border-b border-stone-300 focus:border-stone-800 px-2 py-3 outline-none"
                    placeholder="Enter email"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-2"
                    viewBox="0 0 682.667 682.667"
                  >
                    <defs>
                      <clipPath id="a" clipPathUnits="userSpaceOnUse">
                        <path
                          d="M0 512h512V0H0Z"
                          data-original="#000000"
                        ></path>
                      </clipPath>
                    </defs>
                    <g
                      clipPath="url(#a)"
                      transform="matrix(1.33 0 0 -1.33 0 682.667)"
                    >
                      <path
                        fill="none"
                        strokeMiterlimit="10"
                        strokeWidth="40"
                        d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                        data-original="#000000"
                      ></path>
                      <path
                        d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                        data-original="#000000"
                      ></path>
                    </g>
                  </svg>
                </div>
              </div>

              <div className="mt-8">
                <label className="text-stone-950 text-xs block mb-2">
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="w-full text-sm border-b border-stone-300 focus:border-stone-800 px-2 py-3 outline-none"
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#bbb"
                      stroke="#bbb"
                      className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
                      viewBox="0 0 128 128"
                    >
                      <path
                        d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                        data-original="#000000"
                      ></path>
                    </svg>
                  </button>
                </div>
                {error && (
                  <span className="text-red-700 text-sm p-2">{error}</span>
                )}
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
                <div className="flex items-center">
                  <input
                    id="remember_me"
                    name="remember_me"
                    type="checkbox"
                    className="h-4 w-4 shrink-0 text-stone-800 accent-stone-800 focus:ring-stone-800 border-gray-300 rounded-none"
                  />
                  <label className="text-stone-950 ml-3 block text-sm">
                    Remember me
                  </label>
                </div>
                <div>
                  <a
                    href="/forgot-password"
                    className="text-stone-800 font-semibold text-sm hover:underline"
                  >
                    Forgot Password?
                  </a>
                </div>
              </div>
              <div className="mt-12">
                <input
                  type="submit"
                  value="Sign in"
                  className="w-full rounded-2xl py-3 px-6 cursor-pointer text-sm font-semibold tracking-wider text-white bg-stone-950 hover:bg-stone-800 focus:outline-none"
                />
              </div>
              <div className="my-6 flex items-center">
                <hr className="w-full border-stone-300" />
              </div>
              <p className="text-stone-950 text-sm mt-4 ">
                Don't have an account?{" "}
                <a
                  href="register"
                  className="cursor-pointer text-stone-800 font-semibold hover:underline ml-1 whitespace-nowrap"
                >
                  Register here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
