import { Modal, TextContainer } from "@shopify/polaris";
import React from "react";
export default function ModalPublishWidget(props) {
  const { setOpen } = props;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ height: "500px" }} className="modal-confirm-delete">
      <Modal
        open={true}
        onClose={handleClose}
        // title={title}
        secondaryActions={{
          content: "Cancel",
          onAction: handleClose,
        }}
      >
        <Modal.Section>
          <TextContainer>
            <p>Publish Widgets</p>
          </TextContainer>
        </Modal.Section>
      </Modal>
    </div>
  );
}
