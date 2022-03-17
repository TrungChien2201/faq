import {
  Button,
  ButtonGroup,
  Card,
  FormLayout,
  Frame,
  Page,
  Select,
  TextStyle,
  Toast,
} from "@shopify/polaris";
import cookies from "next-cookies";
import { useCallback, useEffect } from "react";
import axios from "axios";
import LayoutDefault from "../../components/LayoutDefault";
import { useState } from "react";

function ThemeIntegrate({ accessToken, shop }) {
  const shops =
    shop || (typeof window !== "undefined" && localStorage.getItem("shop"));
  const accessTokens =
    accessToken ||
    (typeof window !== "undefined" && localStorage.getItem("accessToken"));
  const [themeInstalled, setThemeInstalled] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState("");
  const [isError, setIsError] = useState(false);
  const [statusSuccess, setStatusSuccess] = useState(0);
  const [isLoadingInstall, setIsLoadingInstall] = useState(false);
  const [isLoadingUnInstall, setIsLoadingUnInstall] = useState(false);

  const getThemeInstalled = async () => {
    let config = {
      headers: {
        "x-access-token": accessTokens,
      },
    };
    let datas = {
      shop: shops,
    };
    const { data } = await axios.post(
      "/api/get-theme-installed",
      datas,
      config
    );
    let newTheme = [];
    const themeMain = data?.themes?.find((item) => item.role === "main");
    newTheme.push({
      label: `${themeMain?.name} (Live theme)`,
      value: themeMain?.id?.toString(),
    });
    const filterTheme = data?.themes?.filter(
      (item) => item?.id !== themeMain?.id
    );
    const themeOption = filterTheme?.map((item) => ({
      label: item?.name,
      value: item?.id?.toString(),
    }));
    newTheme = [...newTheme, ...themeOption];
    setThemeInstalled(newTheme);
  };

  useEffect(() => {
    if (themeInstalled) {
      setSelectedTheme(themeInstalled[0]?.value);
    }
  }, [themeInstalled]);

  const InstallCode = async () => {
    setIsLoadingInstall(true);
    try {
      let config = {
        headers: {
          "x-access-token": accessTokens,
        },
      };
      let datas = {
        shop: shops,
        themeId: selectedTheme,
      };
      const { data } = await axios.post("/api/install_code", datas, config);
      if (data?.success) {
        setStatusSuccess(1);
        setIsLoadingInstall(false);
      }
    } catch (error) {
      toggleError();
      setIsLoadingInstall(false);
    }
  };

  const UnInstallCode = async () => {
    setIsLoadingUnInstall(true);
    try {
      let config = {
        headers: {
          "x-access-token": accessTokens,
        },
      };
      let datas = {
        shop: shops,
        themeId: selectedTheme,
      };
      const { data } = await axios.post("/api/uninstall_code", datas, config);
      if (data?.success) {
        setStatusSuccess(2);
        setIsLoadingUnInstall(false);
      }
    } catch (error) {
      toggleError();
      setIsLoadingUnInstall(false);
    }
  };

  const toggleError = useCallback(() => {
    setIsError(true);
  }, [isError]);

  const errorMessage = useCallback(() => {
    return isError && <Toast error content="Server error!" />;
  }, [isError]);

  const successMessage = useCallback(() => {
    let message;
    switch (statusSuccess) {
      case 1:
        message = "Installed!";
        break;
      case 2:
        message = "UnInstalled!";
        break;
      default:
        break;
    }

    setTimeout(() => {
      setStatusSuccess(0);
    }, 2000);

    if (statusSuccess !== 0) {
      return <Toast duration={2} content={message} />;
    }
  }, [statusSuccess]);

  const handleChangeTheme = (value) => {
    setSelectedTheme(value);
  };

  useEffect(() => {
    getThemeInstalled();
  }, []);

  return (
    <LayoutDefault title="Theme integrate" shop={shops}>
      <Frame>
        <Page title="Theme integrate">
          <Card>
            <Card.Section>
              <FormLayout>
                <TextStyle variation="strong">
                  Select a theme for applying the app
                </TextStyle>
                <Select
                  options={themeInstalled}
                  value={selectedTheme}
                  onChange={handleChangeTheme}
                />
              </FormLayout>
            </Card.Section>
            <Card.Section>
              <div className="install-group">
                <ButtonGroup>
                  <Button
                    loading={isLoadingUnInstall}
                    onClick={UnInstallCode}
                    destructive
                  >
                    Uninstall
                  </Button>
                  <Button
                    loading={isLoadingInstall}
                    onClick={InstallCode}
                    primary
                  >
                    Install
                  </Button>
                </ButtonGroup>
              </div>
            </Card.Section>
          </Card>
          {errorMessage()}
          {successMessage()}
        </Page>
      </Frame>
    </LayoutDefault>
  );
}
ThemeIntegrate.getInitialProps = async (ctx) => {
  return {
    accessToken: cookies(ctx)["x-access-token"],
    shop: cookies(ctx)["shop"],
  };
};
export default ThemeIntegrate;
