import "./styles.css";

import EmployeeTable from "../components/EmployeeTable";

export default function EmployeesPage() {
  return (
    <>
      <div className="font-[sans-serif]">
        <h1 className="pl-20 pt-10 text-stone-950 text-4xl font-extrabold">
          Employees
        </h1>

        <div className="items-center px-32 py-12 h-fit m-auto">
          <EmployeeTable />
        </div>
      </div>
    </>
  );
}
