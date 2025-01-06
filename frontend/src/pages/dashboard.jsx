import { useEffect, useState } from "react";
import Button from "../components/button";
import User from "../components/user";
import UserIcon from "../components/usericon";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ClickButton from "../components/onClickButton";
import DashboardHeader from "../components/DashboardHeader";
import Balance from "../components/balance";
import InputDashboard from "../components/dashboardinput";

export default function Dashboard() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");
  const [balance, setBalance] = useState(0);
  const [filter, setFilter] = useState("");
  const [userArray, setuserArray] = useState([]);
  const navigate = useNavigate();

  async function fetchUser(filter = "",currentusername = username) {
    const response1 = await axios.get(
      "http://localhost:3000/api/v1/user/bulk",
      { params: { filter: filter } }
    );
    const arr = response1.data.users;
    const filteredArray = arr.filter((e) => e.username !== currentusername);
    setuserArray(filteredArray);
    console.log("currentUser" + currentusername);
    console.log(filteredArray);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/user/getuser",
          {},
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        if (response.data) {
          setUser(response.data.name);
          setBalance(response.data.balance);
          setUsername(response.data.username);
          await fetchUser(filter,response.data.username);
        }
      } catch (err) {
        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.removeItem("token");
          navigate("/signin");
        }
        console.error("Error Occured " + err);
      }
    };
    fetchData();
  }, []);

  if (!user) {
    return <div>Loading ... </div>;
  }

  function handleChange(e) {
    setFilter(e.target.value);
  }

  return (
    <div className="p-6">
      <DashboardHeader user={user} />
      <Balance balance={balance} />

      <div className="flex flex-col gap-y-4">
        <p className="text-xl font-semibold text-gray-800">Users</p>
        <div className="flex gap-x-8">
          <InputDashboard handleChange={handleChange} filter={filter} />
          <ClickButton
            content="Find"
            handleClick={() => fetchUser(filter)}
            value={filter}
          />
        </div>
      </div>

      <div className="flex flex-col justify-center mt-6 gap-y-4">
        {userArray.map((e, index) => (
          <User name={e.firstname} key={index} />
        ))}
      </div>
    </div>
  );
}
