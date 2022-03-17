import { CircleTickMajor } from "@shopify/polaris-icons";
import {
  Button,
  ButtonGroup,
  Card,
  Frame,
  Icon,
  IndexTable,
  Layout,
  Page,
  Tag,
  Toast,
  useIndexResourceState,
} from "@shopify/polaris";
import { DeleteMinor, EditMinor } from "@shopify/polaris-icons";
import axios from "axios";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { AiOutlineCopy } from "react-icons/ai";
import ModalConfirmDelete from "./ModalConfirmDelete";
import { testimonialFormListContentUpgrade } from "../constants";

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

export default function FormListing({
  listForm,
  setListForm,
  handleOpenFormEdit,
  shop,
  setIdEdit,
  isDisableField,
  handleOpenUpgradePlan,
  accessToken,
}) {
  // const NODE_ENV = "development";
  // const app = NODE_ENV === "development" ? null : null;
  const [isError, setIsError] = useState(false);
  const [activeSuccess, setActiveSuccess] = useState(0);
  const [idDelete, setIdDelete] = useState("");
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);

  const getTestimonialForm = async () => {
    let config = {
      headers: {
        "x-access-token": accessToken,
      },
    };
    let datas = {
      shop: shop,
    };
    try {
      const { data } = await axios.post(`/api/testimonial-form`, datas, config);
      if (data?.success) {
        setListForm(data?.data?.testimonialForm);
      }
    } catch (error) {
      toggleError();
    }
  };

  const toggleError = useCallback(() => {
    setIsError(!isError);
  }, []);

  const errorMarkup = useCallback(() => {
    if (isError) {
      setTimeout(() => {
        setIsError(!isError);
      }, 2000);
      return <Toast duration={2} error content="Server error!" />;
    }
  }, [isError]);

  const messageMarkup = useCallback(() => {
    let message;
    switch (activeSuccess) {
      case 1:
        message = "Deleted";
        break;
      case 2:
        message = "Edited";
        break;
      case 3:
        message = "Copied";
        break;
      default:
        break;
    }

    if (activeSuccess !== 0) {
      setTimeout(() => {
        setActiveSuccess(0);
      }, 2000);
      return <Toast duration={2} content={message} />;
    }
  }, [activeSuccess]);

  useEffect(() => {
    getTestimonialForm();
  }, []);

  const handleCopy = useCallback(() => {
    setActiveSuccess(3);
  }, []);

  const renderShortCode = useCallback((id) => {
    return `<div id="simesy-testimonial-form-${id}" data-view-id="${id}"></div>`;
  }, []);

  const {
    selectedResources,
    allResourcesSelected,
    handleSelectionChange,
  } = useIndexResourceState(listForm);

  const rowMarkup =
    listForm?.length > 0
      ? listForm?.map(({ config: { post_title }, updatedAt, _id }, index) => (
          <IndexTable.Row
            id={_id}
            key={_id}
            position={index}
            selected={selectedResources.includes(_id)}
          >
            <IndexTable.Cell>{post_title}</IndexTable.Cell>
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
              {moment(updatedAt).format("DD/MM/YYYY")}
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
        ))
      : null;

  const handleOpenEdit = (id) => {
    setIdEdit(id);
    handleOpenFormEdit();
  };

  const handleOpenDelete = (id) => {
    setIdDelete(id);
    setIsOpenModalDelete(true);
  };

  const handleDeleteTestimonialForm = async (id) => {
    let config = {
      headers: {
        "x-access-token": accessToken,
      },
    };

    try {
      const { data } = await axios.delete(
        `/api/testimonial-form/${id}`,
        config
      );

      if (data?.success) {
        setActiveSuccess(1);
        const newListForm = listForm.filter((item) => item._id !== id);
        setListForm(newListForm);
      }
    } catch (error) {
      toggleError();
    }
  };

  return (
    <Frame>
      <Page
        title="Testimonial Forms"
        primaryAction={{
          content: "Add Form",
          onAction: handleOpenFormEdit,
          disabled: isDisableField,
        }}
      >
        <Layout>
          <Layout.Section>
            <Card>
              {listForm?.length > 0 && !isDisableField ? (
                <IndexTable
                  resourceName={resourceName}
                  headings={heading}
                  itemCount={listForm?.length}
                  selectable={false}
                  selectedItemsCount={
                    allResourcesSelected ? "All" : selectedResources.length
                  }
                  onSelectionChange={handleSelectionChange}
                >
                  {rowMarkup}
                </IndexTable>
              ) : (
                <Card.Section>
                  <div style={{ paddingTop: "10px" }}>
                    <h3 className="upgrade-form-title">
                      Easily Collect and Display Testimonials on Your Website,
                      Boost Sales!
                    </h3>
                    <div className="upgrade-form-description">
                      With this Real Testimonials Pro, you can quickly create
                      multiple forms to collect Testimonials or Feedbacks from
                      your website visitors and customers.
                    </div>
                    <ul className="upgrade-list">
                      {testimonialFormListContentUpgrade.map((item, index) => (
                        <li key={index} className="upgrade-item">
                          <Icon source={CircleTickMajor} color="success" />{" "}
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="upgrade-form-description">
                      Get access to all robust features and start collecting
                      fresh testimonials right now.
                    </div>
                    <div className="upgrade-form-button">
                      <Button
                        onClick={handleOpenUpgradePlan}
                        size="large"
                        primary
                      >
                        Upgrade To Pro Now!
                      </Button>
                    </div>
                  </div>
                </Card.Section>
              )}
            </Card>
          </Layout.Section>
          {isOpenModalDelete && (
            <ModalConfirmDelete
              title="Remove form"
              setOpen={setIsOpenModalDelete}
              id={idDelete}
              handleDelete={handleDeleteTestimonialForm}
            />
          )}
        </Layout>
      </Page>
      {errorMarkup()}
      {messageMarkup()}
    </Frame>
  );
}
