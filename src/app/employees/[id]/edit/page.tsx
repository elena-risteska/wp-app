"use client";

import { useParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { PUT } from "@/client";
import TimeEntries from "@/components/TimeEntries";
import DeleteEmployee from "@/components/DeleteEmployee";
import "../../../globals.css";

export default function ProfilePage() {
  const [role, setRole] = useState("select");
  const [error, setError] = useState<string | null>(null);
  const params = useParams<{ id: string }>();
  const userID = Number(params.id);
  let token: string;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    token = localStorage.getItem("token") || "";
    console.log("userID: " + userID);
    const formData = new FormData(event.currentTarget);
    try {
      const response: any = await PUT("/api/users/{user_id}", {
        params: {
          header: {
            Authorization: `Bearer ${token}`,
          },
          path: {
            user_id: userID,
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

  return (
    <>
      <div className="flex flex-row h-fit mt-24 w-full">
        <div className="md:p-8 p-4 mx-auto ml-10 my-10 bg-white rounded-3xl h-full w-3/4">
          <TimeEntries id={userID} />
        </div>
        <div className="items-center my-10 md:p-8 p-6 mx-16 bg-white rounded-3xl h-fit w-1/4">
          <div className="text-right">
            <h1 className="text-stone-950 text-xl font-extrabold">{userID}</h1>
          </div>
          <hr className="w-full border-stone-300 mt-4 mb-10" />
          <form
            className="max-w-lg w-full mx-auto"
            method="post"
            onSubmit={onSubmit}
          >
            <div className="m-3">
              <label className="text-stone-950 text-xs block mb-2">Name</label>
              <div className="relative flex items-center">
                <input
                  name="name"
                  type="text"
                  className="w-full text-sm border-b border-stone-300 focus:border-stone-800 px-2 py-3 outline-none"
                  placeholder="user name"
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
                  className="w-full text-sm border-b border-stone-300 focus:border-stone-800 px-2 py-3 outline-none"
                  placeholder="user email"
                />
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
                  className="text-center rounded w-full text-sm text-stone-500 border border-stone-400 h-8 px-2 mx-4 mt-2 outline-none"
                >
                  <option value="">Select</option>
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="hr">HR</option>
                  <option value="user">User</option>
                </select>
              </div>
            </div>
            {error && <span className="text-red-700 text-sm p-2">{error}</span>}
            <div className="mt-12">
              <input
                type="submit"
                value="Save changes"
                className="rounded-2xl w-full py-3 px-6 cursor-pointer text-sm font-semibold tracking-wider text-white bg-stone-950 hover:bg-stone-800 focus:outline-none"
              />
            </div>
          </form>
          <div className="mt-8">
            <DeleteEmployee id={userID} />
          </div>
        </div>
      </div>
    </>
  );
}
