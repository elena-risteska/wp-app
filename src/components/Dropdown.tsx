// import {
//   Button,
//   Dropdown,
//   DropdownItem,
//   DropdownMenu,
//   DropdownTrigger,
// } from "@nextui-org/react";
// import { useState } from "react";

// import Data from "@/data.json";

// export default function Dropdowns() {
//   const [selectedKeys, setSelectedKeys] = useState(([]));

//   const selectedValue = React.useMemo(
//     () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
//     [selectedKeys]
//   );
//   return (

//     <>
//       <div className="w-full">
//         <Dropdown>
//           <DropdownTrigger>
//             <Button
//               type="button"
//               className="w-full text-sm text-stone-500 border border-stone-400 h-8 px-2 outline-none text-left"
//             >
//               Select employees
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="w-2 h-2 float-right mt-2 fill-stone-600 inline "
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   fill-rule="evenodd"
//                   d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
//                   clip-rule="evenodd"
//                   data-original="#000000"
//                 />
//               </svg>
//             </Button>
//           </DropdownTrigger>
//           <DropdownMenu
//           selectedKeys={selectedKeys}
//           onSelectionChange={setSelectedKeys}
//             closeOnSelect={false}
//             selectionMode="multiple"
//             className="block shadow-lg bg-stone-100 py-2 px-2 z-[1000] w-72 max-h-96 overflow-auto"
//           >
//             {Data.map((data) => (
//               <DropdownItem
//                 key={data.id.toString()}
//                 className="w-full py-2.5 px-4 hover:bg-stone-200 rounded text-black text-sm cursor-pointer"
//               >
//                 {data.firstName + " " + data.lastName}
//               </DropdownItem>
//             ))}
//           </DropdownMenu>
//         </Dropdown>
//       </div>
//     </>
//   );
// }
import { Select, SelectItem } from "@nextui-org/react";
import Data from "@/data.json";

export default function Dropdown() {
  return (
    <div className="w-full h-full text-left">
      <svg
        className="w-[13px] h-[13px] fill-stone-500 float-right mt-3 mr-2"
        viewBox="0 0 448 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path>
      </svg>
      <Select
        placeholder="Select"
        selectionMode="multiple"
        isMultiline={true}
        selectorIcon={<svg></svg>}
        className="w-full text-center h-8 overflow-hidden absolute py-2 px-1 z-[1000] text-sm text-left text-stone-500 border border-stone-400 px-2 outline-none"
      >
        {Data.map((employee) => (
          <SelectItem
            key={employee.id}
            className="w-full py-2.5 px-4 text-center bg-stone-100 hover:bg-stone-200 rounded text-black text-sm cursor-pointer"
          >
            {employee.firstName + " " + employee.lastName}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
