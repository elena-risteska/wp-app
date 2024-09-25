import { GET } from "@/client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import React from "react";
import * as XLSX from "xlsx";

export default function GenerateSpreadsheet() {
  const [modal, setModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(2024);
  const router = useRouter();
  let token: string;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    token = localStorage.getItem("token") || "";

    try {
      const response: any = await GET("/api/spreadsheet/generate", {
        params: {
          query: {
            month: month,
            year: year,
          },
          header: {
            Authorization: `Bearer ${token}`,
          },
        },
      });
      const nativeResponse = response.response;
      if (nativeResponse.status === 200 || nativeResponse.status === 201) {
        const blob = await nativeResponse.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `report_${month}_${year}.xlsx`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        router.push("/time-entries");
      } else {
        setError(`Error: ${response.response.statusText || "Unknown error"}`);
      }

      // const data: any = response.data;

      // const worksheet = XLSX.utils.json_to_sheet(data);
      // const workbook = XLSX.utils.book_new();
      // XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      // XLSX.writeFile(workbook, `report_${month}_${year}.xlsx`);

      // console.log(response);
      // if (response.response.status === 200) {
      //   router.push("/time-entries");
      // } else {
      //   setError(`Error: ${response.response.statusText || "Unknown error"}`);
      // }
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
          Generate spreadsheet
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
                    method="POST"
                    onSubmit={onSubmit}
                    className="max-w-lg w-full mx-auto"
                  >
                    <div className="mb-8">
                      <h1 className="text-stone-950 text-center text-3xl font-bold">
                        Generate spreadsheet<br></br>for all users
                      </h1>
                    </div>
                    <div className="m-3">
                      <label className="text-stone-950 text-xs block mb-2 ">
                        Month
                      </label>
                      <div className="relative flex items-center">
                        <select
                          value={month}
                          onChange={(e) => setMonth(Number(e.target.value))}
                          className="rounded w-full text-sm text-stone-500 border border-stone-400 h-8 px-2 mx-4 mt-2 outline-none"
                        >
                          <option value={0}>Select</option>
                          <option value={1}>January</option>
                          <option value={2}>February</option>
                          <option value={3}>March</option>
                          <option value={4}>April</option>
                          <option value={5}>May</option>
                          <option value={6}>June</option>
                          <option value={7}>July</option>
                          <option value={8}>August</option>
                          <option value={9}>September</option>
                          <option value={10}>October</option>
                          <option value={11}>November</option>
                          <option value={12}>December</option>
                        </select>
                      </div>
                    </div>
                    <div className="m-3">
                      <label className="text-stone-950 text-xs block mb-2 ">
                        Year
                      </label>
                      <div className="relative flex items-center">
                        <input
                          name="year"
                          type="number"
                          required
                          className="w-full text-sm border-b border-stone-300 focus:border-stone-800 px-2 py-3 outline-none"
                          placeholder="Enter year"
                          value={year}
                          onChange={(e) => setYear(Number(e.target.value))}
                        />
                      </div>
                    </div>
                    <div className="mt-8">
                      <button
                        type="button"
                        className="w-fit float-left rounded-2xl py-3 px-6 cursor-pointer text-sm font-semibold tracking-wider text-white bg-stone-800 hover:bg-stone-700 focus:outline-none"
                        onClick={() => {
                          setModal(false);
                        }}
                      >
                        Cancel
                      </button>
                      <input
                        type="submit"
                        value="Generate"
                        className="w-2/4 float-right rounded-2xl py-3 px-6 cursor-pointer text-sm font-semibold tracking-wider text-white bg-green-800 hover:bg-green-700 focus:outline-none"
                      />
                    </div>
                  </form>
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
