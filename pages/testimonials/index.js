import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Testimonial from "../../components/Testimonial";
import LayoutDefault from "../../components/LayoutDefault";
import cookies from "next-cookies";

function TestimonialPage({ shop, accessToken }) {
  const [plan, setPlan] = useState("");
  const accessTokens =
    accessToken ||
    (typeof window !== "undefined" && localStorage.getItem("accessToken"));
  const shops =
    shop || (typeof window !== "undefined" && localStorage.getItem("shop"));
  const handleOpenUpgradePlan = useCallback(() => {
    router.push("/plan");
  }, []);

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
    <LayoutDefault title="Testimonials" shop={shops}>
      <Testimonial
        accessToken={accessTokens}
        handleOpenUpgradePlan={handleOpenUpgradePlan}
        data={{ shop: shops, plan }}
      />
    </LayoutDefault>
  );
}

TestimonialPage.getInitialProps = async ({ ctx }) => {
  return {
    accessToken: cookies(ctx)["x-access-token"],
    shop: cookies(ctx)["shop"],
  };
};

export default TestimonialPage;
