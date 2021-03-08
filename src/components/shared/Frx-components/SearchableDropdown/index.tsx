import React, { useState } from "react";
import "./SearchableDropdown.scss";
import { Select } from "antd";

const { Option } = Select;

export default function SearchableDropdown(props: any) {
  const [DropdownCaret, setDropdownCaret] = useState(false);
  const onCaretChange = () => {
    setDropdownCaret(!DropdownCaret);
  };

  return (
    <div className='select-box searchable-dropdown-container'>
      <span className='search-icon'>
        <svg
          width='14'
          height='13'
          viewBox='0 0 14 13'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M13.8096 11.2393L11.0832 8.70813C10.9602 8.59389 10.7934 8.53042 10.6184 8.53042H10.1726C10.9274 7.63422 11.3758 6.50698 11.3758 5.28073C11.3758 2.36364 8.82994 0 5.68792 0C2.54589 0 0 2.36364 0 5.28073C0 8.19783 2.54589 10.5615 5.68792 10.5615C7.00872 10.5615 8.22287 10.1451 9.18817 9.44439V9.85822C9.18817 10.0207 9.25654 10.1756 9.37959 10.2898L12.106 12.821C12.363 13.0597 12.7787 13.0597 13.033 12.821L13.8069 12.1025C14.0639 11.8639 14.0639 11.478 13.8096 11.2393ZM5.68792 8.53042C3.75457 8.53042 2.18766 7.07822 2.18766 5.28073C2.18766 3.48579 3.75184 2.03105 5.68792 2.03105C7.62126 2.03105 9.18817 3.48325 9.18817 5.28073C9.18817 7.07568 7.624 8.53042 5.68792 8.53042Z'
            fill='#C4C4C4'
          />
        </svg>
      </span>

      <Select
        onFocus={onCaretChange}
        onBlur={onCaretChange}
        showArrow
        showSearch
        suffixIcon={
          <>
            <svg
              style={{ display: DropdownCaret ? "none" : "block" }}
              width='6'
              height='3'
              viewBox='0 0 6 3'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M5.79875 0H0.20125C0.0333594 0 -0.0603867 0.147179 0.0435863 0.247656L2.84234 2.94215C2.92245 3.01928 3.0767 3.01928 3.15766 2.94215L5.95641 0.247656C6.06039 0.147179 5.96664 0 5.79875 0Z'
                fill='#999999'
              />
            </svg>
            <svg
              style={{ display: DropdownCaret ? "block" : "none" }}
              width='6'
              height='3'
              viewBox='0 0 6 3'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M5.79875 3H0.20125C0.0333594 3 -0.0603867 2.85282 0.0435863 2.75234L2.84234 0.0578451C2.92245 -0.0192819 3.0767 -0.0192819 3.15766 0.0578451L5.95641 2.75234C6.06039 2.85282 5.96664 3 5.79875 3Z'
                fill='#999999'
              />
            </svg>
          </>
        }
        id=''
        className={`searchable-dropdown ${props.className}`}
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
        {props.options.map((opt, ind) => (
          <Option key={ind} value={opt}>
            {opt}
          </Option>
        ))}
      </Select>
    </div>
  );
}
