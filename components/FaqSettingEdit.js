import React, { useCallback, useEffect, useState } from "react";
import {
  Page,
  Layout,
  FormLayout,
  Frame,
  Toast,
  ButtonGroup,
  Button,
  TopBar,
  Heading,
} from "@shopify/polaris";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import IframePreview from "./IframePreview";
import router from "next/router";
import RequestCustom from "../constants/request";
import WidgetTabLeft from "./WidgetTabLeft";
import FaqSettingTabLeft from "./FaqSettingTabLeft";

const FaqSettingEdit = (props) => {
  const { data, slider, accessToken } = props;

  const [activeSuccess, setActiveSuccess] = useState(0);
  const [activeError, setActiveError] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [faqGroup, setFaqGroup] = useState([]);
  const [faqGroupIframe, setFaqGroupIframe] = useState([]);
  const [errorNameWidget, setErrorNameWidget] = useState("");
  const [idEdit, setIdEdit] = useState("");
  const formik = useFormik({
    initialValues: {
      groups: "",
      headerBackgroundColor: "#32a3cb",
      headerHeight: "300",
      showPageTitle: true,
      pageTitle: "Frequently Asked Questions",
      pageTitleSize: "50",

      pageTitleColor: "rgba(255,255,255,1)",
      showPageIntro: true,
      pageIntro:
        "Check most frequently asked questions here, if you still need help then please contact us at <a href='mailto:yellow@hello.com'>yellow@hello.com</a>.",
      pageIntroSize: "18",
      pageIntroColor: "rgba(255,255,255,.9)",
      showSearchBox: true,
      searchPlaceholder: "What can we help you with?",
      searchNotFoundText: "Oops, your search did not match any FAQs",
      groupNameSize: "24",
      groupNameColor: "#000",
      title: "",
      faqStyleID: ["style1"],
      faqBehavior: ["accordion"],
      faqNameTag: ["none"],
      faqIconPosition: ["right"],
      faqExtras: ["none"],
      faqIconSize: "20",
      faqIconSelect: ["1"],
      faqQuestionCloseColor: "#333",
      faqQuestionOpenColor: "#11a9d5",
      faqIconCloseColor: "#11a9d5",
      faqIconOpenColor: "#11a9d5",
    },
    onSubmit: (values) => {
      handleSubmit(values);
    },
    validationSchema: validationSchema,
  });

  const [colorPagination, setColorPagination] = useState({
    faqQuestionCloseColor: {
      color: {
        visible: false,
      },
    },
    faqQuestionOpenColor: {
      color: {
        visible: false,
      },
    },
    faqIconCloseColor: {
      color: {
        visible: false,
      },
    },
    faqIconOpenColor: {
      color: {
        visible: false,
      },
    },
    headerBackgroundColor: {
      color: {
        visible: false,
      },
    },
    pageTitleColor: {
      color: {
        visible: false,
      },
    },
    pageIntroColor: {
      color: {
        visible: false,
      },
    },
    groupNameColor: {
      color: {
        visible: false,
      },
    },
  });

  const [dataBackUp, setDataBackUp] = useState(formik.initialValues);

  const validationSchema = yup.object({
    faqName: yup.string().required("Name can't be blank."),
  });

  const handleChange = (value, id) => {
    formik.handleChange({ target: { id, value } });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSubmit = async () => {
    const {
      faqBehavior,
      faqNameTag,
      faqIconPosition,
      faqExtras,
      faqIconSelect,
      faqStyleID,
    } = formik.values;
    const config = {
      ...formik.values,
      faqStyleID: faqStyleID[0],
      faqBehavior: faqBehavior[0],
      faqNameTag: faqNameTag[0],
      faqIconPosition: faqIconPosition[0],
      faqExtras: faqExtras[0],
      faqIconSelect: faqIconSelect[0],
    };
    const datas = {
      shop: data?.shop,
      config,
    };
    setIsSubmit(true);
    if (idEdit) {
      try {
        const { data } = await RequestCustom.put(
          `/api/faq-setting/${idEdit}`,
          datas
        );
        if (data?.success) {
          setActiveSuccess(2);
        }
      } catch (error) {
        toggleError();
      }
      return;
    }
    try {
      const { data } = await RequestCustom.post(`/api/faq-setting/new`, datas);
      if (data?.success) {
        setIdEdit(data?.data?.faqSetting?._id);
        setActiveSuccess(1);
      }
    } catch (error) {
      toggleError();
    }
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

  const messageSuccess = useCallback(() => {
    let message = "";
    if (activeSuccess === 1) {
      message = "Add New Success";
    }
    if (activeSuccess === 2) {
      message = "Edit Success";
    }
    setTimeout(() => {
      setActiveSuccess(0);
    }, 2000);
    if (activeSuccess === 1 || activeSuccess === 2 || activeSuccess === 3)
      return <Toast duration={2} content={message} />;
  }, [activeSuccess]);

  const handleBack = () => {
    router.push("/faq-page-settings");
  };

  const getFaqSettingDetail = async (id) => {
    let datas = { shop: data?.shop };

    let config = {
      headers: {
        "x-access-token": accessToken,
      },
    };
    try {
      axios.post(`/api/faq-setting/${id}`, datas, config).then(({ data }) => {
        if (data?.success) {
          const newValue = Object.assign(
            formik.values,
            data?.data?.faqSetting?.config
          );
          formik.setValues({
            ...newValue,
            faqStyleID: [newValue?.faqStyleID],
            faqBehavior: [newValue?.faqBehavior],
            faqNameTag: [newValue?.faqNameTag],
            faqIconPosition: [newValue?.faqIconPosition],
            faqExtras: [newValue?.faqExtras],
            faqIconSelect: [newValue?.faqIconSelect],
          });
          setDataBackUp(newValue);
        }
      });
    } catch (error) {
      toggleError();
    }
  };

  const getFaqSettingPage = async () => {
    let datas = { shop: data?.shop };

    let config = {
      headers: {
        "x-access-token": accessToken,
      },
    };
    try {
      axios.post(`/api/faq-setting`, datas, config).then(({ data }) => {
        if (data?.success && data?.data?.faqSetting[0]?._id) {
          setIdEdit(data?.data?.faqSetting[0]?._id);
        }
      });
    } catch (error) {
      toggleError();
    }
  };

  useEffect(() => {
    if (idEdit) {
      getFaqSettingDetail(idEdit);
    }
  }, [idEdit]);

  useEffect(() => {
    getFaqSettingPage()
  }, []);

  const getListFaqGroup = useCallback(async () => {
    const datas = {
      shop: data?.shop,
    };
    const respone = await RequestCustom.post("/api/faq", datas);
    if (respone?.data?.data?.faq?.length > 0) {
      const newFaqGroup = respone?.data?.data?.faq?.map((item) => ({
        label: item?.config?.name,
        value: item?._id,
      }));
      const newFaqGroupIframe = respone?.data?.data?.faq?.map((item) => ({
          id: item?._id,
          name: item?.config?.name,
          faqs: item?.config?.faqs,
      }))
      setFaqGroup(newFaqGroup);
      setFaqGroupIframe(newFaqGroupIframe);
    }
  }, [data?.shop]);

  useEffect(() => {
    getListFaqGroup();
  }, []);

  const handleChangeSetColor = (key) => (value) => {
    const colorRgba = `rgba(${value.rgb.r}, ${value.rgb.g}, ${value.rgb.b}, ${value.rgb.a})`;
    setDataBackUp({ ...dataBackUp, [key]: colorRgba });
    formik.handleChange({ target: { id: key, value: colorRgba } });
  };

  const handleOpenSetColor = (key, keyChild) => {
    if (keyChild) {
      setColorPagination({
        ...colorPagination,
        [key]: {
          ...colorPagination[key],
          [keyChild]: {
            ...colorPagination[key][keyChild],
            visible: !colorPagination[key][keyChild]?.visible,
          },
        },
      });
    } else {
      setColorPagination({
        ...colorPagination,
        [key]: {
          ...colorPagination[key],
          visible: !colorPagination[key].visible,
        },
      });
    }
  };

  const beforeSubmit = useCallback(() => {
    if (formik.values.title) {
      handleSubmit();
      setErrorNameWidget("");
      return;
    }
    setErrorNameWidget("Title can't be blank.");
  }, [formik]);

  const userMenuMarkup = useCallback(
    () => (
      <ButtonGroup>
        <Button onClick={handleBack}>Cancel</Button>
        <Button primary loading={isLoading} onClick={beforeSubmit}>
          {idEdit ? "Save" : "Publish"}
        </Button>
      </ButtonGroup>
    ),
    [handleBack, isLoading, idEdit]
  );

  const secondaryMenuMarkup = <Heading>{formik.values.title}</Heading>;

  return (
    <Frame>
      <form className="edit-widget">
        <Page fullWidth>
          <Layout>
            <Layout.Section fullWidth>
              <div className="top-bar">
                <TopBar
                  userMenu={userMenuMarkup()}
                  searchField={secondaryMenuMarkup}
                />
              </div>
            </Layout.Section>
            <Layout.Section oneThird>
              <FormLayout>
                <div>
                  <div className={"widget-edit"}>
                    <FaqSettingTabLeft
                      errorNameWidget={errorNameWidget}
                      formik={formik}
                      groups={faqGroup}
                      handleChange={handleChange}
                      handleChangeSetColor={handleChangeSetColor}
                      handleOpenSetColor={handleOpenSetColor}
                      dataBackUp={dataBackUp}
                      colorPagination={colorPagination}
                    />
                  </div>
                </div>
              </FormLayout>
            </Layout.Section>
            <Layout.Section id="preview-iframe">
              <IframePreview
                shop={data?.shop}
                accessToken={accessToken}
                formik={formik}
                faqGroup={faqGroupIframe}
              />
            </Layout.Section>
            {messageSuccess()}
            {errorMarkup()}
            {/* {isSubmit && <ModalPublishWidget setOpen={setIsSubmit} />} */}
          </Layout>
        </Page>
      </form>
    </Frame>
  );
};

export default FaqSettingEdit;
