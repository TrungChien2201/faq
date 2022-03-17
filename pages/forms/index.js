import axios from "axios";
import cookies from "next-cookies";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Forms from "../../components/Forms";
import LayoutDefault from "../../components/LayoutDefault";

function TestimonialFormsPage({ accessToken, shop }) {
  const [plan, setPlan] = useState("");

  const router = useRouter();
  const accessTokens =
    accessToken ||
    (typeof window !== "undefined" && localStorage.getItem("accessToken"));
  const shops =
    shop || (typeof window !== "undefined" && localStorage.getItem("shop"));

  const handleOpenUpgradePlan = useCallback(() => {
    router.push("/plan");
  }, []);

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

  return (
    <LayoutDefault title="Forms" shop={shops}>
      <Forms
        accessToken={accessTokens}
        handleOpenUpgradePlan={handleOpenUpgradePlan}
        data={{ shop: shops, plan }}
      />
    </LayoutDefault>
  );
}

TestimonialFormsPage.getInitialProps = async ({ ctx }) => {
  return {
    accessToken: cookies(ctx)["x-access-token"],
    shop: cookies(ctx)["shop"],
  };
};

export default TestimonialFormsPage;
