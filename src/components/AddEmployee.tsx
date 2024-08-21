import { useState } from "react";

export default function AddEmployee() {
  const [modal, setModal] = useState(false);

  return (
    <>
      <div className="w-full">
        <button
          onClick={() => setModal(true)}
          type="button"
          className="w-fit text-nowrap ml-4 py-3 px-6 mb-8 cursor-pointer text-sm font-semibold tracking-wider text-white bg-green-800 hover:bg-green-700 focus:outline-none"
        >
          + Add new employee
        </button>
      </div>
      {modal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className=" my-auto w-fit outline-none focus:outline-none">
              <div className="items-center h-fit w-fit">
                <div className="flex items-center md:p-8 p-6 bg-white h-full">
                  <form className="max-w-lg w-full mx-auto" action="#">
                    <div className="mb-12">
                      <h1 className="text-stone-950 text-4xl font-extrabold">
                        Add new employee
                      </h1>
                    </div>
                    <div className="m-3">
                      <label className="text-stone-950 text-xs block mb-2 ">
                        First name
                      </label>
                      <div className="relative flex items-center">
                        <input
                          name="first name"
                          type="text"
                          required
                          className="w-full text-sm border-b border-stone-300 focus:border-stone-800 px-2 py-3 outline-none"
                          placeholder="Enter first name"
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
                          placeholder="Enter last name"
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
                          type="text"
                          required
                          className="w-full text-sm border-b border-stone-300 focus:border-stone-800 px-2 py-3 outline-none"
                          placeholder="Enter email"
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
                        value="Add employee"
                        className="w-full py-3 px-6 cursor-pointer text-sm font-semibold tracking-wider text-white bg-green-900 hover:bg-green-800 focus:outline-none"
                      />
                    </div>
                    <button
                      type="button"
                      className="w-full my-3 py-3 px-6 cursor-pointer text-sm font-semibold tracking-wider text-white bg-stone-950 hover:bg-stone-800 focus:outline-none"
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
