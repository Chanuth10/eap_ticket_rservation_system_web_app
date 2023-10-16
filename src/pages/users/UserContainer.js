import { useEffect, useState } from "react";
import { Users } from "./Users";
import axios from "axios";

export const UserContainer = () => {
  const [userData, setUserData] = useState();
  const [refetch, setRefetch] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:5246/api/v2/AdminManager")
      .then((data) => setUserData(data));
  }, [refetch]);

  const handleOnDeleteUser = (id) => {
    axios.delete(`http://localhost:5246/api/v2/AdminManager/${id}`);
  };

  return (
    <Users
      userData={userData}
      setRefetch={setRefetch}
      handleOnDeleteUser={handleOnDeleteUser}
    />
  );
};
