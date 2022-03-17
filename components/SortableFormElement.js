import { Collapsible, Icon } from "@shopify/polaris";
import { useCallback, useEffect, useRef, useState } from "react";
import { AiFillCaretDown, AiFillCaretRight } from "react-icons/ai";
import { BiCaretDown, BiExpand } from "react-icons/bi";
import {
  DEPEN_FORM_ELEMENT_PLACEHOLDER,
  DEPEN_FORM_ELEMENT_REQUIRED,
  optionChooseElementForm,
  optionSocial,
  optionSocialProfile,
} from "../constants";
import SelectMutileValueSortElement from "./SelectMutileValueSortElement";
function useOutsideAlerter(ref, cb) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        cb();
      }
    }

    // Bind the event listener
    document.addEventListener("click", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref, cb]);
}
export default function SortableFormElement({
  formik,
  value,
  indexs,
  setVisibleFormElement,
  visibleFormElement,
  isOpen,
  setIsOpen,
  isDisableField,
}) {
  const refSelectMultile = useRef(null);
  useOutsideAlerter(refSelectMultile, () => setIsOpen(false));
  const [keysInput, setKeysInput] = useState("");
  const [valueElement, setValueElement] = useState({
    label: formik?.values[value]?.label,
    placeholder: formik?.values[value]?.placeholder,
  });

  const renderLabel = (keys) => {
    if (keys === "submit_btn") {
      return "Submit Button";
    }
    const label = optionChooseElementForm.filter((item) => item.value === keys);
    return label[0]?.label;
  };

  const handleChangeValue = (keys) => (e) => {
    e.preventDefault();
    if (keys === "required") {
      formik.handleChange({
        target: {
          id: `${value}["required"]`,
          value: !formik.values[value]?.required,
        },
      });
    } else {
      setKeysInput({ keys, value: e.target.value });
      setValueElement({ ...valueElement, [keys]: e.target.value });
    }
  };

  const handleOnMouseLeave = () => {
    if (keysInput) {
      formik.handleChange({
        target: {
          id: `${value}[${keysInput["keys"]}]`,
          value: valueElement[keysInput.keys],
        },
      });
    }
  };

  const handleOpen = useCallback(() => {
    !isDisableField &&
      setVisibleFormElement({
        ...visibleFormElement,
        [value]: !visibleFormElement[value],
      });
  }, [visibleFormElement]);

  const handleOpenSelectMultile = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      style={{
        cursor: "move",
        marginTop: "10px",
        visibility: "visible",
      }}
    >
      <div
        style={{
          border: "1px solid #ddd",
          width: "100%",
          background: "#fff",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTopLeftRadius: "0.4rem",
          borderTopRightRadius: "0.4rem",
          borderBottomLeftRadius: visibleFormElement[value] ? "0" : "0.4rem",
          borderBottomRightRadius: visibleFormElement[value] ? "0" : "0.4rem",
        }}
      >
        <button
          style={{
            border: "none",
            display: "flex",
            alignItems: "center",
            padding: "1.6rem",
            width: "100%",
            height: "100%",
            background: "#fff",
            cursor: "pointer",
            borderTopLeftRadius: "0.4rem",
            opacity: isDisableField ? "0.5" : "1",
            borderBottomLeftRadius: visibleFormElement[value] ? "0" : "0.4rem",
          }}
          onClick={handleOpen}
        >
          <span
            style={{ marginRight: "3px", height: "1.5rem", width: "1.5rem" }}
          >
            <Icon
              source={
                visibleFormElement[value] ? AiFillCaretDown : AiFillCaretRight
              }
            />
          </span>
          {renderLabel(value)}
        </button>
        <button
          disabled={isDisableField}
          style={{
            border: "none",
            display: "flex",
            alignItems: "center",
            background: "#fff",
            cursor: "pointer",
            padding: "0 1rem",
          }}
        >
          <Icon source={BiExpand} />
        </button>
      </div>
      <Collapsible
        open={visibleFormElement[value]}
        id={`basic-collapsible-${indexs}`}
        transition={{ duration: "500ms", timingFunction: "ease-in-out" }}
        expandOnPrint
      >
        <div
          style={{
            border: "1px solid #ddd",
            padding: "1.6rem",
            borderTop: "none",
            borderBottomLeftRadius: visibleFormElement[value] ? "0.4rem" : "0",
            borderBottomRightRadius: visibleFormElement[value] ? "0.4rem" : "0",
          }}
        >
          <div className="form-element">
            <h4>Label</h4>
            <div>
              <input
                type="text"
                name="social_url"
                onMouseLeave={handleOnMouseLeave}
                value={valueElement.label}
                onChange={handleChangeValue("label")}
              />
              <div className="form-input-description">
                To hide this label, leave it empty.
              </div>
            </div>
          </div>
          {!DEPEN_FORM_ELEMENT_PLACEHOLDER.includes(value) && (
            <div className="form-element mt-3">
              <h4>Placeholder</h4>
              <div>
                <input
                  type="text"
                  name="social_url"
                  onMouseLeave={handleOnMouseLeave}
                  value={valueElement.placeholder}
                  onChange={handleChangeValue("placeholder")}
                />
              </div>
            </div>
          )}
          {!DEPEN_FORM_ELEMENT_REQUIRED.includes(value) && (
            <div className="form-element mt-3">
              <h4>Required</h4>
              <div style={{ width: "20px", marginLeft: "0px" }}>
                <input
                  type="checkbox"
                  name="social_url"
                  style={{ margin: 0 }}
                  // onMouseLeave={handleOnMouseLeave}
                  checked={formik?.values[value]?.required}
                  onChange={handleChangeValue("required")}
                />
              </div>
            </div>
          )}
          {value === "social_profile" && (
            <div className="form-element mt-3">
              <h4>Select Social Profile(s)</h4>
              <div ref={refSelectMultile} onClick={handleOpenSelectMultile}>
                <SelectMutileValueSortElement
                  isOpen={isOpen}
                  formik={formik}
                  keys="social_profile"
                  keyChild="social_profile_list"
                  data={optionSocialProfile}
                />
                <div className="form-input-description">
                  Select social profile for the frontend form. Leave blank for
                  the all socials.
                </div>
              </div>
            </div>
          )}
        </div>
      </Collapsible>
    </div>
  );
}
