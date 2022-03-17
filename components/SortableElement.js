import { Icon } from "@shopify/polaris";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { optionSocial } from "../constants";

export default function SortableElements({
  value,
  indexs,
  handleDelete,
  handleChangeSocial,
  isDisableField,
}) {
  const [valueData, setValueData] = useState(value);
  const [dataBackUp, setDataBackUp] = useState("");

  const handleChangeSocials = (key, index) => (e) => {
    e.preventDefault();
    setValueData({ ...valueData, [key]: e.target.value });
    if (key === "social_name") {
      handleChangeSocial({ key, index, value: e.target.value });
    } else {
      setDataBackUp({ key, index, value: e.target.value });
    }
  };

  const handleOnMouseLeave = () => {
    if (dataBackUp) {
      const { key, index, value } = dataBackUp;
      handleChangeSocial({ key, index, value });
      setDataBackUp("");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        cursor: "move",
        alignItems: "center",
        marginTop: "10px",
      }}
    >
      <select
        disabled={isDisableField}
        className="select"
        style={{
          padding: "0.5rem 1.2rem",
          background: "none",
          border: "0.1rem solid #c9cccf",
          lineHeight: "2.4rem",
          borderRadius: "5px",
          height: "36px",
          width: "30%",
          fontSize: "1.4rem",
          marginRight: "10px",
        }}
        value={valueData.social_name}
        onChange={handleChangeSocials("social_name", indexs)}
      >
        {optionSocial.map((item, index) => (
          <option key={index} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      <input
        type="text"
        name="social_url"
        disabled={isDisableField}
        style={{
          padding: "0.5rem 1.2rem",
          background: "none",
          border: "0.1rem solid #c9cccf",
          lineHeight: "2.4rem",
          borderRadius: "5px",
          width: "30%",
          zIndex: 100,
          cursor: "text",
          fontSize: "1.4rem",
          marginRight: "4px",
        }}
        onMouseLeave={handleOnMouseLeave}
        value={`${valueData.social_url}`}
        onChange={handleChangeSocials("social_url", indexs)}
      />
      <button
        className="btn-icon-delete"
        style={{
          border: "none",
          background: "none",
          color: "red",
          fontSize: "1.5rem",
          cursor: "pointer",
          visibility: "visible !important",
        }}
        disabled={isDisableField}
        onClick={() => handleDelete(indexs)}
      >
        ✕
      </button>
    </div>
  );
}
