"use client";

import "@/app/employees/styles.css";
import DeleteButton from "@/app/components/DeleteButton";
import Data from "@/app/employees/data.json";

import { useParams } from "next/navigation";

export default function ProfilePage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);

  return (
    <>
      <h1 className="pl-20 pt-10 text-stone-950 text-4xl font-extrabold">
        Employee profile
      </h1>
      <div className="items-center h-fit py-10 ml-20 mt-6 w-1/4">
        <div className="items-center md:p-8 p-6 bg-white rounded-3xl h-full">
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
                  required
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
                  required
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
                  required
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
                <select className="w-full text-sm text-stone-500 border border-stone-400 rounded h-8 px-2 mx-4 mt-2 outline-none">
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
                className="w-full py-3 px-6 cursor-pointer text-sm font-semibold tracking-wider rounded-full text-white bg-stone-950 hover:bg-stone-800 focus:outline-none"
              />
            </div>
          </form>
          <div className="mt-8">
            <DeleteButton />
          </div>
        </div>
      </div>
    </>
  );
}
