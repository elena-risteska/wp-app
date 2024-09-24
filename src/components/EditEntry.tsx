"use client";

import { PUT } from "@/client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function EditEntry({ userID, entryID }: any) {
  const [modal, setModal] = useState(false);
  const [role, setRole] = useState("select");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  let token: string;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    console.log("userID: " + userID.valueOf());
    console.log("entryID: " + entryID);
    event.preventDefault();
    token = localStorage.getItem("token") || "";
    const formData = new FormData(event.currentTarget);

    try {
      const response: any = await PUT("/api/time-entries/{entry_id}", {
        params: {
          header: {
            Authorization: `Bearer ${token}`,
          },
          path: {
            entry_id: entryID,
          },
        },
        body: {
          date: formData.get("date")?.valueOf().toString(),
          time: formData.get("time")?.valueOf().toString(),
          time_entry_type_id: 1,
        },
      });

      if (response.response.status === 200) {
        router.push(`/employees/${userID}/edit`);
      } else {
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
      <button
        onClick={() => setModal(true)}
        type="button"
        className="w-fit rounded-xl float-right py-2 px-4 mx-2 cursor-pointer text-sm font-semibold tracking-wider text-white bg-stone-800 hover:bg-stone-700 focus:outline-none"
      >
        Edit
      </button>
      {modal ? (
        <>
          <div
            onClick={() => setModal(false)}
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="my-auto w-fit outline-none focus:outline-none"
            >
              <div className="items-center h-fit w-fit">
                <div className="flex items-center md:p-8 p-6 bg-white rounded-3xl h-full">
                  <form className="max-w-lg w-full mx-auto" onSubmit={onSubmit}>
                    <div className="mb-12">
                      <h1 className="text-stone-950 text-3xl font-bold">
                        Edit time entry
                      </h1>
                    </div>
                    <div className="m-3">
                      <label className="text-stone-950 text-xs block mb-2 ">
                        Date
                      </label>
                      <div className="relative flex items-center">
                        <input
                          name="date"
                          type="date"
                          className="w-full rounded text-sm border-b border-stone-300 focus:border-stone-800 px-2 py-3 outline-none"
                        />
                      </div>
                    </div>
                    <div className="m-3">
                      <label className="text-stone-950 text-xs block mb-2 ">
                        Time
                      </label>
                      <div className="relative flex items-center">
                        <input
                          name="time"
                          type="time"
                          className="w-full rounded text-sm border-b border-stone-300 focus:border-stone-800 px-2 py-3 outline-none"
                        />
                      </div>
                    </div>
                    <div className="m-3">
                      <label className="text-stone-950 text-xs block mb-2 ">
                        Choose time entry
                      </label>
                      <div className="relative flex items-center">
                        <select
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          className="w-full text-center text-sm text-stone-500 border border-stone-400 h-8 px-1 mx-4 outline-none"
                        >
                          <option value="">Select</option>
                          <option value="clock in">Clock in</option>
                          <option value="clock out">Clock out</option>
                          <option value="holiday">Holiday</option>
                          <option value="parental leave">Parental leave</option>
                        </select>
                      </div>
                    </div>
                    {error && (
                      <span className="text-red-700 text-sm p-2">{error}</span>
                    )}
                    <div className="mt-12">
                      <input
                        type="submit"
                        value="Save changes"
                        className="w-full rounded-2xl py-3 px-6 cursor-pointer text-sm font-semibold tracking-wider text-white bg-stone-900 hover:bg-stone-800 focus:outline-none"
                      />
                    </div>
                    <div className="mt-8">
                      <button
                        type="reset"
                        onClick={() => {}}
                        className="float-left rounded-2xl w-1/3 py-3 px-4 cursor-pointer text-sm font-semibold tracking-wider text-white bg-stone-800 hover:bg-stone-700 focus:outline-none"
                      >
                        Reset
                      </button>
                      <button
                        type="button"
                        className="w-fit rounded-2xl float-right py-3 px-6 cursor-pointer text-sm font-semibold tracking-wider text-white bg-stone-800 hover:bg-stone-700 focus:outline-none"
                        onClick={() => {
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
