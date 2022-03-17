import { Card, FormLayout } from "@shopify/polaris";
import CustomColorPicker from "./CustomColorPicker";
import CustomField from "./CustomField";
import CustomFontSetting from "./CustomFontSetting";

export default function FormStylization({
  handleChangeSetColor,
  colorPagination,
  formik,
  handleOpenSetColor,
}) {
  return (
    <Card.Section>
      <FormLayout>
        <CustomColorPicker
          title="Label Color"
          nameKey="label_color"
          handleChangeSetColor={handleChangeSetColor}
          backgroundColorBackUp={formik.values.label_color}
          description="Set color for the field label."
          handleOpenSetColor={handleOpenSetColor}
          colorPagination={colorPagination}
        />
        <CustomField
          fullWidth={true}
          label="Submit Button Color"
          helpText="Set color for the submit button."
        >
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <div style={{ width: "32%" }}>
              <CustomColorPicker
                isTitleLeft={false}
                label="Color"
                nameKey="submit_button_color['color']"
                handleChangeSetColor={handleChangeSetColor}
                backgroundColorBackUp={
                  formik.values.submit_button_color["color"]
                }
                handleOpenSetColor={handleOpenSetColor}
                colorPagination={colorPagination}
              />
            </div>
            <div style={{ width: "32%", marginLeft: "10px" }}>
              <CustomColorPicker
                isTitleLeft={false}
                label="Hover Color"
                nameKey="submit_button_color['hover_color']"
                handleChangeSetColor={handleChangeSetColor}
                backgroundColorBackUp={
                  formik.values.submit_button_color["hover_color"]
                }
                handleOpenSetColor={handleOpenSetColor}
                colorPagination={colorPagination}
              />
            </div>
            <div style={{ width: "32%", marginLeft: "10px" }}>
              <CustomColorPicker
                isTitleLeft={false}
                label="Background"
                nameKey="submit_button_color['background']"
                handleChangeSetColor={handleChangeSetColor}
                backgroundColorBackUp={
                  formik.values.submit_button_color["background"]
                }
                handleOpenSetColor={handleOpenSetColor}
                colorPagination={colorPagination}
              />
            </div>
            <div style={{ width: "32%" }}>
              <CustomColorPicker
                isTitleLeft={false}
                label="Hover Background"
                nameKey="submit_button_color['hover_background']"
                handleChangeSetColor={handleChangeSetColor}
                backgroundColorBackUp={
                  formik.values.submit_button_color["hover_background"]
                }
                handleOpenSetColor={handleOpenSetColor}
                colorPagination={colorPagination}
              />
            </div>
          </div>
        </CustomField>
      </FormLayout>
    </Card.Section>
  );
}
