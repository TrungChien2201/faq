import {
  Button,
  Card,
  FormLayout,
  Frame,
  Layout,
  Page,
  Tabs,
  TextField,
  Toast,
} from "@shopify/polaris";
import { useFormik } from "formik";
import unescapeJs from "unescape-js";
import { useAppBridge } from "@shopify/app-bridge-react";
import { getSessionToken } from "@shopify/app-bridge-utils";
import { ContentState, convertFromHTML, EditorState } from "draft-js";
import { useCallback, useState } from "react";
import FormAll from "./FormAll";
import FormMessage from "./FormMessage";
import FormNotifycation from "./FormNotifycation";
import FormStylization from "./FormStylization";
import { useEffect } from "react";
import axios from "axios";
import UpgradeLink from "./UpgradeLink";
import Install from "./Install";

const tabs = [
  {
    id: "all-customers-1",
    content: "All",
    accessibilityLabel: "Form Editor",
    panelID: "all-customers-content-1",
  },
  {
    id: "accepts-marketing-1",
    content: "Messages",
    panelID: "accepts-marketing-content-1",
  },
  {
    id: "repeat-customers-1",
    content: "Notifications",
    panelID: "repeat-customers-content-1",
  },
  {
    id: "prospects-1",
    content: "Stylization",
    panelID: "prospects-content-1",
  },
  {
    id: "install",
    content: "Install",
    panelID: "install",
  },
];

export default function FormEdit({
  idEdit,
  handleOpenFormEdit,
  shop,
  listForm,
  setListForm,
  setIdEdit,
  isDisableField,
  handleOpenUpgradePlan,
  accessToken,
}) {
  const [selected, setSelected] = useState(0);
  const [isError, setIsError] = useState(false);
  const [listPage, setListPage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowValidate, setIsShowValidate] = useState(false);
  const [isInstall, setIsInstall] = useState(false);
  const [errorTitle, setErrorTitle] = useState("");
  const [activeSuccess, setActiveSuccess] = useState(0);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  // const NODE_ENV = "development";
  const app = NODE_ENV === "development" ? null : null;
  const [colorPagination, setColorPagination] = useState({
    label_color: {
      visible: false,
    },
    submit_button_color: {
      color: {
        visible: false,
      },
      hover_color: {
        visible: false,
      },
      background: {
        visible: false,
      },
      hover_background: {
        visible: false,
      },
    },
  });

  const [visibleFormElement, setVisibleFormElement] = useState({
    form_elements: false,
    full_name: false,
    email_address: false,
    identity_position: false,
    company_name: false,
    featured_image: false,
    website: false,
    testimonial_title: false,
    testimonial: false,
    location: false,
    phone_mobile: false,
    video_url: false,
    rating: false,
    recaptcha: false,
    social_profile: false,
    submit_btn: false,
  });

  const formik = useFormik({
    initialValues: {
      post_title: "",
      form_elements: [
        "full_name",
        "email_address",
        "identity_position",
        "company_name",
        "website",
        "featured_image",
        "testimonial_title",
        "testimonial",
        "rating",
        "submit_btn",
      ],
      full_name: {
        label: "Full Name",
        placeholder: "What is your full name?",
        required: true,
      },
      email_address: {
        label: "E-mail Address",
        placeholder: "What is your e-mail address?",
        required: true,
      },
      identity_position: {
        label: "Identity or Position",
        placeholder: "What is your identity or position?",
        required: false,
      },
      company_name: {
        label: "Company Name",
        placeholder: "What is your comdapany name?",
        required: false,
      },
      featured_image: {
        label: "Photo",
        required: false,
      },
      website: {
        label: "Website",
        placeholder: "What is your website?",
        required: false,
      },
      testimonial_title: {
        label: "Testimonial Title",
        placeholder: "A headline for your testimonial.",
        required: false,
      },
      testimonial: {
        label: "Testimonial",
        placeholder: "What do you think about us?",
        required: true,
      },
      location: {
        label: "Location",
        placeholder: "What is your location?",
        required: false,
      },
      phone_mobile: {
        label: "Phone or Mobile",
        placeholder: "What is your phone number?",
        required: false,
      },
      video_url: {
        label: "Video URL",
        placeholder: "Type video URL.",
        required: false,
      },
      rating: {
        label: "Rating",
      },
      recaptcha: {
        label: "",
      },
      social_profile: {
        label: "Social Profile",
        social_profile_list: [],
      },
      submit_btn: {
        label: "Submit Testimonial",
      },
      redirect: "same_page",
      message_position: ["bottom"],
      successful_message: "Thank you for submitting a new testimonial!",
      redirect_custom_url: "",
      redirect_to_page: "145",
      page: "testimonial",
      testimonial_approval_status: "pending",
      submission_email_notification: true,
      submission_email_subject: "A New Testimonial is Pending!",
      submission_email_heading: "New Testimonial!",
      submission_email_body: `<p>Hey There,</p><p></p><p>A new testimonial has been submitted to your website.</p><p>Following are the reviewer information.</p><p></p><p>Name: {name}&nbsp;</p><p>Email: {email}&nbsp;</p><p>Testimonial Content: {testimonial_text}&nbsp;</p><p>Rating: {ra Please go admin dashboard to review it and pub Thank you!</p>`,
      submission_email_notification_to: "mrtienhp97@gmail.com",
      label_color: "#444444",
      submit_button_color: {
        color: "#ffffff",
        hover_color: "#ffffff",
        background: "#0296ec",
        hover_background: "#0081cc",
      },
    },
    onSubmit: (value) => {
      handleSubmit(value);
    },
  });

  const handleSubmit = useCallback(
    async (values) => {
      setIsLoading(true);
      // let sessionToken = "";

      // if (NODE_ENV === "production") {
      //   sessionToken = await getSessionToken(app);
      // }

      let config = {
        headers: {
          "x-access-token": accessToken,
        },
      };
      if (!idEdit) {
        let datas = {
          shop: shop,
          config: {
            ...values,
            submission_email_body: EscapeJsonString(
              values.submission_email_body
            ),
          },
        };
        try {
          const { data } = await axios.post(
            `/api/testimonial-form/new`,
            datas,
            config
          );
          if (data?.success) {
            listForm.unshift(data?.data?.testimonialForm);
            setActiveSuccess(1);
            setIsLoading(false);
            setIdEdit(data?.data?.testimonialForm?._id);
          }
        } catch (error) {
          toggleError();
          setIsLoading(false);
        }
      } else {
        let datas = {
          shop: shop,
          config: {
            ...values,
            submission_email_body: EscapeJsonString(
              values.submission_email_body
            ),
          },
        };
        try {
          const { data } = await axios.put(
            `/api/testimonial-form/${idEdit}`,
            datas,
            config
          );
          if (data?.success) {
            const newForm = listForm.map((item) => {
              if (item?._id === data?.data?.testimonialForm?._id) {
                return { ...item, config: data?.data?.testimonialForm?.config };
              }
              return item;
            });
            setListForm(newForm);
            setActiveSuccess(2);
            setIsLoading(false);
          }
        } catch (error) {
          toggleError();
          setIsLoading(false);
        }
      }
    },
    [idEdit]
  );

  const handleAutoInstall = async (pageId, bodyHtml) => {
    setIsInstall(true);
    if (shop) {
      let datas = { shop: shop, page_id: pageId, body_html: bodyHtml };
      // if (NODE_ENV === "production") {
      //   sessionToken = await getSessionToken(app);
      // }

      let config = {
        headers: {
          "x-access-token": accessToken,
        },
      };
      try {
        axios.post(`/api/update_page`, datas, config).then(({ data }) => {
          if (data?.success) {
            setActiveSuccess(3);
            setIsInstall(false);
          }
        });
      } catch (error) {
        toggleError();
        setIsInstall(false);
      }
    }
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

  const handleOpenSetColor = (keys) => {
    setColorPagination({
      ...colorPagination,
      [keys]: { visible: !colorPagination[keys]?.visible },
    });
  };

  const handleChangeSetColor = (key) => (value) => {
    const colorRgba = `rgba(${value.rgb.r}, ${value.rgb.g}, ${value.rgb.b}, ${value.rgb.a})`;
    formik.handleChange({ target: { id: key, value: colorRgba } });
  };

  const handleChange = useCallback((value, id) => {
    formik.handleChange({ target: { id, value } });
  }, []);

  const handleTabChange = useCallback(
    (selectedTabIndex) => {
      !isDisableField && setSelected(selectedTabIndex);
    },
    [isDisableField]
  );

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

  const getTestimonialFormDetail = async (id) => {
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
        `/api/testimonial-form/${id}`,
        datas,
        config
      );
      if (data?.success) {
        setListForm();
        const newValue = Object.assign(
          formik.values,
          data?.data?.testimonialForm?.config
        );
        formik.setValues(newValue);
        if (data?.data?.testimonialForm?.config?.submission_email_body) {
          const unescapeValue = unescapeJs(
            data?.data?.testimonialForm?.config?.submission_email_body
          );
          const newValue = UnEscapeString(unescapeValue);
          setEditorState(renderContent(newValue));
        } else setEditorState("");
      }
    } catch (error) {
      toggleError();
    }
  };

  useEffect(() => {
    if (!idEdit) {
      const unescapeValue = unescapeJs(formik.values.submission_email_body);
      const newValue = UnEscapeString(unescapeValue);
      setEditorState(renderContent(newValue));
    } else {
      getTestimonialFormDetail(idEdit);
    }
  }, [idEdit]);

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
        message = "Added!";
        break;
      case 2:
        message = "Edited!";
        break;
      case 3:
        message = "Installed!";
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
    if (!formik.values.post_title) {
      setErrorTitle("Title can't be blank!");
    } else {
      setErrorTitle("");
    }
  }, [formik.values.post_title]);

  const beforeSubmit = () => {
    setIsShowValidate(true);
    if (!errorTitle && formik.values.post_title) {
      formik.handleSubmit();
    }
  };

  const handleBack = () => {
    setIdEdit("");
    handleOpenFormEdit();
  };

  useEffect(() => {
    async function getListPage() {
      // let sessionToken = "";
      if (shop) {
        let datas = { shop };
        // if (NODE_ENV === "production") {
        //   sessionToken = await getSessionToken(app);
        // }

        let config = {
          headers: {
            "x-access-token": accessToken,
          },
        };
        try {
          axios.post(`/api/get_pages`, datas, config).then(({ data }) => {
            if (data?.success) {
              setListPage(data?.data?.pages);
            }
          });
        } catch (error) {
          toggleError();
        }
      }
    }
    getListPage();
  }, []);

  return (
    <Frame>
      <Page
        breadcrumbs={[{ content: "Products", onAction: handleBack }]}
        primaryAction={{
          content: "Save",
          onAction: beforeSubmit,
          loading: isLoading,
        }}
        title={!idEdit ? "New Form" : "Edit Form"}
      >
        <Layout>
          <Layout.Section>
            <Card>
              <Card.Section>
                <FormLayout>
                  <TextField
                    value={formik.values.post_title}
                    onChange={handleChange}
                    name="post_title"
                    id="post_title"
                    error={isShowValidate ? errorTitle : ""}
                    placeholder="Add Title"
                  />
                  {isDisableField && (
                    <UpgradeLink openUpgrade={handleOpenUpgradePlan} />
                  )}
                </FormLayout>
              </Card.Section>
            </Card>
            <Card>
              <div className={`${!idEdit && "hide-tab-install"}`}>
                <Tabs
                  tabs={tabs}
                  selected={selected}
                  onSelect={handleTabChange}
                >
                  {selected === 0 && (
                    <FormAll
                      visibleFormElement={visibleFormElement}
                      setVisibleFormElement={setVisibleFormElement}
                      formik={formik}
                      isDisableField={isDisableField}
                    />
                  )}
                  {selected === 1 && (
                    <FormMessage
                      listPage={listPage}
                      formik={formik}
                      handleChange={handleChange}
                    />
                  )}
                  {selected === 2 && (
                    <FormNotifycation
                      editorState={editorState}
                      setEditorState={setEditorState}
                      formik={formik}
                      handleChange={handleChange}
                    />
                  )}
                  {selected === 3 && (
                    <FormStylization
                      formik={formik}
                      handleChangeSetColor={handleChangeSetColor}
                      colorPagination={colorPagination}
                      handleOpenSetColor={handleOpenSetColor}
                    />
                  )}
                  {selected === 4 && idEdit && (
                    <Install
                      type="form"
                      isInstall={isInstall}
                      handleAutoInstall={handleAutoInstall}
                      listPage={listPage}
                      sliderId={idEdit}
                    />
                  )}
                </Tabs>
              </div>
            </Card>
          </Layout.Section>
        </Layout>
        {errorMarkup()}
        {messageMarkup()}
      </Page>
    </Frame>
  );
}
