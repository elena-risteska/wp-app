"use client";

import { GET } from "@/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Headings from "@/headings.json";

export default function EmployeeTable() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const lastIndex = currentPage * recordsPerPage;
  const startIndex = lastIndex - recordsPerPage;
  const numberOfPages = Math.ceil(data.length / recordsPerPage);
  const records = data.slice(startIndex, lastIndex);
  const router = useRouter();
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
        console.log(employees);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <table className="w-11/12 m-auto bg-white overflow-hidden rounded-3xl">
        <thead className="whitespace-nowrap text-center bg-stone-900">
          <tr>
            <td className="w-1/12 p-4 text-xs font-semibold text-stone-200">
              #
            </td>
            {Headings.employees.map((heading) => (
              <td
                key={heading.key}
                className="w-1/6 p-4 text-xs font-semibold text-stone-200"
              >
                {heading.value}
              </td>
            ))}
          </tr>
        </thead>
        <tbody className="whitespace-nowrap text-center">
          {records.map((employee: any, index) => (
            <tr
              key={employee.id}
              className="hover:bg-stone-50 hover:cursor-pointer"
              onClick={() => router.push(`/employees/${employee.id}/edit`)}
            >
              <td className="p-4 text-[15px] text-stone-950">
                {(currentPage - 1) * recordsPerPage + index + 1}
              </td>
              <td className="p-4 text-[15px] text-stone-950">
                {employee.name}
              </td>
              <td className="p-4 text-[15px] text-stone-950">
                {employee.email}
              </td>
              <td className="p-4 text-[15px] text-stone-950">
                {employee.roles[0].name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
    </>
  );
}
