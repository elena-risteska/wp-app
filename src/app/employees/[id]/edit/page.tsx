"use client";

import { useParams } from "next/navigation";

import "../../../globals.css";
import Data from "@/data.json";
import TimeEntries from "@/components/TimeEntries";
import DeleteEmployee from "@/components/DeleteEmployee";

export default function ProfilePage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const name = Data[id - 1].firstName;

  return (
    <>
      <div className="flex flex-row h-fit mt-24 w-full">
        <div className="md:p-8 p-4 mx-auto ml-10 my-10 bg-white h-full w-3/4">
          <TimeEntries />
        </div>
        <div className="items-center my-10 md:p-8 p-6 mx-16 bg-white h-fit w-1/4">
          <div className="text-right mr-6">
            <h1 className="text-stone-950 text-xl font-extrabold">
              {Data[id - 1].firstName + " " + Data[id - 1].lastName}
            </h1>
          </div>
          <hr className="w-full border-stone-300 mt-4 mb-10" />
          <form className="max-w-lg w-full mx-auto" action="#">
            <div className="m-3">
              <label className="text-stone-950 text-xs block mb-2">
                First name
              </label>
              <div className="relative flex items-center">
                <input
                  name="first name"
                  type="text"
                  className="w-full text-sm border-b border-stone-300 focus:border-stone-800 px-2 py-3 outline-none"
                  placeholder={Data[id - 1].firstName}
                />
              </div>
            </div>
            <div className="m-3">
              <label className="text-stone-950 text-xs block mb-2 ">
                Last name
              </label>
              <div className="relative flex items-center">
                <input
                  name="last name"
                  type="text"
                  className="w-full text-sm border-b border-stone-300 focus:border-stone-800 px-2 py-3 outline-none"
                  placeholder={Data[id - 1].lastName}
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
                  placeholder={Data[id - 1].email}
                />
              </div>
            </div>
            <div className="m-3">
              <label className="text-stone-950 text-xs block mb-2 ">
                Position
              </label>
              <div className="relative flex items-center">
                <select className="w-full text-sm text-stone-500 border border-stone-400 h-8 px-2 mx-4 mt-2 outline-none">
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="HR">HR</option>
                  <option value="user">User</option>
                </select>
              </div>
            </div>

            <div className="mt-12">
              <input
                type="submit"
                value="Save changes"
                className="w-full py-3 px-6 cursor-pointer text-sm font-semibold tracking-wider text-white bg-stone-950 hover:bg-stone-800 focus:outline-none"
              />
            </div>
          </form>
          <div className="mt-8">
            <DeleteEmployee />
          </div>
        </div>
      </div>
    </>
  );
}
