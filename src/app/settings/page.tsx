"use client";

import { FormEvent, useState } from "react";
import DeleteAccount from "@/components/DeleteAccount";
import { useRouter } from "next/navigation";
import "../globals.css";
import { POST, PUT } from "@/client";

export default function ProfilePage() {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("hr");
  const [error, setError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  let token: string;
  const router = useRouter();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    token = localStorage.getItem("token") || "";
    // console.log("userID: " + userID);
    const formData = new FormData(event.currentTarget);
    try {
      const response: any = await PUT("/api/users/{user_id}", {
        params: {
          header: {
            Authorization: `Bearer ${token}`,
          },
          path: {
            user_id: 1,
          },
        },
        body: {
          name: formData.get("name")?.valueOf().toString(),
          email: formData.get("email")?.valueOf().toString(),
          role: role,
        },
      });

      if (response.response.status !== 200) {
        setError(`Error: ${response.response.statusText || "Unknown error"}`);
      }

      console.log(response);
    } catch (err) {
      setError("An unexpected error occurred.");
      console.error(err);
    }
  }

  async function onChange(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    token = localStorage.getItem("token") || "";
    const formData = new FormData(event.currentTarget);
    try {
      const response: any = await POST("/api/password/reset", {
        params: {
          header: {
            Authorization: `Bearer ${token}`,
          },
        },
        body: {
          old_password: formData.get("old-password")?.valueOf().toString(),
          new_password: formData.get("new-password")?.valueOf().toString(),
          new_password_confirmation: formData
            .get("confirm-password")
            ?.valueOf()
            .toString(),
        },
      });
      if (response.response.status === 200) {
        router.push("/settings");
      }

      if (response.response.status !== 200) {
        setPasswordError(
          `Error: ${response.response.statusText || "Unknown error"}`
        );
      }
      console.log(response);
    } catch (err) {
      setPasswordError("An unexpected error occurred.");
      console.error(err);
    }
  }

  return (
    <>
      <div className="mx-auto w-11/12 h-fit mt-28">
        <h1 className="text-stone-950 text-right mr-16 text-lg font-bold">
          Account details
        </h1>
        <hr className="w-full border-stone-300 mb-8 mt-2" />
      </div>
      <div className="flex flex-row items-center h-fit w-full">
        <div className="items-center md:p-8 p-6 mx-auto bg-white rounded-3xl h-fit w-1/3">
          <form className="max-w-lg w-full" method="post" onSubmit={onSubmit}>
            <div className="my-3">
              <label className="text-stone-950 text-xs block mb-2">Name</label>
              <div className="relative flex items-center">
                <input
                  name="name"
                  type="text"
                  className="w-full text-sm border-b border-stone-300 focus:border-stone-800 px-2 py-3 outline-none"
                  placeholder="Change name"
                />
              </div>
            </div>
            <div className="my-3">
              <label className="text-stone-950 text-xs block mb-2 ">
                Email
              </label>
              <div className="relative flex items-center">
                <input
                  name="email"
                  type="email"
                  className="w-full text-sm border-b border-stone-300 focus:border-stone-800 px-2 py-3 outline-none"
                  placeholder="Change email"
                />
              </div>
            </div>
            {error && <span className="text-red-700 text-sm p-2">{error}</span>}
            <div className="mt-12">
              <input
                type="submit"
                value="Save changes"
                className="w-full rounded-2xl py-3 px-6 cursor-pointer text-sm font-semibold tracking-wider text-white bg-stone-950 hover:bg-stone-800 focus:outline-none"
              />
            </div>
          </form>
        </div>
        <div className="items-center md:p-8 p-6 mx-auto bg-white rounded-3xl h-fit w-1/3">
          <form className="max-w-lg w-full" method="post" onSubmit={onChange}>
            <div className="my-3">
              <label className="text-stone-950 text-xs block mb-2">
                Old password
              </label>
              <div className="relative flex items-center">
                <input
                  name="old-password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full text-sm border-b border-stone-300 focus:border-stone-800 px-2 py-3 outline-none"
                  placeholder="Enter old password"
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
            </div>
            <div className="my-3">
              <label className="text-stone-950 text-xs block mb-2">
                New password
              </label>
              <div className="relative flex items-center">
                <input
                  name="new-password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full text-sm border-b border-stone-300 focus:border-stone-800 px-2 py-3 outline-none"
                  placeholder="Enter new password"
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
            </div>
            <div className="my-3">
              <label className="text-stone-950 text-xs block mb-2">
                Confirm password
              </label>
              <div className="relative flex items-center">
                <input
                  name="confirm-password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full text-sm border-b border-stone-300 focus:border-stone-800 px-2 py-3 outline-none"
                  placeholder="Confirm new password"
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
            </div>
            {passwordError && (
              <span className="text-red-700 text-sm p-2">{passwordError}</span>
            )}
            <div className="mt-12">
              <input
                type="submit"
                value="Change password"
                className="w-full rounded-2xl py-3 px-6 cursor-pointer text-sm font-semibold tracking-wider text-white bg-stone-950 hover:bg-stone-800 focus:outline-none"
              />
            </div>
          </form>{" "}
        </div>
      </div>
      <div className="mx-auto w-11/12 h-fit">
        <hr className="w-full border-stone-300 my-8" />
        <DeleteAccount />
      </div>
    </>
  );
}
