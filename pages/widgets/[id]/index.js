import axios from "axios";
import Head from "next/head";
import router from "next/router";
import { useEffect, useState } from "react";
import LayoutDefault from "../../../components/LayoutDefault";
import SliderEdit from "../../../components/SliderEdit";

function WidgetsEdit() {
  const [plan, setPlan] = useState("");
  const [slider, setSlider] = useState([]);
  const [idEdit, setIdEdit] = useState("");
  const [isAddNew, setIsAddNew] = useState(false);
  const shop = typeof window !== "undefined" && localStorage.getItem("shop");
  const accessToken =
    (typeof window !== "undefined" && localStorage.getItem("accessToken")) ||
    null;
  const getShopPlan = async () => {
    let config = {
      headers: {
        "x-access-token": accessToken,
      },
    };
    let datas = {
      shop: shop,
    };
    const { data } = await axios.post("/api/get_shop_plan", datas, config);
    setPlan(data?.data?.shop?.plan);
  };

  useEffect(() => {
    getShopPlan();
  }, []);
  return (
    <>
      <Head>Widgets Edit</Head>
      <SliderEdit
        data={{ shop, plan }}
        // handleOpenUpgradePlan={handleOpenUpgradePlan}
        slider={slider}
        setSlider={setSlider}
        setIdEdit={setIdEdit}
        idEdit={idEdit}
        accessToken={accessToken}
        isAddNew={isAddNew}
        handleClearAddNew={() => setIsAddNew(false)}
      />
    </>
  );
}

export default WidgetsEdit;
