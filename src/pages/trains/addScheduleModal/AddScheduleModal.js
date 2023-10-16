import { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { KeyGenerator } from "../../../features/keyGen/KeyGen";
import axios from "axios";
import { toast } from "react-toastify";

export const AddScheduleModal = ({
  isOpen,
  onClose,
  setRefetch,
  editUser,
  type,
}) => {
  const [name, setName] = useState("");
  const [key, setKey] = useState("");

  useEffect(() => {
    if (!key) {
      setKey(KeyGenerator());
    }
  }, [key]);

  const handleOnClose = () => {
    setName("");
    setKey("");
    onClose();
  };
  const handleOnSubmit = async () => {
    await axios
      .post("http://localhost:5246/api/v2/Schedule", {
        id: key,
        trainName: name,
        isActive: true,
      })
      .then(() => {
        toast.success("Created Succcessfully!");
        setRefetch && setRefetch((prev) => !prev);
        handleOnClose();
      });
  };

  const handleOnUpdate = async () => {
    await axios
      .put(`http://localhost:5246/api/v2/Schedule/${editUser.id}`, {
        id: editUser.id,
        trainName: name,
        isActive: true,
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
      <Modal.Body>
        <Form>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextUserName">
            <Form.Label column sm="2">
              Train
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Schedule Name"
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
          </Form.Group>
        </Form>
        <Form>
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
                placeholder="Schedule Name"
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
          </Form.Group>
        </Form>
        <Form>
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
                placeholder="Schedule Name"
                onChange={(e) => setName(e.target.value)}
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
          disabled={!name}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  ) : (
    <Modal show={isOpen} onHide={() => handleOnClose()}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Schedule</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextUserName">
            <Form.Label column sm="2">
              Train
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Schedule Name"
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
          </Form.Group>
        </Form>
        <Form>
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
                placeholder="Schedule Name"
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
          </Form.Group>
        </Form>
        <Form>
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
                placeholder="Schedule Name"
                onChange={(e) => setName(e.target.value)}
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
          disabled={!name}>
          Edit Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
