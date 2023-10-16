import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [travelerData, setTravelerData] = useState();
  const [trainData, setTrainData] = useState();
  const [userData, setUserData] = useState();
  const [reservationData, setReservationData] = useState();
  const navigate = useNavigate();
  const localUser = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    axios
      .get("http://localhost:5246/api/v2/TravelarManager")
      .then((data) => setTravelerData(data));
    axios
      .get("http://localhost:5246/api/v2/AdminManager")
      .then((data) => setUserData(data));
    axios
      .get("http://localhost:5246/api/v2/Train")
      .then((data) => setTrainData(data));
    axios
      .get("http://localhost:5246/api/v2/Reservations")
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
              cursor: "pointer",
              alignItems: "center",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            }}
            onClick={() => navigate("/users")}>
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

              cursor: "pointer",
              alignItems: "center",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            }}
            onClick={() => navigate("/travelers")}>
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

              cursor: "pointer",
              marginTop: -56,
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            }}
            onClick={() => navigate("/reservations")}>
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
          {localUser?.data?.userType === "b-office" ? (
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

                cursor: "pointer",
                marginTop: -56,
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              }}
              onClick={() => navigate("/train")}>
              <p>Trains</p>
              <p>{trainData ? trainData.data.length : ""}</p>
            </Card>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Home;
