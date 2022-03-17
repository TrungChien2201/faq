import { useState, useCallback } from "react";
import {
  Frame,
  Page,
  Layout,
  Card,
  FormLayout,
  TextField,
  Button,
} from "@shopify/polaris";
import Head from "next/head";

export default function Authorize() {
  const [shop, setShop] = useState("");

  const pattern = /^[a-zA-Z0-9][a-zA-Z0-9\-]*.myshopify.com/;

  const handleChange = useCallback((newValue) => setShop(newValue), []);

  const isValid = (shop) => {
    return pattern.test(shop);
  };

  const login = () => {
    window.location.replace(`/auth?shop=${shop}`);
  };

  return (
    <Frame>
      <br />
      <br />
      <Head>
        <title>Authorize</title>
      </Head>
      <Page>
        <Layout>
          <Layout.Section>
            <Card title="Enter your store's URL" sectioned>
              <FormLayout>
                <TextField
                  value={shop}
                  onChange={handleChange}
                  autoComplete="off"
                />
                <Button primary disabled={!isValid(shop)} onClick={login}>
                  Login
                </Button>
              </FormLayout>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </Frame>
  );
}
