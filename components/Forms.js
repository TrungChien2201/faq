import { Frame } from "@shopify/polaris";
import { useCallback, useState } from "react";
import FormListing from "./FormListing";
import FormEdit from "./FormsEdit";

export default function Forms({
  data: { shop, plan },
  handleOpenUpgradePlan,
  accessToken,
}) {
  const [idEdit, setIdEdit] = useState("");
  const [isOpenFormEdit, setIsOpenFormEdit] = useState(false);
  const [listForm, setListForm] = useState([]);
  const isDisableField = plan === "FREE";

  const handleOpenFormEdit = useCallback(() => {
    setIsOpenFormEdit(!isOpenFormEdit);
  }, [isOpenFormEdit]);

  return (
    <Frame>
      {isOpenFormEdit ? (
        <FormEdit
          handleOpenUpgradePlan={handleOpenUpgradePlan}
          isDisableField={isDisableField}
          shop={shop}
          accessToken={accessToken}
          setIdEdit={setIdEdit}
          listForm={listForm}
          setListForm={setListForm}
          handleOpenFormEdit={handleOpenFormEdit}
          idEdit={idEdit}
        />
      ) : (
        <FormListing
          handleOpenUpgradePlan={handleOpenUpgradePlan}
          listForm={listForm}
          accessToken={accessToken}
          isDisableField={isDisableField}
          setListForm={setListForm}
          setIdEdit={setIdEdit}
          handleOpenFormEdit={handleOpenFormEdit}
          shop={shop}
        />
      )}
    </Frame>
  );
}
