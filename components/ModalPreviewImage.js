import { Modal } from "@shopify/polaris";
import React from "react";

export default function ModalPreviewImage(props) {
  const { setOpen, url } = props;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ height: "500px" }} className="modal-preview-image">
      <Modal open={true} onClose={handleClose} title="Preview Image">
        <Modal.Section>
          <img style={{ width: "100%" }} src={url} alt="Image" />
        </Modal.Section>
      </Modal>
    </div>
  );
}
