import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import App from "next/app";
import { AppProvider, Layout } from "@shopify/polaris";
import { Provider, useAppBridge } from "@shopify/app-bridge-react";
import { authenticatedFetch } from "@shopify/app-bridge-utils";
import { Redirect } from "@shopify/app-bridge/actions";
import MenuHeader from "../components/Menu";
import "@shopify/polaris/dist/styles.css";
import translations from "@shopify/polaris/locales/en.json";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../style.css";
import "../assets/style.scss";
import axios from "axios";
import cookies from "next-cookies";
import Link from "next/link";
import NextNProgress from "nextjs-progressbar";

function userLoggedInFetch(app) {
  const fetchFunction = authenticatedFetch(app);

  return async (uri, options) => {
    const response = await fetchFunction(uri, options);
    if (
      response.headers.get("X-Shopify-API-Request-Failure-Reauthorize") === "1"
    ) {
      const authUrlHeader = response.headers.get(
        "X-Shopify-API-Request-Failure-Reauthorize-Url"
      );

      const redirect = Redirect.create(app);
      redirect.dispatch(Redirect.Action.APP, authUrlHeader || `/auth`);
      return null;
    }

    return response;
  };
}

function MyProvider(props) {
  const app = null;

  const client = new ApolloClient({
    fetch: userLoggedInFetch(app),
    fetchOptions: {
      credentials: "include",
    },
  });

  const Component = props.Component;

  return (
    <ApolloProvider client={client}>
      <Component {...props} />
    </ApolloProvider>
  );
}

function NextLink({ children, url = "", external, ref, ...rest }) {
  const IS_EXTERNAL_LINK_REGEX = /^(?:[a-z][a-z\d+.-]*:|\/\/)/;

  if (external || IS_EXTERNAL_LINK_REGEX.test(url)) {
    rest.target = "_blank";
    rest.rel = "noopener noreferrer";
    return (
      <a href={url} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={url} replace={true}>
      <a {...rest}>{children}</a>
    </Link>
  );
}

class MyApp extends App {
  render() {
    const { Component, pageProps, accessToken, shop } = this.props;

    axios.defaults.headers.common["x-access-token"] = accessToken;

    if (typeof window !== "undefined" && accessToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("shop", shop);
    }

    return (
      <AppProvider i18n={translations} linkComponent={NextLink}>
        <NextNProgress color="#007f5f" />
        <Component accessToken={accessToken} shop={shop} {...pageProps} />
      </AppProvider>
    );
  }
}

MyApp.getInitialProps = async ({ ctx }) => {
  return {
    accessToken: cookies(ctx)["x-access-token"],
    shop: cookies(ctx)["shop"],
  };
};

export default MyApp;
