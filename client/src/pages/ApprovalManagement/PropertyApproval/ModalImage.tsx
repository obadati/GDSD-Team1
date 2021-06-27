import {useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import {approveProperty} from "../../../api/approval-managemnet";


interface ModalPopUpImage {
    display?: any;
    data?: any;
    onCloseModal?:any;
    loadAgent?:any;

  }
const ModalPopUpImage: React.FC<ModalPopUpImage>= ({ display, onCloseModal, data,  loadAgent,children }) => {
  const [show, setShow] = useState(display ? true : false);
  let history = useHistory();
  const handleClose = () => {
    setShow(false);
    onCloseModal();
  };
  const onSubmit = async (e:any) => {
    e.preventDefault();
   console.log(data);

   let edit = await approveProperty(data.id,data.status);
   
   loadAgent(true);
     history.push("/propertyApproval");
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Property Images</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalPopUpImage;
