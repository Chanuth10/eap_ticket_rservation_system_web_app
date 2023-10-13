import { useEffect, useState } from "react";
import axios from "axios";
import { Travelers } from "./Travelers";

export const TravelerContainer = () => {
  const [travelerData, setTravelerData] = useState();
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    if (refetch) {
      axios
        .get("http://localhost:5000/api/v2/TravelarManager")
        .then((data) => setTravelerData(data));
    }
    setRefetch(false);
  }, [refetch]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v2/TravelarManager")
      .then((data) => setTravelerData(data));
  }, []);

  const handleOnDeleteTraveler = (nic) => {
    axios
      .delete(`http://localhost:5000/api/v2/TravelarManager/${nic}`)
      .then(() => setRefetch(true));
  };
  const localUser = JSON.parse(localStorage.getItem("user"));

  const handleOnChangeStatus = (user) => {
    console.log(localUser);
    if (localUser && localUser.data.userType === "b-office") {
      const object = {
        id: user.id,
        userName: user.userName,
        nic: user.nic,
        password: user.password,
        email: user.email,
        isActive: !user.isActive,
      };

      axios
        .put(
          `http://localhost:5000/api/v2/TravelarManager/updateTravelarStatus/${user.id}`,
          object
        )
        .then(() => setRefetch(true));
    }
  };

  return (
    <Travelers
      travelerData={travelerData}
      setRefetch={setRefetch}
      handleOnDeleteTraveler={handleOnDeleteTraveler}
      handleOnChangeStatus={handleOnChangeStatus}
    />
  );
};
