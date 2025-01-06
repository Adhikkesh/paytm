export default function InputDashboard({handleChange,filter}) {
  return (
    <input
      className="bg-gray-50 min-w-96 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-primary-600 block p-3"
      placeholder="Search Users..."
      onChange={handleChange}
      name="input"
      value={filter}
    ></input>
  );
}
