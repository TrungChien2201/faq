import {
  Card,
  ChoiceList,
  FormLayout,
  Select,
  TextField,
} from "@shopify/polaris";
import { useCallback } from "react";
import {
  optionFormMessagePosition,
  optionFormMessageRedirect,
  SAME_PAGE,
  TO_A_CUSTOM_URL,
  TO_A_PAGE,
} from "../constants";
import CustomFieldFormLabel from "./CustomFieldFormLabel";

export default function FormMessage({ formik, handleChange, listPage }) {
  const renderListPage = useCallback(() => {
    let optionListPage = [{ label: "Select Page", value: "" }];
    const data =
      listPage?.length > 0 &&
      listPage?.map((item) => {
        return { label: item.title, value: item.id };
      });
    return optionListPage.concat(data);
  }, [listPage]);

  return (
    <Card.Section>
      <FormLayout>
        <CustomFieldFormLabel
          label="Redirect"
          helpText="After successful submit, where the page will redirect to."
        >
          <Select
            id="redirect"
            name="redirect"
            options={optionFormMessageRedirect}
            onChange={handleChange}
            value={formik.values.redirect}
          />
        </CustomFieldFormLabel>
        {formik.values.redirect === SAME_PAGE && (
          <CustomFieldFormLabel
            label="Form Submission Message Position"
            helpText="Set a form submission message position."
          >
            <ChoiceList
              id="message_position"
              name="message_position"
              choices={optionFormMessagePosition}
              onChange={handleChange}
              selected={formik.values.message_position}
            />
          </CustomFieldFormLabel>
        )}
        {formik.values.redirect === SAME_PAGE && (
          <CustomFieldFormLabel
            fullWidth={true}
            label="Successful Message"
            helpText="Notification for successful submission."
          >
            <TextField
              id="successful_message"
              name="successful_message"
              multiline={4}
              autoComplete="off"
              onChange={handleChange}
              value={formik.values.successful_message}
            />
          </CustomFieldFormLabel>
        )}
        {formik.values.redirect === TO_A_PAGE && (
          <CustomFieldFormLabel label="Page" helpText="Select redirect page.">
            <Select
              id="page"
              name="page"
              options={renderListPage()}
              onChange={handleChange}
              value={Number(formik.values.page)}
            />
          </CustomFieldFormLabel>
        )}
        {formik.values.redirect === TO_A_CUSTOM_URL && (
          <CustomFieldFormLabel
            label="Custom URL"
            helpText="Type redirect custom url."
          >
            <TextField
              id="redirect_custom_url"
              name="redirect_custom_url"
              onChange={handleChange}
              value={formik.values.redirect_custom_url}
            />
          </CustomFieldFormLabel>
        )}
      </FormLayout>
    </Card.Section>
  );
}
