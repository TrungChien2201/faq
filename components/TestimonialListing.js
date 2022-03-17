import React, { useCallback, useState } from "react";
import moment from "moment";
import {
  Page,
  Layout,
  Card,
  Button,
  Frame,
  IndexTable,
  useIndexResourceState,
  Icon,
  ButtonGroup,
  Thumbnail,
} from "@shopify/polaris";
import {
  DeleteMinor,
  EditMinor,
  ChevronDownMinor,
  ChevronUpMinor,
} from "@shopify/polaris-icons";

import ModalConfirmDelete from "./ModalConfirmDelete";
import { AiFillStar } from "react-icons/ai";
import router from "next/router";

const heading = [
  { title: "Title" },
  { title: "Image" },
  { title: "Name" },
  { title: "Rating" },
  { title: "Status" },
  { title: "Date" },
  { title: "" },
];

const resourceName = {
  singular: "customer",
  plural: "customers",
};

const TestimonialListing = (props) => {
  const {
    list,
    getTestimonialDetail,
    deleteTestimonialDetail,
    addTestimonialEdit,
    handleUpRow,
    handleDownRow,
  } = props;

  const [openDelete, SetOpenDelete] = useState(false);
  const [idSilerDelete, setIdSliderDelete] = useState("");

  const handleOpenDelete = useCallback((id) => {
    SetOpenDelete(true);
    setIdSliderDelete(id);
  }, []);

  const handleOpenEdit = useCallback(async (id) => {
    // props.toggleSliderEdit();
    // props.setIdEdit(id);
    // getTestimonialDetail(id);
    router.push(`/testimonials/${id}`);
  }, []);
  const {
    selectedResources,
    allResourcesSelected,
    handleSelectionChange,
  } = useIndexResourceState(list);

  const renderRating = (number) => {
    let array = [];
    for (let i = 0; i < number; i++) {
      array.push(<Icon source={AiFillStar} color="warning" />);
    }
    return array;
  };

  const rowMarkup =
    list?.length > 0
      ? list?.map(
          (
            {
              config: { title, image_url, name, rating, status, date },
              _id,
            },
            index
          ) => (
            <IndexTable.Row
              id={_id}
              key={_id}
              position={index}
              selected={selectedResources.includes(_id)}
            >
              <IndexTable.Cell key="title">{title}</IndexTable.Cell>
              <IndexTable.Cell key="image_url">
                {image_url ? (
                  <Thumbnail size="medium" source={image_url} />
                ) : (
                  ""
                )}
              </IndexTable.Cell>
              <IndexTable.Cell key="name">{name}</IndexTable.Cell>
              <IndexTable.Cell key="rating">
                <div className="rating-icon" style={{ display: "flex" }}>
                  {renderRating(rating)}
                </div>
              </IndexTable.Cell>
              <IndexTable.Cell key="status">
                {status === "pending" ? "Pending" : "Published"}
              </IndexTable.Cell>
              <IndexTable.Cell key="date">
                {moment(date).format("MM/DD/YYYY")}
              </IndexTable.Cell>
              <IndexTable.Cell key="action">
                <ButtonGroup segmented>
                  <Button
                    size="slim"
                    title="Up"
                    onClick={() => handleUpRow(_id)}
                  >
                    <Icon source={ChevronUpMinor} color="base" />
                  </Button>
                  <Button
                    size="slim"
                    title="Down"
                    onClick={() => handleDownRow(_id)}
                  >
                    <Icon source={ChevronDownMinor} color="base" />
                  </Button>
                  <Button size="slim" onClick={() => handleOpenEdit(_id)}>
                    <Icon source={EditMinor} color="base" />
                  </Button>
                  <Button size="slim" onClick={() => handleOpenDelete(_id)}>
                    <Icon title="Delete" source={DeleteMinor} color="base" />
                  </Button>
                </ButtonGroup>
              </IndexTable.Cell>
            </IndexTable.Row>
          )
        )
      : null;

  return (
    <Frame>
      <Page
        title="Testimonials"
        primaryAction={{
          content: "Add Testimonial",
          onAction: addTestimonialEdit,
        }}
      >
        <Layout>
          <Layout.Section>
            <Card>
              {list?.length > 0 && (
                <IndexTable
                  resourceName={resourceName}
                  headings={heading}
                  itemCount={list?.length}
                  selectable={false}
                  selectedItemsCount={
                    allResourcesSelected ? "All" : selectedResources.length
                  }
                  onSelectionChange={handleSelectionChange}
                >
                  {rowMarkup}
                </IndexTable>
              )}
            </Card>
          </Layout.Section>
          {openDelete && (
            <ModalConfirmDelete
              setOpen={SetOpenDelete}
              title="Remove testimonial"
              id={idSilerDelete}
              handleDelete={deleteTestimonialDetail}
            />
          )}
        </Layout>
      </Page>
    </Frame>
  );
};

export default TestimonialListing;
