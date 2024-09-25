import { GET } from "@/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function GenerateEntries() {
  const [modal, setModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  let token: string;

  async function onClick() {
    token = localStorage.getItem("token") || "";

    try {
      const response = await GET("/api/time-entries/generate", {
        params: {
          header: {
            Authorization: `Bearer ${token}`,
          },
        },
      });

      if (
        response.response.status === 200 ||
        response.response.status === 201
      ) {
        router.push("/time-entries");
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
      <div className="w-fit">
        <button
          onClick={() => setModal(true)}
          type="button"
          className="w-fit rounded-2xl float-right py-3 px-6 mb-8 cursor-pointer text-sm font-semibold tracking-wider text-white bg-teal-800 hover:bg-teal-700 focus:outline-none"
        >
          Generate time entries
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
                  <div className="max-w-lg w-full mx-auto">
                    <div className="mb-12">
                      <h1 className="text-stone-950 text-center text-3xl font-bold">
                        Are you sure you want to generate<br></br>time entries
                        for the previous week?
                      </h1>
                    </div>
                    <div className="mt-8">
                      <button
                        type="button"
                        className="w-1/4 float-left rounded-2xl py-3 px-6 cursor-pointer text-sm font-semibold tracking-wider text-white bg-stone-800 hover:bg-stone-700 focus:outline-none"
                        onClick={() => {
                          setModal(false);
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={onClick}
                        type="button"
                        className="w-2/4 float-right rounded-2xl py-3 px-6 cursor-pointer text-sm font-semibold tracking-wider text-white bg-teal-800 hover:bg-teal-700 focus:outline-none"
                      >
                        Generate
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {/* {error && alert({ error })} */}
    </>
  );
}
