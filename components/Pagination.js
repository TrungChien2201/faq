import {
  Card,
  Checkbox,
  ChoiceList,
  FormLayout,
  Select,
  TextField,
} from "@shopify/polaris";
import {
  DEPEN_CARD_PAGINATION,
  OptionPaginationType,
  OptionPaginationTypeSection,
} from "../constants";
import CustomField from "./CustomField";

export default function Pagination({ formik, handleChange }) {
  const isShow =
    typeof window !== "undefined" &&
    DEPEN_CARD_PAGINATION.includes(
      formik?.values?.layout?.toString()?.replaceAll("/[]/g", "")
    );
  return (
    isShow && (
      <Card title="Pagination">
        <Card.Section>
          <FormLayout>
            <CustomField
              label="Pagination Type"
              helpText="Choose a pagination type."
            >
              <Select
                id="pagination_type"
                name="pagination_type"
                options={OptionPaginationTypeSection}
                value={formik?.values?.pagination_type}
                onChange={handleChange}
              />
            </CustomField>
            {formik.values.pagination_type ===
              OptionPaginationTypeSection[1]?.value && (
              <CustomField
                label="Testimonial(s) to Show Per Page"
                helpText="Set number of testimonial(s) to show per page."
              >
                <TextField
                  type="number"
                  id="tp_per_page"
                  name="tp_per_page"
                  value={formik.values.tp_per_page}
                  onChange={handleChange}
                />
              </CustomField>
            )}
            {/* <CustomField
              isFlex
              label="Pagination"
              helpText="Enqueue/Dequeue pagination."
            >
              <Checkbox
                id="grid_pagination"
                name="grid_pagination"
                checked={formik.values.grid_pagination}
                onChange={handleChange}
              />
            </CustomField> */}
            {/* <div style={{ paddingTop: "10px" }}>
              {formik.values.grid_pagination && (
                <div>
                  <FormLayout>
                    <CustomField
                      label="Pagination Type"
                      helpText="Choose a pagination type."
                    >
                      <ChoiceList
                        id="tp_pagination_type"
                        name="tp_pagination_type"
                        choices={OptionPaginationType}
                        selected={formik.values.tp_pagination_type}
                        onChange={handleChange}
                      />
                    </CustomField>
                    
                    <CustomField label="Load more button label" helpText="">
                      <TextField
                        id="load_more_label"
                        name="load_more_label"
                        value={formik.values.load_more_label}
                        onChange={handleChange}
                      />
                    </CustomField>
                  </FormLayout>
                </div>
              )}
            </div> */}
          </FormLayout>
        </Card.Section>
      </Card>
    )
  );
}
