export default function Button({ content }) {
  return (
    <div>
      <button className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
        {content}
      </button>
    </div>
  );
}
