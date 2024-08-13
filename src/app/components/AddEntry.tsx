export default function AddEntry() {
  return (
    <>
      <div className="w-full">
        <button
          type="button"
          className="w-fit float-left ml-2 py-3 px-6 cursor-pointer text-sm font-semibold tracking-wider rounded-full text-white bg-green-800 hover:bg-green-700 focus:outline-none"
        >
          + Add time entry
        </button>
      </div>
    </>
  );
}
