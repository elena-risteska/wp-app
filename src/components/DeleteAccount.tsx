import { DELETE } from "@/client";
import { useState } from "react";

export default function DeleteAccount(id: any) {
  const [modal, setModal] = useState(false);
  let token: string;

  // const onDelete = async () => {
  //   token = localStorage.getItem("token") || "";

  //   try {
  //     const response: any = await DELETE("/api/users/{user_id}", {
  //       params: {
  //         header: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //         path: id,
  //       },
  //     });
  //     console.log(response);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };
  return (
    <>
      <button
        type="button"
        className="w-fit rounded-2xl mr-16 mb-2 float-right py-3 px-6 cursor-pointer text-sm font-semibold tracking-wider text-white bg-red-800 hover:bg-red-700 focus:outline-none"
        onClick={() => setModal(true)}
      >
        Delete account
      </button>
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
                        Are you sure you want to<br></br>delete your account?
                      </h1>
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
                      <button
                        // onClick={onDelete}
                        type="submit"
                        className="w-2/4 float-right rounded-2xl py-3 px-6 cursor-pointer text-sm font-semibold tracking-wider text-white bg-red-800 hover:bg-red-700 focus:outline-none"
                      >
                        Delete
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
    </>
  );
}
