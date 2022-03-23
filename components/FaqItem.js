import {
  Button,
  ButtonGroup,
  Card,
  Collapsible,
  FormLayout,
  Icon,
  TextField,
} from "@shopify/polaris";
import Switch from "react-switch";
import {
  EditMinor,
  MobileCancelMajor,
  ChevronDownMinor,
  ChevronUpMinor,
} from "@shopify/polaris-icons";
import { useCallback, useEffect, useState } from "react";
import { EditorState, convertFromHTML, ContentState } from "draft-js";
import dynamic from "next/dynamic";
import unescapeJs from "unescape-js";
import draftToHtml from "draftjs-to-html";
import ModalConfirmDelete from "./ModalConfirmDelete";

const Editor = dynamic(
  () => {
    return import("react-draft-wysiwyg").then((mod) => mod.Editor);
  },
  { ssr: false }
);

function FaqItem({
  item,
  isGroupSelected,
  faqItem,
  editFaq,
  groupId,
  formik,
  deleteFaq,
  handleUpRow,
  handleDownRow,
}) {
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [contentAnswer, setContentAnswer] = useState("");
  const [question, setQuestion] = useState("");
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);

  const handleChangeContent = (e) => {
    setContentAnswer(draftToHtml(e));
    // formik.handleChange({ target: { id: "content", value: draftToHtml(e) } });
  };
  useEffect(() => {
    if (isGroupSelected && faqItem === item?.id) {
      setIsEdit(true);
    }
    return () => {
      setIsEdit(false);
    };
  }, [isGroupSelected, faqItem, item?.id]);

  useEffect(() => {
    setQuestion(item?.question);
  }, [item?.question]);

  const onEditorStateChange = (e) => {
    setEditorState(e);
  };

  const EscapeJsonString = (value) => {
    if (typeof value === "string") {
      return value
        .replace(/[\"]/g, '\\"')
        .replace(/[\\]/g, "\\\\")
        .replace(/[\/]/g, "\\/")
        .replace(/[\b]/g, "\\b")
        .replace(/[\n]/g, "\\n")
        .replace(/[\f]/g, "\\f")
        .replace(/[\r]/g, "\\r")
        .replace(/[\t]/g, "\\t");
    }
  };

  const UnEscapeString = (value) => {
    const newValue = value.replace(/[\\]/g, "");
    return newValue;
  };

  const renderContent = (content) => {
    const blocksFromHTML = convertFromHTML(content);
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    const test = EditorState.createWithContent(state);
    return test;
  };

  const handleChangeQuestion = (value) => {
    setQuestion(value);
  };

  const handleSaveFaq = useCallback(async () => {
    const data = await editFaq({
      answer: EscapeJsonString(contentAnswer),
      question,
      faqId: item?.id,
      groupId,
      group: formik?.values?.groups,
    });
    if (data) {
      setIsEdit(false);
    }
  }, [
    setIsEdit,
    contentAnswer,
    question,
    item?.id,
    groupId,
    formik.values.groups,
  ]);

  useEffect(() => {
    if (item?.answer) {
      const unescapeValue = unescapeJs(item?.answer);
      const newValue = UnEscapeString(unescapeValue);
      setEditorState(renderContent(newValue));
      setContentAnswer(item?.answer);
    }
  }, [item?.answer]);

  const onChange = () => {};

  const handleToggle = useCallback(() => {
    setOpen(!open);
  }, [open]);

  const handleCancleEditFaq = useCallback(() => {
    setIsEdit(false);
    setQuestion(item?.question);
    setContentAnswer(item?.answer);
    const unescapeValue = unescapeJs(item?.answer);
    const newValue = UnEscapeString(unescapeValue);
    setEditorState(renderContent(newValue));
  }, [item?.question]);

  // const handleChangeSwitch = useCallback(async () => {
  //   const data = await editFaq({
  //     answer: EscapeJsonString(contentAnswer),
  //     question,
  //     faqId: item?.id,
  //     groupId,
  //     checked: !item?.checked,
  //     group: formik?.values?.groups,
  //   });
  //   if (data) {
  //     setIsEdit(false);
  //   }
  // }, [item, contentAnswer, groupId, question]);

  const handleDeleteFaq = useCallback(() => {
    deleteFaq({ faqId: item?.id, groupId });
  }, [item, groupId]);

  const handleConfirmDelete = useCallback(() => {
    setIsConfirmDelete(!isConfirmDelete);
  }, [isConfirmDelete]);

  return (
    <>
      <Card>
        <Card.Section>
          {isEdit ? (
            <FormLayout>
              <TextField
                value={question}
                onChange={handleChangeQuestion}
                // name="name"
                // id="name"
                // error={isShowError ? formik.errors.name : ""}
              />
              <Editor
                placeholder="Enter Content"
                editorState={editorState}
                onChange={handleChangeContent}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editor-faq"
                onEditorStateChange={onEditorStateChange}
              />
              <ButtonGroup>
                <Button onClick={handleSaveFaq} primary>
                  Save
                </Button>
                <Button onClick={handleCancleEditFaq}>Cancle</Button>
              </ButtonGroup>
            </FormLayout>
          ) : (
            <div className="faq-item">
              <div className="item-header">
                <div
                  ariaExpanded={open}
                  aria-controls="basic-collapsible"
                  onClick={handleToggle}
                  className="item-name"
                >
                  {item?.question}
                </div>
                <div className="group-header-action">
                  {/* <Switch
                    uncheckedIcon={false}
                    onColor="#008060"
                    checkedIcon={false}
                    checked={item?.checked}
                    onChange={handleChangeSwitch}
                    height={20}
                    width={40}
                  /> */}
                  <div
                    className="cursor-pointer icon-down"
                    onClick={() => handleUpRow({ groupId, faqId: item?.id })}
                  >
                    <Icon source={ChevronUpMinor} />
                  </div>
                  <div
                    className="cursor-pointer icon-down"
                    onClick={() => handleDownRow({ groupId, faqId: item?.id })}
                  >
                    <Icon source={ChevronDownMinor} />
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() => setIsEdit(true)}
                  >
                    <Icon source={EditMinor} />
                  </div>
                  <div onClick={handleConfirmDelete} className="cursor-pointer">
                    <Icon source={MobileCancelMajor} />
                  </div>
                </div>
              </div>

              <Collapsible
                open={open}
                id="basic-collapsible"
                transition={{
                  duration: "250ms",
                  timingFunction: "ease-in-out",
                }}
                expandOnPrint
              >
                <div className="item-answer">{item?.answer}</div>
              </Collapsible>
            </div>
          )}
        </Card.Section>
      </Card>
      {isConfirmDelete && (
        <ModalConfirmDelete
          setOpen={setIsConfirmDelete}
          handleDelete={handleDeleteFaq}
        />
      )}
    </>
  );
}

export default FaqItem;
