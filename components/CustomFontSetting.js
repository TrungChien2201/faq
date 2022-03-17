import { Select, TextField } from "@shopify/polaris";
import React, { useRef } from "react";
import { ChromePicker } from "react-color";
import { optionTextAlign, optionTextTransform } from "../constants";
import { useOnClickOutside } from "../constants/function";
const _ = require("lodash");

export default function CustomFontSetting({
  keys,
  data,
  font,
  handleChangeSettingFont,
  handleOpenColorPickerFont,
  styleFont,
  label,
  visible,
  dataBackUp,
  isMarginBottom = false,
  isMarginTop = false,
  isMarginLeft = false,
  isMarginRight = false,
  isDisableAll = false,
}) {
  const { fontStyle, fontSubset } = styleFont;

  const colorFont = useRef(null);
  const buttonColorFont = useRef(null);
  const hoverColor = useRef(null);
  const buttonHoverColor = useRef(null);

  const handleCloseColorPicker = (child) => {
    handleOpenColorPickerFont({ keys, child });
  };

  useOnClickOutside(
    colorFont,
    () => handleCloseColorPicker("fontColor"),
    buttonColorFont
  );
  useOnClickOutside(
    hoverColor,
    () => handleCloseColorPicker("hoverColor"),
    buttonHoverColor
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
        }}
      >
        <div
          style={{
            marginBottom: "10px",
          }}
        >
          <Select
            label="Font Family"
            options={font}
            value={data["font-family"]}
            onChange={handleChangeSettingFont({
              keys,
              keyChild: "font-family",
            })}
          />
        </div>
        <div
          style={{
            marginBottom: "10px",
          }}
        >
          <Select
            label="Font Style"
            options={fontStyle}
            value={data["font-weight"]}
            onChange={handleChangeSettingFont({
              keys,
              keyChild: "font-weight",
            })}
          />
        </div>
        {fontSubset && (
          <div
            style={{
              marginBottom: "10px",
            }}
          >
            <Select
              label="Font Subset"
              options={fontSubset}
              value={data["type"]}
              onChange={handleChangeSettingFont({
                keys,
                keyChild: "type",
              })}
            />
          </div>
        )}
        <div
          style={{
            marginBottom: "10px",
          }}
        >
          <Select
            label="Text Align"
            options={optionTextAlign}
            value={data["text-align"]}
            onChange={handleChangeSettingFont({
              keys,
              keyChild: "text-align",
            })}
          />
        </div>
        <div
          style={{
            marginBottom: "10px",
          }}
        >
          <Select
            label="Text Transform"
            options={optionTextTransform}
            value={data["text-transform"]}
            onChange={handleChangeSettingFont({
              keys,
              keyChild: "text-transform",
            })}
          />
        </div>
        <div style={{}}>
          <TextField
            label="Font Size"
            type="number"
            prefix="px"
            value={data["font-size"]}
            onChange={handleChangeSettingFont({
              keys,
              keyChild: "font-size",
            })}
          />
        </div>
        <div style={{}}>
          <TextField
            label="Line Height"
            type="number"
            prefix="px"
            value={data["line-height"]}
            onChange={handleChangeSettingFont({
              keys,
              keyChild: "line-height",
            })}
          />
        </div>
        <div style={{}}>
          <TextField
            label="Letter Spacing"
            type="number"
            prefix="px"
            value={data["letter-spacing"]}
            onChange={handleChangeSettingFont({
              keys,
              keyChild: "letter-spacing",
            })}
          />
        </div>
        {(data["margin-top"] || isMarginTop) && (
          <div style={{}}>
            <TextField
              label="Margin Top"
              type="number"
              prefix="px"
              value={data["margin-top"]}
              onChange={handleChangeSettingFont({
                keys,
                keyChild: "margin-top",
              })}
            />
          </div>
        )}
        {(data["margin-left"] || isMarginLeft) && (
          <div style={{}}>
            <TextField
              label="Margin Left"
              type="number"
              prefix="px"
              value={data["margin-left"]}
              onChange={handleChangeSettingFont({
                keys,
                keyChild: "margin-left",
              })}
            />
          </div>
        )}
        {(data["margin-right"] || isMarginRight) && (
          <div style={{}}>
            <TextField
              label="Margin Right"
              type="number"
              prefix="px"
              value={data["margin-right"]}
              onChange={handleChangeSettingFont({
                keys,
                keyChild: "margin-right",
              })}
            />
          </div>
        )}
        {(data["margin-bottom"] || isMarginBottom) && (
          <div style={{}}>
            <TextField
              label="Margin Bottom"
              type="number"
              prefix="px"
              value={data["margin-bottom"]}
              onChange={handleChangeSettingFont({
                keys,
                keyChild: "margin-bottom",
              })}
            />
          </div>
        )}
        {data["color"] && (
          <div style={{}}>
            <div style={{ marginBottom: "5px" }}>Font Color</div>
            <div
              style={{
                display: "flex",
                position: "relative",
              }}
            >
              <div
                ref={buttonColorFont}
                onClick={() =>
                  handleOpenColorPickerFont({ keys, child: "fontColor" })
                }
                style={{
                  marginRight: "5px",
                  width: 40,
                  height: 36,
                  cursor: "pointer",
                  backgroundColor:
                    ((dataBackUp["color"] || data["color"]) &&
                      dataBackUp["color"]) ||
                    data["color"],
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  opacity: isDisableAll ? "0.5" : "1",
                }}
              />
              <div style={{ width: "calc(100% - 40px)" }}>
                <TextField disabled value={dataBackUp["color"]} />
              </div>
              {visible?.fontColor?.visible && !isDisableAll && (
                <div
                  ref={colorFont}
                  style={{
                    position: "absolute",
                    zIndex: 100,
                    top: "38px",
                  }}
                >
                  <ChromePicker
                    onChangeComplete={handleChangeSettingFont({
                      keys,
                      keyChild: "color",
                    })}
                    color={dataBackUp["color"] || data["color"]}
                  />
                </div>
              )}
            </div>
          </div>
        )}
        {data["hover_color"] && (
          <div style={{}}>
            <div style={{ marginBottom: "5px" }}>Hover Color</div>
            <div
              style={{
                display: "flex",
                position: "relative",
              }}
            >
              <div
                ref={buttonHoverColor}
                onClick={() =>
                  handleOpenColorPickerFont({ keys, child: "hoverColor" })
                }
                style={{
                  marginRight: "5px",
                  width: 40,
                  height: 36,
                  cursor: "pointer",
                  backgroundColor:
                    ((dataBackUp["hover_color"] || data["hover_color"]) &&
                      dataBackUp["hover_color"]) ||
                    data["hover_color"],
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  opacity: isDisableAll ? "0.5" : "1",
                }}
              />
              <div style={{ width: "calc(100% - 40px)" }}>
                <TextField disabled value={dataBackUp["hover_color"]} />
              </div>
              {visible?.hoverColor?.visible && !isDisableAll && (
                <div
                  ref={hoverColor}
                  style={{
                    position: "absolute",
                    zIndex: 100,
                    top: "38px",
                  }}
                >
                  <ChromePicker
                    onChangeComplete={handleChangeSettingFont({
                      keys,
                      keyChild: "hover_color",
                    })}
                    color={dataBackUp["hover_color"] || data["hover_color"]}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
