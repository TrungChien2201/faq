import { useEffect, useCallback, useState } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  FormLayout,
  Label,
  Layout,
  Page,
  ProgressBar,
  TextStyle,
  DisplayText,
  TextContainer,
} from "@shopify/polaris";
import { useRouter } from "next/router";
import DashboardGettingStartedTab from "../../components/DashBoardGettingStartedTab";
import LayoutDefault from "../../components/LayoutDefault";
import axios from "axios";
import EmailQuota from "../../components/EmailQuota";

export default function Dashboard() {
  const router = useRouter();
  const shop =
    router.query.shop ||
    (typeof window !== "undefined" && localStorage.getItem("shop"));
  const accessToken =
    (typeof window !== "undefined" && localStorage.getItem("accessToken")) ||
    null;
  const [totalTestimonial, setTotalTestimonial] = useState(0);
  const [totalWidget, setTotalWidget] = useState(0);
  const [progress, setProgress] = useState(33.3);

  const getTestimonial = useCallback(async () => {
    let config = {
      headers: {
        "x-access-token": accessToken,
      },
    };
    let datas = {
      shop: shop,
    };
    try {
      const { data } = await axios.post(`/api/faq`, datas, config);
      if (data?.success) {
        setTotalTestimonial(data?.data?.faq?.length);
      }
    } catch (error) {}
  }, [accessToken]);

  const getWidget = useCallback(async () => {
    let config = {
      headers: {
        "x-access-token": accessToken,
      },
    };
    let datas = {
      shop: shop,
    };
    try {
      const { data } = await axios.post(`/api/widget-faq`, datas, config);
      if (data?.success) {
        setTotalWidget(data?.data?.widget?.length);
      }
    } catch (error) {}
  }, [accessToken]);

  useEffect(() => {
    getTestimonial();
    getWidget();
  }, []);

  useEffect(() => {
    if (totalTestimonial > 0 && totalWidget > 0) {
      setProgress(100);
    } else if (totalTestimonial > 0 || totalWidget > 0) {
      setProgress(66.6);
    }
  }, [totalTestimonial, totalWidget]);

  const handleRedirectTestimonials = useCallback(() => {
    router.push("/faqs");
  }, [router]);

  const handleRedirectWidgets = useCallback(() => {
    router.push("/widgets/new");
  }, [router]);

  return (
    <LayoutDefault title="Dashboard" shop={shop}>
      <Page title="Welcome">
        <Layout>
          <Layout.Section oneThird>
            <Card>
              <Card.Section
                actions={[
                  { content: "Add", onAction: handleRedirectTestimonials },
                ]}
                title="Total FAQs"
              >
                <DisplayText size="medium">
                  <TextStyle variation="strong">{totalTestimonial}</TextStyle>
                </DisplayText>
              </Card.Section>
              <Card.Section
                actions={[{ content: "Add", onAction: handleRedirectWidgets }]}
                title="Total Widgets"
              >
                <DisplayText size="medium">
                  <TextStyle variation="strong">{totalWidget}</TextStyle>
                </DisplayText>
              </Card.Section>
            </Card>
          </Layout.Section>
          <Layout.Section secondary>
            <EmailQuota />
          </Layout.Section>
          <Layout.Section fullWidth>
            <Card>
              <Card.Section title={"Tips for getting started"}>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  {progress}%
                </div>
                <ProgressBar size="small" progress={progress} color="success" />
              </Card.Section>
              <DashboardGettingStartedTab
                totalWidget={totalWidget}
                totalTestimonial={totalTestimonial}
                handleRedirectTestimonials={handleRedirectTestimonials}
                handleRedirectWidgets={handleRedirectWidgets}
              />
            </Card>
          </Layout.Section>
          {/* <Layout.Section fullWidth>
            <Card title="Our product roadmap">
              <Card.Section>
                <Label>
                  We release new features every 2 weeks. Check out our released
                  features and future product roadmap.
                </Label>
                <br />
                <ButtonGroup>
                  <Button primary>View product roadmap</Button>
                  <Button>Suggest a feature</Button>
                </ButtonGroup>
              </Card.Section>
            </Card>
          </Layout.Section>
          <Layout.Section fullWidth>
            <Card title="Need help?">
              <Card.Section>
                <TextStyle variation="strong">Start live chat</TextStyle>
                <Label>
                  Connect with us via live chat and get immediate assistance.
                </Label>
              </Card.Section>
              <Card.Section>
                <TextStyle variation="strong">Help center</TextStyle>
                <Label>
                  Check out our help resources for a quick resclution to your
                  issues.
                </Label>
              </Card.Section>
            </Card>
          </Layout.Section> */}
        </Layout>
      </Page>
    </LayoutDefault>
  );
}
