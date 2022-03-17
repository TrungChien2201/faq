import { Icon, TextField } from "@shopify/polaris";
import {
  HiArrowNarrowUp,
  HiArrowNarrowRight,
  HiArrowNarrowDown,
  HiArrowNarrowLeft,
} from "react-icons/hi";

export default function CustomFieldPadding({
  values,
  handleChange,
  id,
  label,
}) {
  return (
    <div>
      <div>
        <div style={{ fontWeight: 400, marginBottom: "0.4rem" }}>{label}</div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          rowGap: "15px",
          marginTop: "10px",
        }}
      >
        <div>
          <TextField
            type="number"
            value={values["top"]}
            name={`${id}["top"]`}
            id={`${id}["top"]`}
            onChange={handleChange}
            prefix={
              <div style={{ marginTop: "3px" }}>
                <Icon source={HiArrowNarrowUp} />
              </div>
            }
          />
        </div>
        <div>
          <TextField
            type="number"
            value={values["right"]}
            name={`${id}["right"]`}
            id={`${id}["right"]`}
            onChange={handleChange}
            prefix={
              <div style={{ marginTop: "3px" }}>
                <Icon source={HiArrowNarrowRight} />
              </div>
            }
          />
        </div>
        <div>
          <TextField
            type="number"
            value={values["bottom"]}
            name={`${id}["bottom"]`}
            id={`${id}["bottom"]`}
            onChange={handleChange}
            prefix={
              <div style={{ marginTop: "3px" }}>
                <Icon source={HiArrowNarrowDown} />
              </div>
            }
          />
        </div>
        <div>
          <TextField
            type="number"
            value={values["left"]}
            name={`${id}["left"]`}
            id={`${id}["left"]`}
            onChange={handleChange}
            prefix={
              <div style={{ marginTop: "3px" }}>
                <Icon source={HiArrowNarrowLeft} />
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
}
