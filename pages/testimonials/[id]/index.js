import axios from "axios";
import cookies from "next-cookies";
import { useEffect, useState } from "react";
import LayoutDefault from "../../../components/LayoutDefault";
import Testimonial from "../../../components/Testimonial";

function TestimonialEditPage({ shop, accessToken }) {
  const [plan, setPlan] = useState("");
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

  return (
    <LayoutDefault title="Testimonials Edit" shop={shops}>
      <Testimonial
        isAddNew={true}
        accessToken={accessTokens}
        data={{ shop: shops, plan }}
      />
    </LayoutDefault>
  );
}

TestimonialEditPage.getInitialProps = async ({ ctx }) => {
  return {
    accessToken: cookies(ctx)["x-access-token"],
    shop: cookies(ctx)["shop"],
  };
};

export default TestimonialEditPage;
