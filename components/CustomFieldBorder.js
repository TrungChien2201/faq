import { Icon, Select, TextField } from "@shopify/polaris";
import { useRef } from "react";
import { ChromePicker } from "react-color";
import { RiDragMove2Fill } from "react-icons/ri";
import { optionAddToCartBorderStyle } from "../constants";
import { useOnClickOutside } from "../constants/function";

const CustomFieldBorder = (props) => {
  const {
    isActiveBackground = false,
    isActiveColor = false,
    isSpaceBetween = true,
    handleOpenSetColor,
    label,
    isHoverColor = false,
    value,
    id,
    handleChange,
    handleChangeColorAddToCart,
    dataBackups,
    colorPagination,
    isBorderStyle = true,
    isBackGroundColor = false,
  } = props;

  const colorPicker = useRef(null);
  const buttonColor = useRef(null);
  const hoverColor = useRef(null);
  const buttonHoverColor = useRef(null);
  const backgroundColor = useRef(null);
  const buttonBackgroundColor = useRef(null);
  const hoverBackgroundColor = useRef(null);
  const buttonHoverBackgroundColor = useRef(null);
  const activeBackgroundColor = useRef(null);
  const buttonActiveBackgroundColor = useRef(null);

  const handleCloseColorPicker = (key) => {
    handleOpenSetColor(id, key);
  };

  useOnClickOutside(
    colorPicker,
    () => handleCloseColorPicker("color"),
    buttonColor
  );
  useOnClickOutside(
    hoverColor,
    () => handleCloseColorPicker("hover_color"),
    buttonHoverColor
  );
  useOnClickOutside(
    hoverBackgroundColor,
    () => handleCloseColorPicker("hover_background"),
    buttonHoverBackgroundColor
  );
  useOnClickOutside(
    activeBackgroundColor,
    () => handleCloseColorPicker("active_background"),
    buttonActiveBackgroundColor
  );
  useOnClickOutside(
    backgroundColor,
    () => handleCloseColorPicker("background"),
    buttonBackgroundColor
  );

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
          marginTop: "0px",
        }}
      >
        {isBorderStyle && (
          <div>
            <div>
              <TextField
                id={`${id}['all']`}
                type="number"
                name={`${id}['all']`}
                prefix={
                  <div style={{ marginTop: "6px" }}>
                    <Icon source={RiDragMove2Fill} color="base" />
                  </div>
                }
                value={value["all"]}
                onChange={handleChange}
              />
            </div>
          </div>
        )}
        {isBorderStyle && (
          <div>
            <Select
              id={`${id}['style']`}
              name={`${id}['style']`}
              options={optionAddToCartBorderStyle}
              value={value["style"]}
              onChange={handleChange}
            />
          </div>
        )}
        <div>
          <div
            style={{
              marginBottom: "5px",
            }}
          >
            Color
          </div>
          <div
            style={{
              display: "flex",
              position: "relative",
            }}
          >
            <div
              ref={buttonColor}
              onClick={() => handleOpenSetColor(id, "color")}
              style={{
                marginRight: "5px",
                width: 36,
                height: 36,
                borderRadius: "5px",
                border: "1px solid #ccc",
                cursor: "pointer",
                backgroundColor: dataBackups["color"] || value["color"],
              }}
            />
            <div style={{ width: "calc(100% - 40px)" }}>
              <TextField
                disabled
                value={dataBackups["color"] || value["color"]}
              />
            </div>
            {colorPagination[id]["color"]?.visible && (
              <div
                ref={colorPicker}
                style={{
                  position: "absolute",
                  zIndex: 100,
                  top: "38px",
                }}
              >
                <ChromePicker
                  onChangeComplete={handleChangeColorAddToCart(id, "color")}
                  color={dataBackups["color"] || value["color"]}
                />
              </div>
            )}
          </div>
        </div>
        {isHoverColor && (
          <div>
            <div
              style={{
                marginBottom: "5px",
              }}
            >
              Hover Color
            </div>
            <div
              style={{
                display: "flex",
                position: "relative",
              }}
            >
              <div
                ref={buttonHoverColor}
                onClick={() => handleOpenSetColor(id, "hover_color")}
                style={{
                  marginRight: "5px",
                  width: 36,
                  height: 36,
                  borderRadius: "5px",
                  cursor: "pointer",
                  border: "1px solid #ccc",
                  backgroundColor:
                    dataBackups["hover_color"]?.length === 7
                      ? dataBackups["hover_color"]
                      : value["hover_color"],
                }}
              />
              <div style={{ width: "calc(100% - 40px)" }}>
                <TextField
                  disabled
                  value={dataBackups["hover_color"] || value["hover_color"]}
                />
              </div>
              {colorPagination[id]["hover_color"]?.visible && (
                <div
                  ref={hoverColor}
                  style={{
                    position: "absolute",
                    zIndex: 100,
                    top: "38px",
                  }}
                >
                  <ChromePicker
                    onChangeComplete={handleChangeColorAddToCart(
                      id,
                      "hover_color"
                    )}
                    color={dataBackups["hover_color"] || value["hover_color"]}
                  />
                </div>
              )}
            </div>
          </div>
        )}
        {isBackGroundColor && (
          <div>
            <div
              style={{
                marginBottom: "5px",
              }}
            >
              Background
            </div>
            <div
              style={{
                display: "flex",
                position: "relative",
              }}
            >
              <div
                ref={buttonBackgroundColor}
                onClick={() => handleOpenSetColor(id, "background")}
                style={{
                  marginRight: "5px",
                  width: 36,
                  height: 36,
                  borderRadius: "5px",
                  cursor: "pointer",
                  border: "1px solid #ccc",
                  backgroundColor:
                    dataBackups["background"]?.length === 7
                      ? dataBackups["background"]
                      : value["background"],
                }}
              />
              <div style={{ width: "calc(100% - 40px)" }}>
                <TextField
                  disabled
                  value={dataBackups["background"] || value["background"]}
                />
              </div>
              {colorPagination[id]["background"]?.visible && (
                <div
                  ref={backgroundColor}
                  style={{
                    position: "absolute",
                    zIndex: 100,
                    top: "38px",
                  }}
                >
                  <ChromePicker
                    onChangeComplete={handleChangeColorAddToCart(
                      id,
                      "background"
                    )}
                    color={dataBackups["background"] || value["background"]}
                  />
                </div>
              )}
            </div>
          </div>
        )}
        {isBackGroundColor && !isActiveBackground && (
          <div>
            <div
              style={{
                marginBottom: "5px",
              }}
            >
              Hover Background
            </div>
            <div
              style={{
                display: "flex",
                position: "relative",
              }}
            >
              <div
                ref={buttonHoverBackgroundColor}
                onClick={() => handleOpenSetColor(id, "hover_background")}
                style={{
                  marginRight: "5px",
                  width: 36,
                  height: 36,
                  borderRadius: "5px",
                  cursor: "pointer",
                  border: "1px solid #ccc",
                  backgroundColor:
                    dataBackups["hover_background"]?.length === 7
                      ? dataBackups["hover_background"]
                      : value["hover_background"],
                }}
              />
              <div style={{ width: "calc(100% - 40px)" }}>
                <TextField
                  disabled
                  value={
                    dataBackups["hover_background"] || value["hover_background"]
                  }
                />
              </div>
              {colorPagination[id]["hover_background"]?.visible && (
                <div
                  ref={hoverBackgroundColor}
                  style={{
                    position: "absolute",
                    zIndex: 100,
                    top: "38px",
                  }}
                >
                  <ChromePicker
                    onChangeComplete={handleChangeColorAddToCart(
                      id,
                      "hover_background"
                    )}
                    color={
                      dataBackups["hover_background"] ||
                      value["hover_background"]
                    }
                  />
                </div>
              )}
            </div>
          </div>
        )}
        {(isActiveBackground || isActiveColor) && (
          <div>
            <div
              style={{
                marginBottom: "5px",
              }}
            >
              {isActiveBackground ? "Active Background" : "Active Color"}
            </div>
            <div
              style={{
                display: "flex",
                position: "relative",
              }}
            >
              <div
                ref={buttonActiveBackgroundColor}
                onClick={() => handleOpenSetColor(id, "active_background")}
                style={{
                  marginRight: "5px",
                  width: 36,
                  height: 36,
                  borderRadius: "5px",
                  cursor: "pointer",
                  border: "1px solid #ccc",
                  backgroundColor:
                    dataBackups["active_background"]?.length === 7
                      ? dataBackups["active_background"]
                      : value["active_background"],
                }}
              />
              <div style={{ width: "calc(100% - 40px)" }}>
                <TextField
                  disabled
                  value={
                    dataBackups["active_background"] ||
                    value["active_background"]
                  }
                />
              </div>
              {colorPagination[id]["active_background"]?.visible && (
                <div
                  ref={activeBackgroundColor}
                  style={{
                    position: "absolute",
                    zIndex: 100,
                    top: "38px",
                  }}
                >
                  <ChromePicker
                    onChangeComplete={handleChangeColorAddToCart(
                      id,
                      "active_background"
                    )}
                    color={
                      dataBackups["active_background"] ||
                      value["active_background"]
                    }
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomFieldBorder;
