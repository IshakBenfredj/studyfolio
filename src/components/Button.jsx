// eslint-disable-next-line react/prop-types
export default function Button({ text, loading, clickFunc, danger }) {
  return (
    <button
      className={`w-full rounded-md ${
        loading ? "bg-gray-400 cursor-not-allowed" : danger ? "bg-red-500" : "bg-primary"
      } text-white font-semibold text-lg py-1`}
      onClick={!clickFunc || loading ? null : clickFunc}
    >
      {loading ? "Loading ..." : text}
    </button>
  );
}