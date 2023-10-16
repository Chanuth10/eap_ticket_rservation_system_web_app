import { useEffect, useState } from "react";
import axios from "axios";
import { Reservations } from "./Reservation";

export const ReservationContainer = () => {
  const [reservationData, setReservationData] = useState();
  const [trainData, setTrainData] = useState();
  const [trainScheduleData, setTrainScheduleData] = useState();

  const [refetch, setRefetch] = useState(false);
  const [travelerData, setTravelerData] = useState();
  useEffect(() => {
    if (!reservationData) {
      axios
        .get("http://localhost:5246/api/v2/Reservations")
        .then((data) => setReservationData(data));
    }
    if (!trainData) {
      axios
        .get("http://localhost:5246/api/v2/Train")
        .then((data) => setTrainData(data));
    }
    setRefetch(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch]);

  useEffect(() => {
    axios
      .get("http://localhost:5246/api/v2/TravelarManager")
      .then((data) => setTravelerData(data));
    axios
      .get("http://localhost:5246/api/v2/Train")
      .then((data) => setTrainData(data));
    axios
      .get("http://localhost:5246/api/v2/TrainSchedule")
      .then((data) => setTrainScheduleData(data));
  }, []);

  //   {
  //     "id": "afcd534a2297ac9370eb8b8a",
  //     "userId": "6524073a5045f32f6b0cb773",
  //     "trainId": "97ADDCBFA22C8D96F67FF3D3",
  //     "reservationDate": "2023-10-09T14:38:36.161Z",
  //     "status": true,
  //     "email": "123@gmail.com",
  //     "created_at": "2023-10-09T14:38:36.161Z",
  //     "updated_at": "2023-10-09T14:38:36.161Z"
  // }

  const handleOnDeleteReservation = (id) => {
    axios
      .delete(`http://localhost:5246/api/v2/Reservations/${id}`)
      .then(() => setRefetch(true));
  };

  return (
    <Reservations
      setRefetch={setRefetch}
      handleOnDeleteReservation={handleOnDeleteReservation}
      reservationData={reservationData}
      trainData={trainData}
      travelerData={travelerData}
      trainScheduleData={trainScheduleData}
    />
  );
};
