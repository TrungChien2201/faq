import { useFormik } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import TestimonialEdit from "./TestimonialEdit";
import TestimonialListing from "./TestimonialListing";
import { ContentState, convertFromHTML, EditorState } from "draft-js";
import axios from "axios";
import { useAppBridge } from "@shopify/app-bridge-react";
// import { getSessionToken } from "@shopify/app-bridge-utils";
import { Frame, Toast } from "@shopify/polaris";
import unescapeJs from "unescape-js";
import _ from "lodash";
import * as yup from "yup";
import { initalTestimonial } from "../constants";
import arrayMove from "array-move";
import { useRouter } from "next/router";

const Testimonial = (props) => {
  const {
    data: { shop, plan },
    handleOpenUpgradePlan,
    accessToken,
    isAddNew = false,
  } = props;
  const router = useRouter();
  const { id } = router.query;
  // const NODE_ENV = "development";
  // const app = NODE_ENV === "development" ? null : null;
  const [isEdit, setIsEdit] = useState(false);
  const [toggleSuccess, setToggleSuccess] = useState(0);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [idEdit, setIdEdit] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [list, setList] = useState([]);

  const validationSchema = yup.object({
    title: yup.string().required("Testimonial title can't be blank."),
    name: yup.string().required("Reviewer name can't be blank."),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      name: "",
      email: "",
      designation: "",
      company_name: "",
      location: "",
      phone: "",
      website: "",
      video_url: "",
      image_url: "",
      rating: "",
      data: "",
      status: "published",
      social_profiles: [
        {
          social_name: "",
          social_url: "",
        },
      ],
    },
    onSubmit: (values) => {
      handleSubmit(values);
    },
    validationSchema: validationSchema,
  });

  const handleChangeValue = (value, id) => {
    formik.handleChange({ target: { id, value } });
  };

  const toggleSliderEdit = useCallback(() => {
    setIsEdit(!isEdit);
  }, [isEdit]);

  const getTestimonial = useCallback(async () => {
    // let sessionToken = "";

    // if (NODE_ENV === "production") {
    //   sessionToken = await getSessionToken(app);
    // }

    let config = {
      headers: {
        "x-access-token": accessToken,
      },
    };
    let datas = {
      shop: shop,
    };
    try {
      const { data } = await axios.post(`/api/testimonials`, datas, config);
      if (data?.success) {
        setList(data?.data?.testimonials);
      }
    } catch (error) {
      toggleError();
    }
  }, [accessToken]);

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

  const handleSubmit = useCallback(
    async (values) => {
      setIsLoading(true);
      if (idEdit) {
        // let sessionToken = "";

        // if (NODE_ENV === "production") {
        //   sessionToken = await getSessionToken(app);
        // }

        let config = {
          headers: {
            "x-access-token": accessToken,
          },
        };
        let datas = {
          shop: shop,
          config: {
            ...values,
            content: EscapeJsonString(values.content),
            status: values?.status || "published",
          },
        };
        try {
          const { data } = await axios.put(
            `/api/testimonials/${idEdit}`,
            datas,
            config
          );

          if (data?.success) {
            setIsLoading(false);
            setToggleSuccess(2);
            const newList =
              list?.length > 0 &&
              list?.map((item) => {
                if (item?._id === idEdit) {
                  return { ...item, config: data?.data?.testimonial?.config };
                }
                return item;
              });
            setList(newList);
          }
        } catch (error) {
          toggleError();
          setIsLoading(false);
        }
      } else {
        let config = {
          headers: {
            "x-access-token": accessToken,
          },
        };
        let datas = {
          shop: shop,
          config: {
            ...values,
            content: EscapeJsonString(values.content),
            status: values?.status || "published",
            date: values?.date ? values?.date : Date.now(),
          },
        };
        try {
          const { data } = await axios.post(
            `/api/testimonials/new`,
            datas,
            config
          );
          if (data?.success) {
            setIdEdit(data?.data?.testimonial?._id);
            setIsEdit(true);
            setIsLoading(false);
            setToggleSuccess(1);
            list.unshift(data?.data?.testimonial);
            const newListSort = list?.map((item) => item?._id);
            handleSortTestimonial(newListSort);
          }
        } catch (error) {
          toggleError();
          setIsLoading(false);
        }
      }
    },
    [idEdit, list, accessToken, shop]
  );

  const getTestimonialDetail = async (id) => {
    if (id) {
      // let sessionToken = "";

      // if (NODE_ENV === "production") {
      //   sessionToken = await getSessionToken(app);
      // }

      let config = {
        headers: {
          "x-access-token": accessToken,
        },
      };
      let datas = {
        shop: shop,
      };
      try {
        const { data } = await axios.post(
          `/api/testimonials/${id}`,
          datas,
          config
        );
        if (data?.success && data?.data?.testimonial?.config) {
          const newValue = Object.assign(
            formik.values,
            data?.data?.testimonial?.config
          );
          formik.setValues(newValue);
          if (data?.data?.testimonial?.config?.content) {
            const unescapeValue = unescapeJs(
              data?.data?.testimonial?.config?.content
            );
            const newValue = UnEscapeString(unescapeValue);
            setEditorState(renderContent(newValue));
          } else setEditorState("");
        }
      } catch (error) {
        toggleError();
      }
    }
  };

  useEffect(() => {
    if (id) {
      getTestimonialDetail(id);
      setIdEdit(id);
    }
  }, [id, setIdEdit]);

  const deleteTestimonialDetail = async (id) => {
    if (id) {
      // let sessionToken = "";

      // if (NODE_ENV === "production") {
      //   sessionToken = await getSessionToken(app);
      // }

      let config = {
        headers: {
          "x-access-token": accessToken,
        },
      };
      let datas = {
        shop: shop,
      };
      try {
        const { data } = await axios.delete(
          `/api/testimonials/${id}`,
          datas,
          config
        );
        if (data?.success) {
          setToggleSuccess(3);
          const newList = list.filter((item) => item?._id !== id);
          setList(newList);
          const newListSort = newList.map((item) => item?._id);
          handleSortTestimonial(newListSort);
        }
      } catch (error) {
        toggleError();
      }
    }
  };

  const toggleError = useCallback(() => {
    setIsError(true);
  }, []);

  const errorMarkup = useCallback(() => {
    if (isError) {
      return <Toast duration={2} error={true} content="Server error!" />;
    }
  }, [isError]);

  const successMarkup = useCallback(() => {
    let message = "";
    switch (toggleSuccess) {
      case 1:
        message = "Add Testimonial Success";
        break;
      case 2:
        message = "Edit Testimonial Success";
        break;
      case 3:
        message = "Delete Testimonial Success";
        break;
      default:
        break;
    }
    setTimeout(() => {
      setToggleSuccess(0);
    }, 2000);

    if (toggleSuccess !== 0) {
      return <Toast duration={2} content={message} />;
    }
  }, [toggleSuccess]);

  const addTestimonialEdit = useCallback(() => {
    // const newInitialValue = JSON.stringify(initalTestimonial);
    // formik.setValues(JSON.parse(newInitialValue));
    // setEditorState("");
    // setTimeout(() => {
    //   toggleSliderEdit();
    // }, 500);
    router.push("/testimonials/new");
  }, [initalTestimonial]);

  const handleSortTestimonial = async (data) => {
    // let sessionToken = "";

    // if (NODE_ENV === "production") {
    //   sessionToken = await getSessionToken(app);
    // }

    let config = {
      headers: {
        "x-access-token": accessToken,
      },
    };
    let datas = {
      shop: shop,
      config: data,
    };
    try {
      const { data } = await axios.put(`/api/sort-testimonials`, datas, config);
    } catch (error) {
      toggleError();
    }
  };

  const handleUpRow = (id) => {
    const indexItem = _.findIndex(list, { _id: id });
    if (list[indexItem - 1] && list[indexItem]) {
      let newArrayMoved = arrayMove(list, indexItem, indexItem - 1);
      setList(newArrayMoved);
      const arrayId = newArrayMoved?.map((item) => item?._id);
      handleSortTestimonial(arrayId);
    }
  };

  const handleDownRow = (id) => {
    const indexItem = _.findIndex(list, { _id: id });
    if (list[indexItem + 1] && list[indexItem]) {
      let newArrayMoved = arrayMove(list, indexItem, indexItem + 1);
      setList(newArrayMoved);
      const arrayId = newArrayMoved?.map((item) => item?._id);
      handleSortTestimonial(arrayId);
    }
  };

  useEffect(() => {
    getTestimonial();
  }, []);

  return (
    <Frame>
      {idEdit || isAddNew ? (
        <TestimonialEdit
          handleOpenUpgradePlan={handleOpenUpgradePlan}
          setEditorState={setEditorState}
          editorState={editorState}
          idEdit={idEdit}
          accessToken={accessToken}
          setIdEdit={setIdEdit}
          plan={plan}
          isLoading={isLoading}
          handleChangeValue={handleChangeValue}
          formik={formik}
          toggleSliderEdit={toggleSliderEdit}
        />
      ) : (
        <TestimonialListing
          list={list}
          setList={setList}
          setIdEdit={setIdEdit}
          handleUpRow={handleUpRow}
          handleDownRow={handleDownRow}
          formik={formik}
          accessToken={accessToken}
          addTestimonialEdit={addTestimonialEdit}
          // getTestimonialDetail={getTestimonialDetail}
          // toggleSliderEdit={toggleSliderEdit}
          deleteTestimonialDetail={deleteTestimonialDetail}
          shop={props.data.shop}
        />
      )}
      {successMarkup()}
      {errorMarkup()}
    </Frame>
  );
};

export default Testimonial;
