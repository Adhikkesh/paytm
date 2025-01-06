export default function Balance({ balance }) {
  return (
    <div className="flex gap-x-6 mt-4 border-b-2 pb-4 items-center">
      <p className="font-bold text-xl">Your Balance:</p>
      <p className="font-bold text-xl">${balance}</p>
    </div>
  );
}
