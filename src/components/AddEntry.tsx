"use client";

import { POST } from "@/client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function AddEntry({ userID }: any) {
  const [modal, setModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [type, setType] = useState("");
  const router = useRouter();
  let token: string;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    console.log("userID: " + userID.valueOf());
    event.preventDefault();
    token = localStorage.getItem("token") || "";
    const formData = new FormData(event.currentTarget);
    try {
      const response: any = await POST("/api/time-entries/create", {
        params: {
          header: {
            Authorization: `Bearer ${token}`,
          },
        },
        body: {
          date_time: formData.get("date_time")?.valueOf().toString(),
          time_entry_type: type,
          user_ids: [userID],
        },
      });

      if (response.response.status === 200) {
        router.push(`/employees/${userID}/edit`);
      } else {
        // setError(`Error: ${response.response.statusText || "Unknown error"}`);
      }
      console.log(response);
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
          className="rounded-2xl w-fit float-left py-3 px-6 mb-8 cursor-pointer text-sm font-semibold tracking-wider text-white bg-teal-800 hover:bg-teal-700 focus:outline-none"
        >
          + Add time entry
        </button>
      </div>
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
                  <form
                    className="max-w-lg w-full mx-auto"
                    method="post"
                    onSubmit={onSubmit}
                  >
                    <div className="mb-12">
                      <h1 className="text-stone-950 text-3xl font-bold">
                        Add new time entry
                      </h1>
                    </div>
                    <div className="m-3">
                      <label className="text-stone-950 text-xs block mb-2 ">
                        Date & time
                      </label>
                      <div className="relative flex items-center">
                        <input
                          name="date_time"
                          type="datetime-local"
                          required
                          className="w-full rounded-sm text-sm border-b border-stone-300 focus:border-stone-800 px-2 py-3 outline-none"
                        />
                      </div>
                    </div>
                    <div className="m-3">
                      <label className="text-stone-950 text-xs block mb-2 ">
                        Choose time entry
                      </label>
                      <div className="relative flex items-center">
                        <select
                          value={type}
                          onChange={(e) => setType(e.target.value)}
                          className="text-center rounded w-full text-sm text-stone-500 border border-stone-400 h-8 px-1 mx-4 outline-none"
                        >
                          <option value="">Select</option>
                          <option value="clock_in">Clock in</option>
                          <option value="clock_out">Clock out</option>
                          <option value="holiday">Holiday</option>
                          <option value="parental_leave">Parental leave</option>
                        </select>
                      </div>
                    </div>
                    {error && (
                      <span className="text-red-700 text-sm p-2">{error}</span>
                    )}
                    <div className="mt-12">
                      <input
                        type="submit"
                        value="Add time entry"
                        className="rounded-2xl w-full py-3 px-6 cursor-pointer text-sm font-semibold tracking-wider text-white bg-teal-900 hover:bg-teal-800 focus:outline-none"
                      />
                    </div>
                    <div className="mt-8">
                      <button
                        type="reset"
                        className="rounded-2xl float-left w-fit py-3 px-6 cursor-pointer text-sm font-semibold tracking-wider text-white bg-stone-800 hover:bg-stone-700 focus:outline-none"
                      >
                        Reset
                      </button>
                      <button
                        type="button"
                        className="rounded-2xl w-2/4 float-right py-3 px-6 cursor-pointer text-sm font-semibold tracking-wider text-white bg-stone-800 hover:bg-stone-700 focus:outline-none"
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
