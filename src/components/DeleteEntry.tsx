import { useState } from "react";

export default function DeleteEntry() {
  const [modal, setModal] = useState(false);

  return (
    <>
      <button
        type="button"
        className="w-fit float-right py-2 px-4 cursor-pointer text-sm font-semibold tracking-wider text-white bg-red-800 hover:bg-red-700 focus:outline-none"
        onClick={() => setModal(true)}
      >
        Delete
      </button>
      {modal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="my-auto w-fit outline-none focus:outline-none">
              <div className="items-center h-fit w-fit">
                <div className="flex items-center md:p-8 p-6 bg-white h-full">
                  <form className="max-w-lg w-full mx-auto" action="#">
                    <div className="mb-12">
                      <h1 className="text-stone-950 text-center text-3xl font-extrabold">
                        Are you sure you want to delete this time entry?
                      </h1>
                    </div>
                    <div className="mt-8">
                      <button
                        type="button"
                        className="w-1/4 float-left py-3 px-6 cursor-pointer text-sm font-semibold tracking-wider text-white bg-stone-800 hover:bg-stone-700 focus:outline-none"
                        onClick={() => {
                          setModal(false);
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="w-2/4 float-right py-3 px-6 cursor-pointer text-sm font-semibold tracking-wider text-white bg-red-800 hover:bg-red-700 focus:outline-none"
                      >
                        Delete
                      </button>
                    </div>
                  </form>
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
