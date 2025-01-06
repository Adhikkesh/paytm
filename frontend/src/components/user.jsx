import UserIcon from "./usericon";

export default function User({ name,id }) {
  return (
      <div className="flex justify-center items-center gap-x-4">
        <UserIcon content={name.charAt(0)} />
        <p className="text-xl font-medium">{name}</p>
      </div>
  );
}
