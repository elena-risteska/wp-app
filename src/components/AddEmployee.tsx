"use client";

import { POST } from "@/client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function AddEmployee() {
  const [showPassword, setShowPassword] = useState(false);
  const [modal, setModal] = useState(false);
  const [role, setRole] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  let token: string;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    token = localStorage.getItem("token") || "";
    const formData = new FormData(event.currentTarget);

    try {
      const response: any = await POST("/api/users/create", {
        params: {
          header: {
            Authorization: `Bearer ${token}`,
          },
        },
        body: {
          name: formData.get("name")?.toString(),
          email: formData.get("email")?.toString(),
          password: formData.get("password")?.toString(),
          password_confirmation: formData.get("confirm password")?.toString(),
          role: role,
        },
      });

      console.log(response);

      if (response.response.status === 201) {
        router.push("/employees");
      } else {
        setError(`Error: ${response.response.statusText || "Unknown error"}`);
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      console.error(err);
    }
  }
  return (
    <>
      <div className="w-full">
        <button
          onClick={() => setModal(true)}
          type="button"
          className="rounded-2xl w-fit float-right mr-12 text-nowrap ml-4 py-3 px-6 mb-8 cursor-pointer text-sm font-semibold tracking-wider text-white bg-teal-800 hover:bg-teal-700 focus:outline-none"
        >
          + Add new employee
        </button>
      </div>
      {modal ? (
        <>
          <div
            onClick={() => setModal(false)}
            className="justify-center my-auto items-center flex overflow-y-scroll fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className=" my-auto w-fit outline-none focus:outline-none"
            >
              <div className="items-center h-fit w-fit">
                <div className="flex items-center md:p-8 p-6 bg-white rounded-3xl h-full">
                  <form
                    className="max-w-lg w-full mx-auto"
                    method="POST"
                    onSubmit={onSubmit}
                  >
                    <div className="mb-8">
                      <h1 className="text-stone-950 text-4xl font-extrabold">
                        Add new employee
                      </h1>
                    </div>
                    <div className="m-3">
                      <label className="text-stone-950 text-xs block mb-2 ">
                        Name
                      </label>
                      <div className="relative flex items-center">
                        <input
                          name="name"
                          type="text"
                          required
                          className="w-full text-sm border-b border-stone-300 focus:border-stone-800 px-2 py-3 outline-none"
                          placeholder="Enter full name"
                        />
                      </div>
                    </div>
                    <div className="m-3">
                      <label className="text-stone-950 text-xs block mb-2 ">
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
                      </div>
                    </div>
                    <div className="m-3">
                      <label className="text-stone-950 text-xs block mb-2 ">
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
                    </div>
                    <div className="m-3">
                      <label className="text-stone-950 text-xs block mb-2 ">
                        Confirm password
                      </label>
                      <div className="relative flex items-center">
                        <input
                          name="confirm password"
                          type={showPassword ? "text" : "password"}
                          required
                          className="w-full text-sm border-b border-stone-300 focus:border-stone-800 px-2 py-3 outline-none"
                          placeholder="Confirm password"
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
                    <div className="m-3">
                      <label className="text-stone-950 text-xs block mb-2 ">
                        Position
                      </label>
                      <div className="relative flex items-center">
                        <select
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          className="rounded w-full text-sm text-stone-500 border border-stone-400 h-8 px-2 mx-4 mt-2 outline-none"
                        >
                          <option value="">Select</option>
                          <option value="admin">Admin</option>
                          <option value="manager">Manager</option>
                          <option value="hr">HR</option>
                          <option value="user">User</option>
                        </select>
                      </div>
                    </div>
                    {error && (
                      <span className="text-red-700 text-sm p-2">{error}</span>
                    )}
                    <div className="mt-12">
                      <input
                        type="submit"
                        value="Add employee"
                        className="rounded-2xl w-full py-3 px-6 cursor-pointer text-sm font-semibold tracking-wider text-white bg-teal-900 hover:bg-teal-800 focus:outline-none"
                      />
                    </div>
                    <button
                      type="button"
                      className="rounded-2xl w-full my-3 py-3 px-6 cursor-pointer text-sm font-semibold tracking-wider text-white bg-stone-950 hover:bg-stone-800 focus:outline-none"
                      onClick={() => setModal(false)}
                    >
                      Close
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
