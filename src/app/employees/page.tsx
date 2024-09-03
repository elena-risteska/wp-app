"use client";

import EmployeeTable from "@/components/EmployeeTable";
import AddEmployee from "@/components/AddEmployee";
import "../globals.css";

export default function EmployeesPage() {
  return (
    <>
      <div className="items-center mx-auto w-9/12 mt-32 mb-8 h-fit">
        <div className="flex flex-row">
          <AddEmployee />
        </div>
        <EmployeeTable />
      </div>
    </>
  );
}
