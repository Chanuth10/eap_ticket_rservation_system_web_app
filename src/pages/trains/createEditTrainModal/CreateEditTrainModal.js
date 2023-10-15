import { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { KeyGenerator } from "../../../features/keyGen/KeyGen";
import axios from "axios";
import { toast } from "react-toastify";

export const CreateEditUserModal = ({
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

  useEffect(() => {
    if (type === "edit") {
      setName(editUser.trainName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnClose = () => {
    setName("");
    setKey("");
    onClose();
  };
  const handleOnSubmit = async () => {
    await axios
      .post("http://localhost:5246/api/v2/Train", {
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
      .put(`http://localhost:5246/api/v2/Train/${editUser.id}`, {
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
        <Modal.Title>Add Train</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
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
                placeholder="Train Name"
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
        <Modal.Title>Edit Train</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
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
