"use client";

import { useState } from "react";

import Dropdown from "./Dropdown";

export default function AddEntries() {
  const [modal, setModal] = useState(false);
  const [dataValue, setDataValue] = useState(false);
  const [selectValue, setSelectValue] = useState(false);

  return (
    <>
      <div className="w-full">
        <button
          onClick={() => setModal(true)}
          type="button"
          className="w-fit py-3 px-6 mb-8 cursor-pointer text-sm font-semibold tracking-wider text-white bg-green-800 hover:bg-green-700 focus:outline-none"
        >
          + Add time entries
        </button>
      </div>
      {modal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="flex my-auto w-fit p-10 outline-none focus:outline-none">
              <div className="items-center h-fit w-fit">
                <div className="flex items-center w-full md:p-8 p-6 bg-white">
                  <form className="w-fit" action="#">
                    <div className="mb-12">
                      <h1 className="text-stone-950 text-4xl text-center font-extrabold">
                        Add time entries
                      </h1>
                    </div>
                    <div className="m-3">
                      <label className="text-stone-950 text-xs block mt-4 mb-2 ">
                        Select employees
                      </label>
                      <div className="relative flex items-center size-full">
                        <Dropdown />
                      </div>
                    </div>
                    <div className="m-3">
                      <label className="text-stone-950 text-xs block mt-4 mb-2 ">
                        Date
                      </label>
                      <div className="relative flex items-center">
                        <input
                          disabled={selectValue === true && true}
                          onChange={() => setDataValue(true)}
                          name="date"
                          type="date"
                          required
                          className="w-full text-sm border-b border-stone-300 focus:border-stone-800 px-2 py-3 outline-none"
                        />
                      </div>
                    </div>
                    <div className="m-3">
                      <label className="text-stone-950 text-xs block mb-2 ">
                        Clock in
                      </label>
                      <div className="relative flex items-center">
                        <input
                          disabled={selectValue === true && true}
                          onChange={() => setDataValue(true)}
                          name="clock in"
                          type="time"
                          required
                          className="w-full text-sm border-b border-stone-300 focus:border-stone-800 px-2 py-3 outline-none"
                        />
                      </div>
                    </div>
                    <div className="m-3">
                      <label className="text-stone-950 text-xs block mb-2 ">
                        Clock out
                      </label>
                      <div className="relative flex items-center">
                        <input
                          disabled={selectValue === true && true}
                          onChange={() => setDataValue(true)}
                          name="clock out"
                          type="time"
                          required
                          className="w-full text-sm border-b border-stone-300 focus:border-stone-800 px-2 py-3 outline-none"
                        />
                      </div>
                    </div>
                    <div className="m-3">
                      <label className="text-stone-950 text-xs block mb-2 ">
                        Choose other option
                      </label>
                      <div className="relative flex items-center">
                        <select
                          disabled={dataValue === true && true}
                          onChange={() => setSelectValue(true)}
                          className="w-full text-sm text-stone-500 border border-stone-400 h-8 px-1 outline-none text-center"
                        >
                          <option value="">Select</option>
                          <option value="holiday">Holiday</option>
                          <option value="parental leave">Parental leave</option>
                        </select>
                      </div>
                    </div>

                    <div className="mt-12">
                      <input
                        type="submit"
                        value="Submit"
                        className="w-full py-3 px-6 cursor-pointer text-sm font-semibold tracking-wider text-white bg-green-900 hover:bg-green-800 focus:outline-none"
                      />
                    </div>
                    <div className="mt-8">
                      <button
                        type="reset"
                        onClick={() => {
                          setDataValue(false);
                          setSelectValue(false);
                        }}
                        className="float-left w-1/4 py-3 px-4 cursor-pointer text-sm font-semibold tracking-wider text-white bg-stone-800 hover:bg-stone-700 focus:outline-none"
                      >
                        Reset
                      </button>
                      <button
                        type="button"
                        className="w-2/4 float-right py-3 px-6 cursor-pointer text-sm font-semibold tracking-wider text-white bg-stone-800 hover:bg-stone-700 focus:outline-none"
                        onClick={() => {
                          setDataValue(false);
                          setSelectValue(false);
                          setModal(false);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
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
