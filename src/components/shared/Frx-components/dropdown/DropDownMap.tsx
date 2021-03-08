import React, { useState } from "react";
import "./DropDown.scss";
import { Select } from "antd";

const { Option } = Select;

export default function DropDown(props: any) {
  const [DropdownCaret, setDropdownCaret] = useState(false);
  const onCaretChange = () => {
    setDropdownCaret(!DropdownCaret);
  };

  return (
    <div className="select-box">
      <Select
        onFocus={onCaretChange}
        onBlur={onCaretChange}
        suffixIcon={
          <>
            <svg
              style={{ display: DropdownCaret ? "none" : "block" }}
              width="6"
              height="3"
              viewBox="0 0 6 3"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.79875 0H0.20125C0.0333594 0 -0.0603867 0.147179 0.0435863 0.247656L2.84234 2.94215C2.92245 3.01928 3.0767 3.01928 3.15766 2.94215L5.95641 0.247656C6.06039 0.147179 5.96664 0 5.79875 0Z"
                fill="#999999"
              />
            </svg>
            <svg
              style={{ display: DropdownCaret ? "block" : "none" }}
              width="6"
              height="3"
              viewBox="0 0 6 3"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.79875 3H0.20125C0.0333594 3 -0.0603867 2.85282 0.0435863 2.75234L2.84234 0.0578451C2.92245 -0.0192819 3.0767 -0.0192819 3.15766 0.0578451L5.95641 2.75234C6.06039 2.85282 5.96664 3 5.79875 3Z"
                fill="#999999"
              />
            </svg>
          </>
        }
        id=""
        disabled={props.disabled}
        className={props.className}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        dropdownClassName={props.dropdownClassName}
        dropdownStyle={props.dropdownStyle}
        defaultValue={props.defaultValue}
        onSelect={props.onSelect}
        dropdownAlign={{
          offset: [0, 0],
          overflow: {
            adjustY: 0,
          },
        }}
      >
        {/* <option>{props.option || "select"}</option> */}
        {props.options.map((opt, ind) => (
          <Option key={ind} value={opt[props.valueProp]}>
            {opt[props.dispProp]}
          </Option>
        ))}
      </Select>
    </div>
  );
}
