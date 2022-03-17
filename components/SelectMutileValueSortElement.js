import React, { useEffect } from "react";
import { GiConsoleController } from "react-icons/gi";

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

export default function SelectMutileValueSortElement({
  formik,
  data,
  keys,
  isOpen,
  keyChild,
}) {
  const [selected, setSelected] = React.useState([]);

  const renderLabel = (id) => {
    const result = data.filter((item) => item.value === id);
    return result[0]?.label;
  };

  useEffect(() => {
    if (formik.values[keys][keyChild]?.length > 0) {
      const newSelected = formik.values[keys][keyChild]?.map((item) => {
        return { label: renderLabel(item), value: item };
      });
      setSelected(newSelected);
    }
  }, []);

  const onChange = (selectedOptions) => {
    setSelected(selectedOptions);
    const filterValue = selectedOptions?.map((item) => item.value);
    formik.handleChange({
      target: { id: `${keys}[${keyChild}]`, value: filterValue },
    });
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const newValue = arrayMove(selected, oldIndex, newIndex);
    setSelected(newValue);
    const filterValue = newValue?.map((item) => item.value);
    formik.handleChange({
      target: { id: `${keys}[${keyChild}]`, value: filterValue },
    });
  };

  return (
    <SortableSelect
      axis="xy"
      onSortEnd={onSortEnd}
      distance={4}
      getHelperDimensions={({ node }) => node.getBoundingClientRect()}
      isMulti
      menuIsOpen={isOpen}
      options={data}
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
