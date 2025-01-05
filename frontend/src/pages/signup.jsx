import BottomWarning from "../components/bottomwarning";
import Button from "../components/button";
import Heading from "../components/heading";
import InputBox from "../components/Inputbox";
import Logo from "../components/logo";

export default function Signup() {
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
                type="text"
                name="firstname"
                placeholder="firstname"
                content="Firstname"
              />
              <InputBox
                type="text"
                name="lastname"
                placeholder="lastname"
                content="Lastname"
              />
              <InputBox
                type="password"
                name="password"
                placeholder="●●●●●●●"
                content="Password"
              />
              <InputBox
                type="password"
                name="password"
                placeholder="●●●●●●●"
                content="Confirm Password"
              />
              <Button content="Create an account"/>
              <BottomWarning content="Already have an account" type="Login Here" to="/signin"/>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
