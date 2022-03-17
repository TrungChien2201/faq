import React, { useCallback, useEffect, useState } from "react";
import {
  Page,
  Layout,
  Card,
  TextField,
  FormLayout,
  Frame,
  Toast,
  rgbToHsb,
  Label,
  ButtonGroup,
  Button,
  TopBar,
  Heading,
} from "@shopify/polaris";
import arrayMove from "array-move";
import { useFormik } from "formik";
import * as yup from "yup";
import GeneralSetting from "./GeneralSetting";
import SliderControl from "./SliderControl";
import DisplaySettings from "./DisplaySetting";
import ImageSettings from "./ImageSetting";
import TypoGraphy from "./TypoGraphy";
import ModalPublishWidget from "./ModalPublishWidget";
import { useAppBridge } from "@shopify/app-bridge-react";
import axios from "axios";
import { getSessionToken } from "@shopify/app-bridge-utils";
import { COLOR, FONT_FAMILY, HOVER_COLOR } from "../constants";
import ThemeSettings from "./ThemeSettings";
import Install from "./Install";
import Pagination from "./Pagination";
import IframePreview from "./IframePreview";
import CustomField from "./CustomField";
import router from "next/router";

const SliderEdit = (props) => {
  const app = NODE_ENV === "development" ? null : null;
  const {
    idEdit,
    setIdEdit,
    data,
    toggleSliderEdit,
    slider,
    setSlider,
    handleOpenUpgradePlan,
    accessToken,
  } = props;

  const isDisableField = data.plan === "FREE";
  const [listPage, setListPage] = useState([]);
  const [activeSuccess, setActiveSuccess] = useState(0);
  const [activeError, setActiveError] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isInstall, setIsInstall] = useState(false);
  const [productList, setProductList] = useState([]);
  const [isShowError, setIsShowError] = useState(false);
  const [errorsTitle, setErrorsTitle] = useState("");
  const [errorsWidgetName, setErrorsWidgetName] = useState("");
  const [testimonial, setTestimonial] = useState([]);
  const [productListSelected, setProductListSelected] = useState([]);
  const [colorPicker, setColorPicker] = useState({
    slider_title_typography: {
      fontColor: {
        visible: false,
      },
    },
    testimonial_title_typography: {
      fontColor: {
        visible: false,
      },
    },
    testimonial_text_typography: {
      fontColor: {
        visible: false,
      },
    },
    client_name_typography: {
      fontColor: {
        visible: false,
      },
    },
    client_designation_company_typography: {
      fontColor: {
        visible: false,
      },
    },
    client_location_typography: {
      fontColor: {
        visible: false,
      },
    },
    client_phone_typography: {
      fontColor: {
        visible: false,
      },
    },
    testimonial_date_typography: {
      fontColor: {
        visible: false,
      },
    },
    client_website_typography: {
      fontColor: {
        visible: false,
      },
    },
    client_email_typography: {
      fontColor: {
        visible: false,
      },
    },
    filter_typography: {
      fontColor: {
        visible: false,
      },
    },
  });

  const [colorPagination, setColorPagination] = useState({
    testimonial_readmore_color: {
      color: {
        visible: false,
      },
      hover_color: {
        visible: false,
      },
    },

    testimonial_border: {
      color: {
        visible: false,
      },
    },
    testimonial_info_border: {
      color: {
        visible: false,
      },
    },
    testimonial_box_shadow_color: {
      visible: false,
    },
    testimonial_top_bg: {
      visible: false,
    },
    testimonial_bg: {
      visible: false,
    },
    testimonial_bg_two: {
      visible: false,
    },
    testimonial_bg_three: {
      visible: false,
    },
    testimonial_info_bg: {
      visible: false,
    },
    popup_background: {
      visible: false,
    },
    testimonial_client_rating_color: {
      visible: false,
    },
    social_icon_color: {
      color: { visible: false },
      hover_color: { visible: false },
      background: { visible: false },
      hover_background: { visible: false },
    },
    grid_pagination_colors: {
      color: { visible: false },
      hover_color: { visible: false },
      background: { visible: false },
      hover_background: { visible: false },
    },
    navigation_color: {
      color: { visible: false },
      hover_color: { visible: false },
      background: { visible: false },
      hover_background: { visible: false },
    },
    filter_colors: {
      color: { visible: false },
      hover_color: { visible: false },
      background: { visible: false },
      active_background: { visible: false },
    },
    pagination_colors: {
      color: { visible: false },
      active_background: { visible: false },
    },
    social_icon_border: {
      color: { visible: false },
      hover_color: { visible: false },
    },
    grid_pagination_border: {
      color: { visible: false },
      hover_color: { visible: false },
    },
    filter_border: {
      color: { visible: false },
      hover_color: { visible: false },
    },
    navigation_border: {
      color: { visible: false },
      hover_color: { visible: false },
    },
    client_image_box_shadow_color: {
      visible: false,
    },
    image_border: {
      color: {
        visible: false,
      },
    },
    client_image_bg: {
      visible: false,
    },
    video_icon_color: {
      visible: false,
    },
    video_icon_overlay: {
      visible: false,
    },
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      layout: ["slider"],
      filter_style: ["even"],
      theme_style: "theme-one",
      display_testimonials_from: "latest",
      specific_testimonial: "",
      exclude_testimonial: "",
      number_of_total_testimonials: "12",
      preloader: false,
      columns: "3",
      random_order: false,
      testimonial_order_by: "menu_order",
      testimonial_order: "DESC",
      testimonial_margin: "0",
      testimonial_border: { all: "1", style: "solid", color: "#e3e3e3" },
      testimonial_box_shadow_color: "#dddddd",
      testimonial_top_bg: "#ff8a00",
      testimonial_bg: "#ffffff",
      testimonial_bg_two: "#f5f5f5",
      testimonial_bg_three: "#e57373",
      testimonial_border_radius: "10",
      number_of_columns: "3",
      pagination_type: "load_more",
      testimonial_inner_padding: {
        top: "22",
        right: "22",
        bottom: "22",
        left: "22",
      },
      testimonial_info_position: ["bottom"],
      testimonial_info_position_two: ["bottom_left"],
      testimonial_info_border: { all: "0", style: "solid", color: "#e3e3e3" },
      testimonial_info_bg: "#f1e9e0",
      testimonial_info_inner_padding: {
        top: "22",
        right: "22",
        bottom: "22",
        left: "22",
      },
      navigation_type: "arrows_dots",
      section_title: false,
      equal_height: false,
      testimonial_title: true,
      testimonial_title_tag: "h3",
      testimonial_text: true,
      testimonial_content_type: [
        isDisableField ? "full_content" : "content_with_limit",
      ],
      testimonial_characters_limit: "50",
      testimonial_read_more_ellipsis: "...",
      testimonial_read_more: false,
      testimonial_read_more_link_action: ["expand"],
      popup_background: "#ffffff",
      testimonial_read_more_text: "Read More",
      testimonial_read_less_text: "Read Less",
      testimonial_readmore_color: { color: "#1595CE", hover_color: "#2684a6" },

      testimonial_client_name: true,
      testimonial_client_name_tag: "h4",
      testimonial_client_rating: true,
      tpro_star_icon: ["fa fa-star"],
      testimonial_client_rating_color: "#ffb900",
      testimonial_client_rating_alignment: ["center"],
      testimonial_client_rating_margin: {
        top: "0",
        right: "0",
        bottom: "6",
        left: "0",
      },
      platform_icon: true,
      client_designation: true,
      client_company_name: true,
      testimonial_client_location: true,
      testimonial_client_phone: true,
      testimonial_client_email: true,
      testimonial_client_date: true,
      testimonial_client_date_format: "M j, Y",
      testimonial_client_website: true,
      identity_linking_website: false,
      website_link_target: ["_blank"],
      social_profile: false,
      social_profile_position: ["center"],
      social_profile_margin: { top: "15", right: "0", bottom: "6", left: "0" },
      social_icon_custom_color: false,
      social_icon_color: {
        color: "#aaaaaa",
        hover_color: "#ffffff",
        background: "transparent",
        hover_background: "#1595CE",
      },
      social_icon_border: {
        all: "1",
        style: "solid",
        color: "#dddddd",
        hover_color: "#1595CE",
      },
      social_icon_border_radius: { all: "50", unit: "%" },

      grid_pagination: true,
      tp_pagination_type: ["no_ajax"],
      tp_per_page: "12",
      load_more_label: "Load more",
      grid_pagination_alignment: ["left"],
      grid_pagination_margin: {
        top: "20",
        right: "0",
        bottom: "20",
        left: "0",
      },
      grid_pagination_colors: {
        color: "#5e5e5e",
        hover_color: "#ffffff",
        background: "#ffffff",
        hover_background: "#1595CE",
      },
      grid_pagination_border: {
        all: "2",
        style: "solid",
        color: "#bbbbbb",
        hover_color: "#1595CE",
      },

      all_tab: true,
      all_tab_text: "All",
      filter_alignment: ["center"],
      filter_margin: { top: "0", right: "0", bottom: "24", left: "0" },
      filter_colors: {
        color: "#bbbbbb",
        hover_color: "#ffffff",
        background: "#ffffff",
        active_background: "#1595CE",
      },
      filter_border: {
        all: "2",
        style: "solid",
        color: "#bbbbbb",
        hover_color: "#1595CE",
      },

      slider_mode: ["standard"],
      slider_auto_play: ["true"],
      slider_auto_play_speed: "3000",
      slider_scroll_speed: "600",
      slide_to_scroll: "1",
      slider_row: "1",
      slider_pause_on_hover: true,
      slider_infinite: true,
      slider_animation: ["slide"],
      slider_direction: ["ltr"],

      navigation: ["true"],
      navigation_position: "vertical_center",
      navigation_icons: ["angle"],
      navigation_icon_size: "20",
      navigation_color: {
        color: "#777777",
        hover_color: "#ffffff",
        background: "transparent",
        hover_background: "#1595CE",
      },
      navigation_border: {
        all: "2",
        style: "solid",
        color: "#bbbbbb",
        hover_color: "#1595CE",
      },
      navigation_border_radius: { all: "50", unit: "%" },

      pagination: ["true"],
      pagination_margin: { top: "21", right: "0", bottom: "0", left: "0" },
      pagination_colors: { color: "#cccccc", active_color: "#1595CE" },

      adaptive_height: false,
      slider_swipe: true,
      slider_draggable: true,
      swipe_to_slide: false,

      client_image: true,
      thumbnail_slider: false,
      client_image_position: ["center"],
      client_image_position_two: ["left"],
      client_image_position_three: ["left-top"],
      client_image_margin: { top: "0", right: "0", bottom: "22", left: "0" },
      client_image_margin_tow: {
        top: "0",
        right: "22",
        bottom: "0",
        left: "0",
      },
      client_image_style: ["three"],
      client_image_border_shadow: ["border"],
      client_image_box_shadow_color: "#888888",
      image_border: { all: "0", style: "solid", color: "#dddddd" },
      client_image_bg: "#ffffff",
      image_padding: { all: "0", unit: "px" },
      image_sizes: "custom",
      image_custom_size: { width: "120", height: "120" },
      image_grayscale: "none",
      video_icon: isDisableField ? false : true,
      video_icon_color: "#e2e2e2",
      video_icon_overlay: "rgba(51, 51, 51, 0.4)",

      slider_title_font_load: true,

      slider_title_typography: {
        "font-family": "Open Sans",
        "font-weight": "600",
        type: "google",
        "font-size": "22",
        "line-height": "22",
        "text-align": "center",
        "text-transform": "none",
        "letter-spacing": "0",
        color: "#444444",
        "margin-bottom": "23",
      },
      testimonial_title_font_load: true,
      testimonial_title_typography: {
        "font-family": "Open Sans",
        "font-weight": "600",
        type: "google",
        "font-size": "20",
        "line-height": "30",
        "text-align": "center",
        "text-transform": "none",
        "letter-spacing": "0",
        color: "#333333",
        "margin-top": "0",
        "margin-right": "0",
        "margin-bottom": "18",
        "margin-left": "0",
      },
      testimonial_text_font_load: true,
      testimonial_text_typography: {
        "font-family": "Open Sans",
        "font-weight": "normal",
        type: "google",
        "font-size": "16",
        "line-height": "26",
        "text-align": "center",
        "text-transform": "none",
        "letter-spacing": "0",
        color: "#333333",
        "margin-top": "0",
        "margin-right": "0",
        "margin-bottom": "20",
        "margin-left": "0",
      },
      client_name_font_load: true,
      client_name_typography: {
        "font-family": "Open Sans",
        "font-weight": "700",
        type: "google",
        "font-size": "16",
        "line-height": "24",
        "text-align": "center",
        "text-transform": "none",
        "letter-spacing": "0",
        color: "#333333",
        "margin-top": "0",
        "margin-right": "0",
        "margin-bottom": "8",
        "margin-left": "0",
      },
      designation_company_font_load: true,
      client_designation_company_typography: {
        "font-family": "Open Sans",
        "font-weight": "normal",
        type: "google",
        "font-size": "16",
        "line-height": "24",
        "text-align": "center",
        "text-transform": "none",
        "letter-spacing": "0",
        color: "#444444",
        "margin-top": "0",
        "margin-right": "0",
        "margin-bottom": "8",
        "margin-left": "0",
      },
      location_font_load: true,
      client_location_typography: {
        "font-family": "Open Sans",
        "font-weight": "normal",
        type: "google",
        "font-size": "15",
        "line-height": "20",
        "text-align": "center",
        "text-transform": "none",
        "letter-spacing": "0",
        color: "#444444",
        "margin-top": "0",
        "margin-right": "0",
        "margin-bottom": "5",
        "margin-left": "0",
      },
      phone_font_load: true,
      client_phone_typography: {
        "font-family": "Open Sans",
        "font-weight": "normal",
        type: "google",
        "font-size": "15",
        "line-height": "20",
        "text-align": "center",
        "text-transform": "none",
        "letter-spacing": "0",
        color: "#444444",
        "margin-top": "0",
        "margin-right": "0",
        "margin-bottom": "3",
        "margin-left": "0",
      },
      email_font_load: true,
      client_email_typography: {
        "font-family": "Open Sans",
        "font-weight": "normal",
        type: "google",
        "font-size": "15",
        "line-height": "20",
        "text-align": "center",
        "text-transform": "none",
        "letter-spacing": "0",
        color: "#444444",
        "margin-top": "0",
        "margin-right": "0",
        "margin-bottom": "5",
        "margin-left": "0",
      },
      date_font_load: true,
      testimonial_date_typography: {
        "font-family": "Open Sans",
        "font-weight": "normal",
        type: "google",
        "font-size": "15",
        "line-height": "20",
        "text-align": "center",
        "text-transform": "none",
        "letter-spacing": "0",
        color: "#444444",
        "margin-top": "0",
        "margin-right": "0",
        "margin-bottom": "6",
        "margin-left": "0",
      },
      website_font_load: true,
      client_website_typography: {
        "font-family": "Open Sans",
        "font-weight": "normal",
        type: "google",
        "font-size": "15",
        "line-height": "20",
        "text-align": "center",
        "text-transform": "none",
        "letter-spacing": "0",
        color: "#444444",
        "margin-top": "0",
        "margin-right": "0",
        "margin-bottom": "6",
        "margin-left": "0",
      },
      filter_font_load: true,
      filter_typography: {
        "font-family": "Open Sans",
        "font-weight": "600",
        type: "google",
        "font-size": "15",
        "line-height": "24",
        "text-align": "center",
        "text-transform": "none",
        "letter-spacing": "0",
      },
    },
    onSubmit: (values) => {
      handleSubmit(values);
    },
    validationSchema: validationSchema,
  });

  const [dataBackUp, setDataBackUp] = useState(formik.initialValues);

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

  const validationSchema = yup.object({
    title: yup.string().required("Title can't be blank."),
  });

  const handleInputSetColor = useCallback(
    (value, id) => {
      dataBackUp &&
        setDataBackUp({
          ...dataBackUp,
          [id]: value,
        });
      if (value.length === 7 && value.charAt(0) === "#") {
        const colorRgb = hexToRgb(value);
        const colorHsb = rgbToHsb({
          red: colorRgb[0],
          green: colorRgb[1],
          blue: colorRgb[2],
          alpha: 1,
        });
        setColorPagination({
          ...colorPagination,
          [id]: {
            ...colorPagination[id],
            color: colorHsb,
          },
        });
        formik.handleChange({ target: { id, value } });
      }
    },
    [dataBackUp]
  );

  const handleChangeSetColor = (key) => (value) => {
    const colorRgba = `rgba(${value.rgb.r}, ${value.rgb.g}, ${value.rgb.b}, ${value.rgb.a})`;
    setDataBackUp({ ...dataBackUp, [key]: colorRgba });
    formik.handleChange({ target: { id: key, value: colorRgba } });
  };

  const handleInputColorBorder = useCallback(
    (key) => (value, id) => {
      dataBackUp &&
        setDataBackUp({
          ...dataBackUp,
          [id]: {
            ...dataBackUp[id],
            [key]: value,
          },
        });
      if (value.length === 7 && value.charAt(0) === "#") {
        const colorRgb = hexToRgb(value);
        const colorHsb = rgbToHsb({
          red: colorRgb[0],
          green: colorRgb[1],
          blue: colorRgb[2],
          alpha: 1,
        });
        setColorPagination({
          ...colorPagination,
          [id]: {
            ...colorPagination[id],
            [key]: { ...colorPagination[id][key], color: colorHsb },
          },
        });
        formik.handleChange({ target: { id: `${id}[${key}]`, value } });
      }
    },
    [dataBackUp]
  );

  const handleChangeColorAddToCart = (key, keyChild) => (value) => {
    const colorRgba = `rgba(${value.rgb.r}, ${value.rgb.g}, ${value.rgb.b}, ${value.rgb.a})`;
    let newAddToCartBorderColor = formik.values[key];
    newAddToCartBorderColor[keyChild] = colorRgba;
    formik.handleChange({
      target: { id: key, value: newAddToCartBorderColor },
    });
    setDataBackUp({
      ...dataBackUp,
      [key]: { ...dataBackUp[key], [keyChild]: colorRgba },
    });
  };

  const hexToRgb = (hex) =>
    hex
      .replace(
        /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
        (m, r, g, b) => "#" + r + r + g + g + b + b
      )
      .substring(1)
      .match(/.{2}/g)
      .map((x) => parseInt(x, 16));

  const handleOpenColorPickerFont = (key) => {
    setColorPicker({
      ...colorPicker,
      [key["keys"]]: {
        ...colorPicker[key["keys"]],
        [key["child"]]: {
          ...colorPicker[key["keys"]][key["child"]],
          visible: !colorPicker[key["keys"]][key["child"]]?.visible,
        },
      },
    });
  };

  const handleChangeSettingFont = (data) => (value) => {
    const newSetting = formik.values[data["keys"]];
    if (data["keyChild"] === FONT_FAMILY) {
      newSetting[data["keyChild"]] = value;
      newSetting[data["font-weight"]] = "";
      newSetting[data["type"]] = "";
    }
    if (data["keyChild"] === COLOR || data["keyChild"] === HOVER_COLOR) {
      const colorRgba = `rgba(${value.rgb.r}, ${value.rgb.g}, ${value.rgb.b}, ${value.rgb.a})`;
      newSetting[data["keyChild"]] = colorRgba;
    } else newSetting[data["keyChild"]] = value;
    formik.handleChange({ target: { id: data["keys"], value: newSetting } });
    setDataBackUp({ ...dataBackUp, [data["keys"]]: newSetting });
  };

  const handleInputColorFontSetting = useCallback(
    (data) => (value) => {
      dataBackUp &&
        setDataBackUp({
          ...dataBackUp,
          [data["keys"]]: {
            ...dataBackUp[data["keys"]],
            [data["keyChild"]]: value,
          },
        });
      if (value?.length === 7) {
        const colorRgb = hexToRgb(value);
        const colorHsb = rgbToHsb({
          red: colorRgb[0],
          green: colorRgb[1],
          blue: colorRgb[2],
          alpha: 1,
        });
        setColorPicker({
          ...colorPicker,
          [data["keys"]]: {
            ...colorPicker[data["keys"]],
            [data["child"]]: {
              ...colorPicker[data["keys"]][data["child"]],
              color: colorHsb,
            },
          },
        });
        formik.handleChange({
          target: { id: `${data["keys"]}[${data["keyChild"]}]`, value },
        });
      }
    },
    [dataBackUp]
  );

  const handleChange = (value, id) => {
    formik.handleChange({ target: { id, value } });
  };

  const [selected, setSelected] = useState(0);

  const handleUp = useCallback(
    (index) => {
      if (index > 0) {
        const newProduct = arrayMove(productList, index - 1, index);
        setProductList(newProduct);
      }
    },
    [productList]
  );

  const handleAutoInstall = async (pageId, bodyHtml) => {
    // let sessionToken = "";
    setIsInstall(true);
    if (data?.shop) {
      let datas = { shop: data?.shop, page_id: pageId, body_html: bodyHtml };
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

  useEffect(() => {
    async function getListPage() {
      // let sessionToken = "";
      if (data?.shop) {
        let datas = { shop: data?.shop };
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

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    async function Testimonial() {
      // let sessionToken = "";
      if (data?.shop) {
        let datas = { shop: data?.shop };
        // if (NODE_ENV === "production") {
        //   sessionToken = await getSessionToken(app);
        // }

        let config = {
          headers: {
            "x-access-token": accessToken,
          },
        };
        try {
          axios.post(`/api/testimonials`, datas, config).then(({ data }) => {
            if (data?.success) {
              if (data?.data?.testimonials?.length > 0) {
                const newTestimonial = data?.data?.testimonials?.map((item) => {
                  return { label: item?.config?.title, value: item?._id };
                });
                setTestimonial(newTestimonial);
              }
            }
          });
        } catch (error) {
          toggleError();
        }
      }
    }
    Testimonial();
  }, []);

  const getSlider = async (id) => {
    // let sessionToken = "";
    let data = { shop: data?.shop };
    // if (NODE_ENV === "production") {
    //   sessionToken = await getSessionToken(app);
    // }

    let config = {
      headers: {
        "x-access-token": accessToken,
      },
    };
    try {
      axios.post(`/api/shortcodes/${id}`, data, config).then(({ data }) => {
        if (data?.success) {
          const newValue = Object.assign(
            formik.values,
            data?.data?.shortCodes?.config
          );
          formik.setValues(newValue);
          setDataBackUp(newValue);
          setProductList(data?.data?.shortCodes?.config?.product);
        }
      });
    } catch (error) {
      toggleError();
    }
  };

  const handleSubmit = async () => {
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
        shop: data?.shop,
        config: { ...formik.values, product: productList },
      };
      try {
        axios
          .put(`/api/shortcodes/${idEdit}`, datas, config)
          .then(({ data }) => {
            if (data?.success) {
              setActiveSuccess(2);
              const newSlider =
                slider?.length > 0 &&
                slider.map((item) => {
                  if (item._id === idEdit) {
                    return Object.assign(item, data?.data?.shortCodes?.config);
                  } else return item;
                });
              // setSlider(newSlider);
              setIsLoading(false);
            }
          });
      } catch (error) {
        toggleError();
        setIsLoading(false);
      }
    } else {
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
        shop: data?.shop,
        config: { ...formik.values, product: productList },
      };
      try {
        axios.post(`/api/shortcodes/new`, datas, config).then(({ data }) => {
          if (data?.success) {
            setActiveSuccess(1);
            setIdEdit(data?.data?.shortCodes?._id);
            setIsLoading(false);
          }
        });
      } catch (error) {
        toggleError();
        setIsLoading(false);
      }
      setIsSubmit(true);
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
    if (activeSuccess === 3) {
      message = "Install Success";
    }
    setTimeout(() => {
      setActiveSuccess(0);
    }, 4000);
    if (activeSuccess === 1 || activeSuccess === 2 || activeSuccess === 3)
      return <Toast duration={2} content={message} />;
  }, [activeSuccess]);

  useEffect(() => {
    if (productList?.length > 0) {
      const newProduct = productList?.map((item) => {
        return { id: item.id };
      });
      setProductListSelected(newProduct);
    }
  }, [productList]);

  useEffect(() => {
    if (idEdit) {
      getSlider(idEdit);
    }
  }, [idEdit]);

  const handleBack = () => {
    router.push("/widgets");
  };

  const handleDown = useCallback(
    (index) => {
      if (index < productList.length) {
        const newProduct = arrayMove(productList, index, index + 1);
        setProductList(newProduct);
      }
    },
    [productList]
  );

  const handleDelete = useCallback(
    (id) => {
      const newProduct = productList.filter((item) => item.id !== id);
      setProductList(newProduct);
    },
    [productList]
  );

  const handleSubmitCheckRequired = () => {
    setIsShowError(true);
    if (formik.values.title) {
      handleSubmit();
    }
  };

  useEffect(() => {
    if (!formik.values.title) {
      setErrorsWidgetName("Widget Name can't be blank.");
    } else setErrorsWidgetName("");
  }, [formik.values.title]);

  useEffect(() => {
    if (router?.query?.id && typeof window !== "undefined") {
      setIdEdit(router.query.id);
      // getSlider(id);
    }
  }, [router]);

  const userMenuMarkup = useCallback(
    () => (
      <ButtonGroup>
        <Button onClick={handleBack}>Cancel</Button>
        <Button primary loading={isLoading} onClick={handleSubmitCheckRequired}>
          {idEdit ? "Save" : "Publish"}
        </Button>
      </ButtonGroup>
    ),
    [handleSubmitCheckRequired, handleBack, isLoading, idEdit]
  );

  const secondaryMenuMarkup = <Heading>{formik.values.title}</Heading>;

  return (
    <Frame>
      <form className="edit-widget">
        <Page
          // breadcrumbs={[{ content: "Products", onAction: handleBack }]}
          // primaryAction={{
          //   content: "Save",
          //   onAction: handleSubmitCheckRequired,
          //   loading: isLoading,
          // }}
          fullWidth
          // title={!idEdit ? "Add Widget" : "Edit Widget"}
        >
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
                <div
                  className={
                    !formik.values.layout.includes("slider") ? "tab-layout" : ""
                  }
                >
                  <div className={"widget-edit"}>
                    <Card>
                      <Card.Section>
                        <FormLayout>
                          {/* <TextField
                            label="Titlte"
                            id="title"
                            name="title"
                            error={
                              isShowError && errorsTitle ? errorsTitle : ""
                            }
                            placeholder="Add Title"
                            value={formik.values.title}
                            onChange={handleChange}
                          /> */}
                          <CustomField label="Widget Name">
                            <TextField
                              id="title"
                              name="title"
                              error={
                                isShowError && errorsWidgetName
                                  ? errorsWidgetName
                                  : ""
                              }
                              value={formik.values.title}
                              onChange={handleChange}
                            />
                          </CustomField>
                        </FormLayout>
                      </Card.Section>
                    </Card>
                    <GeneralSetting
                      handleOpenUpgradePlan={handleOpenUpgradePlan}
                      isDisableField={isDisableField}
                      testimonial={testimonial}
                      dataBackUp={dataBackUp}
                      product={productList}
                      setProduct={setProductList}
                      productListSelected={productListSelected}
                      formik={formik}
                      handleUp={handleUp}
                      handleDown={handleDown}
                      handleDelete={handleDelete}
                      handleChange={handleChange}
                      changeTab={(selectedTabIndex) =>
                        setSelected(selectedTabIndex)
                      }
                    />
                    <ThemeSettings
                      handleOpenUpgradePlan={handleOpenUpgradePlan}
                      isDisableField={isDisableField}
                      dataBackups={dataBackUp}
                      handleInputSetColor={handleInputSetColor}
                      handleChangeSetColor={handleChangeSetColor}
                      formik={formik}
                      handleOpenSetColor={handleOpenSetColor}
                      handleChange={handleChange}
                      handleChangeColorAddToCart={handleChangeColorAddToCart}
                      colorPagination={colorPagination}
                    />
                    {formik.values.layout.includes("slider") && (
                      <SliderControl
                        handleOpenUpgradePlan={handleOpenUpgradePlan}
                        isDisableField={isDisableField}
                        formik={formik}
                        handleChangeColorAddToCart={handleChangeColorAddToCart}
                        dataBackUp={dataBackUp}
                        colorPagination={colorPagination}
                        handleOpenSetColor={handleOpenSetColor}
                        handleChange={handleChange}
                      />
                    )}
                    <DisplaySettings
                      handleOpenUpgradePlan={handleOpenUpgradePlan}
                      isDisableField={isDisableField}
                      formik={formik}
                      dataBackUp={dataBackUp}
                      handleChangeColorAddToCart={handleChangeColorAddToCart}
                      handleInputColorBorder={handleInputColorBorder}
                      handleChange={handleChange}
                      colorPagination={colorPagination}
                      handleOpenSetColor={handleOpenSetColor}
                      handleChangeSetColor={handleChangeSetColor}
                      changeTab={(selectedTabIndex) =>
                        setSelected(selectedTabIndex)
                      }
                    />
                    {formik.values.layout && (
                      <Pagination formik={formik} handleChange={handleChange} />
                    )}
                    {/* <ImageSettings
                            formik={formik}
                            handleOpenUpgradePlan={handleOpenUpgradePlan}
                            isDisableField={isDisableField}
                            dataBackUp={dataBackUp}
                            handleChangeSetColor={handleChangeSetColor}
                            handleInputSetColor={handleInputSetColor}
                            handleOpenSetColor={handleOpenSetColor}
                            colorPagination={colorPagination}
                            handleChange={handleChange}
                            handleChangeColorAddToCart={
                              handleChangeColorAddToCart
                            }
                            changeTab={(selectedTabIndex) =>
                              setSelected(selectedTabIndex)
                            }
                          /> */}
                    {/* <TypoGraphy
                            handleOpenUpgradePlan={handleOpenUpgradePlan}
                            isDisableField={isDisableField}
                            formik={formik}
                            handleInputColorFontSetting={
                              handleInputColorFontSetting
                            }
                            dataBackUp={dataBackUp}
                            handleChange={handleChange}
                            colorPicker={colorPicker}
                            handleOpenColorPickerFont={
                              handleOpenColorPickerFont
                            }
                            handleChangeSettingFont={handleChangeSettingFont}
                            changeTab={(selectedTabIndex) =>
                              setSelected(selectedTabIndex)
                            }
                          /> */}

                    {/* {(idEdit || isSubmit) && (
                      <Install
                        type="view"
                        isInstall={isInstall}
                        handleAutoInstall={handleAutoInstall}
                        listPage={listPage}
                        data={data}
                        sliderId={idEdit}
                      />
                    )} */}
                  </div>
                </div>
              </FormLayout>
            </Layout.Section>
            <Layout.Section id="preview-iframe">
              <IframePreview
                shop={data?.shop}
                accessToken={accessToken}
                formik={formik}
              />
            </Layout.Section>
            {messageSuccess()}
            {errorMarkup()}
            {isSubmit && <ModalPublishWidget setOpen={setIsSubmit} />}
          </Layout>
        </Page>
      </form>
    </Frame>
  );
};

export default SliderEdit;
