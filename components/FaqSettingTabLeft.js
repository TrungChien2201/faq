import {
  TextField,
  Card,
  ChoiceList,
  FormLayout,
  Select,
  RangeSlider,
  Checkbox,
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

export default function FaqSettingTabLeft({
  formik,
  handleChange,
  groups,
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
      <Card title="FAQ Page">
        <Card.Section>
          <FormLayout>
            <CustomColorPicker
              title="Header background color"
              nameKey="headerBackgroundColor"
              handleChangeSetColor={handleChangeSetColor}
              backgroundColorBackUp={formik.values.headerBackgroundColor}
              // description="Set image box-shadow color."
              handleOpenSetColor={handleOpenSetColor}
              colorPagination={colorPagination}
              backgroundColor={dataBackUp.headerBackgroundColor}
            />
            <TextField
              id="headerHeight"
              name="headerHeight"
              label="Header height"
              value={formik.values.headerHeight}
              type="number"
              onChange={handleChange}
            />
            <Checkbox
              id="showPageTitle"
              name="showPageTitle"
              checked={formik.values.showPageTitle}
              label="Show page title"
              onChange={handleChange}
            />
            {formik?.values?.showPageTitle && (
              <TextField
                id="pageTitle"
                name="pageTitle"
                label="Page title"
                value={formik.values.pageTitle}
                onChange={handleChange}
              />
            )}
            <TextField
              id="pageTitleSize"
              name="pageTitleSize"
              label="Page title size"
              type="number"
              value={formik.values.pageTitleSize}
              onChange={handleChange}
            />
            <CustomColorPicker
              title="Page title color"
              nameKey="pageTitleColor"
              handleChangeSetColor={handleChangeSetColor}
              backgroundColorBackUp={formik.values.pageTitleColor}
              // description="Set image box-shadow color."
              handleOpenSetColor={handleOpenSetColor}
              colorPagination={colorPagination}
              backgroundColor={dataBackUp.pageTitleColor}
            />
            <Checkbox
              id="showPageIntro"
              name="showPageIntro"
              checked={formik.values.showPageIntro}
              label="Show page intro"
              onChange={handleChange}
            />
            {formik?.values?.showPageIntro && (
              <TextField
                id="pageIntro"
                name="pageIntro"
                label="Page intro"
                value={formik.values.pageIntro}
                onChange={handleChange}
              />
            )}
            <TextField
              id="pageIntroSize"
              name="pageIntroSize"
              label="Page intro size"
              type="number"
              value={formik.values.pageIntroSize}
              onChange={handleChange}
            />
            <CustomColorPicker
              title="Page intro color"
              nameKey="pageIntroColor"
              handleChangeSetColor={handleChangeSetColor}
              backgroundColorBackUp={formik.values.pageIntroColor}
              // description="Set image box-shadow color."
              handleOpenSetColor={handleOpenSetColor}
              colorPagination={colorPagination}
              backgroundColor={dataBackUp.pageIntroColor}
            />
            <Checkbox
              id="showSearchBox"
              name="showSearchBox"
              checked={formik.values.showSearchBox}
              label="Show search box"
              onChange={handleChange}
            />
            {formik?.values?.showSearchBox && (
              <TextField
                id="searchPlaceholder"
                name="searchPlaceholder"
                label="Search placeholder"
                value={formik.values.searchPlaceholder}
                onChange={handleChange}
              />
            )}
            {formik?.values?.showSearchBox && (
              <TextField
                id="searchNotFoundText"
                name="searchNotFoundText"
                label="Search not found text"
                value={formik.values.searchNotFoundText}
                onChange={handleChange}
              />
            )}
            <TextField
              id="groupNameSize"
              name="groupNameSize"
              label="Group name size"
              type="number"
              value={formik.values.groupNameSize}
              onChange={handleChange}
            />
            <CustomColorPicker
              title="Group name color"
              nameKey="groupNameColor"
              handleChangeSetColor={handleChangeSetColor}
              backgroundColorBackUp={formik.values.groupNameColor}
              // description="Set image box-shadow color."
              handleOpenSetColor={handleOpenSetColor}
              colorPagination={colorPagination}
              backgroundColor={dataBackUp.groupNameColor}
            />
          </FormLayout>
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
                  keys="groups"
                  keyChild="groups"
                  data={groups}
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
