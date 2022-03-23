import axios from "axios";
import cookies from "next-cookies";
import Head from "next/head";
import { useEffect, useState } from "react";
import FaqSettingEdit from "../../components/FaqSettingEdit";

function FaqPageSetting({ accessToken, shop }) {
  // const app = NODE_ENV === "development" ? null : null;
  const [plan, setPlan] = useState("");
  const [slider, setSlider] = useState([]);
  const [idEdit, setIdEdit] = useState("");
  const [isAddNew, setIsAddNew] = useState(false);
  const shops = shop || typeof window !== "undefined" && localStorage.getItem("shop");
  const accessTokens =
  accessToken || (typeof window !== "undefined" && localStorage.getItem("accessToken"));
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

  return (
    <>
      <Head>Faq Settings</Head>
      <FaqSettingEdit
        data={{ shop: shops, plan }}
        slider={slider}
        setSlider={setSlider}
        accessToken={accessTokens}
        isAddNew={isAddNew}
        handleClearAddNew={() => setIsAddNew(false)}
      />
    </>
  );
}

FaqPageSetting.getInitialProps = async (ctx) => {
  return {
    accessToken: cookies(ctx)["x-access-token"],
    shop: cookies(ctx)["shop"],
  };
};

export default FaqPageSetting;
