import { Card, Checkbox, FormLayout } from "@shopify/polaris";
import React, { useCallback, useMemo } from "react";

import CustomField from "./CustomField";
import CustomFontSetting from "./CustomFontSetting";
import * as font from "../font";
const _ = require("lodash");

const fontStyleDefault = [
  { label: "", value: "" },
  { label: "Normal 400", value: "normal" },
  { label: "Normal 400 Italic", value: "italic" },
  { label: "Bold 700", value: "700" },
  { label: "Bold 700 Italic", value: "700-italic" },
];

export default function TypoGraphy({
  handleChangeSettingFont,
  formik,
  handleChange,
  colorPicker,
  handleOpenColorPickerFont,
  dataBackUp,
  handleInputColorFontSetting,
  isDisableField,
  handleOpenUpgradePlan,
}) {
  const renderOptionFont = useCallback(() => {
    let fontz = [];
    const safeFont = _.get(font?.fonts?.webfonts, "safe");
    safeFont?.fonts?.map((item) => {
      fontz.push({ label: item, value: item });
    });
    const googleFont = _.get(font?.fonts?.webfonts, "google");
    for (const [key, value] of Object.entries(googleFont?.fonts)) {
      fontz.push({ label: key, value: key });
    }
    return fontz;
  }, []);

  const renderLabelStyleFont = useCallback((key) => {
    switch (key) {
      case "100":
        return "Thin 100";
        break;
      case "normal":
        return "Normal 400";
        break;
      case "italic":
        return "Normal 400 Italic";
        break;
      case "200":
        return "Extra-Light 200";
        break;
      case "200italic":
        return "Extra-Light 200 Italic";
        break;
      case "300":
        return "Light 300";
        break;
      case "300italic":
        return "Light 300 Italic";
        break;
      case "500":
        return "Medimum 500";
        break;
      case "500italic":
        return "Medium 500 Italic";
        break;
      case "600":
        return "Semi-Bold 600";
        break;
      case "600italic":
        return "Semi-Bold 600 Italic";
        break;
      case "700":
        return "Bold 700";
        break;
      case "700italic":
        return "Bold 700 Italic";
        break;
      case "800":
        return "Extra-Bold 800";
        break;
      case "800italic":
        return "Extra-Bold 800 Italic";
        break;
      case "900":
        return "Black 900";
        break;
      case "900italic":
        return "Black 900 Italic";
        break;
      case "regular":
        return "Regular";
        break;
      default:
        break;
    }
  }, []);

  const renderFontSubset = useCallback((key) => {
    switch (key) {
      case "latin-ext":
        return "Latin Extended";
        break;
      case "latin":
        return "Latin";
        break;
      case "thai":
        return "Thai";
        break;
      case "vietnamese":
        return "Vietnamese";
        break;
      case "telugu":
        return "Telugu";
        break;
      case "tamil":
        return "Tamil";
        break;
      case "sinhala":
        return "Sinhala";
        break;
      case "greek":
        return "Greek";
        break;
      case "greek-ext":
        return "Greek Extended";
        break;
      case "hebrew":
        return "Hebrew";
        break;
      case "cyrillic-ext":
        return "Cyrillic Extended";
        break;
      case "cyrillic":
        return "Cyrillic";
        break;
      case "arabic":
        return "Arabic";
        break;
      case "devanagari":
        return "Devanagari";
        break;
      case "chinese-simplified":
        return "Chinese Simplified";
        break;
      default:
        break;
    }
  }, []);

  const renderFontStyle = useCallback((key) => {
    let fontStyle = [{ label: "", value: "" }];
    let fontSubset = [{ label: "", value: "" }];
    const fontData = _.get(font.fonts.webfonts.google.fonts, key);
    if (!fontData) {
      fontStyle = fontStyleDefault;
      fontSubset = null;
    } else {
      const dataStyle = fontData[0].map((item) => {
        return { label: renderLabelStyleFont(item), value: item };
      });
      fontStyle = fontStyle.concat(dataStyle);
      const dataSubset = fontData[1].map((item) => {
        return { label: renderFontSubset(item), value: item };
      });
      fontSubset = fontSubset.concat(dataSubset);
    }
    return { fontStyle, fontSubset };
  }, []);

  return (
    <Card title="Typography">
      <Card.Section>
        <FormLayout>
          <CustomField
            isFlex
            label="Load Slider Section Title Font"
            helpText="On/Off google font for the testimonial section title."
          >
            <Checkbox
              id="slider_title_font_load"
              name="slider_title_font_load"
              checked={formik.values.slider_title_font_load}
              onChange={handleChange}
            />
          </CustomField>
          <div>
            {useMemo(() => {
              return (
                <CustomFontSetting
                  keys="slider_title_typography"
                  isMarginBottom={true}
                  label="Slider Section Title Font"
                  helpText="Set slider section title font properties."
                  font={renderOptionFont()}
                  handleOpenColorPickerFont={handleOpenColorPickerFont}
                  visible={colorPicker["slider_title_typography"]}
                  color={colorPicker["slider_title_typography"]}
                  styleFont={renderFontStyle(
                    formik.values.slider_title_typography["font-family"]
                  )}
                  dataBackUp={dataBackUp.slider_title_typography}
                  handleInputColorFontSetting={handleInputColorFontSetting}
                  data={formik.values.slider_title_typography}
                  handleChangeSettingFont={handleChangeSettingFont}
                />
              );
            }, [
              // renderOptionFont,
              handleChangeSettingFont,
              // colorPicker,
              // renderFontStyle,
              // handleOpenColorPickerFont,
              formik.values.slider_title_typography,
            ])}
          </div>
          {formik.values.testimonial_text && (
            <CustomField
              isFlex
              label="Load Testimonial Title Font"
              helpText="On/Off google font for the testimonial tagline or title."
            >
              <Checkbox
                id="testimonial_title_font_load"
                name="testimonial_title_font_load"
                checked={formik.values.testimonial_title_font_load}
                onChange={handleChange}
              />
            </CustomField>
          )}
          <div>
            {useMemo(() => {
              return (
                <CustomFontSetting
                  keys="testimonial_title_typography"
                  label="Testimonial Title"
                  isMarginBottom={true}
                  isMarginTop={true}
                  isMarginLeft={true}
                  isMarginRight={true}
                  helpText="Set testimonial tagline or title font properties."
                  font={renderOptionFont()}
                  handleOpenColorPickerFont={handleOpenColorPickerFont}
                  visible={colorPicker["testimonial_title_typography"]}
                  color={colorPicker["testimonial_title_typography"]}
                  styleFont={renderFontStyle(
                    formik.values.testimonial_title_typography["font-family"]
                  )}
                  dataBackUp={dataBackUp.testimonial_title_typography}
                  handleInputColorFontSetting={handleInputColorFontSetting}
                  data={formik.values.testimonial_title_typography}
                  handleChangeSettingFont={handleChangeSettingFont}
                />
              );
            }, [
              // renderOptionFont,
              handleChangeSettingFont,
              // colorPicker,
              // renderFontStyle,
              // handleOpenColorPickerFont,
              formik.values.testimonial_title_typography,
            ])}
          </div>
          <CustomField
            isFlex
            label="Load Testimonial Content Font"
            helpText="On/Off google font for the testimonial content."
          >
            <Checkbox
              id="testimonial_text_font_load"
              name="testimonial_text_font_load"
              checked={formik.values.testimonial_text_font_load}
              onChange={handleChange}
            />
          </CustomField>
          <div>
            {useMemo(() => {
              return (
                <CustomFontSetting
                  keys="testimonial_text_typography"
                  label="Testimonial Content"
                  isMarginBottom={true}
                  isMarginTop={true}
                  isMarginLeft={true}
                  isMarginRight={true}
                  helpText="Set testimonial content font properties."
                  font={renderOptionFont()}
                  handleOpenColorPickerFont={handleOpenColorPickerFont}
                  visible={colorPicker["testimonial_text_typography"]}
                  color={colorPicker["testimonial_text_typography"]}
                  styleFont={renderFontStyle(
                    formik.values.testimonial_text_typography["font-family"]
                  )}
                  dataBackUp={dataBackUp.testimonial_text_typography}
                  handleInputColorFontSetting={handleInputColorFontSetting}
                  data={formik.values.testimonial_text_typography}
                  handleChangeSettingFont={handleChangeSettingFont}
                />
              );
            }, [
              // renderOptionFont,
              handleChangeSettingFont,
              // colorPicker,
              // renderFontStyle,
              // handleOpenColorPickerFont,
              formik.values.testimonial_text_typography,
            ])}
          </div>
          <CustomField
            isFlex
            label="Load Full Name Font"
            helpText="On/Off google font for the full name."
          >
            <Checkbox
              id="client_name_font_load"
              name="client_name_font_load"
              checked={formik.values.client_name_font_load}
              onChange={handleChange}
            />
          </CustomField>
          <div>
            {useMemo(
              () => (
                <CustomFontSetting
                  keys="client_name_typography"
                  label="Full Name"
                  isMarginBottom={true}
                  isMarginTop={true}
                  isMarginLeft={true}
                  isMarginRight={true}
                  helpText="Set full name font properties."
                  font={renderOptionFont()}
                  handleOpenColorPickerFont={handleOpenColorPickerFont}
                  visible={colorPicker["client_name_typography"]}
                  color={colorPicker["client_name_typography"]}
                  styleFont={renderFontStyle(
                    formik.values.client_name_typography["font-family"]
                  )}
                  dataBackUp={dataBackUp.client_name_typography}
                  handleInputColorFontSetting={handleInputColorFontSetting}
                  data={formik.values.client_name_typography}
                  handleChangeSettingFont={handleChangeSettingFont}
                />
              ),
              [
                // renderOptionFont,
                handleChangeSettingFont,
                // colorPicker,
                // renderFontStyle,
                // handleOpenColorPickerFont,
                formik.values.client_name_typography,
              ]
            )}
          </div>
          <CustomField
            isFlex
            label="Load Identity or Position & Company Name Font"
            helpText="On/Off google font for the identity or position & company name."
          >
            <Checkbox
              id="designation_company_font_load"
              name="designation_company_font_load"
              checked={formik.values.designation_company_font_load}
              onChange={handleChange}
            />
          </CustomField>
          <div>
            {useMemo(
              () => (
                <CustomFontSetting
                  keys="client_designation_company_typography"
                  label="Identity or Position & Company Name"
                  helpText="Set identity or position & company name font properties."
                  font={renderOptionFont()}
                  isMarginBottom={true}
                  isMarginTop={true}
                  isMarginLeft={true}
                  isMarginRight={true}
                  handleOpenColorPickerFont={handleOpenColorPickerFont}
                  visible={colorPicker["client_designation_company_typography"]}
                  color={colorPicker["client_designation_company_typography"]}
                  styleFont={renderFontStyle(
                    formik.values.client_designation_company_typography[
                      "font-family"
                    ]
                  )}
                  dataBackUp={dataBackUp.client_designation_company_typography}
                  handleInputColorFontSetting={handleInputColorFontSetting}
                  data={formik.values.client_designation_company_typography}
                  handleChangeSettingFont={handleChangeSettingFont}
                />
              ),
              [
                // renderOptionFont,
                handleChangeSettingFont,
                // colorPicker,
                // renderFontStyle,
                // handleOpenColorPickerFont,
                formik.values.client_designation_company_typography,
              ]
            )}
          </div>
          <CustomField
            isFlex
            label="Load Location Font"
            helpText="On/Off google font for the location."
          >
            <Checkbox
              id="location_font_load"
              name="location_font_load"
              checked={formik.values.location_font_load}
              onChange={handleChange}
            />
          </CustomField>
          <div>
            {useMemo(() => {
              return (
                <CustomFontSetting
                  keys="client_location_typography"
                  label="Location"
                  isMarginBottom={true}
                  isMarginTop={true}
                  isMarginLeft={true}
                  isMarginRight={true}
                  helpText="Set location font properties."
                  font={renderOptionFont()}
                  handleOpenColorPickerFont={handleOpenColorPickerFont}
                  visible={colorPicker["client_location_typography"]}
                  color={colorPicker["client_location_typography"]}
                  styleFont={renderFontStyle(
                    formik.values.client_location_typography["font-family"]
                  )}
                  dataBackUp={dataBackUp.client_location_typography}
                  handleInputColorFontSetting={handleInputColorFontSetting}
                  data={formik.values.client_location_typography}
                  handleChangeSettingFont={handleChangeSettingFont}
                />
              );
            }, [
              // renderOptionFont,
              handleChangeSettingFont,
              // colorPicker,
              // renderFontStyle,
              // handleOpenColorPickerFont,
              formik.values.client_location_typography,
            ])}
          </div>
          <CustomField
            isFlex
            label="Load Phone or Mobile Font"
            helpText="On/Off google font for the phone or mobile."
          >
            <Checkbox
              id="phone_font_load"
              name="phone_font_load"
              checked={formik.values.phone_font_load}
              onChange={handleChange}
            />
          </CustomField>
          <div>
            {useMemo(() => {
              return (
                <CustomFontSetting
                  keys="client_phone_typography"
                  isMarginBottom={true}
                  isMarginTop={true}
                  isMarginLeft={true}
                  isMarginRight={true}
                  label="Phone or Mobile"
                  helpText="Set phone or mobile font properties."
                  font={renderOptionFont()}
                  handleOpenColorPickerFont={handleOpenColorPickerFont}
                  visible={colorPicker["client_phone_typography"]}
                  color={colorPicker["client_phone_typography"]}
                  styleFont={renderFontStyle(
                    formik.values.client_phone_typography["font-family"]
                  )}
                  dataBackUp={dataBackUp.client_phone_typography}
                  handleInputColorFontSetting={handleInputColorFontSetting}
                  data={formik.values.client_phone_typography}
                  handleChangeSettingFont={handleChangeSettingFont}
                />
              );
            }, [
              // renderOptionFont,
              // colorPicker,
              formik.values.client_phone_typography,
              // handleOpenColorPickerFont,
              // renderFontStyle,
              handleChangeSettingFont,
            ])}
          </div>
          <CustomField
            isFlex
            label="Load E-mail Address Font"
            helpText="On/Off google font for the email address."
          >
            <Checkbox
              id="email_font_load"
              name="email_font_load"
              checked={formik.values.email_font_load}
              onChange={handleChange}
            />
          </CustomField>
          <div>
            {useMemo(() => {
              return (
                <CustomFontSetting
                  keys="client_email_typography"
                  label="E-mail Address"
                  isMarginBottom={true}
                  isMarginTop={true}
                  isMarginLeft={true}
                  isMarginRight={true}
                  helpText="Set e-mail address font properties."
                  font={renderOptionFont()}
                  handleOpenColorPickerFont={handleOpenColorPickerFont}
                  visible={colorPicker["client_email_typography"]}
                  color={colorPicker["client_email_typography"]}
                  styleFont={renderFontStyle(
                    formik.values.client_email_typography["font-family"]
                  )}
                  dataBackUp={dataBackUp.client_email_typography}
                  handleInputColorFontSetting={handleInputColorFontSetting}
                  data={formik.values.client_email_typography}
                  handleChangeSettingFont={handleChangeSettingFont}
                />
              );
            }, [
              // renderOptionFont,
              // colorPicker,
              formik.values.client_email_typography,
              // handleOpenColorPickerFont,
              // renderFontStyle,
              handleChangeSettingFont,
            ])}
          </div>
          <CustomField
            isFlex
            label="Load Date Font"
            helpText="On/Off google font for the date."
          >
            <Checkbox
              id="date_font_load"
              name="date_font_load"
              checked={formik.values.date_font_load}
              onChange={handleChange}
            />
          </CustomField>
          <div>
            {useMemo(
              () => (
                <CustomFontSetting
                  keys="testimonial_date_typography"
                  label="Date"
                  isMarginBottom={true}
                  isMarginTop={true}
                  isMarginLeft={true}
                  isMarginRight={true}
                  helpText="Set date font properties."
                  font={renderOptionFont()}
                  handleOpenColorPickerFont={handleOpenColorPickerFont}
                  visible={colorPicker["testimonial_date_typography"]}
                  color={colorPicker["testimonial_date_typography"]}
                  styleFont={renderFontStyle(
                    formik.values.testimonial_date_typography["font-family"]
                  )}
                  dataBackUp={dataBackUp.testimonial_date_typography}
                  handleInputColorFontSetting={handleInputColorFontSetting}
                  data={formik.values.testimonial_date_typography}
                  handleChangeSettingFont={handleChangeSettingFont}
                />
              ),
              [
                // renderOptionFont,
                // handleOpenColorPickerFont,
                // colorPicker,
                // renderFontStyle,
                formik.values.testimonial_date_typography,
                handleChangeSettingFont,
              ]
            )}
          </div>
          <CustomField
            isFlex
            label="Load Website Font"
            helpText="On/Off google font for the website."
          >
            <Checkbox
              id="website_font_load"
              name="website_font_load"
              checked={formik.values.website_font_load}
              onChange={handleChange}
            />
          </CustomField>
          <div>
            {useMemo(
              () => (
                <CustomFontSetting
                  keys="client_website_typography"
                  label="Website"
                  isMarginBottom={true}
                  isMarginTop={true}
                  isMarginLeft={true}
                  isMarginRight={true}
                  helpText="Set website font properties."
                  font={renderOptionFont()}
                  handleOpenColorPickerFont={handleOpenColorPickerFont}
                  visible={colorPicker["client_website_typography"]}
                  color={colorPicker["client_website_typography"]}
                  styleFont={renderFontStyle(
                    formik.values.client_website_typography["font-family"]
                  )}
                  dataBackUp={dataBackUp.client_website_typography}
                  handleInputColorFontSetting={handleInputColorFontSetting}
                  data={formik.values.client_website_typography}
                  handleChangeSettingFont={handleChangeSettingFont}
                />
              ),
              [formik.values.client_website_typography, handleChangeSettingFont]
            )}
          </div>
          <CustomField
            isFlex
            label="Load Isotope Filter button Font"
            helpText="On/Off google font for the isotope filter button."
          >
            <Checkbox
              id="filter_font_load"
              name="filter_font_load"
              checked={formik.values.filter_font_load}
              onChange={handleChange}
            />
          </CustomField>
          <div>
            {useMemo(
              () => (
                <CustomFontSetting
                  keys="filter_typography"
                  label="Isotope Filter Button"
                  helpText="Set isotope filter button font properties."
                  font={renderOptionFont()}
                  handleOpenColorPickerFont={handleOpenColorPickerFont}
                  visible={colorPicker["filter_typography"]}
                  color={colorPicker["filter_typography"]}
                  styleFont={renderFontStyle(
                    formik.values.filter_typography["font-family"]
                  )}
                  dataBackUp={dataBackUp.filter_typography}
                  handleInputColorFontSetting={handleInputColorFontSetting}
                  data={formik.values.filter_typography}
                  handleChangeSettingFont={handleChangeSettingFont}
                />
              ),
              [formik.values.filter_typography, handleChangeSettingFont]
            )}
          </div>
        </FormLayout>
      </Card.Section>
    </Card>
  );
}
