import {
  Button,
  Card,
  FormLayout,
  Layout,
  Page,
  TextStyle,
  DisplayText
} from "@shopify/polaris";
import arrayMove from "array-move";
import { useFormik } from "formik";
import _ from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import FaqGroup from "../../components/FaqGroup";
import LayoutDefault from "../../components/LayoutDefault";
import RequestCustom from "../../constants/request";
function Faqs() {
  const [idEditAddNew, setIdEditAddNew] = useState("");
  const [idEditFaqGroup, setIdEditFaqGroup] = useState("");
  const [faqItem, setFaqItem] = useState("");
  const shop = typeof window !== "undefined" && localStorage.getItem("shop");
  const formik = useFormik({
    initialValues: {
      groups: [],
    },
  });

  const handleAddGroup = useCallback(async () => {
    const datas = {
      shop,
      config: {
        name: "New Group",
        checked: false,
        faqs: [],
      },
    };
    const { data } = await RequestCustom.post("/api/faq-group/new", datas);
    const newData = {
      id: data?.data?.faq?._id,
      ...data.data?.faq?.config,
    };
    formik.values.groups?.push(newData);
    // formik.handleChange({ target: { id: "group", value: newGroup } });

    setIdEditAddNew(data?.data?.faq?._id);
  }, [formik]);

  const handleEditGroup = useCallback(
    async ({ id, name, faq, checked }) => {
      const group = formik?.values?.groups?.find((item) => item?.id === id);
      const datas = {
        shop,
        config: {
          name,
          checked: checked !== undefined ? checked : group?.checked,
          faqs: faq,
        },
        nameOld: group?.name,
      };
      const { data } = await RequestCustom.put(`/api/faq-group/${id}`, datas);

      if (data) {
        const newGroups = formik.values.groups?.map((item) => {
          if (item?.id === id) {
            return { ...item, ...datas["config"] };
          }
          return { ...item };
        });
        formik.handleReset();
        formik.setFieldValue("groups", newGroups);
      }
      setIdEditAddNew("");
      return true;
    },
    [formik]
  );

  const getFaqGroup = async () => {
    const datas = {
      shop,
    };
    const { data } = await RequestCustom.post("/api/faq", datas);
    if (data?.data?.faq?.length > 0) {
      const newFaqGroup = data?.data?.faq?.map((item) => ({
        ...item?.config,
        id: item?._id,
      }));
      formik.setValues({ groups: newFaqGroup });
    }
  };

  useEffect(() => {
    getFaqGroup();
  }, []);

  const handleAddFaq = useCallback(
    async (id) => {
      const newGroup = formik.values.groups?.find((item) => item?.id === id);
      const idRandom = Math.random().toString(36).slice(2);
      const newValue = formik.values.groups?.map((item) => {
        if (item?.id === id) {
          return {
            ...item,
            faqs: [
              ...item.faqs,
              ...[
                {
                  id: idRandom,
                  question: "New FAQ : Question",
                  answer: "New FAQ : Answer",
                  checked: false,
                },
              ],
            ],
          };
        }
        return { ...item };
      });
      const datas = {
        id,
        config: {
          ...newGroup,
          faqs: [
            ...newGroup.faqs,
            ...[
              {
                id: idRandom,
                question: "New FAQ : Question",
                answer: "<p>New FAQ : Answer</p>",
                checked: false,
              },
            ],
          ],
        },
      };
      const { data } = await RequestCustom.put(`/api/faq/new`, datas);
      if (data) {
        formik.handleChange({ target: { id: "groups", value: newValue } });
        setIdEditFaqGroup(data?.data?.faq?._id);
        setFaqItem(idRandom);
      }
    },
    [formik]
  );

  const editFaq = useCallback(
    async ({ groupId, faqId, answer, question, checked = null }) => {
      const newGroup = formik?.values?.groups?.find(
        (item) => item?.id === groupId
      );
      const newFaq = newGroup?.faqs?.map((item) => {
        if (item?.id === faqId) {
          return {
            ...item,
            answer,
            question,
            checked: checked !== null ? !item?.checked : item?.checked,
          };
        }
        return { ...item };
      });
      const newValue = formik?.values?.groups?.map((item) => {
        if (item?.id === groupId) {
          return { ...item, faqs: newFaq };
        }
        return { ...item };
      });
      const datas = {
        id: groupId,
        config: { ...newGroup, faqs: newFaq },
      };
      const { data } = await RequestCustom.put(`/api/faq/new`, datas);
      if (data) {
        formik.handleReset();
        formik.handleChange({ target: { id: "groups", value: newValue } });
      }
      setIdEditFaqGroup("");
      setFaqItem("");
      return true;
    },
    [formik]
  );

  const deleteFaq = useCallback(
    async ({ groupId, faqId }) => {
      const newGroup = formik?.values?.groups?.find(
        (item) => item?.id === groupId
      );
      const newFaq = newGroup?.faqs?.filter((item) => item?.id !== faqId);
      const newValue = formik?.values?.groups?.map((item) => {
        if (item?.id === groupId) {
          return { ...item, faqs: newFaq };
        }
        return { ...item };
      });
      const datas = {
        id: groupId,
        config: { ...newGroup, faqs: newFaq },
      };
      const { data } = await RequestCustom.put(`/api/faq/new`, datas);
      if (data) {
        formik.handleReset();
        formik.handleChange({ target: { id: "groups", value: newValue } });
      }
      return true;
    },
    [formik]
  );

  const handleUpRow = async ({ groupId, faqId }) => {
    const newGroup = _.find(formik.values.groups, { id: groupId });
    const { faqs } = newGroup;
    const indexItem = _.findIndex(faqs, { id: faqId });
    if (faqs[indexItem - 1] && faqs[indexItem]) {
      let newFaq = arrayMove(faqs, indexItem, indexItem - 1);
      const newValue = formik?.values?.groups?.map((item) => {
        if (item?.id === groupId) {
          return { ...item, faqs: newFaq };
        }
        return { ...item };
      });
      const datas = {
        id: groupId,
        config: { ...newGroup, faqs: newFaq },
      };
      const { data } = await RequestCustom.put(`/api/faq/new`, datas);
      if (data) {
        formik.handleReset();
        formik.handleChange({ target: { id: "groups", value: newValue } });
      }
    }
  };

  const handleDownRow = async ({ groupId, faqId }) => {
    const newGroup = _.find(formik.values.groups, { id: groupId });
    const { faqs } = newGroup;
    const indexItem = _.findIndex(faqs, { id: faqId });
    if (faqs[indexItem + 1] && faqs[indexItem]) {
      let newFaq = arrayMove(faqs, indexItem, indexItem + 1);
      const newValue = formik?.values?.groups?.map((item) => {
        if (item?.id === groupId) {
          return { ...item, faqs: newFaq };
        }
        return { ...item };
      });
      const datas = {
        id: groupId,
        config: { ...newGroup, faqs: newFaq },
      };
      const { data } = await RequestCustom.put(`/api/faq/new`, datas);
      if (data) {
        formik.handleReset();
        formik.handleChange({ target: { id: "groups", value: newValue } });
      }
    }
  };

  const deleteGroup = useCallback(
    async (id, group) => {
      const { data } = await RequestCustom.delete(`api/faq-group/${id}`);
      if (data?.success) {
        const newGroup = group.filter((item) => item?.id !== id);
        formik.handleChange({ target: { id: "groups", value: newGroup } });
      }
      setIdEditAddNew("");
    },
    [shop, formik]
  );

  const renderGroup = useCallback(
    (item) => {
      return (
        <FaqGroup
          handleAddFaq={handleAddFaq}
          handleEditGroup={handleEditGroup}
          deleteGroup={deleteGroup}
          idEditAddNew={idEditAddNew}
          key={item?.id}
          group={item}
          formik={formik}
          idEditFaqGroup={idEditFaqGroup}
          faqItem={faqItem}
          editFaq={editFaq}
          deleteFaq={deleteFaq}
          handleUpRow={handleUpRow}
          handleDownRow={handleDownRow}
        />
      );
    },
    [
      formik,
      editFaq,
      faqItem,
      idEditFaqGroup,
      idEditAddNew,
      deleteGroup,
      handleEditGroup,
      handleAddFaq,
      deleteFaq,
      handleUpRow,
      handleDownRow,
    ]
  );

  return (
    <LayoutDefault title="FAQs" shop={shop}>
      <Page
        title="FAQs"
        primaryAction={{
          content: "Add FAQ Group",
          onAction: handleAddGroup,
        }}
      >
        <Layout>
          <Layout.Section>
            <div className="layout-group">
              {formik?.values?.groups?.length > 0 ? (
                formik.values.groups.map((item) => (
                  <React.Fragment key={item?.id}>
                    {renderGroup(item)}
                  </React.Fragment>
                ))
              ) : (
                <Card>
                  <div className="faq-empty">
                    <FormLayout>
                    <DisplayText size="small">
                      <TextStyle variation="strong">
                        You have no FAQs yet...
                      </TextStyle>
                      </DisplayText>
                      <Button onClick={handleAddGroup} primary>Add FAQ Group</Button>
                    </FormLayout>
                  </div>
                </Card>
              )}
            </div>
          </Layout.Section>
        </Layout>
      </Page>
    </LayoutDefault>
  );
}

export default Faqs;
