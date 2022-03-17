import { Modal, TextContainer } from "@shopify/polaris";
import React from "react";

export default function ModalConfirmDelete(props) {
  const { setOpen, id, handleDelete, title } = props;

  const handleClose = () => {
    setOpen(false);
  };

  const confirmDelete = () => {
    handleDelete(id);
    setOpen(false);
  };

  return (
    <div style={{ height: "500px" }} className="modal-confirm-delete">
      <Modal
        open={true}
        onClose={handleClose}
        title={title}
        secondaryActions={{
          content: "Cancel",
          onAction: handleClose,
        }}
        primaryAction={[
          {
            content: "Remove",
            onAction: confirmDelete,
          },
        ]}
      >
        <Modal.Section>
          <TextContainer>
            <p>This can’t be undone</p>
          </TextContainer>
        </Modal.Section>
      </Modal>
    </div>
  );
}
