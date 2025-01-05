import BottomWarning from "../components/bottomwarning";
import Button from "../components/button";
import Heading from "../components/heading";
import InputBox from "../components/Inputbox";
import Logo from "../components/logo";

export default function Signin() {
  return (
    <section className="bg-gray-50 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen">
        <div className="w-full bg-white rounded-lg shadow-lg md:mt-0 sm:max-w-md xl:p-0">
          <Logo />
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <Heading content="Create an account" />
            <form className="space-y-5 md:space-y-6">
              <InputBox
                type="email"
                name="email"
                placeholder="name@gmail.com"
                content="Your Email"
              />
              <InputBox
                type="password"
                name="password"
                placeholder="●●●●●●●"
                content="Password"
              />
              <Button content="Login" />
              <BottomWarning
                content="Don't have an account"
                type="Sign Up"
                to="/signup"
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
