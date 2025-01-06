import UserIcon from "./usericon";
export default function DashboardHeader({user}) {
  return (
    <div className="flex justify-between border-b-2 pb-4">
      <div className="flex justify-center items-center">
        <img src="/images/digital-wallet.png" className="max-w-12 " />
        <p className="text-xl font-bold ml-4">Skar Pay</p>
      </div>
      <div className="flex justify-center items-center">
        <p className="inline text-lg font-medium">Hello, {user}</p>
        <UserIcon content={user.charAt(0)} />
      </div>
    </div>
  );
}
