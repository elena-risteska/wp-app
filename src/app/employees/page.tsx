"use client";

import "../globals.css";

import EmployeeTable from "@/components/EmployeeTable";
import AddEmployee from "@/components/AddEmployee";
import AddEntries from "@/components/AddEntries";

export default function EmployeesPage() {
  return (
    <>
      <div className="items-center mx-32 mt-32 mb-8 h-fit">
        <div className="flex flex-row mr-14 float-right">
          <AddEntries />
          <AddEmployee />
        </div>
        <EmployeeTable />
      </div>
    </>
  );
}
