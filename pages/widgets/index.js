import axios from "axios";
import cookies from "next-cookies";
import { useCallback, useEffect, useState } from "react";
import LayoutDefault from "../../components/LayoutDefault";
import SliderListing from "../../components/SliderListing";

function ManageViewsPage({ accessToken, shop }) {
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
    // let sessionToken = "";

    // if (NODE_ENV === "production") {
    //   sessionToken = await getSessionToken(app);
    // }

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
    <LayoutDefault title="Widgets" shop={shops}>
      <SliderListing
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

ManageViewsPage.getInitialProps = async (ctx) => {
  return {
    accessToken: cookies(ctx)["x-access-token"],
    shop: cookies(ctx)["shop"],
  };
};

export default ManageViewsPage;
