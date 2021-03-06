import React, { useEffect, useCallback, useState } from "react";
import {
  Toast,
  Page,
  Layout,
  Card,
  Button,
  Frame,
  ButtonGroup,
  IndexTable,
  useIndexResourceState,
  Icon,
  DisplayText,
  FormLayout,
  TextStyle,
  ResourceList,
  ResourceItem,
} from "@shopify/polaris";
import axios from "axios";
import { DeleteMinor, EditMinor } from "@shopify/polaris-icons";

import ModalConfirmDelete from "./ModalConfirmDelete";
import moment from "moment";
import { AiOutlineCopy } from "react-icons/ai";
import router from "next/router";
import RequestCustom from "../constants/request";

const heading = [
  { title: "Title" },
  { title: "Code" },
  { title: "Date" },
  { title: "" },
];

const resourceName = {
  singular: "customer",
  plural: "customers",
};

const SliderListing = (props) => {
  // const NODE_ENV = "development";
  const app = NODE_ENV === "development" ? null : null;
  const {
    data: { shop },
    slider,
    setSlider,
    accessToken,
  } = props;
  const [activeError, setActiveError] = useState(false);
  const [activeSuccess, setActiveSuccess] = useState(false);
  const [openDelete, SetOpenDelete] = useState(false);
  const [idSilerDelete, setIdSliderDelete] = useState("");
  const [faqGroupList, setFaqGroupList] = useState([]);

  const openSliderEdit = () => {
    router.push("/widgets/new");
  };

  const toggleError = useCallback(() => setActiveError(true), [activeError]);

  const errorMarkup = useCallback(() => {
    if (activeError) {
      setTimeout(() => {
        setActiveError(false);
      }, 3000);
      return <Toast duration={2} error={true} content="Server error" />;
    }
  }, [activeError]);

  const getConfig = async () => {
    // let sessionToken = "";
    let data = { shop };
    // if (NODE_ENV === "production") {
    //   sessionToken = await getSessionToken(app);
    // }

    let config = {
      headers: {
        "x-access-token": accessToken,
      },
    };
    try {
      axios.post(`/api/widget-faq`, data, config).then(({ data }) => {
        if (data?.success) {
          setSlider(data?.data?.widget);
        }
      });
    } catch (error) {
      toggleError();
    }
  };

  const messageSuccess = useCallback(() => {
    let message;
    switch (activeSuccess) {
      case true:
        message = "Delete success";
        break;
      case 1:
        message = "Copied";
      default:
        break;
    }
    if (activeSuccess || activeSuccess === 1) {
      setTimeout(() => {
        setActiveSuccess(false);
      }, 3000);
      return <Toast duration={2} content={message} />;
    }
  }, [activeSuccess]);

  const handleOpenDelete = useCallback((id) => {
    SetOpenDelete(true);
    setIdSliderDelete(id);
  }, []);

  const handleDeleteSlider = useCallback(async () => {
    // let sessionToken = "";

    // if (NODE_ENV === "production") {
    //   sessionToken = await getSessionToken(app);
    // }

    let config = {
      headers: {
        "x-access-token": accessToken,
      },
    };
    let data = { shop };
    try {
      axios
        .delete(`/api/widget-faq/${idSilerDelete}`, data, config)
        .then(({ data }) => {
          if (data?.success) {
            setActiveSuccess(true);
            const newSlider = slider.filter(
              (item) => item._id !== idSilerDelete
            );
            setSlider(newSlider);
          }
        });
    } catch (error) {
      toggleError();
    }
  }, [slider, idSilerDelete]);

  const getListFaqGroup = useCallback(async () => {
    const datas = {
      shop,
    };
    const respone = await RequestCustom.post("/api/faq", datas);
    if (respone?.data?.data?.faq?.length > 0) {
      const newFaqGroup = [
        { label: "", value: "" },
        ...respone?.data?.data?.faq?.map((item) => ({
          label: item?.config?.name,
          value: item?._id,
        })),
      ];
      setFaqGroupList(newFaqGroup);
    }
  }, [shop]);

  useEffect(() => {
    getListFaqGroup();
  }, []);

  const handleOpenEdit = (id) => {
    router.push(`/widgets/${id}`);
  };

  const handleCopy = useCallback(() => {
    setActiveSuccess(1);
  }, []);

  useEffect(() => {
    getConfig();
  }, []);

  const renderShortCode = useCallback((id) => {
    return `<div id="simesy-testimonial-${id}" data-view-id="${id}"></div>`;
  }, []);

  const {
    selectedResources,
    allResourcesSelected,
    handleSelectionChange,
  } = useIndexResourceState(slider);

  const rowMarkup =
    slider?.length > 0 &&
    slider?.map(({ config: { title }, _id, createdAt }, index) => (
      <IndexTable.Row
        id={_id}
        key={_id}
        position={index}
        selected={selectedResources.includes(_id)}
      >
        <IndexTable.Cell>{title}</IndexTable.Cell>
        <IndexTable.Cell>Code</IndexTable.Cell>
        <IndexTable.Cell>
          {moment(createdAt).format("DD/MM/YYYY")}
        </IndexTable.Cell>
        <IndexTable.Cell>
          <ButtonGroup segmented>
            <Button size="slim" onClick={() => handleOpenEdit(_id)}>
              <Icon source={EditMinor} color="base" />
            </Button>
            <Button size="slim" onClick={() => handleOpenDelete(_id)}>
              <Icon title="Delete" source={DeleteMinor} color="base" />
            </Button>
          </ButtonGroup>
        </IndexTable.Cell>
      </IndexTable.Row>
    ));

  return (
    <Frame>
      <Page
        title="Widgets"
        primaryAction={{
          content: "Add Widget",
          onAction: openSliderEdit,
        }}
      >
        <Layout>
          <Layout.Section>
            <Card>
              <ResourceList
                emptyState={
                  <Card>
                    <div className="faq-empty">
                      <FormLayout>
                        <DisplayText size="small">
                          <TextStyle variation="strong">
                            Create widget to display FAQs anywhere
                          </TextStyle>
                        </DisplayText>
                        <Button onClick={openSliderEdit} primary>
                          Add Widget
                        </Button>
                      </FormLayout>
                    </div>
                  </Card>
                }
                resourceName={{ singular: "customer", plural: "customers" }}
                items={slider}
                renderItem={(item) => {
                  const { _id, config } = item;

                  return (
                    <ResourceItem
                      id={_id}
                      accessibilityLabel={`View details for ${_id}`}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <h3
                          style={{
                            width: "70%",
                            overflow: "hidden",
                            wordBreak: "break-word",
                          }}
                        >
                          <TextStyle variation="strong">
                            {config?.title}
                          </TextStyle>
                        </h3>
                        <ButtonGroup>
                          <Button
                            size="slim"
                            onClick={() => handleOpenEdit(_id)}
                          >
                            Edit
                          </Button>
                          <Button
                            size="slim"
                            onClick={() => handleOpenDelete(_id)}
                          >
                            Delete
                          </Button>
                        </ButtonGroup>
                      </div>
                    </ResourceItem>
                  );
                }}
              />
            </Card>
          </Layout.Section>
          {errorMarkup()}
          {messageSuccess()}
          {openDelete && (
            <ModalConfirmDelete
              setOpen={SetOpenDelete}
              isDeleteWidget={true}
              title="Confirm Delete"
              id={idSilerDelete}
              handleDelete={handleDeleteSlider}
            />
          )}
        </Layout>
      </Page>
    </Frame>
  );
};

export default SliderListing;
