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

  useEffect(() => {
    if (!key) {
      setKey(KeyGenerator());
    }
  }, [key]);

  useEffect(() => {
    if (type === "edit") {
      setTrainID(editReservation.trainId);
      setTravelerId(editReservation.userId);
      setTrainScheduleID(editReservation.trainScheduleId);
      SetScheduleDate(
        editReservation.reservationDate &&
          editReservation.reservationDate.replace(":00Z", "")
      );
      setPrice(editReservation.price);
      setEmail(editReservation.email);
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
      .post("http://localhost:5246/api/v2/Reservations", {
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
        setRefetch((prev) => !prev);
        handleOnClose();
      }).catch(() => {
        alert("Maximum 4 reservations allowed your acount.");
      });
  };

  const handleOnUpdate = async () => {
    await axios
      .put(`http://localhost:5246/api/v2/Reservations/${editReservation.id}`, {
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
        setRefetch((prev) => !prev);
        handleOnClose();
      })
      .catch(() => {
        alert("Reservation cannot be updated less than 5 days before the reservation date.");
      });
  };

  return type === "add" ? (
    <Modal show={isOpen} onHide={() => handleOnClose()}>
      <Modal.Header closeButton>
        <Modal.Title>Add Reservation</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleOnSubmit}>
        <Modal.Body>
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
                type="number"
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
                min={new Date().toISOString()}
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
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Col>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleOnClose()}>
            Close
          </Button>
          <Button
            type="submit"
            variant="primary"
            // onClick={() => handleOnSubmit()}
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
      </Form>
    </Modal>
  ) : (
    <Modal show={isOpen} onHide={() => handleOnClose()}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleOnUpdate}>
        <Modal.Body>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextUserName">
            <Form.Label column sm="2">
              Traveler
            </Form.Label>
            <Col sm="10">
              <select
                name="travelerID"
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
                name="trainID"
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
                name="scheduleID"
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
                type="number"
                value={price}
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
                value={scheduleDate}
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
                type="email"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Col>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleOnClose()}>
            Close
          </Button>
          <Button
            type="submit"
            variant="primary"
            // onClick={() => handleOnUpdate()}
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
      </Form>
    </Modal>
  );
};


