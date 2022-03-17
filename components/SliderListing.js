import React, { useEffect, useCallback, useState } from "react";
import {
  Toast,
  Page,
  Layout,
  Card,
  ResourceList,
  ResourceItem,
  TextStyle,
  Button,
  Frame,
  TextContainer,
  ButtonGroup,
  IndexTable,
  useIndexResourceState,
  Tag,
  Icon,
} from "@shopify/polaris";
import CopyToClipboard from "react-copy-to-clipboard";
import { useAppBridge } from "@shopify/app-bridge-react";
import { getSessionToken } from "@shopify/app-bridge-utils";
import axios from "axios";
import { DeleteMinor, EditMinor } from "@shopify/polaris-icons";

import ModalConfirmDelete from "./ModalConfirmDelete";
import moment from "moment";
import { AiOutlineCopy } from "react-icons/ai";
import router from "next/router";

const heading = [
  { title: "Title" },
  { title: "Shortcode" },
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
      axios.post(`/api/shortcodes`, data, config).then(({ data }) => {
        if (data?.success) {
          setSlider(data?.data?.shortCodes);
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

  const handleDeleteSlider = useCallback(
    async (id) => {
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
        axios.delete(`/api/shortcodes/${id}`, data, config).then(({ data }) => {
          if (data?.success) {
            setActiveSuccess(true);
            const newSlider = slider.filter((item) => item._id !== id);
            setSlider(newSlider);
          }
        });
      } catch (error) {
        toggleError();
      }
    },
    [slider]
  );

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
    slider?.map(({ config: { title, shortCodes }, _id, createdAt }, index) => (
      <IndexTable.Row
        id={_id}
        key={_id}
        position={index}
        selected={selectedResources.includes(_id)}
      >
        <IndexTable.Cell>{title}</IndexTable.Cell>
        <IndexTable.Cell>
          <CopyToClipboard text={renderShortCode(_id)} onCopy={handleCopy}>
            <Tag>
              <span style={{ width: "1.5rem", height: "1.5rem" }}>
                <Icon source={AiOutlineCopy} />
              </span>
              <span
                style={{
                  maxWidth: "200px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {renderShortCode(_id)}
              </span>
            </Tag>
          </CopyToClipboard>
        </IndexTable.Cell>
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
        title="Manage Widgets"
        primaryAction={{
          content: "Add Widget",
          onAction: openSliderEdit,
        }}
      >
        <Layout>
          <Layout.Section>
            <Card>
              {slider?.length > 0 && (
                <>
                  <IndexTable
                    resourceName={resourceName}
                    headings={heading}
                    itemCount={slider?.length}
                    selectable={false}
                    selectedItemsCount={
                      allResourcesSelected ? "All" : selectedResources.length
                    }
                    onSelectionChange={handleSelectionChange}
                  >
                    {rowMarkup}
                  </IndexTable>
                </>
              )}
            </Card>
          </Layout.Section>
          {errorMarkup()}
          {messageSuccess()}
          {openDelete && (
            <ModalConfirmDelete
              setOpen={SetOpenDelete}
              title="Remove view"
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
