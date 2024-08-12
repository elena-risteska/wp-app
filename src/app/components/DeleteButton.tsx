export default function DeleteButton() {
  function deleteEmployee() {}
  return (
    <>
      <button
        type="button"
        className="w-full py-3 px-6 cursor-pointer text-sm font-semibold tracking-wider rounded-full text-white bg-red-800 hover:bg-red-700 focus:outline-none"
        onClick={deleteEmployee}
      >
        Delete employee
      </button>
    </>
  );
}
