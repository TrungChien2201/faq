import {
  Button,
  ButtonGroup,
  Card,
  Collapsible,
  Icon,
  TextField,
} from "@shopify/polaris";
import Switch from "react-switch";
import {
  EditMinor,
  MobileCancelMajor,
  CirclePlusOutlineMinor,
} from "@shopify/polaris-icons";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import FaqItem from "./FaqItem";
import ModalConfirmDelete from "./ModalConfirmDelete";

function FaqGroup({
  group,
  idEditAddNew,
  deleteGroup,
  handleEditGroup,
  formik,
  handleAddFaq,
  idEditFaqGroup,
  faqItem,
  editFaq,
  deleteFaq,
  handleUpRow,
  handleDownRow
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [faq, setFaq] = useState([]);
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);

  const isGroupSelected = useMemo(() => idEditFaqGroup === group.id, [
    group,
    idEditFaqGroup,
  ]);

  const onChange = () => {
    handleEditGroup({
      id: group?.id,
      name: groupName,
      faq,
      checked: !group.checked,
    });
  };

  useEffect(() => {
    if (idEditAddNew === group?.id) {
      setIsEdit(true);
    }
    return () => {
      setIsEdit(false)
    }
  }, [idEditAddNew]);

  useEffect(() => {
    if (group.name) {
      setGroupName(group?.name);
    }
    if (group.faqs) {
      setFaq(group?.faqs);
    }
  }, [group?.name, group?.faq]);

  const onCancleEditGroup = useCallback(() => {
    if (idEditAddNew === group?.id) {
      deleteGroup(group?.id, formik.values.groups);
    }
    setIsEdit(false);
    setGroupName(group?.name);
  }, [isEdit, formik.values.groups]);

  const handleChangeValueNameGroup = (value) => {
    setGroupName(value);
  };

  const handleSaveGroup = useCallback(async () => {
    const data = await handleEditGroup({
      id: group?.id,
      name: groupName,
      faq,
    });
    if (data) {
      setIsEdit(false);
    }
  }, [groupName, group, faq]);

  const handleDeleteGroup = useCallback(
    () => {
      deleteGroup(group?.id, formik.values.groups);
    },
    [formik.values.groups, group?.id]
  );

  const handleConfirmDelete = useCallback(
    () => {
      setIsConfirmDelete(true);
    },
    [isConfirmDelete]
  );

  const renderFaq = useCallback(
    (item) => (
      <FaqItem
        formik={formik}
        groupId={group?.id}
        editFaq={editFaq}
        isGroupSelected={isGroupSelected}
        faqItem={faqItem}
        item={item}
        deleteFaq={deleteFaq}
        handleUpRow={handleUpRow}
        handleDownRow={handleDownRow}
      />
    ),
    [formik, group?.id, editFaq, isGroupSelected, faqItem, deleteFaq, handleUpRow, handleDownRow]
  );

  return (
    <div className="faq-group">
      <div className="group-header">
        {!isEdit ? (
          <>
            <div>{group?.name}</div>
            <div className="group-header-action">
              <Switch
                uncheckedIcon={false}
                onColor="#008060"
                checkedIcon={false}
                checked={group?.checked}
                onChange={onChange}
                height={20}
                width={40}
              />
              <div onClick={() => setIsEdit(true)} className="cursor-pointer">
                <Icon source={EditMinor} />
              </div>
              <div
                onClick={handleConfirmDelete}
                className="cursor-pointer"
              >
                <Icon source={MobileCancelMajor} />
              </div>
            </div>
          </>
        ) : (
          <div className="form-edit-group-name">
            <TextField
              onChange={handleChangeValueNameGroup}
              value={groupName}
            />
            <div>
              <ButtonGroup>
                <Button onClick={handleSaveGroup} primary>
                  Save
                </Button>
                <Button onClick={onCancleEditGroup}>Cancle</Button>
              </ButtonGroup>
            </div>
          </div>
        )}
      </div>
      {!isEdit && (
        <div className="group-content">
          <div className="group-list-faq">
            {group?.faqs?.map((item, index) => (
              <React.Fragment key={item?.id}>{renderFaq(item)}</React.Fragment>
            ))}
          </div>

          <div className="btn-add-faq">
            <Button
              onClick={() => handleAddFaq(group.id)}
              plain
              icon={CirclePlusOutlineMinor}
            >
              Add New FAQ
            </Button>
          </div>
        </div>
      )}
      {isConfirmDelete && <ModalConfirmDelete groupName={group?.name} setOpen={setIsConfirmDelete} handleDelete={handleDeleteGroup} />}
    </div>
  );
}

export default FaqGroup;
