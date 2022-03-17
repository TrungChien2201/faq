import {
  Card,
  ChoiceList,
  FormLayout,
  Select,
  TextField,
  TextStyle,
} from "@shopify/polaris";
import React from "react";
import {
  DEPEN_TESTIMONIAL_BG,
  DEPEN_TESTIMONIAL_BG3,
  DEPEN_TESTIMONIAL_BORDER,
  OptionInfoPosition,
  OptionInfoPositionTwo,
  OptionLayoutPreset,
  OptionNumberOfColumn,
  OptionThemeSettingTestimonial,
  THEME_EIGHT,
  THEME_FOUR,
  THEME_NINE,
  THEME_STYLE_MARGIN,
  THEME_TEN,
} from "../constants";
import CustomColorPicker from "./CustomColorPicker";
import CustomField from "./CustomField";
import CustomFieldBorder from "./CustomFieldBorder";
import CustomFieldPadding from "./CustomFieldPadding";
import UpgradeLink from "./UpgradeLink";

export default function ThemeSettings({
  formik,
  handleChange,
  colorPagination,
  handleChangeColorAddToCart,
  dataBackups,
  handleOpenSetColor,
  handleChangeSetColor,
  handleInputSetColor,
  handleOpenUpgradePlan,
}) {
  return (
    <Card title="Theme">
      <Card.Section>
        <FormLayout>
          <CustomField
            label="Layout"
            helpText="Select which type of slider you want to show."
          >
            <ChoiceList
              id="layout"
              name="layout"
              choices={OptionLayoutPreset()}
              selected={formik.values.layout}
              onChange={handleChange}
            />
          </CustomField>
          <CustomField
            label="Theme"
            helpText={
              <div>
                Select a theme which you want to display. <b>Please note:</b> To
                get perfect view for some themes, you need to customize few
                settings below.
              </div>
            }
          >
            <Select
              id="theme_style"
              name="theme_style"
              options={OptionThemeSettingTestimonial()}
              value={formik.values.theme_style}
              onChange={handleChange}
            />
          </CustomField>
          {formik.values.layout?.includes("grid") && (
            <CustomField label="Number of Columns">
              <Select
                id="number_of_columns"
                name="number_of_columns"
                options={OptionNumberOfColumn}
                value={formik.values.number_of_columns}
                onChange={handleChange}
              />
            </CustomField>
          )}
          {/* {isDisableField && (
            <UpgradeLink
              text="Get Access to 9 Professionally Designed Testimonial Themes with Customization options"
              openUpgrade={handleOpenUpgradePlan}
            />
          )} */}
          {/* <TextStyle variation="strong">Customize Theme</TextStyle>
          {THEME_STYLE_MARGIN.includes(formik.values.theme_style.toString()) &&
            !formik.values.thumbnail_slider && (
              <CustomField label="Margin Between Testimonials" helpText="Set margin between the testimonials.">
                <TextField
                  type="number"
                  id="testimonial_margin"
                  name="testimonial_margin"
                  options={OptionThemeSettingTestimonial()}
                  value={formik.values.testimonial_margin}
                  onChange={handleChange}
                />
              </CustomField>
            )}
          {DEPEN_TESTIMONIAL_BORDER.includes(formik.values.theme_style) && (
            <CustomFieldBorder
              value={formik?.values?.testimonial_border}
              dataBackups={dataBackups?.testimonial_border}
              id="testimonial_border"
              handleChange={handleChange}
              isSpaceBetween={false}
              colorPagination={colorPagination}
              handleChangeColorAddToCart={handleChangeColorAddToCart}
              label="Testimonial Border"
              helpText="Set testimonial border."
              handleOpenSetColor={handleOpenSetColor}
            />
          )}
          {formik.values.theme_style === THEME_TEN && (
            <CustomColorPicker
              title="Testimonial Box-Shadow Color"
              nameKey="testimonial_box_shadow_color"
              handleChangeSetColor={handleChangeSetColor}
              handleInputSetColor={handleInputSetColor}
              backgroundColorBackUp={formik.values.testimonial_box_shadow_color}
              handleOpenSetColor={handleOpenSetColor}
              colorPagination={colorPagination}
              description="Set testimonial box-shadow color."
              backgroundColor={dataBackups.testimonial_box_shadow_color}
            />
          )}
          {formik.values.theme_style === THEME_TEN && (
            <CustomColorPicker
              title="Testimonial Top Background"
              nameKey="testimonial_top_bg"
              handleChangeSetColor={handleChangeSetColor}
              handleInputSetColor={handleInputSetColor}
              backgroundColorBackUp={formik.values.testimonial_top_bg}
              handleOpenSetColor={handleOpenSetColor}
              colorPagination={colorPagination}
              description="Set testimonial top background color."
              backgroundColor={dataBackups.testimonial_top_bg}
            />
          )}
          {DEPEN_TESTIMONIAL_BG.includes(formik.values.theme_style) && (
            <CustomColorPicker
              title="Testimonial Background"
              nameKey="testimonial_bg"
              handleChangeSetColor={handleChangeSetColor}
              handleInputSetColor={handleInputSetColor}
              backgroundColorBackUp={formik.values.testimonial_bg}
              description="Set testimonial background color."
              handleOpenSetColor={handleOpenSetColor}
              colorPagination={colorPagination}
              description="Set testimonial background color."
              backgroundColor={dataBackups.testimonial_bg}
            />
          )}
          {formik.values.theme_style === THEME_FOUR && (
            <CustomColorPicker
              title="Testimonial Background"
              nameKey="testimonial_bg_two"
              handleChangeSetColor={handleChangeSetColor}
              handleInputSetColor={handleInputSetColor}
              backgroundColorBackUp={formik.values.testimonial_bg_two}
              handleOpenSetColor={handleOpenSetColor}
              colorPagination={colorPagination}
              description="Set testimonial background color."
              backgroundColor={dataBackups.testimonial_bg_two}
            />
          )}
          {DEPEN_TESTIMONIAL_BG3.includes(formik.values.theme_style) && (
            <CustomColorPicker
              title="Testimonial Background"
              nameKey="testimonial_bg_three"
              handleChangeSetColor={handleChangeSetColor}
              handleInputSetColor={handleInputSetColor}
              backgroundColorBackUp={formik.values.testimonial_bg_three}
              handleOpenSetColor={handleOpenSetColor}
              colorPagination={colorPagination}
              description="Set testimonial background color."
              backgroundColor={dataBackups.testimonial_bg_three}
            />
          )}
          {formik.values.theme_style === THEME_TEN && (
            <CustomField label="Testimonial Border Radius"  helpText="Set testimonial border radius.">
              <TextField
                type="number"
                id="testimonial_border_radius"
                name="testimonial_border_radius"
                value={formik.values.testimonial_border_radius}
                onChange={handleChange}
              />
            </CustomField>
          )}
          {DEPEN_TESTIMONIAL_BORDER.includes(formik.values.theme_style) && (
            <CustomFieldPadding
              label="Inner Padding"
              helpText="Set testimonial inner padding."
              values={formik.values.testimonial_inner_padding}
              id="testimonial_inner_padding"
              handleChange={handleChange}
            />
          )}
          {formik.values.theme_style === THEME_EIGHT && (
            <CustomField label="Testimonial Info Position" helpText="Select testimonial info position.">
              <ChoiceList
                id="testimonial_info_position"
                name="testimonial_info_position"
                choices={OptionInfoPosition}
                selected={formik.values.testimonial_info_position}
                onChange={handleChange}
              />
            </CustomField>
          )}
          {formik.values.theme_style === THEME_NINE && (
            <div style={{ paddingTop: "7px" }}>
              <CustomField label="Testimonial Info Position" helpText="Select testimonial info position.">
                <ChoiceList
                  id="testimonial_info_position_two"
                  name="testimonial_info_position_two"
                  choices={OptionInfoPositionTwo}
                  selected={formik.values.testimonial_info_position_two}
                  onChange={handleChange}
                />
              </CustomField>
            </div>
          )}
          {(formik.values.theme_style === THEME_EIGHT ||
            formik.values.theme_style === THEME_NINE) && (
            <CustomFieldBorder
              value={formik?.values?.testimonial_info_border}
              dataBackups={dataBackups?.testimonial_info_border}
              id="testimonial_info_border"
              handleChange={handleChange}
              isSpaceBetween={false}
              colorPagination={colorPagination}
              helpText="Set testimonial info border."
              handleChangeColorAddToCart={handleChangeColorAddToCart}
              label="Testimonial Info Border"
              handleOpenSetColor={handleOpenSetColor}
            />
          )}
          {(formik.values.theme_style === THEME_EIGHT ||
            formik.values.theme_style === THEME_NINE) && (
            <CustomColorPicker
              title="Background for Testimonial Info"
              nameKey="testimonial_info_bg"
              handleChangeSetColor={handleChangeSetColor}
              handleInputSetColor={handleInputSetColor}
              backgroundColorBackUp={formik.values.testimonial_info_bg}
              handleOpenSetColor={handleOpenSetColor}
              colorPagination={colorPagination}
              description="Set background color for testimonial information."
              backgroundColor={dataBackups.testimonial_info_bg}
            />
          )}
          {(formik.values.theme_style === THEME_EIGHT ||
            formik.values.theme_style === THEME_NINE) && (
            <CustomFieldPadding
              label="Inner Padding for Testimonial Info"
              values={formik.values.testimonial_info_inner_padding}
              id="testimonial_info_inner_padding"
              handleChange={handleChange}
              helpText="Set inner padding for testimonial information."
            />
          )} */}
          {/* {isDisableField && (
            <UpgradeLink
              text="To unlock the Theme based Customization options"
              openUpgrade={handleOpenUpgradePlan}
            />
          )} */}
        </FormLayout>
      </Card.Section>
    </Card>
  );
}
