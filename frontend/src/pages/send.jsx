import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
export default function Send() {
  const [Id, setId] = useState("");
  const [fname, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const location = useLocation();
  const { id, name } = location.state || {};

  useEffect(() => {
    const validate = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          "http://localhost:3000/api/v1/user/getuser",
          {},
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        setName(name);
      } catch (err) {
        navigate("/signin");
        console.error(err);
      }
    };
    validate();
  },[]);

  async function handleSubmit() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/api/v1/account/transfer",
        { to: id, amount: amount },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setSuccess(response.data.message);
      setError("");
    } catch (err) {
      setError(err.response.data.error);
      setSuccess("");
    }
  }

  function handleChange(e) {
    setAmount(e.target.value);
  }

  return (
    <div className="flex flex-col justify-center items-center px-6 py-8 mx-auto md:h-screen">
      <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-6 p-6 space-y-4 md:space-y-6 sm:p-8">
        <div className="flex flex-col gap-y-6justify-center">
          <p className="font-bold text-xl">Send Money</p>
          {error && <p className="text-red-600">{error}</p>}
          {success && <p className="text-green-600">{success}</p>}
        </div>
        <div className="flex flex-col gap-y-6">
          <div className="flex gap-x-4 items-center">
            <div className="flex justify-center items-center bg-green-500 w-10 h-10 rounded-full">
              {fname.charAt(0)}
            </div>
            <div className="font-bold text-gray-900 text-xl">{name}</div>
          </div>
          <p className="text-sm font-medium text-gray-900">Amount (in Rs)</p>
          <div className="flex flex-col gap-y-6 justify-center items-center">
            <input
              className="bg-gray-50 min-w-96 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-primary-600 block p-3"
              placeholder="Enter amount"
              onChange={(e) => handleChange(e)}
              value={amount}
            ></input>
            <button
              onClick={() => handleSubmit()}
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Initiate Transfer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
