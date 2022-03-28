import {
  TextField,
  Card,
  ChoiceList,
  FormLayout,
  Select,
  RangeSlider,
} from "@shopify/polaris";
import React, { useRef, useState } from "react";
import {
  optionFAQBehavior,
  optionFAQExtra,
  optionFAQIconPosition,
  optionFAQNameTag,
  optionFonStyle,
  optionIconStyle,
} from "../constants";
import { useOutsideAlerter } from "../constants/function";
import CustomColorPicker from "./CustomColorPicker";
import CustomField from "./CustomField";
import SelectMutileValueSortElement from "./SelectMultipleSortElement";

export default function WidgetTabLeft({
  formik,
  handleChange,
  faqGroup,
  handleOpenSetColor,
  colorPagination,
  handleChangeSetColor,
  dataBackUp,
  errorNameWidget,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const refSelectMultile = useRef(null);
  useOutsideAlerter(refSelectMultile, () => setIsOpen(false));

  const handleOpenSelectMultile = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Card title="Widget Title">
        <Card.Section>
          <TextField
            id="title"
            name="title"
            error={!formik.values.title ? errorNameWidget : ""}
            value={formik.values.title}
            onChange={handleChange}
          />
        </Card.Section>
      </Card>
      <Card title="FAQ Select">
        <Card.Section>
          <FormLayout>
            <CustomField label="FAQ Groups">
              <div ref={refSelectMultile} onClick={handleOpenSelectMultile}>
                <SelectMutileValueSortElement
                  isOpen={isOpen}
                  formik={formik}
                  keys="faqGroup"
                  keyChild="faqGroup"
                  data={faqGroup}
                />
              </div>
            </CustomField>
            <ChoiceList
              title="FAQ Style"
              id="faqStyleID"
              name="faqStyleID"
              choices={optionFonStyle}
              selected={formik.values.faqStyleID}
              onChange={handleChange}
            />
          </FormLayout>
        </Card.Section>
      </Card>
      <Card title="Customize FAQ">
        <Card.Section>
          <FormLayout>
            <ChoiceList
              id="faqBehavior"
              name="faqBehavior"
              title="FAQ Behavior"
              choices={optionFAQBehavior}
              selected={formik.values.faqBehavior}
              onChange={handleChange}
            />
            <ChoiceList
              title="Display Group Name"
              id="faqNameTag"
              name="faqNameTag"
              choices={optionFAQNameTag}
              selected={formik.values.faqNameTag}
              onChange={handleChange}
            />
            <ChoiceList
              title="Icon Position"
              id="faqIconPosition"
              name="faqIconPosition"
              choices={optionFAQIconPosition}
              selected={formik.values.faqIconPosition}
              onChange={handleChange}
            />
            <ChoiceList
              title="Extras"
              id="faqExtras"
              name="faqExtras"
              choices={optionFAQExtra}
              selected={formik.values.faqExtras}
              onChange={handleChange}
            />
            <CustomField label="Icon Size">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  columnGap: "10px",
                  alignItems: "center",
                }}
              >
                <RangeSlider
                  min={16}
                  max={24}
                  name="faqIconSize"
                  id="faqIconSize"
                  value={Number(formik.values.faqIconSize)}
                  onChange={handleChange}
                  output
                />
                <TextField
                  min={16}
                  max={24}
                  type="number"
                  id="faqIconSize"
                  name="faqIconSize"
                  value={formik.values.faqIconSize.toString()}
                  onChange={handleChange}
                />
              </div>
            </CustomField>

            <div className="choice-list">
              <ChoiceList
                id="faqIconSelect"
                name="faqIconSelect"
                title="Icon Select"
                choices={optionIconStyle}
                selected={formik?.values?.faqIconSelect}
                onChange={handleChange}
              />
            </div>
            <CustomColorPicker
              title="Collapsed Question Color"
              nameKey="faqQuestionCloseColor"
              handleChangeSetColor={handleChangeSetColor}
              backgroundColorBackUp={formik.values.faqQuestionCloseColor}
              // description="Set image box-shadow color."
              handleOpenSetColor={handleOpenSetColor}
              colorPagination={colorPagination}
              backgroundColor={dataBackUp.faqQuestionCloseColor}
            />
            <CustomColorPicker
              title="Expanded Question Color"
              nameKey="faqQuestionOpenColor"
              handleChangeSetColor={handleChangeSetColor}
              backgroundColorBackUp={formik.values.faqQuestionOpenColor}
              // description="Set image box-shadow color."
              handleOpenSetColor={handleOpenSetColor}
              colorPagination={colorPagination}
              backgroundColor={dataBackUp.faqQuestionOpenColor}
            />
            <CustomColorPicker
              title="Collapse Icon Color"
              nameKey="faqIconCloseColor"
              handleChangeSetColor={handleChangeSetColor}
              backgroundColorBackUp={formik.values.faqIconCloseColor}
              // description="Set image box-shadow color."
              handleOpenSetColor={handleOpenSetColor}
              colorPagination={colorPagination}
              backgroundColor={dataBackUp.faqIconCloseColor}
            />
            <CustomColorPicker
              title="Expand Icon Color"
              nameKey="faqIconOpenColor"
              handleChangeSetColor={handleChangeSetColor}
              backgroundColorBackUp={formik.values.faqIconOpenColor}
              // description="Set image box-shadow color."
              handleOpenSetColor={handleOpenSetColor}
              colorPagination={colorPagination}
              backgroundColor={dataBackUp.faqIconOpenColor}
            />
          </FormLayout>
        </Card.Section>
      </Card>
    </>
  );
}
