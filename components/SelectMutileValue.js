import React, { useCallback, useEffect } from "react";

import { components } from "react-select";
import Createable from "react-select/creatable";
import { SortableContainer, SortableElement } from "react-sortable-hoc";

function arrayMove(array, from, to) {
  array = array.slice();
  array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
  return array;
}

const SortableMultiValue = SortableElement((props) => {
  const onMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const innerProps = { onMouseDown };
  return <components.MultiValue {...props} innerProps={innerProps} />;
});
const SortableSelect = SortableContainer(Createable);

export default function MultiSelectSort({ formik, testimonial, keys }) {
  const [selected, setSelected] = React.useState([]);

  const renderLabel = useCallback((id, testimonials) => {
    const result = testimonials.filter((item) => item.value === id);
    return result[0]?.label;
  }, []);

  useEffect(() => {
    if (formik.values[keys] && testimonial) {
      const newSelected = formik.values[keys]?.map((item) => {
        return { label: renderLabel(item, testimonial), value: item };
      });
      setSelected(newSelected);
    }
  }, [formik.values, keys, testimonial]);

  const onChange = (selectedOptions) => {
    setSelected(selectedOptions);
    const filterValue = selectedOptions?.map((item) => item.value);
    formik.handleChange({ target: { id: keys, value: filterValue } });
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const newValue = arrayMove(selected, oldIndex, newIndex);
    setSelected(newValue);
    const filterValue = newValue?.map((item) => item.value);
    formik.handleChange({ target: { id: keys, value: filterValue } });
  };

  return (
    <SortableSelect
      // react-sortable-hoc props:
      axis="xy"
      onSortEnd={onSortEnd}
      distance={4}
      // small fix for https://github.com/clauderic/react-sortable-hoc/pull/352:
      getHelperDimensions={({ node }) => node.getBoundingClientRect()}
      // react-select props:
      isMulti
      options={testimonial}
      value={selected}
      className="select-multile"
      onChange={onChange}
      components={{
        MultiValue: SortableMultiValue,
      }}
      closeMenuOnSelect={false}
    />
  );
}
