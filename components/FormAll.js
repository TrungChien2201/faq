import { Button, Card, FormLayout } from "@shopify/polaris";
import arrayMove from "array-move";
import { Fragment, useCallback, useState } from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import ModalAddElementForm from "./ModalAddElementForm";
import SortableFormElement from "./SortableFormElement";

export default function FormAll({
  formik,
  setVisibleFormElement,
  visibleFormElement,
  isDisableField,
}) {
  const [isOpenAddField, setIsOpenAddField] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const SortableItem = SortableElement(({ value, indexs }) => (
    <SortableFormElement
      setIsOpen={setIsOpen}
      isOpen={isOpen}
      setVisibleFormElement={setVisibleFormElement}
      visibleFormElement={visibleFormElement}
      value={value}
      indexs={indexs}
      formik={formik}
      isDisableField={isDisableField}
    />
  ));

  const SortableList = SortableContainer(({ items }) => {
    return (
      <div>
        {items?.length > 0 &&
          items.map((item, index) => (
            <Fragment key={`item-${index}`}>
              <SortableItem
                disabled={isDisableField}
                index={index}
                indexs={index}
                value={item}
              />
            </Fragment>
          ))}
      </div>
    );
  });

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const socialProfile = formik.values.form_elements;
    const newSocialProfile = arrayMove(socialProfile, oldIndex, newIndex);
    formik.handleChange({
      target: { id: "form_elements", value: newSocialProfile },
    });
  };

  const handleOpenAddField = useCallback(() => {
    setIsOpenAddField(!isOpenAddField);
  }, [isOpenAddField]);

  return (
    <>
      <Card.Section>
        <FormLayout>
          <SortableList
            items={formik.values.form_elements}
            onSortEnd={!isDisableField && onSortEnd}
            lockToContainerEdges={false}
            lockOffset="0%"
            distance={1}
          />
          <Button disabled={isDisableField} onClick={handleOpenAddField}>
            Add fields
          </Button>
          {isOpenAddField && (
            <ModalAddElementForm
              formik={formik}
              handleOpenAddField={handleOpenAddField}
            />
          )}
        </FormLayout>
      </Card.Section>
    </>
  );
}
