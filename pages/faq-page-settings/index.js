import axios from "axios";
import cookies from "next-cookies";
import { useCallback, useEffect, useState } from "react";
import FaqListing from "../../components/FaqSettingListing";
import LayoutDefault from "../../components/LayoutDefault";

function FaqPageSetting({ accessToken, shop }) {
  // const app = NODE_ENV === "development" ? null : null;
  const [plan, setPlan] = useState("");
  const [editor, setEditor] = useState(false);
  const [slider, setSlider] = useState([]);
  const [idEdit, setIdEdit] = useState("");
  const [isAddNew, setIsAddNew] = useState(false);
  const accessTokens =
    accessToken ||
    (typeof window !== "undefined" && localStorage.getItem("accessToken"));
  const shops =
    shop || (typeof window !== "undefined" && localStorage.getItem("shop"));
  const getShopPlan = async () => {
    let config = {
      headers: {
        "x-access-token": accessTokens,
      },
    };
    let datas = {
      shop: shops,
    };
    const { data } = await axios.post("/api/get_shop_plan", datas, config);
    setPlan(data?.data?.shop?.plan);
  };

  useEffect(() => {
    getShopPlan();
  }, []);

  const toggleEditor = useCallback(() => {
    setEditor(!editor);
  }, [editor]);

  return (
    <LayoutDefault title="Faq Settings" shop={shops}>
      <FaqListing
        data={{ shop: shops }}
        slider={slider}
        accessToken={accessTokens}
        setSlider={setSlider}
        setIdEdit={setIdEdit}
        idEdit={idEdit}
        handleAddNew={() => setIsAddNew(true)}
        toggleSliderEdit={toggleEditor}
      />
    </LayoutDefault>
  );
}

FaqPageSetting.getInitialProps = async (ctx) => {
  return {
    accessToken: cookies(ctx)["x-access-token"],
    shop: cookies(ctx)["shop"],
  };
};

export default FaqPageSetting;
