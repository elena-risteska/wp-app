export default function AddButton() {
  return (
    <>
      <div className="w-full">
        <a href="add-employee">
          <button
            type="button"
            className="w-fit float-right mr-20 py-3 px-6 mb-8 cursor-pointer text-sm font-semibold tracking-wider rounded-full text-white bg-green-800 hover:bg-green-700 focus:outline-none"
          >
            + Add new employee
          </button>
        </a>
      </div>
    </>
  );
}
