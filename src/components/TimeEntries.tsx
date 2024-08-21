import AddEntry from "./AddEntry";
import DeleteEntry from "./DeleteEntry";
import EditEntry from "./EditEntry";

import Headings from "@/headings.json";

export default function TimeEntries() {
  return (
    <>
      <AddEntry />
      <h2 className="mr-6 text-right text-stone-950 text-xl font-extrabold">
        Time entries
      </h2>
      <div className="mt-12 w-full">
        {Headings.map((heading) => (
          <div className="flex">
            <div className="my-4 md:p-6 p-4 bg-stone-100 h-fit w-full">
              <p className="text-nowrap items-center justify-center text-sm w-6 h-8">
                Date: {heading.value}
              </p>
              <p className="text-nowrap items-center justify-center text-sm w-6 h-8">
                Clock in: {heading.value}
              </p>
              <p className="text-nowrap items-center justify-center text-sm w-6 h-8">
                Clock out: {heading.value}
              </p>
              <DeleteEntry />
              <EditEntry />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
