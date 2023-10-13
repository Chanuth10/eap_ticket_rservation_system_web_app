import { Modal, Button } from "react-bootstrap";

export const DeleteModal = ({ isOpen, onClose, name, onSubmit }) => {
  return (
    <Modal show={isOpen} onHide={() => onClose()}>
      <Modal.Header closeButton>
        <Modal.Title>Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>Do you wish to remove {name}?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => onClose()}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            onSubmit();
            onClose();
          }}>
          Delete
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
