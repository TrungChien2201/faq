import axios from "axios";
import cookies from "next-cookies";
import { useEffect, useState } from "react";
import LayoutDefault from "../../components/LayoutDefault";
import Plan from "../../components/Plan";

function PlanPage({ shop, accessToken }) {
  const [plan, setPlan] = useState("");

  const accessTokens =
    accessToken ||
    (typeof window !== "undefined" && localStorage.getItem("accessToken"));
  const shops =
    shop || (typeof window !== "undefined" && localStorage.getItem("shop"));

  const getShopPlan = async ({ accessToken }) => {
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
    <LayoutDefault title="Plan" shop={shops}>
      <Plan
        accessToken={accessTokens}
        downgradePlan={downgradePlan}
        data={{ shop: shops, plan }}
      />
    </LayoutDefault>
  );
}
PlanPage.getInitialProps = async ({ ctx }) => {
  return {
    accessToken: cookies(ctx)["x-access-token"],
    shop: cookies(ctx)["shop"],
  };
};
export default PlanPage;
