import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

const Home = () => {
  const [travelerData, setTravelerData] = useState();
  const [trainData, setTrainData] = useState();
  const [userData, setUserData] = useState();
  const [reservationData, setReservationData] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v2/TravelarManager")
      .then((data) => setTravelerData(data));
    axios
      .get("http://localhost:5000/api/v2/AdminManager")
      .then((data) => setUserData(data));
    axios
      .get("http://localhost:5000/api/v2/Train")
      .then((data) => setTrainData(data));
    axios
      .get("http://localhost:5000/api/v2/Reservations")
      .then((data) => setReservationData(data));
  }, []);
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}>
      <div
        style={{
          width: "100%",
          height: "50%",
          display: "flex",
          flexDirection: "row",
        }}>
        <div
          style={{
            width: "50%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Card
            style={{
              width: "65%",
              height: "50%",
              display: "flex",
              flexDirection: "column",
              gap: 2,
              fontWeight: "bold",
              fontSize: 20,
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            }}>
            <p>Staff</p>
            <p>{userData ? userData.data.length : ""}</p>
          </Card>
        </div>
        <div
          style={{
            width: "50%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Card
            style={{
              width: "65%",
              height: "50%",
              display: "flex",
              flexDirection: "column",
              gap: 4,
              fontSize: 20,
              fontWeight: "bold",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            }}>
            <p>Travelers</p>
            <p>{travelerData ? travelerData.data.length : ""}</p>
          </Card>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          height: "50%",
          display: "flex",
          flexDirection: "row",
        }}>
        <div
          style={{
            width: "50%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Card
            style={{
              width: "65%",
              height: "50%",
              display: "flex",
              flexDirection: "column",
              fontSize: 20,
              gap: 4,
              fontWeight: "bold",
              justifyContent: "center",
              alignItems: "center",
              marginTop: -56,
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            }}>
            <p>Reservations</p>
            <p>{reservationData ? reservationData.data.length : ""}</p>
          </Card>
        </div>
        <div
          style={{
            width: "50%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Card
            style={{
              width: "65%",
              height: "50%",
              fontSize: 20,
              display: "flex",
              flexDirection: "column",
              gap: 4,
              fontWeight: "bold",
              justifyContent: "center",
              alignItems: "center",
              marginTop: -56,
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            }}>
            <p>Trains</p>
            <p>{trainData ? trainData.data.length : ""}</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
