import { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { KeyGenerator } from "../../../features/keyGen/KeyGen";
import axios from "axios";
import moment from "moment";

export const CreateEditUserModal = ({
  isOpen,
  onClose,
  setRefetch,
  editReservation,
  type,
  trainData,
  travelerData,
  trainScheduleData,
}) => {
  const [travelerId, setTravelerId] = useState("");
  const [trainId, setTrainID] = useState("");
  const [trainScheduleID, setTrainScheduleID] = useState("");
  const [scheduleDate, SetScheduleDate] = useState("");
  const [price, setPrice] = useState("");
  const [email, setEmail] = useState("");
  const [key, setKey] = useState("");

  console.log("train", trainData?.data);
  console?.log("travelerData", travelerData?.data);
  console.log("trainScheduleData", trainScheduleData?.data);

  useEffect(() => {
    console.log("scheduleDate", scheduleDate);
  }, [scheduleDate]);

  useEffect(() => {
    if (!key) {
      setKey(KeyGenerator());
    }
  }, [key]);

  useEffect(() => {
    if (type === "edit") {
      setTrainID(editReservation.trainId);
      setTravelerId(editReservation.travelerId);
      setTrainScheduleID(editReservation.trainScheduleID);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnClose = () => {
    setTrainID("");
    setTrainScheduleID("");
    SetScheduleDate("");
    setEmail("");
    setKey("");
    onClose();
  };
  const handleOnSubmit = async () => {
    await axios
      .post("http://localhost:5000/api/v2/Reservations", {
        id: key,
        userId: travelerId,
        trainId: trainId,
        trainScheduleId: trainScheduleID,
        price: price,
        reservationDate: scheduleDate + ":00.000Z",
        status: true,
        email: email,
      })
      .then(() => {
        setRefetch && setRefetch((prev) => !prev);
        handleOnClose();
      });
  };

  const handleOnUpdate = async () => {
    await axios
      .put(`http://localhost:5000/api/v2/Reservations/${editReservation.id}`, {
        id: editReservation.id,
        userId: travelerId,
        trainId: trainId,
        trainScheduleId: trainScheduleID,
        price: price,
        reservationDate: scheduleDate + ":00.000Z",
        status: true,
        email: email,
      })
      .then(() => {
        setRefetch && setRefetch((prev) => !prev);
        handleOnClose();
      });
  };

  return type === "add" ? (
    <Modal show={isOpen} onHide={() => handleOnClose()}>
      <Modal.Header closeButton>
        <Modal.Title>Add Reservation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextUserName">
            <Form.Label column sm="2">
              Traveler
            </Form.Label>
            <Col sm="10">
              <select
                name="organization"
                onChange={(event) => {
                  setTravelerId(event.target.value);
                }}
                className="form-control">
                <option>Select Traveler</option>
                {travelerData &&
                  travelerData.data.map((item) => {
                    return <option value={item.id}>{item.userName}</option>;
                  })}
              </select>
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextUserName">
            <Form.Label column sm="2">
              Train
            </Form.Label>
            <Col sm="10">
              <select
                name="organization"
                onChange={(event) => {
                  setTrainID(event.target.value);
                }}
                className="form-control">
                <option>Select Train</option>
                {trainData &&
                  trainData.data.map((item) => {
                    return <option value={item.id}>{item.trainName}</option>;
                  })}
              </select>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextNIC">
            <Form.Label column sm="2">
              Schedule
            </Form.Label>
            <Col sm="10">
              <select
                name="organization"
                onChange={(event) => {
                  setTrainScheduleID(event.target.value);
                }}
                className="form-control">
                <option>Select Schedule</option>
                {trainScheduleData &&
                  (
                    trainScheduleData.data.filter(
                      (item) => item.trainId === trainId
                    ) || []
                  ).map((item) => {
                    return (
                      <option value={item.id}>
                        {item.departureStation} - {item.arrivalStation}
                      </option>
                    );
                  })}
              </select>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="2">
              Price
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="2">
              Res. Date
            </Form.Label>
            <Col sm="10">
              <input
                type="datetime-local"
                onChange={(e) => SetScheduleDate(e.target.value)}
                min={moment(new Date()).format("DD-MM-YYYY[T]hh:mm a")}
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword">
            <Form.Label column sm="2">
              Email
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleOnClose()}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => handleOnSubmit()}
          disabled={
            !travelerId ||
            !trainId ||
            !trainScheduleID ||
            !scheduleDate ||
            !price ||
            !email
          }>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  ) : (
    <Modal show={isOpen} onHide={() => handleOnClose()}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextUserName">
            <Form.Label column sm="2">
              Traveler
            </Form.Label>
            <Col sm="10">
              <select
                name="organization"
                value={travelerId}
                onChange={(event) => {
                  setTravelerId(event.target.value);
                }}
                className="form-control">
                <option>Select Traveler</option>
                {travelerData &&
                  travelerData.data.map((item) => {
                    return <option value={item.id}>{item.userName}</option>;
                  })}
              </select>
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextUserName">
            <Form.Label column sm="2">
              Train
            </Form.Label>
            <Col sm="10">
              <select
                name="organization"
                value={trainId}
                onChange={(event) => {
                  setTrainID(event.target.value);
                }}
                className="form-control">
                <option>Select Train</option>
                {trainData &&
                  trainData.data.map((item) => {
                    return <option value={item.id}>{item.trainName}</option>;
                  })}
              </select>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextNIC">
            <Form.Label column sm="2">
              Schedule
            </Form.Label>
            <Col sm="10">
              <select
                name="organization"
                value={trainScheduleID}
                onChange={(event) => {
                  setTrainScheduleID(event.target.value);
                }}
                className="form-control">
                <option>Select Schedule</option>
                {trainScheduleData &&
                  (
                    trainScheduleData.data.filter(
                      (item) => item.trainId === trainId
                    ) || []
                  ).map((item) => {
                    return (
                      <option value={item.id}>
                        {item.departureStation} - {item.arrivalStation}
                      </option>
                    );
                  })}
              </select>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="2">
              Price
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="2">
              Res. Date
            </Form.Label>
            <Col sm="10">
              <input
                type="datetime-local"
                onChange={(e) => SetScheduleDate(e.target.value)}
                min={moment(new Date()).format("DD-MM-YYYY[T]hh:mm a")}
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword">
            <Form.Label column sm="2">
              Email
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleOnClose()}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => handleOnUpdate()}
          disabled={
            !travelerId ||
            !trainId ||
            !trainScheduleID ||
            !scheduleDate ||
            !price ||
            !email
          }>
          Edit Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// {
//   "id": "string",
//   "userName": "string",
//   "nic": "string",
//   "password": "string",
//   "userType": "string",
//   "email": "string"
// }
