import {
  TextField,
  Card,
  Checkbox,
  ChoiceList,
  FormLayout,
  Select,
} from "@shopify/polaris";
import React, { useCallback, useState } from "react";
import {
  EXCLUDE,
  FILTER,
  OptionGridStyle,
  OptionLayoutPreset,
  OptionOrder,
  OptionOrderBy,
  OptionTestimonialFilter,
  SPECIFIC_TESTIMONIALS,
} from "../constants";
import CustomField from "./CustomField";
import CustomFieldResponsive from "./CustomFieldResponesive";
import MultiSelectSort from "./SelectMutileValue";

export default function GeneralSetting({ formik, handleChange, testimonial }) {
  return (
    <Card title="General">
      <Card.Section>
        <FormLayout>
          {/* <div>
            <CustomField
              label="Layout Preset"
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
          </div> */}
          {/* {isDisableField && (
          <UpgradeLink
            text="To unlock more amazing Testimonial Layouts (Grid, Masonry, List, & Isotope)"
            openUpgrade={handleOpenUpgradePlan}
          />
        )}
        {formik?.values?.layout?.includes(FILTER) && (
          <CustomField
            label="Isotope Mode"
            helpText="Select a mode for isotope."
          >
            <ChoiceList
              id="filter_style"
              name="filter_style"
              choices={OptionGridStyle}
              selected={formik.values.filter_style}
              onChange={handleChange}
            />
          </CustomField>
        )} */}

          <CustomField
            label="Filter Testimonials"
            helpText="Select an option to display the testimonials."
          >
            <Select
              id="display_testimonials_from"
              name="display_testimonials_from"
              options={OptionTestimonialFilter()}
              value={formik.values.display_testimonials_from}
              onChange={handleChange}
            />
          </CustomField>
          {formik.values.display_testimonials_from ===
            SPECIFIC_TESTIMONIALS && (
            <CustomField
              label="Specific Testimonial(s)"
              helpText="Choose the specific testimonial(s) to display."
            >
              <MultiSelectSort
                keys="specific_testimonial"
                formik={formik}
                testimonial={testimonial}
              />
            </CustomField>
          )}
          {formik.values.display_testimonials_from === EXCLUDE && (
            <CustomField
              label="Exclude Testimonial(s)"
              helpText="Exlude the testimonial(s)."
            >
              <MultiSelectSort
                keys="exclude_testimonial"
                formik={formik}
                testimonial={testimonial}
              />
            </CustomField>
          )}
          {formik.values.display_testimonials_from !==
            SPECIFIC_TESTIMONIALS && (
            <CustomField
              label="Limit"
              helpText="Limit number of testimonials to show."
            >
              <TextField
                type="number"
                id="number_of_total_testimonials"
                name="number_of_total_testimonials"
                value={formik.values.number_of_total_testimonials}
                onChange={handleChange}
              />
            </CustomField>
          )}
          {/* <CustomFieldResponsive
          label="Column(s)"
          helpText="Set products column(s) in different devices."
          id="columns"
          handleChange={handleChange}
          values={formik.values.columns}
        /> */}
          {formik.values.display_testimonials_from !==
            SPECIFIC_TESTIMONIALS && (
            <CustomField
              isFlex
              label="Random Order"
              helpText="Check to display testimonials in random order."
            >
              <Checkbox
                id="random_order"
                name="random_order"
                checked={formik.values.random_order}
                onChange={handleChange}
              />
            </CustomField>
          )}
          {!formik.values.random_order &&
            formik.values.display_testimonials_from !==
              SPECIFIC_TESTIMONIALS && (
              <CustomField
                label="Order By"
                helpText="Select an order by option."
              >
                <Select
                  id="testimonial_order_by"
                  name="testimonial_order_by"
                  options={OptionOrderBy}
                  value={formik.values.testimonial_order_by}
                  onChange={handleChange}
                />
              </CustomField>
            )}
          {!formik.values.random_order &&
            formik.values.display_testimonials_from !==
              SPECIFIC_TESTIMONIALS && (
              <CustomField
                label="Order Type"
                helpText="Select an order option."
              >
                <Select
                  id="testimonial_order"
                  name="testimonial_order"
                  options={OptionOrder}
                  value={formik.values.testimonial_order}
                  onChange={handleChange}
                />
              </CustomField>
            )}
          {/* <CustomField isFlex label="Preloader" helpText="On/off preloader.">
            <Checkbox
              id="preloader"
              name="preloader"
              checked={formik.values.preloader}
              onChange={handleChange}
            />
          </CustomField> */}
        </FormLayout>
      </Card.Section>
    </Card>
  );
}
