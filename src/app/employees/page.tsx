"use client";

import "./styles.css";

import EmployeeTable from "../components/EmployeeTable";
import AddButton from "../components/AddButton";

export default function EmployeesPage() {
  return (
    <>
      <h1 className="pl-20 pt-10 text-stone-950 text-4xl font-extrabold">
        Employees
      </h1>

      <div className="items-center px-32 py-6 h-fit m-auto">
        <AddButton />
        <EmployeeTable />
      </div>
    </>
  );
}
