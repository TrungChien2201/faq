import { Icon } from "@shopify/polaris";
import {
  FaAngleDoubleRight,
  FaAngleRight,
  FaArrowRight,
  FaCaretRight,
  FaChevronRight,
  FaLongArrowAltRight,
  FaThumbsUp,
  FaStar,
  FaHeart,
  FaHourglass,
  FaCircle,
  FaSquare,
  FaFlag,
  FaSmile,
} from "react-icons/fa";

export const GRID = "grid";
export const FILTER = "filter";
export const SAME_PAGE = "same_page";
export const TO_A_PAGE = "to_a_page";
export const TO_A_CUSTOM_URL = "to_a_custom_url";
export const TRUE = "true";
export const OFF_ON_MOBILE = "off_on_mobile";
export const BOTTOM = "bottom";
export const TOP = "top";
export const FALSE = "false";
export const THEME_EIGHTEEN = "theme-eighteen";
export const THEME_TWENTY = "theme-twenty";
export const THEME_TWENTY_ONE = "theme-twenty-one";
export const THEME_ONE = "theme-one";
export const THEME_TWO = "theme-two";
export const THEME_THREE = "theme-three";
export const THEME_FOUR = "theme-four";
export const THEME_TWENTY_EIGHT = "theme-twenty-eight";
export const THEME_FIVE = "theme-five";
export const THEME_SIX = "theme-six";
export const THEME_SEVEN = "theme-seven";
export const THEME_NINE = "theme-nine";
export const THEME_EIGHT = "theme-eight";

export const THEME_TEN = "theme-ten";
export const THEME_ELEVEN = "theme-eleven";

export const THEME_THIRTEEN = "theme-thirteen";
export const THEME_FOURTEEN = "theme-fourteen";
export const THEME_FIFTEEN = "theme-fifteen";
export const THEME_SIXTEEN = "theme-sixteen";
export const THEME_SEVENTEEN = "theme-seventeen";

export const THEME_NINETEEN = "theme-nineteen";
export const THEME_TWENTY_TWO = "theme-twenty_two";
export const THEME_TWENTY_THREE = "theme-twenty-three";
export const THEME_TWENTY_FOUR = "theme-twenty-four";
export const THEME_TWENTY_FIVE = "theme-twenty-five";
export const THEME_TWENTY_SIX = "theme-twenty-six";
export const THEME_TWENTY_SEVEN = "theme-twenty-seven";
export const THEME_TWELVE = "theme-twelve";

export const FONT_FAMILY = "font-family";
export const COLOR = "color";
export const HOVER_COLOR = "hover_color";

export const SPECIFIC_TESTIMONIALS = "specific_testimonials";
export const EXCLUDE = "exclude";
export const CONTENT_WITH_LIMIT = "content_with_limit";
export const SLIDER = "slider";
export const UPLOAD_PRESET = "vzdq3qdu";
export const BASE_URL = "https://api.cloudinary.com/v1_1/de6j4d42n/upload";

export const OptionLayoutPreset = (isDisableField = false) => [
  { label: "Slider", value: "slider" },
  { label: "Grid", value: "grid", disabled: isDisableField },
  { label: "Masonry", value: "masonry", disabled: isDisableField },
  { label: "List", value: "list", disabled: isDisableField },
  // { label: "Isotope", value: "filter", disabled: isDisableField },
];

export const OptionTestimonialFilter = (isDisableField = false) => [
  { label: "Latest", value: "latest" },
  {
    label: "Specific",
    value: "specific_testimonials",
    disabled: isDisableField,
  },
  { label: "Exclude", value: "exclude", disabled: isDisableField },
];

export const OptionTestimonialSpecific = [{ label: "", value: "" }];

export const OptionGridStyle = [
  { label: "Even", value: "even" },
  { label: "Mansonry", value: "masonry" },
];

export const OptionNavigationType = [
  { label: "Arrows and Dots", value: "arrows_dots" },
  { label: "Arrows", value: "arrows" },
  { label: "Dots", value: "dots" },
  { label: "None", value: "none" },
];

export const OptionOrderBy = [
  { label: "Testimonial ID", value: "ID" },
  { label: "Created At", value: "date" },
  { label: "Title", value: "title" },
  { label: "Updated At", value: "modified" },
  { label: "Drag & Drop", value: "menu_order" },
];

export const OptionOrder = [
  { label: "Ascending", value: "ASC" },
  { label: "Descending", value: "DESC" },
];

export const OptionThemeSettingTestimonial = (isDisableField = false) => [
  { label: "Theme One", value: "theme-one" },
  { label: "Theme Two", value: "theme-two", disabled: isDisableField },
  { label: "Theme Three", value: "theme-three", disabled: isDisableField },
  { label: "Theme Four", value: "theme-four", disabled: isDisableField },
  { label: "Theme Five", value: "theme-five", disabled: isDisableField },
  { label: "Theme Six", value: "theme-six", disabled: isDisableField },
  { label: "Theme Seven", value: "theme-seven", disabled: isDisableField },
  { label: "Theme Eight", value: "theme-eight", disabled: isDisableField },
  { label: "Theme Nine", value: "theme-nine", disabled: isDisableField },
  // { label: "Theme Ten", value: "theme-ten", disabled: isDisableField },
];

export const OptionNumberOfColumn = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
];

export const optionSlideMode = (isDisableField = false) => [
  { label: "Standard", value: "standard" },
  { label: "Ticker", value: "ticker", disabled: isDisableField },
];

export const optionSlideDirection = [
  { label: "Right to Left", value: "ltr" },
  { label: "Left to Right", value: "rtl" },
];

export const optionNavigation = [
  { label: "Show", value: "true" },
  { label: "Hide", value: "false" },
  { label: "Hide on Mobile", value: "hide_on_mobile" },
];

export const optionIconStyle = [
  { label: <Icon source={FaAngleRight} color="base" />, value: "angle" },
  { label: <Icon source={FaChevronRight} color="base" />, value: "chevron" },
  {
    label: <Icon source={FaAngleDoubleRight} color="base" />,
    value: "angle-double",
  },
  { label: <Icon source={FaArrowRight} color="base" />, value: "arrow" },
  {
    label: <Icon source={FaLongArrowAltRight} color="base" />,
    value: "long-arrow",
  },
  { label: <Icon source={FaCaretRight} color="base" />, value: "caret" },
];

export const optionPositon = [
  { label: "Top right", value: "top_right" },
  { label: "Top center", value: "top_center" },
  { label: "Top left", value: "top_left" },
  { label: "Bottom left", value: "bottom_left" },
  { label: "Bottom center", value: "bottom_center" },
  { label: "Bottom right", value: "bottom_right" },
  { label: "Vertically center", value: "vertical_center" },
  { label: "Vertically center inner", value: "vertical_center_inner" },
  {
    label: "Vertically center inner on hover",
    value: "vertical_center_inner_hover",
  },
];

export const optionNavigationArrowColor = {
  color: "Color",
  hover_color: "Hover Color",
  background: "Background",
  hover_background: "Hover Background",
  border: "Border",
  hover_border: "Hover Border",
};

export const optionPaginationType = [
  { label: "Number", value: "number" },
  { label: "Dots", value: "dots" },
];

export const optionProductLinkTarget = [
  { label: "Current Tab", value: "_self" },
  { label: "New Tab", value: "_blank" },
];

export const optionAddToCartBorderStyle = [
  { label: "Solid", value: "solid" },
  { label: "Dashed", value: "dashed" },
  { label: "Dotted", value: "dotted" },
  { label: "Double", value: "double" },
  { label: "Inset", value: "inset" },
  { label: "Outset", value: "outset" },
  { label: "Groove", value: "groove" },
  { label: "Ridge", value: "ridge" },
  { label: "None", value: "none" },
];

export const optionImageMode = [
  { label: "Normal", value: "" },
  {
    label: "Grayscale with normal on hover",
    value: "sp-wpsp-gray-with-normal-on-hover",
  },
  { label: "Grayscale on hover", value: "sp-wpsp-gray-on-hover" },
  { label: "Always Grayscale", value: "sp-wpsp-always-gray" },
];

export const optionFontFamily = [
  { title: "ggg" },
  { label: "Arial", value: "arial" },
  { label: "Arial Black", value: "arial_black" },
  { label: "Hevetica", value: "hevetica" },
  { label: "Courier New", value: "courier_new" },
];

export const optionTextAlign = [
  { label: "Inherit", value: "inherit" },
  { label: "Left", value: "left" },
  { label: "Center", value: "center" },
  { label: "Right", value: "right" },
  { label: "Justify", value: "justify" },
  { label: "Initial", value: "intial" },
];

export const optionTextTransform = [
  { label: "None", value: "none" },
  { label: "Capitalize", value: "capitalize" },
  { label: "Uppercase", value: "uppercase" },
  { label: "Lowercase", value: "lowercase" },
];

export const optionDescriptionType = [
  { label: "Short", value: "short_description" },
  { label: "Full", value: "full_description" },
];

export const optionPosition = [
  { label: "Top of the Page", value: "top" },
  { label: "Bottom of the Page", value: "bottom" },
];

export const optionFormMessagePosition = [
  { label: "Top", value: "top" },
  { label: "Bottom", value: "bottom" },
];

export const optionTestimonialStatus = [
  { label: "Published", value: "published" },
  { label: "Pending", value: "pending" },
];

export const optionFormMessageRedirect = [
  { label: "Same Page", value: "same_page" },
  { label: "To a page", value: "to_a_page" },
  { label: "To a custom URL", value: "to_a_custom_url" },
];

export const optionFormNotifycationStatus = [
  { label: "Auto Publish", value: "publish" },
  { label: "Pending", value: "pending" },
];

export const optionFormMessagePage = [
  { label: "Testimonial", value: "testimonial" },
  { label: "Product Slider", value: "product_slider" },
  { label: "Test", value: "test" },
  { label: "My account", value: "my_account" },
  { label: "Checkout", value: "checkout" },
  { label: "Cart", value: "cart" },
  { label: "Shop", value: "shop" },
  { label: "Sample Page", value: "sample_page" },
];

export const optionSocial = [
  { label: "Select", value: "" },
  { label: "Facebook", value: "facebook" },
  { label: "Twitter", value: "twitter" },
  { label: "Linkedln", value: "linkedln" },
  { label: "Skype", value: "skype" },
  { label: "Dropbox", value: "dropbox" },
  { label: "Wordpress", value: "wordpress" },
  { label: "Vimeo", value: "vimeo" },
  { label: "SlideShare", value: "slideShare" },
  { label: "VK", value: "vk" },
  { label: "Tumblr", value: "tumblr" },
  { label: "Yahoo", value: "yahoo" },
  { label: "Pinterest", value: "pinterest" },
  { label: "Youtube", value: "youtube" },
  { label: "StumbleUpon", value: "stumbleUpon" },
  { label: "Reddit", value: "reddit" },
  { label: "Quora", value: "quora" },
  { label: "Yelp", value: "yelp" },
  { label: "Weibo", value: "weibo" },
  { label: "ProductHunt", value: "productHunt" },
  { label: "HackerNews", value: "hackerNews" },
  { label: "Soundcloud", value: "soundcloud" },
  { label: "WhatsApp", value: "whatsApp" },
  { label: "Medium", value: "medium" },
  { label: "Vine", value: "vine" },
  { label: "Slack", value: "slack" },
  { label: "Instagram", value: "instagram" },
  { label: "Dribble", value: "dribble" },
  { label: "Flickr", value: "flickr" },
  { label: "FourSquare", value: "fourSquare" },
  { label: "Behance", value: "behance" },
  { label: "SnapChat", value: "snapChat" },
  { label: "Github", value: "github" },
  { label: "Bitbucket", value: "bitbucket" },
  { label: "Stack Overflow", value: "stack_overflow" },
  { label: "Codepen", value: "codepen" },
];

export const OptionInfoPosition = [
  { label: "Top", value: "top" },
  { label: "Bottom", value: "bottom" },
  { label: "Left", value: "left" },
  { label: "Right", value: "right" },
];

export const OptionRatingAlignMent = [
  { label: "Left", value: "left" },
  { label: "Center", value: "center" },
  { label: "Right", value: "right" },
];

export const OptionLinkTarget = [
  { label: "Open a New Tab", value: "_blank" },
  { label: "Same Tab", value: "_self" },
];

export const OptionIconBorderRadius = [
  { label: "px", value: "px" },
  { label: "%", value: "%" },
];

export const OptionTag = [
  { label: "h1", value: "h1" },
  { label: "h2", value: "h2" },
  { label: "h3", value: "h3" },
  { label: "h4", value: "h4" },
  { label: "h5", value: "h5" },
  { label: "h6", value: "h6" },
  { label: "p", value: "p" },
  { label: "span", value: "span" },
  { label: "div", value: "div" },
];

export const OptionInfoPositionTwo = [
  { label: "Top Left", value: "top_left" },
  { label: "Top Right", value: "top_right" },
  { label: "Bottom Left", value: "bottom_left" },
  { label: "Bottom Right", value: "bottom_right" },
];

export const OptionInfoPositionThree = [
  { label: "Left Top", value: "left-top" },
  { label: "Left Bottom", value: "left-bottom" },
  { label: "Right Top", value: "right-top" },
  { label: "Right Bottom", value: "right-bottom" },
  { label: "Top Left", value: "top-left" },
  { label: "Top Right", value: "top-right" },
  { label: "Bottom Left", value: "bottom-left" },
  { label: "Bottom Right", value: "bottom-right" },
];

export const OptionContentType = (isDisableField = false) => [
  { label: "Full Content", value: "full_content" },
  {
    label: "Limit",
    value: "content_with_limit",
    disabled: isDisableField,
  },
];

export const OptionReadMoreLinkAction = [
  { label: "Expand", value: "expand" },
  { label: "Popup", value: "popup" },
];

export const OptionRatingIcon = (isDisableField = false) => [
  { label: <Icon source={FaStar} color="base" />, value: "fa fa-star" },
  {
    label: <Icon source={FaHeart} color="base" />,
    value: "fa fa-heart",
    disabled: isDisableField,
  },
  {
    label: <Icon source={FaThumbsUp} color="base" />,
    value: "fa fa-thumbs-up",
    disabled: isDisableField,
  },
  {
    label: <Icon source={FaHourglass} color="base" />,
    value: "fa fa-hourglass",
    disabled: isDisableField,
  },
  {
    label: <Icon source={FaCircle} color="base" />,
    value: "fa fa-circle",
    disabled: isDisableField,
  },
  {
    label: <Icon source={FaSquare} color="base" />,
    value: "fa fa-square",
    disabled: isDisableField,
  },
  {
    label: <Icon source={FaFlag} color="base" />,
    value: "fa fa-flag",
    disabled: isDisableField,
  },
  {
    label: <Icon source={FaSmile} color="base" />,
    value: "fa fa-smile-o",
    disabled: isDisableField,
  },
];

export const OptionPaginationType = [
  { label: "Load More Button (Ajax)", value: "ajax_load_more" },
  { label: "Ajax Number Pagination", value: "ajax_pagination" },
  { label: "Infinite Scroll (Ajax)", value: "infinite_scroll" },
  { label: "No Ajax (Normal Pagination)", value: "no_ajax" },
];

export const OptionPaginationTypeSection = [
  { label: "None", value: "none" },
  { label: "Load more", value: "load_more" },
];

export const OptionSliderAutoPlay = [
  { label: "On", value: "true" },
  { label: "Off", value: "false" },
  { label: "Off on Mobile", value: "off_on_mobile" },
];

export const OptionSliderAnimation = (isDisableField = false) => [
  { label: "Slide", value: "slide" },
  { label: "Fade", value: "fade", disabled: isDisableField },
];

export const OptionImageShape = (isDisableField = false) => [
  { label: "Circle", value: "three" },
  { label: "Rounded", value: "two", disabled: isDisableField },
  { label: "Square", value: "one", disabled: isDisableField },
];

export const OptionImageBorderShadow = [
  { label: "Border", value: "border" },
  { label: "Box-Shadow", value: "box_shadow" },
];

export const OptionImageSize = [
  { label: "Default", value: "default" },
  { label: "Set custom size", value: "custom" },
];

export const OptionImageGrayscale = (isDisableField = false) => [
  { label: "Normal", value: "none" },
  {
    label: "Grayscale and normal on hover",
    value: "normal_on_hover",
    disabled: isDisableField,
  },
  { label: "Grayscale on hover", value: "on_hover", disabled: isDisableField },
  { label: "Always grayscale", value: "always", disabled: isDisableField },
];

export const POPUP = "popup";
export const EXPAND = "expand";
export const INFINTE_SCROLL = "infinite_scroll";
export const STANDARD = "standard";
export const BOX_SHADOW = "box_shadow";
export const BORDER = "border";
export const CUSTOM = "custom";

export const THEME_STYLE_MARGIN = [
  "theme-one",
  "theme-two",
  "theme-three",
  "theme-four",
  "theme-five",
  "theme-six",
  "theme-seven",
  "theme-eight",
  "theme-nine",
  "theme-ten",
];

export const DEPEN_TESTIMONIAL_BORDER = [
  "theme-two",
  "theme-three",
  "theme-four",
  "theme-five",
  "theme-six",
  "theme-seven",
  "theme-eight",
  "theme-nine",
  "theme-ten",
];

export const DEPEN_TESTIMONIAL_BG = [
  "theme-two",
  "theme-three",
  "theme-five",
  "theme-six",
  "theme-ten",
];

export const DEPEN_TESTIMONIAL_BG3 = [
  "theme-seven",
  "theme-eight",
  "theme-nine",
];

export const DEPEN_CARD_PAGINATION = ["grid", "masonry", "list"];

export const DEPEN_NAVIGATION = ["true", "hide_on_mobile"];

export const DEPEN_IMAGE_POSITION = ["theme-one", "theme-eight", "theme-ten"];
export const DEPEN_IMAGE_POSITION_TWO = [
  "theme-two",
  "theme-four",
  "theme-five",
];

export const DEPEN_FORM_ELEMENT_PLACEHOLDER = [
  "featured_image",
  "rating",
  "recaptcha",
  "social_profile",
  "submit_btn",
];
export const DEPEN_FORM_ELEMENT_REQUIRED = [
  "rating",
  "recaptcha",
  "social_profile",
  "submit_btn",
];

export const DEPEN_IMAGE_POSITION_THREE = ["theme-three", "theme-six"];

export const initalTestimonial = {
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
  rating: 0,
  social_profiles: [
    {
      social_name: "",
      social_url: "",
    },
  ],
};

export const optionChooseElementForm = [
  { label: "Full Name", value: "full_name" },
  { label: "E-mail Address", value: "email_address" },
  { label: "Identity or Position", value: "identity_position" },
  { label: "Company Name", value: "company_name" },
  { label: "Testimonial Title", value: "testimonial_title" },
  { label: "Testimonial", value: "testimonial" },
  { label: "Image", value: "featured_image" },
  { label: "Location", value: "location" },
  { label: "Phone or Mobile", value: "phone_mobile" },
  { label: "Website", value: "website" },
  { label: "Video URL", value: "video_url" },
  { label: "reCAPTCHA", value: "recaptcha" },
  { label: "Rating", value: "rating" },
  { label: "Social Profile", value: "social_profile" },
  // { label: "Submit Button", value: "submit_btn", disable: true },
];

export const optionSocialProfile = [
  { label: "Facebook", value: "facebook" },
  { label: "Twitter", value: "twitter" },
  { label: "LinkedIn", value: "linkedin" },
  { label: "Skype", value: "skype" },
  { label: "Dropbox", value: "dropbox" },
  { label: "WordPress", value: "wordpress" },
  { label: "Vimeo", value: "vimeo" },
  { label: "SlideShare", value: "slideshare" },
  { label: "VK", value: "vk" },
  { label: "Tumblr", value: "tumblr" },
  { label: "Yahoo", value: "yahoo" },
  { label: "Pinterest", value: "pinterest" },
  { label: "Youtube", value: "youtube" },
  { label: "StumbleUpon", value: "stumbleupon" },
  { label: "Reddit", value: "reddit" },
  { label: "Quora", value: "quora" },
  { label: "Yelp", value: "yelp" },
  { label: "Weibo", value: "weibo" },
  { label: "ProductHunt", value: "product-hunt" },
  { label: "HackerNews", value: "hacker-news" },
  { label: "Soundcloud", value: "soundcloud" },
  { label: "WhatsApp", value: "whatsapp" },
  { label: "Medium", value: "medium" },
  { label: "Vine", value: "ivne" },
  { label: "Slack", value: "slack" },
  { label: "Instagram", value: "instagram" },
  { label: "Dribble", value: "dribble" },
  { label: "Flickr", value: "flickr" },
  { label: "FourSquare", value: "foursquare" },
  { label: "Behance", value: "behance" },
  { label: "SnapChat", value: "snapchat" },
  { label: "Github", value: "github" },
  { label: "Bitbucket", value: "bitbucket" },
  { label: "Stack Overflow", value: "stack-overflow" },
  { label: "Codepen", value: "codepen" },
];

export const testimonialFormListContentUpgrade = [
  "Collect New Testimonials Automatically",
  "Protect your Form against Spam",
  "Collect and Display Video Testimonials",
  "Create Unlimited Real Testimonial Forms",
  "Drag-and-Drop Real Testimonials Form Builder",
  "Add Testimonial Forms To Any Page or Post",
  "Email Notifications for New Testimonials",
  "5+ Beautiful Layouts to Display Testimonials",
  "Rich Snippets or Structured Data compatible",
  "Manage New Testimonials Before Publish",
  "10+ Professionally Designed Themes",
  "Regular Updates & Great Customer Support",
];
