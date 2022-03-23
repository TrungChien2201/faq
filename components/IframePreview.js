import { useCallback, useEffect, useRef, useState } from "react";
import { Liquid } from "liquidjs";
import templateFaq from "../liquid_templates/faq-template.liquid";
import templateFaqSetting from "../liquid_templates/faq-page-template.liquid";

export default function IframePreview({ formik, shop, accessToken, faqGroup, isFaq }) {
  const iframe = useRef();
  const engine = new Liquid();
  // const app = NODE_ENV === "development" ? null : null;
  const [faqGroups, setFaqGroups] = useState([]);

  const renderGroupSelected = useCallback(async (group, faqGroups) => {
    const newGroup = group?.map(item => {
      return faqGroups?.find(groups => groups?.id === item)
    })
    setFaqGroups(newGroup);
  },[]);

  useEffect(() => {
    if (formik?.values?.groups?.length > 0) {
      renderGroupSelected(formik.values.groups, faqGroup);
    }
  }, [formik.values.groups, faqGroup]);

  useEffect(() => {
    if (faqGroups) {
      render({
        // config: formik.values,
        groups: faqGroups,
      });
    }
  }, [faqGroups]);

  const render = async (data) => {
    const document = iframe.current.contentDocument;
    let head = document.getElementsByTagName("head")[0];
    head.innerHTML = "";
    let style = document.createElement("link");
    style.rel = "stylesheet";
    style.type = "text/css";
    style.href =
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";
    head.appendChild(style);
    let style2 = document.createElement("link");
    style2.rel = "stylesheet";
    style2.type = "text/css";
    style2.href =
      "https://cdnjs.cloudflare.com/ajax/libs/Swiper/8.0.6/swiper-bundle.min.css";
    head.appendChild(style2);

    let style3 = document.createElement("link");
    style3.rel = "stylesheet";
    style3.type = "text/css";
    style3.href = `${HOST}/${isFaq ? 'faq-preview.css':'faq-page-preview.css'}`;
    head.appendChild(style3);
    let html = await engine.parseAndRender(isFaq ? templateFaq : templateFaqSetting, data);
    document.body.innerHTML = `
      <body>${html}</body>
    `;
    let jquery = document.createElement("script");
    jquery.src =
      "https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js";
    document.body.appendChild(jquery);
    let swiper = document.createElement("script");
    swiper.src =
      "https://cdnjs.cloudflare.com/ajax/libs/Swiper/8.0.6/swiper-bundle.min.js";
    document.body.appendChild(swiper);

    let masonry = document.createElement("script");
    masonry.src =
      "https://cdnjs.cloudflare.com/ajax/libs/masonry/4.2.2/masonry.pkgd.min.js";
    document.body.appendChild(masonry);
    let script = document.createElement("script");
    script.src = `${HOST}/${isFaq ? 'faq-preview.js' : 'faq-page-preview.js'}`;
    document.body.appendChild(script);
  };

  return <iframe className="iframe-preview" id="iframe" ref={iframe}></iframe>;
}
