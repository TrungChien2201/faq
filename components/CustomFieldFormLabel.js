import React from "react";

export default function CustomFieldFormLabel({
  label,
  helpText,
  children,
  fullWidth = false,
  isDisableField = false,
}) {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "25%", opacity: isDisableField ? "0.5" : "1" }}>
        <div style={{ fontWeight: 600, marginBottom: "0.4rem" }}>{label}</div>
        <div style={{ color: "#6d7175", fontWeight: "400" }}>{helpText}</div>
      </div>
      <div
        style={{
          marginTop: "-3px",
          minWidth: "30%",
          width: fullWidth ? "70%" : "30%",
          marginLeft: "30px",
        }}
      >
        {children}
      </div>
    </div>
  );
}
