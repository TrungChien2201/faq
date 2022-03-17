import {
  TextField,
  Card,
  Checkbox,
  ChoiceList,
  FormLayout,
  Select,
  Icon,
  TextStyle,
} from "@shopify/polaris";
import React from "react";
import { RiDragMove2Fill } from "react-icons/ri";
import {
  CONTENT_WITH_LIMIT,
  DEPEN_CARD_PAGINATION,
  EXPAND,
  FILTER,
  INFINTE_SCROLL,
  OptionContentType,
  OptionIconBorderRadius,
  OptionLinkTarget,
  OptionPaginationType,
  OptionRatingAlignMent,
  OptionRatingIcon,
  OptionReadMoreLinkAction,
  OptionTag,
  POPUP,
} from "../constants";
import CustomColorPicker from "./CustomColorPicker";
import CustomField from "./CustomField";
import CustomFieldBorder from "./CustomFieldBorder";
import CustomFieldPadding from "./CustomFieldPadding";

export default function DisplaySettings({
  formik,
  handleChange,
  colorPagination,
  handleOpenSetColor,
  handleChangeSetColor,
  handleChangeColorAddToCart,
  handleInputSetColor,
  dataBackUp,
  handleOpenUpgradePlan,
}) {
  return (
    <Card title="Display">
      <Card.Section>
        <FormLayout>
          <CustomField
            isFlex
            label="Display Testimonial Title"
            helpText="Show/Hide testimonial tagline or title."
          >
            <Checkbox
              id="testimonial_title"
              name="testimonial_title"
              checked={formik.values.testimonial_title}
              onChange={handleChange}
            />
          </CustomField>
          {/* {formik.values.testimonial_title && ( */}
          {/* <CustomField
            label="HTML Tag"
            helpText="Select testimonial title HTML tag."
          >
            <Select
              id="testimonial_title_tag"
              name="testimonial_title_tag"
              options={OptionTag}
              value={formik?.values?.testimonial_title_tag}
              onChange={handleChange}
            />
          </CustomField> */}
          {/* )} */}
          <CustomField
            isFlex
            label="Display Testimonial Content"
            helpText="Show/Hide testimonial content."
          >
            <Checkbox
              id="testimonial_text"
              name="testimonial_text"
              checked={formik.values.testimonial_text}
              onChange={handleChange}
            />
          </CustomField>
          <CustomField
            label="Content Display Type"
            helpText="Choose content display type."
          >
            <ChoiceList
              id="testimonial_content_type"
              name="testimonial_content_type"
              choices={OptionContentType()}
              selected={formik.values.testimonial_content_type}
              onChange={handleChange}
            />
          </CustomField>
          <div
            style={{
              paddingTop:
                formik.values.testimonial_text &&
                formik.values.testimonial_content_type.includes(
                  CONTENT_WITH_LIMIT
                )
                  ? "1px"
                  : "0",
            }}
          >
            {formik.values.testimonial_text &&
              formik.values.testimonial_content_type.includes(
                CONTENT_WITH_LIMIT
              ) && (
                <div>
                  <FormLayout>
                    <CustomField
                      label="Length"
                      helpText="Set testimonial characters length."
                    >
                      <TextField
                        type="number"
                        id="testimonial_characters_limit"
                        name="testimonial_characters_limit"
                        value={formik.values.testimonial_characters_limit}
                        onChange={handleChange}
                      />
                    </CustomField>
                    <CustomField label="Ellipsis" helpText="Type ellipsis.">
                      <TextField
                        id="testimonial_read_more_ellipsis"
                        name="testimonial_read_more_ellipsis"
                        value={formik.values.testimonial_read_more_ellipsis}
                        onChange={handleChange}
                      />
                    </CustomField>
                    {/* <CustomField
                      isFlex
                      label="Read More"
                      helpText="Show/Hide testimonial read more button."
                    >
                      <Checkbox
                        id="testimonial_read_more"
                        name="testimonial_read_more"
                        checked={formik.values.testimonial_read_more}
                        onChange={handleChange}
                      />
                    </CustomField> */}
                    {/* {formik.values.testimonial_read_more && ( */}
                    {/* <CustomField
                      label="Read More Action Type"
                      helpText="Select read more link action type."
                    >
                      <ChoiceList
                        id="testimonial_read_more_link_action"
                        name="testimonial_read_more_link_action"
                        choices={OptionReadMoreLinkAction}
                        selected={
                          formik.values.testimonial_read_more_link_action
                        }
                        onChange={handleChange}
                      />
                    </CustomField> */}
                    {/* )} */}
                    {/* {formik.values.testimonial_read_more &&
                      formik.values.testimonial_read_more_link_action.includes(
                        POPUP
                      ) && ( */}
                    {/* <CustomColorPicker
                      title="Popup Background"
                      nameKey="popup_background"
                      handleChangeSetColor={handleChangeSetColor}
                      handleInputSetColor={handleInputSetColor}
                      backgroundColorBackUp={formik.values.popup_background}
                      description="Set popup background color."
                      handleOpenSetColor={handleOpenSetColor}
                      colorPagination={colorPagination}
                      backgroundColor={dataBackUp.popup_background}
                    /> */}
                    {/* )} */}
                    {/* {formik.values.testimonial_read_more && ( */}
                    {/* <CustomField
                      label="Read More Label"
                      helpText="Type read more label."
                    >
                      <TextField
                        id="testimonial_read_more_text"
                        name="testimonial_read_more_text"
                        value={formik.values.testimonial_read_more_text}
                        onChange={handleChange}
                      />
                    </CustomField> */}
                    {/* )} */}
                    {/* {formik.values.testimonial_read_more &&
                      formik.values.testimonial_read_more_link_action.includes(
                        EXPAND
                      ) && ( */}
                    {/* <CustomField
                      label="Read Less Label"
                      helpText="Type read less label."
                    >
                      <TextField
                        id="testimonial_read_less_text"
                        name="testimonial_read_less_text"
                        value={formik.values.testimonial_read_less_text}
                        onChange={handleChange}
                      />
                    </CustomField> */}
                    {/* )} */}
                    {/* {formik.values.testimonial_read_more && ( */}
                    {/* <CustomFieldBorder
                      isBorderStyle={false}
                      isSpaceBetween={false}
                      isHoverColor={true}
                      value={formik?.values?.testimonial_readmore_color}
                      dataBackups={dataBackUp?.testimonial_readmore_color}
                      id="testimonial_readmore_color"
                      handleChange={handleChange}
                      colorPagination={colorPagination}
                      handleChangeColorAddToCart={handleChangeColorAddToCart}
                      label="Read More Color"
                      helpText="Set read more color."
                      handleOpenSetColor={handleOpenSetColor}
                    /> */}
                    {/* )} */}
                  </FormLayout>
                </div>
              )}
          </div>

          {/* <TextStyle variation="strong">Reviewer Information</TextStyle> */}
          <CustomField
            isFlex
            label="Display Reviewer Name"
            helpText="Show/Hide reviewer full name."
          >
            <Checkbox
              id="testimonial_client_name"
              name="testimonial_client_name"
              checked={formik.values.testimonial_client_name}
              onChange={handleChange}
            />
          </CustomField>
          {/* {formik.values.testimonial_client_name && ( */}
          {/* <CustomField
            label="HTML Tag"
            helpText="Select reviewer full name HTML tag."
          >
            <Select
              id="testimonial_client_name_tag"
              name="testimonial_client_name_tag"
              options={OptionTag}
              value={formik?.values?.testimonial_client_name_tag}
              onChange={handleChange}
            />
          </CustomField> */}
          {/* )} */}
          <CustomField
            isFlex
            label="Display Rating"
            helpText="Show/Hide rating."
          >
            <Checkbox
              id="testimonial_client_rating"
              name="testimonial_client_rating"
              checked={formik.values.testimonial_client_rating}
              onChange={handleChange}
            />
          </CustomField>
          <CustomField
            isFlex
            label="Display Testimonial Image"
            helpText="Show/Hide testimonial image."
          >
            <Checkbox
              id="client_image"
              name="client_image"
              checked={formik.values.client_image}
              onChange={handleChange}
            />
          </CustomField>
          {/* <CustomField
            isFlex
            label="Platform Icon"
            helpText="Show/Hide platform icon."
          >
            <Checkbox
              id="platform_icon"
              name="platform_icon"
              checked={formik.values.platform_icon}
              onChange={handleChange}
            />
          </CustomField>
          <div style={{ paddingTop: "10px" }}>
            {
              <div>
                <FormLayout>
                  <CustomField
                    label="Arrow Icon Style"
                    helpText="Choose a slider navigation arrow icon style."
                  >
                    <div className="choice-lists">
                      <ChoiceList
                        id="tpro_star_icon"
                        name="tpro_star_icon"
                        choices={OptionRatingIcon()}
                        selected={formik?.values?.tpro_star_icon}
                        onChange={handleChange}
                      />
                    </div>
                  </CustomField>
                  <CustomColorPicker
                    title="Rating Color"
                    nameKey="testimonial_client_rating_color"
                    handleChangeSetColor={handleChangeSetColor}
                    handleInputSetColor={handleInputSetColor}
                    backgroundColorBackUp={
                      formik.values.testimonial_client_rating_color
                    }
                    handleOpenSetColor={handleOpenSetColor}
                    colorPagination={colorPagination}
                    description="Set color for rating."
                    backgroundColor={dataBackUp.testimonial_client_rating_color}
                  />
                  <CustomField
                    label="Rating Alignment"
                    helpText="Set alignment of rating."
                  >
                    <ChoiceList
                      id="testimonial_client_rating_alignment"
                      name="testimonial_client_rating_alignment"
                      choices={OptionRatingAlignMent}
                      selected={
                        formik.values.testimonial_client_rating_alignment
                      }
                      onChange={handleChange}
                    />
                  </CustomField>
                  <CustomFieldPadding
                    label="Rating Margin"
                    values={formik.values.testimonial_client_rating_margin}
                    id="testimonial_client_rating_margin"
                    helpText="Set margin for rating."
                    handleChange={handleChange}
                  />
                </FormLayout>
              </div>
            }
          </div> */}
          {/* <CustomField
            isFlex
            label="Identity or Position"
            helpText="Show/Hide identity or position."
          >
            <Checkbox
              id="client_designation"
              name="client_designation"
              checked={formik.values.client_designation}
              onChange={handleChange}
            />
          </CustomField>

          <CustomField
            isFlex
            label="Company Name"
            helpText="Show/Hide company name."
          >
            <Checkbox
              id="client_company_name"
              name="client_company_name"
              checked={formik.values.client_company_name}
              onChange={handleChange}
            />
          </CustomField>
          <CustomField
            isFlex
            label="Location"
            helpText="Show/Hide Reviewer location."
          >
            <Checkbox
              id="testimonial_client_location"
              name="testimonial_client_location"
              checked={formik.values.testimonial_client_location}
              onChange={handleChange}
            />
          </CustomField>
          <CustomField
            isFlex
            label="Phone or Mobile"
            helpText="Show/Hide phone or mobile number."
          >
            <Checkbox
              id="testimonial_client_phone"
              name="testimonial_client_phone"
              checked={formik.values.testimonial_client_phone}
              onChange={handleChange}
            />
          </CustomField>
          <CustomField
            isFlex
            label="E-mail Address"
            helpText="Show/Hide e-mail address."
          >
            <Checkbox
              id="testimonial_client_email"
              name="testimonial_client_email"
              checked={formik.values.testimonial_client_email}
              onChange={handleChange}
            />
          </CustomField> */}
          <CustomField
            isFlex
            label="Display Date"
            helpText="Show/Hide testimonial date."
          >
            <Checkbox
              id="testimonial_client_date"
              name="testimonial_client_date"
              checked={formik.values.testimonial_client_date}
              onChange={handleChange}
            />
          </CustomField>
          {/* <CustomField
            isFlex
            label="Equal Height"
            helpText="Show/Hide equal height."
          >
            <Checkbox
              id="equal_height"
              name="equal_height"
              checked={formik.values.equal_height}
              onChange={handleChange}
            />
          </CustomField> */}
          {formik.values.testimonial_client_date && (
            <CustomField
              label="Date Format"
              helpText={
                <div>
                  Set date format.{" "}
                  <a
                    target="_blank"
                    href="https://www.npmjs.com/package/dateformat"
                  >
                    Documentation on date formatting.
                  </a>
                </div>
              }
            >
              <TextField
                id="testimonial_client_date_format"
                name="testimonial_client_date_format"
                value={formik.values.testimonial_client_date_format}
                onChange={handleChange}
              />
            </CustomField>
          )}
          {/* <CustomField isFlex label="Website" helpText="Show/Hide website.">
            <Checkbox
              id="testimonial_client_website"
              name="testimonial_client_website"
              checked={formik.values.testimonial_client_website}
              onChange={handleChange}
            />
          </CustomField>
          <CustomField
            isFlex
            label="Identity & Company linking via Website URL"
            helpText="Check to link identity & company name via website URL."
          >
            <Checkbox
              id="identity_linking_website"
              name="identity_linking_website"
              checked={formik.values.identity_linking_website}
              onChange={handleChange}
            />
          </CustomField>
          <CustomField
            label="Link Target"
            helpText="Set a target to open the website URL."
          >
            <ChoiceList
              id="website_link_target"
              name="website_link_target"
              choices={OptionLinkTarget}
              selected={formik.values.website_link_target}
              onChange={handleChange}
            />
          </CustomField>
          <TextStyle variation="strong">Social Media</TextStyle>
          <CustomField
            isFlex
            label="Social Profiles"
            helpText="Show/Hide social profiles."
          >
            <Checkbox
              id="social_profile"
              name="social_profile"
              checked={formik.values.social_profile}
              onChange={handleChange}
            />
          </CustomField>
          <div style={{ paddingTop: "10px" }}>
            {formik.values.social_profile && (
              <div>
                <FormLayout>
                  <CustomField
                    label="Alignment"
                    helpText="Social profiles alignment."
                  >
                    <ChoiceList
                      id="social_profile_position"
                      name="social_profile_position"
                      choices={OptionRatingAlignMent}
                      selected={formik.values.social_profile_position}
                      onChange={handleChange}
                    />
                  </CustomField>
                  <CustomFieldPadding
                    label="Margin"
                    values={formik.values.social_profile_margin}
                    id="social_profile_margin"
                    helpText="Set margin for social profiles."
                    handleChange={handleChange}
                  />
                  <CustomField
                    isFlex
                    label="Custom Color"
                    helpText="Set social icon custom color."
                  >
                    <Checkbox
                      id="social_icon_custom_color"
                      name="social_icon_custom_color"
                      checked={formik.values.social_icon_custom_color}
                      onChange={handleChange}
                    />
                  </CustomField>
                  {formik.values.social_icon_custom_color && (
                    <CustomFieldBorder
                      isBorderStyle={false}
                      isHoverColor={true}
                      isBackGroundColor={true}
                      value={formik?.values?.social_icon_color}
                      dataBackups={dataBackUp?.social_icon_color}
                      id="social_icon_color"
                      handleChange={handleChange}
                      colorPagination={colorPagination}
                      handleChangeColorAddToCart={handleChangeColorAddToCart}
                      label="Icon Color"
                      helpText="Set social icon color."
                      handleOpenSetColor={handleOpenSetColor}
                    />
                  )}
                  {formik.values.social_icon_custom_color && (
                    <CustomFieldBorder
                      isHoverColor={true}
                      value={formik?.values?.social_icon_border}
                      dataBackups={dataBackUp?.social_icon_border}
                      id="social_icon_border"
                      handleChange={handleChange}
                      colorPagination={colorPagination}
                      handleChangeColorAddToCart={handleChangeColorAddToCart}
                      label="Icon Border"
                      helpText="Set social icon border."
                      handleOpenSetColor={handleOpenSetColor}
                    />
                  )}
                  <CustomField
                    label="Icon Border Radius"
                    helpText="Set social icon border radius."
                  >
                    <div style={{ display: "flex" }}>
                      <TextField
                        type="number"
                        value={formik?.values?.social_icon_border_radius?.all}
                        id="social_icon_border_radius['all']"
                        name="social_icon_border_radius['all']"
                        onChange={handleChange}
                        prefix={
                          <div style={{ marginTop: "6px" }}>
                            <Icon source={RiDragMove2Fill} color="base" />
                          </div>
                        }
                      />
                      <div style={{ marginLeft: "10px" }}>
                        <Select
                          id="social_icon_border_radius['unit']"
                          name="social_icon_border_radius['unit']"
                          options={OptionIconBorderRadius}
                          value={
                            formik?.values?.social_icon_border_radius?.unit
                          }
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </CustomField>
                </FormLayout>
              </div>
            )}
          </div> */}
          {/* {DEPEN_CARD_PAGINATION.includes(
            formik.values.layout.toString().replaceAll("/[]/g", "")
          ) && (
            <>
              <TextStyle variation="strong">Pagination</TextStyle>
              <FormLayout>
                <CustomField
                  label="Pagination"
                  helpText="Enqueue/Dequeue pagination."
                >
                  <Checkbox
                    id="grid_pagination"
                    name="grid_pagination"
                    checked={formik.values.grid_pagination}
                    onChange={handleChange}
                  />
                </CustomField>
                <div style={{ paddingTop: "10px" }}>
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
                        <CustomField label="Load more button label" helpText="">
                          <TextField
                            id="load_more_label"
                            name="load_more_label"
                            value={formik.values.load_more_label}
                            onChange={handleChange}
                          />
                        </CustomField>
                        <CustomField
                          label="Alignment"
                          helpText="Select pagination alignment."
                        >
                          <ChoiceList
                            id="grid_pagination_alignment"
                            name="grid_pagination_alignment"
                            choices={OptionRatingAlignMent}
                            selected={formik.values.grid_pagination_alignment}
                            onChange={handleChange}
                          />
                        </CustomField>
                        {formik.values.tp_pagination_type.includes(
                          INFINTE_SCROLL
                        ) && (
                          <CustomFieldPadding
                            label="Margin"
                            helpText="Set pagination margin."
                            values={formik.values.grid_pagination_margin}
                            id="grid_pagination_margin"
                            handleChange={handleChange}
                          />
                        )}
                        {formik.values.tp_pagination_type.includes(
                          INFINTE_SCROLL
                        ) && (
                          <CustomFieldBorder
                            isBorderStyle={false}
                            isHoverColor={true}
                            isBackGroundColor={true}
                            value={formik?.values?.grid_pagination_colors}
                            dataBackups={dataBackUp?.grid_pagination_colors}
                            id="grid_pagination_colors"
                            handleChange={handleChange}
                            colorPagination={colorPagination}
                            handleChangeColorAddToCart={
                              handleChangeColorAddToCart
                            }
                            label="Pagination Color"
                            helpText="Set color for pagination."
                            handleOpenSetColor={handleOpenSetColor}
                          />
                        )}
                        {formik.values.tp_pagination_type.includes(
                          INFINTE_SCROLL
                        ) && (
                          <CustomFieldBorder
                            isHoverColor={true}
                            value={formik?.values?.grid_pagination_border}
                            dataBackups={dataBackUp?.grid_pagination_border}
                            id="grid_pagination_border"
                            handleChange={handleChange}
                            colorPagination={colorPagination}
                            handleChangeColorAddToCart={
                              handleChangeColorAddToCart
                            }
                            helpText="Set pagination border."
                            label="Pagination Border"
                            handleOpenSetColor={handleOpenSetColor}
                          />
                        )}
                      </FormLayout>
                    </div>
                  )}
                </div>
              </FormLayout>
            </>
          )} */}
          {formik.values.layout.includes(FILTER) && (
            <div style={{ paddingTop: "1.6rem" }}>
              <FormLayout>
                <CustomField
                  isFlex
                  label='"All" Tab'
                  helpText='Show/Hide "All" tab.'
                >
                  <Checkbox
                    id="all_tab"
                    name="all_tab"
                    checked={formik.values.all_tab}
                    onChange={handleChange}
                  />
                </CustomField>
                {formik.values.all_tab && (
                  <CustomField
                    label='"All" Tab Text'
                    helpText='Set "All" tab text.'
                  >
                    <TextField
                      id="all_tab_text"
                      name="all_tab_text"
                      value={formik.values.all_tab_text}
                      onChange={handleChange}
                    />
                  </CustomField>
                )}
                <CustomField
                  label="Button Alignment"
                  helpText="Set alignment for filter button."
                >
                  <ChoiceList
                    id="filter_alignment"
                    name="filter_alignment"
                    choices={OptionRatingAlignMent}
                    selected={formik.values.filter_alignment}
                    onChange={handleChange}
                  />
                </CustomField>
                <CustomFieldPadding
                  label="Margin"
                  helpText="Set margin for filter."
                  values={formik.values.filter_margin}
                  id="filter_margin"
                  handleChange={handleChange}
                />
                <CustomFieldBorder
                  isBorderStyle={false}
                  isHoverColor={true}
                  isActiveBackground={true}
                  isBackGroundColor={true}
                  value={formik?.values?.filter_colors}
                  dataBackups={dataBackUp?.filter_colors}
                  id="filter_colors"
                  handleChange={handleChange}
                  colorPagination={colorPagination}
                  handleChangeColorAddToCart={handleChangeColorAddToCart}
                  label="Pagination Color"
                  helpText="Set color for pagination."
                  handleOpenSetColor={handleOpenSetColor}
                />
                <CustomFieldBorder
                  isHoverColor={true}
                  value={formik?.values?.filter_border}
                  dataBackups={dataBackUp?.filter_border}
                  id="filter_border"
                  handleChange={handleChange}
                  colorPagination={colorPagination}
                  handleChangeColorAddToCart={handleChangeColorAddToCart}
                  label="Border"
                  helpText="Set border for the filter button."
                  handleOpenSetColor={handleOpenSetColor}
                />
              </FormLayout>
            </div>
          )}
        </FormLayout>
      </Card.Section>
    </Card>
  );
}
