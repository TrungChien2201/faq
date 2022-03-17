import {
  Button,
  Card,
  ChoiceList,
  FormLayout,
  Icon,
  Link,
  Select,
  Tag,
  TextStyle,
} from "@shopify/polaris";
import React, { useCallback, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { optionPosition, TOP } from "../constants";
import CustomField from "./CustomField";
import { ImPlay2 } from "react-icons/im";
import ModalStepInstall from "./ModalStepInstall";

export default function Install({
  type,
  isInstall,
  listPage,
  handleAutoInstall,
  sliderId,
}) {
  const [copy, setCopy] = useState(false);
  const [pageId, setPageId] = useState("");
  const [position, setPosition] = useState("top");
  const [listPages, setListPages] = useState(listPage);
  const [isMissingPage, setIsMissingPage] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const shortCode =
    type === "view"
      ? `<div class="simesy-testimonial-pro-wrapper" id="sp-testimonial-pro-wrapper-${sliderId}" data-view-id="${sliderId}"></div>`
      : `<div id="simesy-testimonial-form-${sliderId}" data-view-id="${sliderId}"></div>`;

  const handleCopy = useCallback(() => {
    setCopy(true);
  }, [copy]);

  const renderListPage = useCallback(() => {
    let optionListPage = [{ label: "Select Page", value: "" }];
    const data =
      listPages?.length > 0 &&
      listPages?.map((item) => {
        return { label: item.title, value: item.id };
      });
    return optionListPage.concat(data);
  }, [listPages]);

  const handleChange = useCallback(
    (value) => {
      setPageId(value);
      if (value) {
        setIsMissingPage(false);
      }
    },
    [setPageId]
  );

  const handleChangePositon = useCallback((value) => {
    setPosition(value);
  }, []);

  const renderBodyHtml = (data) => {
    if (position.includes(TOP)) {
      return shortCode.concat(data);
    } else return data?.concat(shortCode);
  };

  const handleInstall = useCallback(() => {
    if (!pageId) {
      setIsMissingPage(true);
      return;
    }
    const dataBody = listPages.filter((item) => item.id === Number(pageId));

    const bodyHtml = renderBodyHtml(dataBody[0]?.body_html || "");
    handleAutoInstall(pageId, bodyHtml);
  }, [listPages, pageId, renderBodyHtml]);

  return (
    <Card title="Widget Placement">
      <Card.Section>
        <FormLayout>
          <TextStyle variation="strong">Widget Placement</TextStyle>
          <div
            onClick={() => setIsOpenModal(true)}
            className="install-step"
            style={{ display: "flex", alignItems: "center", columnGap: "7px" }}
          >
            <Icon source={ImPlay2} color="interactive" />
            <Link url="#">Step by Step Guide</Link>
          </div>
          {isOpenModal && <ModalStepInstall setOpen={setIsOpenModal} />}
        </FormLayout>
      </Card.Section>
      {/* <Card.Section title="Automatically Install.">
        <FormLayout>
          <CustomField label="Select Page">
            <Select
              value={Number(pageId)}
              options={renderListPage()}
              onChange={handleChange}
              error={isMissingPage ? "Please select page" : false}
            />
          </CustomField>
          <CustomField label="Select Position">
            <ChoiceList
              choices={optionPosition}
              selected={position}
              onChange={handleChangePositon}
            />
          </CustomField>
          <CustomField>
            <Button loading={isInstall} onClick={handleInstall} primary>
              Install
            </Button>
          </CustomField>
        </FormLayout>
      </Card.Section>
      <Card.Section title="Manually Install">
        <FormLayout>
          <div>
            Copy the embed code given below and paste it on any file or any page
            you want.
          </div>
          <Tag>{shortCode}</Tag>
          <div style={{ display: "flex", alignItems: "center" }}>
            <CopyToClipboard text={shortCode} onCopy={handleCopy}>
              <Button>{copy ? "Copied" : "Copy"}</Button>
            </CopyToClipboard>
          </div>
        </FormLayout>
      </Card.Section> */}
    </Card>
  );
}
