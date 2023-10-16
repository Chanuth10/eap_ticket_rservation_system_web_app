import { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { KeyGenerator } from "../../../features/keyGen/KeyGen";
import axios from "axios";

export const CreateEditUserModal = ({
  isOpen,
  onClose,
  setRefetch,
  editUser,
  type,
}) => {
  const [name, setName] = useState("");
  const [nic, setNIC] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [key, setKey] = useState("");

  // {
  //   "id": "string",
  //   "userName": "string",
  //   "nic": "string",
  //   "password": "string",
  //   "email": "string",
  //   "isActive": true
  // }

  useEffect(() => {
    if (!key) {
      setKey(KeyGenerator());
    }
  }, [key]);

  useEffect(() => {
    if (type === "edit") {
      setName(editUser.userName);
      setNIC(editUser.nic);
      setEmail(editUser.email);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnClose = () => {
    setName("");
    setNIC("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setKey("");
    onClose();
  };
  const handleOnSubmit = async () => {
    await axios
      .post("http://localhost:5246/api/v2/TravelarManager", {
        id: key,
        userName: name,
        nic: nic,
        password: password,
        isActive: true,
        email: email,
      })
      .then(() => {
        setRefetch && setRefetch((prev) => !prev);
        handleOnClose();
      });
  };

  const handleOnUpdate = async () => {
    await axios
      .put(`http://localhost:5246/api/v2/TravelarManager/${editUser.nic}`, {
        id: editUser.id,
        userName: name,
        nic: editUser.nic,
        password: password,
        isActive: true,
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
        <Modal.Title>Add Traveler</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleOnSubmit}>
        <Modal.Body>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextUserName">
            <Form.Label column sm="2">
              Name
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="User Name"
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextNIC">
            <Form.Label column sm="2">
              NIC
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="NIC"
                onChange={(e) => setNIC(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
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

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword">
            <Form.Label column sm="2">
              Password
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword">
            <Form.Label column sm="2">
              Confirm Password
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
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
            type="submit"
            // onClick={() => handleOnSubmit()}
            disabled={
              !name ||
              !email ||
              !nic ||
              !password ||
              !confirmPassword ||
              password !== confirmPassword
            }>
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  ) : (
    <Modal show={isOpen} onHide={() => handleOnClose()}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Traveler</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleOnUpdate}>
        <Modal.Body>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextUserName">
            <Form.Label column sm="2">
              Name
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="User Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="2">
              Email
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword">
            <Form.Label column sm="2">
              Password
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword">
            <Form.Label column sm="2">
              Confirm Password
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
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
            type="submit"
            // onClick={() => handleOnUpdate()}
            disabled={
              !name ||
              !email ||
              !nic ||
              !password ||
              !confirmPassword ||
              password !== confirmPassword
            }>
            Edit Changes
          </Button>
        </Modal.Footer>
      </Form>
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
