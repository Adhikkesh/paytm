import Button from "./button";
import UserIcon from "./usericon";

export default function User({ name }) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex justify-center items-center gap-x-4">
        <UserIcon content={name.charAt(0)} />
        <p className="text-xl font-medium">{name}</p>
      </div>
      <Button content="Send Money" />
    </div>
  );
}
