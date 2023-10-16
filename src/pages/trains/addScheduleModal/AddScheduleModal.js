import { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { KeyGenerator } from "../../../features/keyGen/KeyGen";
import axios from "axios";

export const AddScheduleModal = ({
  isOpen,
  onClose,
  setRefetch,
  editUser,
  type,
  trainData,
}) => {
  const [trainId, setTrainId] = useState("");
  const [departureStation, setDepartureStation] = useState("");
  const [arrivalStation, setArrivalStation] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [key, setKey] = useState("");

  useEffect(() => {
    if (!key) {
      setKey(KeyGenerator());
    }
  }, [key]);

  useEffect(() => {
    if (type === "edit") {
      setTrainId(editUser.trainId);
      setDepartureStation(editUser.departureStation);
      setArrivalStation(editUser.arrivalStation);
      setStartDateTime(
        editUser.startDateTime && editUser.startDateTime.replace(":00Z", "")
      );
      setArrivalTime(
        editUser.arrivalTime && editUser.arrivalTime.replace(":00Z", "")
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnClose = () => {
    setKey("");
    onClose();
  };
  // {
  //   "id": "string",
  //   "trainId": "string",
  //   "departureStation": "string",
  //   "arrivalStation": "string",
  //   "startDateTime": "2023-10-16T08:09:54.556Z",
  //   "arrivalTime": "2023-10-16T08:09:54.556Z"
  // }
  const handleOnSubmit = async () => {
    await axios
      .post("http://localhost:5246/api/v2/TrainSchedule", {
        id: key,
        trainId: trainId,
        departureStation: departureStation,
        arrivalStation: arrivalStation,
        startDateTime: startDateTime,
        arrivalTime: arrivalTime,
      })
      .then(() => {
        setRefetch && setRefetch((prev) => !prev);
        handleOnClose();
      });
  };

  const handleOnUpdate = async () => {
    await axios
      .put(`http://localhost:5246/api/v2/TrainSchedule/${editUser.id}`, {
        id: editUser.id,
        trainId: trainId,
        departureStation: departureStation,
        arrivalStation: arrivalStation,
        startDateTime: startDateTime,
        arrivalTime: arrivalTime,
      })
      .then(() => {
        setRefetch && setRefetch((prev) => !prev);
        handleOnClose();
      });
  };
  return type === "add" ? (
    <Modal show={isOpen} onHide={() => handleOnClose()}>
      <Modal.Header closeButton>
        <Modal.Title>Add Schedule</Modal.Title>
      </Modal.Header>
      <Form>
        <Modal.Body>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextUserName">
            <Form.Label column sm="2">
              Train
            </Form.Label>
            <Col sm="10">
              <select
                name="train"
                onChange={(event) => {
                  setTrainId(event.target.value);
                }}
                className="form-control">
                <option>Select Train</option>
                {trainData?.data.map((item) => {
                  return <option value={item.id}>{item.trainName}</option>;
                })}
              </select>
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextUserName">
            <Form.Label column sm="2">
              Depature
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Departure Station"
                onChange={(e) => setDepartureStation(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextUserName">
            <Form.Label column sm="2">
              Arrival
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Departure Station"
                onChange={(e) => setArrivalStation(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextUserName">
            <Form.Label column sm="2">
              Depature Time
            </Form.Label>
            <Col sm="10">
              <input
                type="datetime-local"
                onChange={(e) => setStartDateTime(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextUserName">
            <Form.Label column sm="2">
              Arrival Time
            </Form.Label>
            <Col sm="10">
              <input
                type="datetime-local"
                onChange={(e) => setArrivalTime(e.target.value)}
              />
            </Col>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleOnClose()}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => handleOnSubmit()}
            disabled={
              !trainId ||
              !departureStation ||
              !arrivalStation ||
              !startDateTime ||
              !arrivalTime
            }>
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  ) : (
    <Modal show={isOpen} onHide={() => handleOnClose()}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Schedule</Modal.Title>
      </Modal.Header>
      <Form>
        <Modal.Body>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextUserName">
            <Form.Label column sm="2">
              Train
            </Form.Label>
            <Col sm="10">
              <select
                name="train"
                value={trainId}
                onChange={(event) => {
                  setTrainId(event.target.value);
                }}
                className="form-control">
                <option>Select Train</option>
                {trainData?.data.map((item) => {
                  return <option value={item.id}>{item.trainName}</option>;
                })}
              </select>
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextUserName">
            <Form.Label column sm="2">
              Depature
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                value={departureStation}
                placeholder="Departure Station"
                onChange={(e) => setDepartureStation(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextUserName">
            <Form.Label column sm="2">
              Arrival
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                value={arrivalStation}
                placeholder="Departure Station"
                onChange={(e) => setArrivalStation(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextUserName">
            <Form.Label column sm="2">
              Depature Time
            </Form.Label>
            <Col sm="10">
              <input
                type="datetime-local"
                value={startDateTime}
                onChange={(e) => setStartDateTime(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextUserName">
            <Form.Label column sm="2">
              Arrival Time
            </Form.Label>
            <Col sm="10">
              <input
                type="datetime-local"
                value={arrivalTime}
                onChange={(e) => setArrivalTime(e.target.value)}
              />
            </Col>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleOnClose()}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => handleOnUpdate()}
            disabled={
              !trainId ||
              !departureStation ||
              !arrivalStation ||
              !startDateTime ||
              !arrivalTime
            }>
            Edit Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
