import {
  TextField,
  Card,
  Checkbox,
  FormLayout,
  Select,
  Icon,
  ChoiceList,
} from "@shopify/polaris";
import React from "react";
import {
  BORDER,
  BOX_SHADOW,
  CUSTOM,
  DEPEN_IMAGE_POSITION,
  DEPEN_IMAGE_POSITION_THREE,
  DEPEN_IMAGE_POSITION_TWO,
  OptionIconBorderRadius,
  OptionImageBorderShadow,
  OptionImageGrayscale,
  OptionImageShape,
  OptionImageSize,
  OptionInfoPosition,
  OptionInfoPositionThree,
  OptionRatingAlignMent,
  SLIDER,
  THEME_NINE,
  THEME_ONE,
} from "../constants";
import { RiDragMove2Fill } from "react-icons/ri";
import CustomField from "./CustomField";
import CustomFieldPadding from "./CustomFieldPadding";
import CustomColorPicker from "./CustomColorPicker";
import CustomFieldBorder from "./CustomFieldBorder";
import { FaArrowsAltH, FaArrowsAltV } from "react-icons/fa";

export default function ImageSettings({
  handleOpenSetColor,
  colorPagination,
  handleChangeColorAddToCart,
  formik,
  handleChange,
  dataBackUp,
  handleChangeSetColor,
  handleInputSetColor,
}) {
  return (
    <Card title="Image Settings">
      <Card.Section>
        <FormLayout>
          <CustomField
            isFlex
            label="Testimonial Image"
            helpText="Show/Hide testimonial image."
          >
            <Checkbox
              id="client_image"
              name="client_image"
              checked={formik.values.client_image}
              onChange={handleChange}
            />
          </CustomField>

          <div style={{ paddingTop: "10px" }}>
            {formik.values.client_image && (
              <div>
                <FormLayout>
                  {formik.values.layout.includes(SLIDER) &&
                    formik.values.theme_style.includes(THEME_ONE) && (
                      <CustomField
                        isFlex
                        label="Enable Thumbnail Slider"
                        helpText="Check to enable thumbnail slider."
                      >
                        <Checkbox
                          id="thumbnail_slider"
                          name="thumbnail_slider"
                          checked={formik.values.thumbnail_slider}
                          onChange={handleChange}
                        />
                      </CustomField>
                    )}
                  {!formik.values.thumbnail_slider &&
                    DEPEN_IMAGE_POSITION.includes(
                      formik.values.theme_style
                        .toString()
                        .replaceAll("/[]/g", "")
                    ) && (
                      <CustomField
                        label="Alignment"
                        helpText="Select image alignment."
                      >
                        <ChoiceList
                          id="client_image_position"
                          name="client_image_position"
                          choices={OptionRatingAlignMent}
                          selected={formik?.values?.client_image_position}
                          onChange={handleChange}
                        />
                      </CustomField>
                    )}
                  {DEPEN_IMAGE_POSITION_TWO.includes(
                    formik.values.theme_style.toString().replaceAll("/[]/g", "")
                  ) && (
                    <CustomField
                      label="Alignment"
                      helpText="Select image alignment."
                    >
                      <ChoiceList
                        id="client_image_position_two"
                        name="client_image_position_two"
                        choices={OptionInfoPosition}
                        selected={formik?.values?.client_image_position_two}
                        onChange={handleChange}
                      />
                    </CustomField>
                  )}
                  {DEPEN_IMAGE_POSITION_THREE.includes(
                    formik.values.theme_style.toString().replaceAll("/[]/g", "")
                  ) && (
                    <CustomField
                      label="Alignment"
                      helpText="Select image alignment."
                    >
                      <ChoiceList
                        id="client_image_position_three"
                        name="client_image_position_three"
                        choices={OptionInfoPositionThree}
                        selected={formik?.values?.client_image_position_three}
                        onChange={handleChange}
                      />
                    </CustomField>
                  )}
                  {DEPEN_IMAGE_POSITION.includes(
                    formik.values.theme_style.toString().replaceAll("/[]/g", "")
                  ) && (
                    <CustomFieldPadding
                      label="Margin"
                      helpText="Set margin for testimonial image."
                      values={formik.values.client_image_margin}
                      id="client_image_margin"
                      handleChange={handleChange}
                    />
                  )}
                  {formik.values.theme_style.includes(THEME_NINE) && (
                    <CustomFieldPadding
                      label="Margin"
                      helpText="Set margin for testimonial image."
                      values={formik.values.client_image_margin_tow}
                      id="client_image_margin_tow"
                      handleChange={handleChange}
                    />
                  )}
                  <CustomField
                    label="Image Shape"
                    helpText="Choose a image shape."
                  >
                    <ChoiceList
                      id="client_image_style"
                      name="client_image_style"
                      choices={OptionImageShape()}
                      selected={formik?.values?.client_image_style}
                      onChange={handleChange}
                    />
                  </CustomField>
                  <CustomField
                    label="Border or Box-Shadow"
                    helpText="Select image border or box-shadow option."
                  >
                    <ChoiceList
                      id="client_image_border_shadow"
                      name="client_image_border_shadow"
                      choices={OptionImageBorderShadow}
                      selected={formik?.values?.client_image_border_shadow}
                      onChange={handleChange}
                    />
                  </CustomField>
                  {formik.values.client_image_border_shadow.includes(
                    BOX_SHADOW
                  ) && (
                    <CustomColorPicker
                      title="Box-Shadow Color"
                      nameKey="client_image_box_shadow_color"
                      handleChangeSetColor={handleChangeSetColor}
                      handleInputSetColor={handleInputSetColor}
                      backgroundColorBackUp={
                        formik.values.client_image_box_shadow_color
                      }
                      description="Set image box-shadow color."
                      handleOpenSetColor={handleOpenSetColor}
                      colorPagination={colorPagination}
                      backgroundColor={dataBackUp.client_image_box_shadow_color}
                    />
                  )}
                  {formik.values.client_image_border_shadow.includes(
                    BORDER
                  ) && (
                    <CustomFieldBorder
                      value={formik?.values?.image_border}
                      dataBackups={dataBackUp?.image_border}
                      id="image_border"
                      handleChange={handleChange}
                      colorPagination={colorPagination}
                      handleChangeColorAddToCart={handleChangeColorAddToCart}
                      label="Border"
                      isSpaceBetween={false}
                      helpText="Set image border."
                      handleOpenSetColor={handleOpenSetColor}
                    />
                  )}
                  <CustomColorPicker
                    title="Image Background"
                    nameKey="client_image_bg"
                    handleChangeSetColor={handleChangeSetColor}
                    handleInputSetColor={handleInputSetColor}
                    backgroundColorBackUp={formik.values.client_image_bg}
                    description="Set image background color."
                    handleOpenSetColor={handleOpenSetColor}
                    colorPagination={colorPagination}
                    backgroundColor={dataBackUp.client_image_bg}
                  />
                  <CustomField
                    label="Padding"
                    helpText="Set padding for testimonial image."
                  >
                    <div style={{ display: "flex" }}>
                      <TextField
                        type="number"
                        value={formik?.values?.image_padding?.all}
                        id="image_padding['all']"
                        name="image_padding['all']"
                        onChange={handleChange}
                        prefix={
                          <div style={{ marginTop: "6px" }}>
                            <Icon source={RiDragMove2Fill} color="base" />
                          </div>
                        }
                      />
                      <div style={{ marginLeft: "10px" }}>
                        <Select
                          id="image_padding['unit']"
                          name="image_padding['unit']"
                          options={OptionIconBorderRadius}
                          value={formik?.values?.image_padding?.unit}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </CustomField>
                  <CustomField
                    label="Testimonial Image Size"
                    helpText="Select which size image to show with your Testimonials."
                  >
                    <Select
                      id="image_sizes"
                      name="image_sizes"
                      options={OptionImageSize}
                      value={formik?.values?.image_sizes}
                      onChange={handleChange}
                    />
                  </CustomField>
                  {formik?.values?.image_sizes === CUSTOM && (
                    <CustomField
                      label="Custom Size"
                      helpText="Set a custom width and height of the image."
                    >
                      <div>
                        <TextField
                          type="number"
                          value={formik?.values?.image_custom_size?.width}
                          id="image_custom_size['width']"
                          name="image_custom_size['width']"
                          onChange={handleChange}
                          prefix={
                            <div style={{ marginTop: "6px" }}>
                              <Icon source={FaArrowsAltV} color="base" />
                            </div>
                          }
                        />
                        <div style={{ marginTop: "15px" }}>
                          <TextField
                            type="number"
                            value={formik?.values?.image_custom_size?.height}
                            id="image_custom_size['height']"
                            name="image_custom_size['height']"
                            onChange={handleChange}
                            prefix={
                              <div style={{ marginTop: "6px" }}>
                                <Icon source={FaArrowsAltH} color="base" />
                              </div>
                            }
                          />
                        </div>
                      </div>
                    </CustomField>
                  )}
                  {!formik.values.thumbnail_slider && (
                    <CustomField
                      label="Image Mode"
                      helpText="Select a image mode."
                    >
                      <Select
                        id="image_grayscale"
                        name="image_grayscale"
                        options={OptionImageGrayscale()}
                        value={formik?.values?.image_grayscale}
                        onChange={handleChange}
                      />
                    </CustomField>
                  )}
                  {!formik.values.thumbnail_slider && (
                    <CustomField
                      isFlex
                      label="Video Testimonial"
                      helpText="Show/Hide video testimonial."
                    >
                      <Checkbox
                        id="video_icon"
                        name="video_icon"
                        checked={formik.values.video_icon}
                        onChange={handleChange}
                      />
                    </CustomField>
                  )}
                  {!formik.values.thumbnail_slider &&
                    formik.values.video_icon && (
                      <CustomColorPicker
                        title="Video Icon Color"
                        nameKey="video_icon_color"
                        handleChangeSetColor={handleChangeSetColor}
                        handleInputSetColor={handleInputSetColor}
                        backgroundColorBackUp={formik.values.video_icon_color}
                        description="Set video testimonial icon color."
                        handleOpenSetColor={handleOpenSetColor}
                        colorPagination={colorPagination}
                        backgroundColor={dataBackUp.video_icon_color}
                      />
                    )}
                  {!formik.values.thumbnail_slider &&
                    formik.values.video_icon && (
                      <CustomColorPicker
                        title="Video Icon Overlay Color"
                        nameKey="video_icon_overlay"
                        handleChangeSetColor={handleChangeSetColor}
                        handleInputSetColor={handleInputSetColor}
                        backgroundColorBackUp={formik.values.video_icon_overlay}
                        description="Set video testimonial icon overlay color."
                        handleOpenSetColor={handleOpenSetColor}
                        colorPagination={colorPagination}
                        backgroundColor={dataBackUp.video_icon_overlay}
                      />
                    )}
                </FormLayout>
              </div>
            )}
          </div>
        </FormLayout>
      </Card.Section>
    </Card>
  );
}
