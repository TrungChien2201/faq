import { Modal, TextContainer } from "@shopify/polaris";
import React, { useCallback } from "react";

export default function ModalConfirmDelete(props) {
  const { setOpen, id, handleDelete, title, groupName } = props;

  const handleClose = () => {
    setOpen(false);
  };

  const confirmDelete = useCallback(() => {
    handleDelete();
    setOpen(false);
  },[]);

  return (
    <div style={{ height: "300px" }} className="modal-confirm-delete">
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
            <p>{groupName ? `Delete group ${groupName} and all group data?`:'Delete this FAQ?'}</p>
          </TextContainer>
        </Modal.Section>
      </Modal>
    </div>
  );
}
