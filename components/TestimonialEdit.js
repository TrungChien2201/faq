import {
  Button,
  Card,
  DropZone,
  FormLayout,
  Frame,
  Icon,
  Layout,
  Page,
  Select,
  TextField,
} from "@shopify/polaris";
import ReactStars from "react-rating-stars-component";
import dynamic from "next/dynamic";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import draftToHtml from "draftjs-to-html";
import SortableElements from "./SortableElement";
import {
  AiFillExclamationCircle,
  AiOutlineClose,
  AiOutlineEye,
} from "react-icons/ai";
import axios from "axios";
import ModalPreviewImage from "./ModalPreviewImage";
import { BASE_URL, optionTestimonialStatus, UPLOAD_PRESET } from "../constants";
import UpgradeLink from "./UpgradeLink";
import router from "next/router";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const SIZE = 256000;

const Editor = dynamic(
  () => {
    return import("react-draft-wysiwyg").then((mod) => mod.Editor);
  },
  { ssr: false }
);

const TestimonialEdit = (props) => {
  const {
    idEdit,
    // setIdEdit,
    // toggleSliderEdit,
    formik,
    handleChangeValue,
    isLoading,
    // handleChangeSocial,
    editorState,
    setEditorState,
    plan,
    handleOpenUpgradePlan,
    accessToken,
  } = props;
  const date = Date.now();
  const [errorRating, setErrorRating] = useState("");
  const [rating, setRating] = useState(0);
  const [isDisableUpload, setIsDisableUpload] = useState(false);
  const [isShowPreviewImage, setIsShowPreviewImage] = useState(false);
  // const isDisableField = plan === "FREE";

  useEffect(() => {
    if (!formik.values.rating || formik.values.rating === 0) {
      setErrorRating("Rating can't be blank.");
    }
    return () => setErrorRating("");
  }, [formik.values.rating]);

  const handleChangeSocial = ({ key, index, value }) => {
    const socialProfile = formik.values.social_profiles;
    const newSocialProfile = socialProfile.map((item, indexItem) => {
      if (indexItem === index) {
        return { ...item, [key]: value };
      }
      return item;
    });
    formik.handleChange({
      target: { id: "social_profiles", value: newSocialProfile },
    });
  };

  const handleBack = () => {
    // toggleSliderEdit();
    // setIdEdit("");
    router.push("/testimonials");
  };

  const handleChangeContent = (e) => {
    // formik.handleChange({ target: { id: "content", value: draftToHtml(e) } });
    formik.handleChange({
      target: { id: "content", value: e.replace(/\r\n|\r|\n/g, "&#13;&#10;") },
    });
  };

  const onEditorStateChange = (e) => {
    setEditorState(e);
  };
  
  const onSortEnd = ({ oldIndex, newIndex }) => {
    const socialProfile = formik.values.social_profiles;
    const newSocialProfile = arrayMove(socialProfile, oldIndex, newIndex);
    formik.handleChange({
      target: { id: "social_profiles", value: newSocialProfile },
    });
  };

  const handleDelete = (indexDelete) => {
    let socialProfile = formik.values.social_profiles;
    const newSocialProfile = socialProfile.filter(
      (item, index) => index !== Number(indexDelete)
    );
    formik.handleChange({
      target: { id: "social_profiles", value: newSocialProfile },
    });
  };

  const SortableItem = SortableElement(({ value, indexs }) => (
    <SortableElements
      handleChangeSocial={handleChangeSocial}
      value={value}
      indexs={indexs}
      handleDelete={handleDelete}
    />
  ));

  const SortableList = SortableContainer(({ items }) => {
    return (
      <div>
        {items?.length > 0 &&
          items.map((item, index) => (
            <Fragment key={`item-${index}`}>
              <SortableItem index={index} indexs={index} value={item} />
            </Fragment>
          ))}
      </div>
    );
  });

  const handleAddSocial = () => {
    const newSocial = formik.values.social_profiles;
    newSocial.push({
      social_name: "",
      social_url: "",
    });
    formik.handleChange({
      target: { id: "social_profiles", value: newSocial },
    });
  };

  const [isShowError, setIsShowError] = useState(false);
  const handleSubmit = () => {
    setIsShowError(true);
    if (!errorRating) {
      formik.handleSubmit();
    }
  };
  const [isErrorImage, setIsErrorImage] = useState(false);
  const handleDropUploadFile = async (file) => {
    if (file[0]?.size < SIZE + 1) {
      setIsDisableUpload(true);
      setIsErrorImage(false);
      const url = BASE_URL;
      file.forEach(async (acceptFiles) => {
        const formData = new FormData();
        formData.append("file", acceptFiles);
        formData.append("upload_preset", UPLOAD_PRESET);
        delete axios.defaults.headers.common["x-access-token"];
        const { data } = await axios.post(url, formData);
        if (data) {
          setIsDisableUpload(false);
        }
        formik.handleChange({ target: { id: "image_url", value: data?.url } });
      });
    } else {
      setIsErrorImage(true);
    }
  };

  const handleDeleteImage = () => {
    setIsShowPreviewImage(false);
    setTimeout(() => {
      formik.handleChange({ target: { id: "image_url", value: "" } });
    }, 500);
  };

  const renderDatePicker = useCallback(() => {
    return (
      <ReactDatePicker
        className="testimonial-date-picker"
        selected={formik.values.date ? formik.values.date : date}
        onChange={(data) =>
          formik.handleChange({
            target: { id: "date", value: moment.utc(data).valueOf() },
          })
        }
      />
    );
  }, [formik, date]);

  return (
    <Frame>
      <Page
        breadcrumbs={[{ content: "Products", onAction: handleBack }]}
        primaryAction={{
          content: "Save",
          onAction: handleSubmit,
          loading: isLoading,
        }}
        title={!idEdit ? "New Testimonial" : "Edit Testimonial"}
      >
        <Layout>
          <Layout.Section>
            <Card>
              <Card.Section>
                <FormLayout>
                  <TextField
                    value={formik.values.title}
                    onChange={handleChangeValue}
                    name="title"
                    id="title"
                    label="Testimonial title"
                    error={isShowError ? formik.errors.title : ""}
                    placeholder="Testimonial title"
                    type=""
                  />
                  {/* <Editor
                    placeholder="Enter Content"
                    editorState={editorState}
                    onChange={handleChangeContent}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editor-faq"
                    onEditorStateChange={onEditorStateChange}
                  /> */}
                  <TextField
                    value={formik.values.content}
                    onChange={handleChangeValue}
                    name="content"
                    id="content"
                    label="Testimonial content"
                    placeholder="Testimonial content"
                    multiline={3}
                  />
                  <div>
                    <div style={{ marginBottom: "3px" }}>Date</div>
                    {renderDatePicker()}
                  </div>
                  <TextField
                    value={formik.values.name}
                    onChange={handleChangeValue}
                    name="name"
                    placeholder="Reviewer name"
                    id="name"
                    label="Reviewer name"
                    error={isShowError ? formik.errors.name : ""}
                  />
                  <div>
                    <div style={{ marginBottom: "3px" }}>Rating</div>
                    {formik.values.rating && (
                      <ReactStars
                        classNames="rating"
                        count={5}
                        name="rating"
                        error={formik.errors.rating}
                        id="rating"
                        value={Number(formik.values.rating)}
                        onChange={(value) =>
                          formik.handleChange({
                            target: { id: "rating", value },
                          })
                        }
                        size={23}
                        activeColor="#ffd700"
                      />
                    )}
                    {!formik.values.rating && (
                      <ReactStars
                        classNames="rating"
                        count={5}
                        name="rating"
                        error={formik.errors.rating}
                        id="rating"
                        value={Number(formik.values.rating)}
                        onChange={(value) =>
                          formik.handleChange({
                            target: { id: "rating", value },
                          })
                        }
                        size={23}
                        activeColor="#ffd700"
                      />
                    )}
                    {errorRating && isShowError ? (
                      <div
                        style={{
                          color: "#d72c0d",
                          display: "flex",
                          marginTop: "3px",
                        }}
                      >
                        <span style={{ fontSize: "18px", marginRight: "5px" }}>
                          <Icon source={AiFillExclamationCircle} />
                        </span>{" "}
                        <span style={{ fontSize: "1.4rem" }}>
                          {errorRating}
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </FormLayout>
              </Card.Section>
              {/* <Card.Section title="Reviewer information">
                <FormLayout> */}
              {/* {isDisableField && (
                    <UpgradeLink
                      text="To unlock the following extra reviewer information fields"
                      openUpgrade={handleOpenUpgradePlan}
                    />
                  )} */}
              {/* <TextField
                    value={formik.values.name}
                    onChange={handleChangeValue}
                    name="name"
                    id="name"
                    label="Full Name"
                    error={isShowError ? formik.errors.name : ""}
                  /> */}
              {/* <TextField
                    value={formik.values.designation}
                    onChange={handleChangeValue}
                    name="designation"
                    id="designation"
                    label="Identity or Position"
                  /> */}
              {/* <div>
                    <div style={{ marginBottom: "3px" }}>Rating</div>
                    {renderStar()}
                    {errorRating && isShowError ? (
                      <div
                        style={{
                          color: "#d72c0d",
                          display: "flex",
                          marginTop: "3px",
                        }}
                      >
                        <span style={{ fontSize: "18px", marginRight: "5px" }}>
                          <Icon source={AiFillExclamationCircle} />
                        </span>{" "}
                        <span style={{ fontSize: "1.4rem" }}>
                          {errorRating}
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div> */}
              {/* <div >
                    <TextField
                      value={formik.values.email}
                      onChange={handleChangeValue}
                      name="email"
                      id="email"
                      label="E-mail Address"
                    />
                  </div> */}
              {/* <div >
                    <TextField
                      value={formik.values.company_name}
                      onChange={handleChangeValue}
                      name="company_name"
                      id="company_name"
                      label="Company Name"
                    />
                  </div>
                  <div >
                    <TextField
                      value={formik.values.location}
                      onChange={handleChangeValue}
                      name="location"
                      id="location"
                      label="Location"
                    />
                  </div>
                  <div >
                    <TextField
                      value={formik.values.phone}
                      onChange={handleChangeValue}
                      name="phone"
                      id="phone"
                      label="Phone or Mobile"
                    />
                  </div>
                  <div>
                    <TextField
                      value={formik.values.website}
                      onChange={handleChangeValue}
                      name="website"
                      id="website"
                      label="Website"
                    />
                  </div>
                  <div >
                    <TextField
                      value={formik.values.video_url}
                      onChange={handleChangeValue}
                      name="video_url"
                      id="video_url"
                      label="Video Testimonial URL"
                    />
                  </div> */}
              {/* </FormLayout>
              </Card.Section> */}
              {/* <Card.Section title="Social Profiles">
                <FormLayout>
                  <div
                  >
                    <SortableList
                      items={formik.values.social_profiles}
                      onSortEnd={onSortEnd}
                      
                    />
                  </div>
                  <Button
                    onClick={handleAddSocial}
                    primary
                  >
                    Add More
                  </Button>
                </FormLayout>
              </Card.Section> */}
            </Card>
          </Layout.Section>
          <Layout.Section secondary>
            <Card>
              <Card.Section title="Status">
                <FormLayout>
                  <div style={{ marginTop: "1rem" }}>
                    <Select
                      id="status"
                      name="status"
                      options={optionTestimonialStatus}
                      onChange={handleChangeValue}
                      value={formik.values.status}
                    />
                  </div>
                </FormLayout>
              </Card.Section>
              <Card.Section title="Testimonial Image">
                <FormLayout>
                  <div>
                    {!formik.values.image_url && (
                      <div style={{ width: 114, height: 114 }}>
                        <DropZone
                          accept="image/*"
                          disabled={isDisableUpload}
                          allowMultiple={false}
                          onDrop={(files, acceptedFiles, rejectedFiles) => {
                            handleDropUploadFile(files);
                          }}
                        >
                          <DropZone.FileUpload />
                        </DropZone>
                      </div>
                    )}
                    {isErrorImage && (
                      <div style={{ color: "red" }}>
                        Image size should not be larger than 250kb
                      </div>
                    )}
                    {formik.values.image_url && (
                      <div>
                        <img
                          onClick={() => setIsShowPreviewImage(true)}
                          src={formik.values.image_url}
                          style={{
                            maxWidth: "150px",
                            height: "auto",
                            cursor: "pointer",
                          }}
                        />
                        <div style={{ display: "block" }}>
                          <Button plain destructive onClick={handleDeleteImage}>
                            Remove image
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </FormLayout>
              </Card.Section>
            </Card>
          </Layout.Section>
        </Layout>
        {isShowPreviewImage && (
          <ModalPreviewImage
            url={formik.values.image_url}
            setOpen={setIsShowPreviewImage}
          />
        )}
      </Page>
    </Frame>
  );
};

export default TestimonialEdit;
