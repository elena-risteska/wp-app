"use client";

import { useParams } from "next/navigation";

import "@/app/employees/styles.css";
import Data from "@/app/employees/data.json";
import TimeEntries from "@/app/components/TimeEntries";
import DeleteEmployee from "@/app/components/DeleteEmployee";

export default function ProfilePage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const name = Data[id - 1].firstName;

  return (
    <>
      <a href="/employees">
        <svg
          className="ml-10 mt-6 w-[40px] h-[40px] fill-[#000000]"
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM217.4 376.9L117.5 269.8c-3.5-3.8-5.5-8.7-5.5-13.8s2-10.1 5.5-13.8l99.9-107.1c4.2-4.5 10.1-7.1 16.3-7.1c12.3 0 22.3 10 22.3 22.3l0 57.7 96 0c17.7 0 32 14.3 32 32l0 32c0 17.7-14.3 32-32 32l-96 0 0 57.7c0 12.3-10 22.3-22.3 22.3c-6.2 0-12.1-2.6-16.3-7.1z"></path>
        </svg>
      </a>
      <div className="flex flex-row h-fit w-full">
        <div className="md:p-8 p-4 mx-auto ml-10 my-10 bg-white rounded-3xl h-full w-3/4">
          <TimeEntries />
        </div>
        <div className="items-center my-10 md:p-8 p-6 mx-16 bg-white rounded-3xl h-fit w-1/4">
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
            <DeleteEmployee />
          </div>
        </div>
      </div>
    </>
  );
}
