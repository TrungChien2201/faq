import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";

function FaqSettingEditPage() {
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
      <Head>Faq Settings Edit</Head>
      <FaqSettingEdit
        data={{ shop, plan }}
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

export default FaqSettingEditPage;
