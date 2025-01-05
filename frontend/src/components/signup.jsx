export default function Signup() {
  return (
    <section className="bg-gray-50 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen">
        <div className="w-full bg-white rounded-lg shadow-lg md:mt-0 sm:max-w-md xl:p-0">
          <div className="w-full items-center flex justify-center mt-4">
            <img src="./images/digital-wallet.png" className="max-w-12"/>
            <p className="text-2xl font-bold text-gray-900 ml-4">Skar Pay</p>
          </div>
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div>
              <p className="text-xl font-bold leading-tight tracking-tighter text-gray-900">
                Create an account
              </p>
            </div>
            <form className="space-y-5 md:space-y-6">
              <div>
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your email
                </label>
                <input
                  name="email"
                  id="email"
                  type="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-primary-600 block w-full p-2.5"
                  placeholder="name@email.com"
                ></input>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="firstname"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-primary-600 block w-full p-2.5"
                ></input>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="lastname"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-primary-600 block w-full p-2.5"
                ></input>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="●●●●●●●"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-primary-600 block w-full p-2.5"
                ></input>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Confirm password
                </label>
                <input
                  type="password"
                  placeholder="●●●●●●●"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-primary-600 block w-full p-2.5"
                ></input>
              </div>
              <div>
                <button className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                  Create an account
                </button>
              </div>
              <div>
                <p className="text-sm font-light text-gray-900">
                  Already have an account?{" "}
                  <span className="text-sm text-blue-600 hover:underline font-medium">
                    Login here
                  </span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
