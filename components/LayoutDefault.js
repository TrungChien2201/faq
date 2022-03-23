import { Icon, Link, TopBar } from "@shopify/polaris";
import MenuHeader from "./Menu";
import Image from "next/image";
import Head from "next/head";
import { CircleAlertMajor } from "@shopify/polaris-icons";
import Logo from "../assets/img/logo.png";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import EmailQuota from "./EmailQuota";

export default function LayoutDefault({ children, shop, title }) {
  const [totalViewWidget, setTotalViewWidget] = useState(0);
  const [isHover, setIsHover] = useState(false);
  const refMailQuota = useRef(null);
  const refMailQuotaDropDown = useRef(null);
  const refMailQuotaDropDownOverlay = useRef(null);
  const accessToken =
    (typeof window !== "undefined" && localStorage.getItem("accessToken")) ||
    null;

  const getTotalView = useCallback(async () => {
    let config = {
      headers: {
        "x-access-token": accessToken,
      },
    };
    let datas = {
      shop: shop,
    };
    try {
      const { data } = await axios.post(`/api/shortcodes/view`, datas, config);
      if (data?.success) {
        setTotalViewWidget(data?.data?.totalWidget[0]?.view);
      }
    } catch (error) {}
  }, [accessToken]);

  useEffect(() => {
    getTotalView();
  }, []);

  const handleMouseOver = () => refMailQuotaDropDown.current.className = "dropdown-active";
  const handleMouseOut = () => refMailQuotaDropDown.current.className = "header-email-quota";

  useEffect(
    () => {
      const node = refMailQuota.current;
      const node2 = refMailQuotaDropDown.current;
      const node3 = refMailQuotaDropDownOverlay.current;
      if (node && node3 && node2) {
        node.addEventListener("mouseover", handleMouseOver);
        node.addEventListener("mouseleave", handleMouseOut);
        node3.addEventListener("mouseover", handleMouseOver);
        // node3.addEventListener("mouseout", handleMouseOut);
        node2.addEventListener("mouseover", handleMouseOver);
        node2.addEventListener("mouseout", handleMouseOut);
        return () => {
          node.removeEventListener("mouseover", handleMouseOver);
          node.removeEventListener("mouseleave", handleMouseOut);
          node3.removeEventListener("mouseover", handleMouseOver);
          node3.removeEventListener("mouseout", handleMouseOut);
          node2.removeEventListener("mouseover", handleMouseOver);
          node2.removeEventListener("mouseout", handleMouseOut);
        };
      }
    },
    [
      refMailQuota.current,
      refMailQuotaDropDown.current,
      refMailQuotaDropDownOverlay.current,
    ] // Recall only if ref changes
  );

  const renderDropDownEmailQuota = useCallback(() => {
    return <EmailQuota totalViewWidgets={totalViewWidget} />;
  }, [isHover]);

  const userMenuMarkup = (
    <div className="header-right">
      {/* <div ref={refMailQuota} className="email-quota">
        <Icon source={CircleAlertMajor} color="primary" />
        <div style={{ display: "flex", alignItems: "center" }}>
          View quota: {totalViewWidget}/1000
        </div>
      </div>
      <div className="dropdown-email" ref={refMailQuotaDropDownOverlay} />
      <div ref={refMailQuotaDropDown} className="header-email-quota">
        {renderDropDownEmailQuota()}
      </div> */}
      <Link external url={`https://${shop}`}>
        {shop}
      </Link>
    </div>
  );

  const secondaryMenuMarkup = (
    <Image src={Logo} alt="Picture of the author" width="150px" height="36px" />
  );

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="top-bar">
        <TopBar userMenu={userMenuMarkup} searchField={secondaryMenuMarkup} />
      </div>
      <div className="layout-default">
        <div className="header">
          <MenuHeader />
        </div>
        <div className="content">{children}</div>
      </div>
    </>
  );
}
