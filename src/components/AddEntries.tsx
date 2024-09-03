"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Select, SelectItem } from "@nextui-org/react";
import { GET, POST } from "@/client";

export default function AddEntries() {
  const [modal, setModal] = useState(false);
  const [data, setData] = useState([]);
  const [type, setType] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const aman = selectedOptions.toString();
  const userIDs = aman.split(",");
  const pls = new Array();
  let token: string;

  {
    userIDs.map((id: any) => pls.push(id));
  }
  console.log("selected user ids: " + pls);

  useEffect(() => {
    const fetchData = async () => {
      token = localStorage.getItem("token") || "";

      try {
        const response: any = await GET("/api/users", {
          params: {
            header: {
              Authorization: `Bearer ${token}`,
            },
            query: {
              per_page: 100,
              page: 1,
            },
          },
        });
        const employees = response.data.data;
        setData(employees);
      } catch (err) {
        setError("An unexpected error occurred.");
        console.error(err);
      }
    };
    fetchData();
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
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
          date_time: formData.get("date_time")?.toString(),
          time_entry_type: type,
          user_ids: pls,
        },
      });

      if (response.response.status === 200) {
        router.push("/time-entries");
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
      <div className="w-fit">
        <button
          onClick={() => setModal(true)}
          type="button"
          className="w-fit rounded-2xl float-right py-3 px-6 cursor-pointer text-sm font-semibold tracking-wider text-white bg-green-800 hover:bg-green-700 focus:outline-none"
        >
          + Add time entries
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
              className="flex my-auto w-fit p-10 outline-none focus:outline-none"
            >
              <div className="items-center h-fit w-fit">
                <div className="flex items-center w-full md:p-8 p-6 rounded-3xl bg-white">
                  <form className="w-fit" method="post" onSubmit={onSubmit}>
                    <div className="mb-12">
                      <h1 className="text-stone-950 text-3xl text-center font-bold">
                        Add time entries
                      </h1>
                    </div>
                    <div className="m-3">
                      <label className="text-stone-950 text-xs block mt-4 mb-2 ">
                        Select employees
                      </label>
                      <div className="relative flex items-center size-full">
                        <div className="w-full h-full text-left">
                          <svg
                            className="w-[13px] h-[13px] fill-stone-500 float-right mt-3 mr-2"
                            viewBox="0 0 448 512"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path>
                          </svg>
                          <Select
                            value={selectedOptions}
                            onChange={(e: any) =>
                              setSelectedOptions(e.target.value)
                            }
                            aria-label="employees"
                            placeholder="Select"
                            selectionMode="multiple"
                            isMultiline={true}
                            selectorIcon={<svg></svg>}
                            className="w-full rounded text-center h-8 overflow-hidden absolute py-1 px-1 z-[1000] text-sm text-left text-stone-500 border border-stone-400 px-2 outline-none"
                          >
                            {data.map((employee: any) => (
                              <SelectItem
                                key={employee.id}
                                className="w-full py-2 h-fit px-4 text-left bg-stone-200 hover:bg-stone-300 rounded text-stone-600 border border-stone-400 border-collapse text-sm hover:text-stone-900 cursor-pointer"
                              >
                                {employee.name}
                              </SelectItem>
                            ))}
                          </Select>
                        </div>
                      </div>
                    </div>
                    <div className="m-3">
                      <label className="text-stone-950 text-xs block mt-4 pt-2 mb-2">
                        Date & time
                      </label>
                      <div className="relative flex items-center">
                        <input
                          name="date_time"
                          type="datetime-local"
                          required
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
                          value={type}
                          onChange={(e) => setType(e.target.value)}
                          required
                          className="w-full rounded text-sm text-stone-500 bg-transparent border border-stone-400 h-8 px-1 outline-none text-center"
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
                        value="Submit"
                        className="w-full rounded-2xl py-3 px-6 cursor-pointer text-sm font-semibold tracking-wider text-white bg-green-900 hover:bg-green-800 focus:outline-none"
                      />
                    </div>
                    <div className="mt-8">
                      <button
                        type="reset"
                        className="float-left rounded-2xl w-fit py-3 px-4 cursor-pointer text-sm font-semibold tracking-wider text-white bg-stone-800 hover:bg-stone-700 focus:outline-none"
                      >
                        Reset
                      </button>
                      <button
                        type="button"
                        className="w-2/4 float-right rounded-2xl py-3 px-6 cursor-pointer text-sm font-semibold tracking-wider text-white bg-stone-800 hover:bg-stone-700 focus:outline-none"
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
