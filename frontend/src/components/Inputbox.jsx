export default function InputBox({type,name,placeholder,content,onChange,value}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {content}
      </label>
      <input
        name={name}
        type={type}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-primary-600 block w-full p-2.5"
        placeholder={placeholder}
        autoComplete="off"
        value={value}
        onChange={onChange}
      ></input>
    </div>
  );
}
