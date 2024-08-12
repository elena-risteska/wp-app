export default function AddEmployeePage() {
  return (
    <>
      <div className="font-[sans-serif] bg-stone-300 md:h-screen">
        <div className="flex items-center h-fit w-fit m-auto py-20">
          <div className="flex items-center md:p-8 p-6 bg-white rounded-3xl h-full">
            <form className="max-w-lg w-full mx-auto" action="#">
              <div className="mb-12">
                <h1 className="text-stone-950 text-4xl font-extrabold">
                  Add new employee
                </h1>
              </div>
              <div className="m-3">
                <label className="text-stone-950 text-xs block mb-2 ">
                  First name
                </label>
                <div className="relative flex items-center">
                  <input
                    name="first name"
                    type="text"
                    required
                    className="w-full text-sm border-b border-stone-300 focus:border-stone-800 px-2 py-3 outline-none"
                    placeholder="Enter first name"
                  />
                </div>
              </div>
              <div className="m-3">
                <label className="text-stone-950 text-xs block mb-2 ">
                  Last name
                </label>
                <div className="relative flex items-center">
                  <input
                    name="last name"
                    type="text"
                    required
                    className="w-full text-sm border-b border-stone-300 focus:border-stone-800 px-2 py-3 outline-none"
                    placeholder="Enter last name"
                  />
                </div>
              </div>
              <div className="m-3">
                <label className="text-stone-950 text-xs block mb-2 ">
                  Email
                </label>
                <div className="relative flex items-center">
                  <input
                    name="email"
                    type="text"
                    required
                    className="w-full text-sm border-b border-stone-300 focus:border-stone-800 px-2 py-3 outline-none"
                    placeholder="Enter email"
                  />
                </div>
              </div>
              <div className="m-3">
                <label className="text-stone-950 text-xs block mb-2 ">
                  Position
                </label>
                <div className="relative flex items-center">
                  <select className="w-full text-sm text-stone-500 border border-stone-400 rounded h-8 px-2 mx-4 mt-2 outline-none">
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="HR">HR</option>
                    <option value="user">User</option>
                  </select>
                </div>
              </div>
              <div className="mt-12">
                <input
                  type="submit"
                  value="Add employee"
                  className="w-full py-3 px-6 cursor-pointer text-sm font-semibold tracking-wider rounded-full text-white bg-stone-950 hover:bg-stone-800 focus:outline-none"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
