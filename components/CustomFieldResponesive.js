import { Icon, TextField } from "@shopify/polaris";
import { FaLaptop } from "react-icons/fa";

export default function CustomFieldResponsive({
  label,
  id,
  values,
  handleChange,
}) {
  return (
    <div>
      <div>
        <div style={{ fontWeight: 400, marginBottom: "0.4rem" }}>{label}</div>
      </div>
      <div>
        <div>
          <TextField
            id={id}
            name={id}
            type="number"
            value={values}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}
