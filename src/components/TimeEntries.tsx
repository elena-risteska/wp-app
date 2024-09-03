import { useState, useEffect } from "react";
import { GET } from "@/client";
import AddEntry from "./AddEntry";
import DeleteEntry from "./DeleteEntry";
import EditEntry from "./EditEntry";

export default function TimeEntries(id: any) {
  const [data, setData] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const lastIndex = currentPage * recordsPerPage;
  const startIndex = lastIndex - recordsPerPage;
  const numberOfPages = Math.ceil(data.length / recordsPerPage);
  const records = data.slice(startIndex, lastIndex);
  const userID = id.id;
  let token: string;

  function nextPage() {
    if (currentPage != numberOfPages) {
      setCurrentPage((prev) => prev + 1);
    }
  }

  function prevPage() {
    if (currentPage != 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }

  function handleChange(e: { target: { value: string } }) {
    let n = parseInt(e.target.value);
    setRecordsPerPage(n);
  }

  useEffect(() => {
    console.log("userID: " + userID);
    const fetchData = async () => {
      token = localStorage.getItem("token") || "";

      try {
        const response: any = await GET(`/api/user/{user_id}/time-entries`, {
          params: {
            header: {
              Authorization: `Bearer ${token}`,
            },
            query: {
              per_page: 100,
              page: 1,
            },
            path: {
              user_id: userID,
            },
          },
        });

        const entries = response.data.data;
        setData(entries);

        if (response.response.status !== 200) {
          setError(`Error: ${response.response.statusText || "Unknown error"}`);
        }
      } catch (err) {
        setError("An unexpected error occurred.");
        console.error(err);
      }
    };
    fetchData();
  }, [id]);

  return (
    <>
      <AddEntry userID={userID} />
      <h2 className="mr-6 text-right text-stone-950 text-xl font-extrabold">
        Time entries
      </h2>
      <div className="mt-12 w-full">
        {records.map((entry: any) => (
          <div key={entry.id} className="flex">
            <div className="my-4 md:p-6 p-4 bg-stone-100 rounded-3xl h-fit w-full">
              <p className="text-nowrap items-center justify-center text-sm w-6 h-8">
                Date: {entry.date}
              </p>
              <p className="text-nowrap items-center justify-center text-sm w-6 h-8">
                Entry type: {entry.time}
              </p>
              <p className="text-nowrap items-center justify-center text-sm w-6 h-8">
                Clock in: {entry.time}
              </p>
              <p className="text-nowrap items-center justify-center text-sm w-6 h-8">
                Clock out: {entry.time}
              </p>
              <p className="text-nowrap items-center justify-center text-sm w-6 h-8">
                Duration time: {entry.time}
              </p>
              <DeleteEntry userID={userID} entryID={entry.id} />
              <EditEntry userID={userID} entryID={entry.id} />
            </div>
          </div>
        ))}
      </div>
      <div className="md:flex m-auto mt-8 w-10/12">
        <span className="text-sm text-stone-500 flex-1">
          Showing {startIndex + 1} to{" "}
          {lastIndex > data.length ? data.length : lastIndex} of {data.length}{" "}
          records
        </span>
        <div className="flex items-center max-md:mt-4">
          <p className="text-sm text-stone-500">Display</p>
          <select
            value={recordsPerPage}
            onChange={handleChange}
            className="rounded-sm text-sm text-stone-500 border border-stone-400 h-8 px-1 mx-4 outline-none"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="50">50</option>
          </select>
          <div className="flex space-x-1 ml-4">
            <button
              type="button"
              onClick={() => prevPage()}
              className="rounded flex items-center justify-center cursor-pointer bg-stone-200 hover:bg-stone-300 w-8 h-8"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 fill-stone-500"
                viewBox="0 0 55.753 55.753"
              >
                <path
                  d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
                  data-original="#000000"
                />
              </svg>
            </button>
            <span className="flex items-center justify-center text-sm w-6 h-8">
              {currentPage}
            </span>
            <span className="flex items-center justify-center text-sm w-6 h-8">
              /
            </span>
            <span className="flex items-center justify-center text-sm w-6 h-8">
              {numberOfPages}
            </span>
            <button
              type="button"
              onClick={() => nextPage()}
              className="rounded-sm flex items-center justify-center cursor-pointer bg-stone-200 hover:bg-stone-300 w-8 h-8"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 fill-stone-500 rotate-180"
                viewBox="0 0 55.753 55.753"
              >
                <path
                  d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
                  data-original="#000000"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {error && alert({ error })}
    </>
  );
}
