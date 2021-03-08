import React, {useState} from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import {DatePicker} from "antd";
import moment from "moment";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import "./CustomDatePicker.scss";

const dateFormat = "MM/DD/YYYY";

export default function CustomDatePicker(props: any) {
  const [isOpen, setIsOpen] = useState(true);
  const {
    selected,
    onchange,
    placeholder,
    name,
    className,
    startDate,
    onOk,
    dropdownClassName,
    style,
  } = props;

  const closeDatepicker = () => {
    setIsOpen(!isOpen);
  };
  return (
    // <div className="customDatePickerWidth">
    //   <div className="DatePicker">
    //     <svg
    //       width="18"
    //       height="20"
    //       viewBox="0 0 18 20"
    //       fill="none"
    //       xmlns="http://www.w3.org/2000/svg"
    //       className="ant-picker-suffix"
    //     >
    //       <path
    //         fill-rule="evenodd"
    //         clip-rule="evenodd"
    //         d="M16 20H2C0.897 20 0 19.103 0 18V4C0 2.897 0.897 2 2 2H4V0H6V2H12V0H14V2H16C17.103 2 18 2.897 18 4V18C18 19.103 17.103 20 16 20ZM16.001 18L16 6H2V18H16.001ZM6 9H4V11H6V9ZM6 13H4V15H6V13ZM10 9H8V11H10V9ZM10 13H8V15H10V13ZM14 9H12V11H14V9ZM14 13H12V15H14V13Z"
    //         fill="#C4C4C4"
    //       />
    //     </svg>
    //   </div>
    <>
      <DatePicker
        style={style ? style : {}}
        onChange={onchange}
        name={name}
        // getPopupContainer={(trigger: any) => trigger.parentNode}
        onFocus={() => {
          setIsOpen(true);
        }}
        className={className}
        value={startDate}
        format={dateFormat}
        onOk={onOk}
        dropdownClassName={dropdownClassName}
        // panelRender={(panelNode) => {
        //   return (
        //     <>
        //       {isOpen ? (
        //         <div>
        //           <span className="frx-date-picker__panel">
        //             Pick a date
        //             <svg
        //               className="frx-date-picker__panel-close-icon"
        //               onClick={closeDatepicker}
        //               width="10"
        //               height="10"
        //               viewBox="0 0 10 10"
        //               fill="none"
        //               xmlns="http://www.w3.org/2000/svg"
        //             >
        //               <path
        //                 d="M5.81641 4.97248L9.86641 0.922476C9.95743 0.816197 10.005 0.679488 9.99959 0.539668C9.99419 0.399848 9.93622 0.267216 9.83728 0.168274C9.73834 0.0693328 9.60571 0.0113701 9.46589 0.00596948C9.32607 0.000568837 9.18936 0.048128 9.08308 0.139143L5.03308 4.18914L0.98308 0.133587C0.876801 0.0425723 0.740093 -0.00498632 0.600273 0.000414325C0.460452 0.00581497 0.32782 0.0637772 0.228878 0.162719C0.129937 0.26166 0.0719742 0.394293 0.0665736 0.534113C0.0611729 0.673933 0.108732 0.810642 0.199747 0.91692L4.24975 4.97248L0.194191 9.02248C0.136035 9.07228 0.088801 9.13357 0.0554548 9.20249C0.0221085 9.27142 0.00336926 9.34649 0.000413989 9.423C-0.00254129 9.49951 0.0103509 9.57581 0.0382812 9.6471C0.0662115 9.71839 0.108577 9.78314 0.162719 9.83728C0.21686 9.89142 0.281609 9.93379 0.352901 9.96172C0.424192 9.98965 0.500488 10.0025 0.576999 9.99959C0.653509 9.99663 0.728583 9.97789 0.797508 9.94455C0.866433 9.9112 0.92772 9.86397 0.977524 9.80581L5.03308 5.75581L9.08308 9.80581C9.18936 9.89682 9.32607 9.94438 9.46589 9.93898C9.60571 9.93358 9.73834 9.87562 9.83728 9.77668C9.93622 9.67774 9.99419 9.5451 9.99959 9.40528C10.005 9.26546 9.95743 9.12876 9.86641 9.02248L5.81641 4.97248Z"
        //                 fill="#666666"
        //               />
        //             </svg>
        //           </span>
        //           {panelNode}
        //         </div>
        //       ) : (
        //         ""
        //       )}
        //     </>
        //   );
        // }}
        placeholder={placeholder}
        suffixIcon={
          <svg
            width="15"
            height="15"
            viewBox="0 0 18 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="ant-picker-suffix"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M16 20H2C0.897 20 0 19.103 0 18V4C0 2.897 0.897 2 2 2H4V0H6V2H12V0H14V2H16C17.103 2 18 2.897 18 4V18C18 19.103 17.103 20 16 20ZM16.001 18L16 6H2V18H16.001ZM6 9H4V11H6V9ZM6 13H4V15H6V13ZM10 9H8V11H10V9ZM10 13H8V15H10V13ZM14 9H12V11H14V9ZM14 13H12V15H14V13Z"
              fill="#C4C4C4"
            />
          </svg>
        }
      />
    </>
  );
}
