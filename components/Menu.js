import { Icon, Navigation } from "@shopify/polaris";
import {
  ExternalMinor,
  TroubleshootMajor,
  CashDollarMajor,
  ThemeStoreMajor,
  FormsMajor,
  ThemesMajor,
  ChatMajor,
  HomeMajor,
  QuestionMarkMajor,
} from "@shopify/polaris-icons";
import { useRouter } from "next/router";

export default function MenuHeader() {
  const router = useRouter();
  return (
    <Navigation location={router.pathname}>
      <Navigation.Section
        title="Welcome! 👋"
        items={[
          {
            url: "/",
            label: "Dashboard",
            icon: HomeMajor,
            exactMatch: true,
          },
          {
            url: "/faqs",
            label: "FAQs",
            icon: QuestionMarkMajor,
            // exactMatch: true,
          },
          {
            url: "/widgets",
            label: "Widgets",
            icon: ThemesMajor,
            exactMatch: true,
          },
        ]}
      />
      
      <Navigation.Section
        title="Support"
        items={[
          {
            url: "https://polaris-icons.shopify.com/",
            label: "Help Center",
            icon: QuestionMarkMajor,
            badge: <Icon source={ExternalMinor} color="base" />,
          },
        ]}
      />
    </Navigation>
  );
}
