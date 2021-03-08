import React, { Component } from "react";
import { Tooltip, Input } from "antd";
import "./styles.scss";

const CloseIcon = (props) => {
  return (
    <span {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
      >
        <path
          d="M5.81641 4.97248L9.86641 0.922476C9.95743 0.816197 10.005 0.679488 9.99959 0.539668C9.99418 0.399848 9.93622 0.267216 9.83728 0.168274C9.73834 0.0693328 9.60571 0.0113701 9.46589 0.00596948C9.32607 0.000568837 9.18936 0.048128 9.08308 0.139143L5.03308 4.18914L0.98308 0.133587C0.876801 0.0425723 0.740093 -0.00498632 0.600272 0.000414325C0.460452 0.00581497 0.32782 0.0637771 0.228878 0.162719C0.129937 0.26166 0.0719742 0.394293 0.0665736 0.534113C0.0611729 0.673933 0.108732 0.810642 0.199747 0.91692L4.24975 4.97248L0.194191 9.02248C0.136035 9.07228 0.088801 9.13357 0.0554548 9.20249C0.0221085 9.27142 0.00336926 9.34649 0.000413989 9.423C-0.00254129 9.49951 0.0103509 9.57581 0.0382812 9.6471C0.0662115 9.71839 0.108577 9.78314 0.162719 9.83728C0.21686 9.89142 0.281609 9.93379 0.3529 9.96172C0.424192 9.98965 0.500488 10.0025 0.576999 9.99959C0.653509 9.99663 0.728583 9.97789 0.797508 9.94455C0.866433 9.9112 0.92772 9.86397 0.977524 9.80581L5.03308 5.75581L9.08308 9.80581C9.18936 9.89682 9.32607 9.94438 9.46589 9.93898C9.60571 9.93358 9.73834 9.87562 9.83728 9.77668C9.93622 9.67774 9.99418 9.5451 9.99959 9.40528C10.005 9.26546 9.95743 9.12876 9.86641 9.02248L5.81641 4.97248Z"
          fill="#666666"
        />
      </svg>
    </span>
  );
};

const EditIcon = (props) => {
  return (
    <span {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="17"
        height="16"
        viewBox="0 0 17 16"
        fill="none"
      >
        <path
          d="M11.6493 2.45208L14.2593 5.11367C14.3692 5.2258 14.3692 5.40875 14.2593 5.52087L7.93981 11.9653L5.25463 12.2693C4.89583 12.3106 4.59201 12.0007 4.63252 11.6349L4.93056 8.89655L11.25 2.45208C11.36 2.33995 11.5394 2.33995 11.6493 2.45208ZM16.3368 1.77636L14.9248 0.336387C14.485 -0.112129 13.7703 -0.112129 13.3275 0.336387L12.3032 1.38096C12.1933 1.49309 12.1933 1.67603 12.3032 1.78816L14.9132 4.44975C15.0231 4.56188 15.2025 4.56188 15.3125 4.44975L16.3368 3.40518C16.7766 2.95371 16.7766 2.22487 16.3368 1.77636ZM11.1111 10.2126V13.2165H1.85185V3.77402H8.50116C8.59375 3.77402 8.68056 3.73566 8.74711 3.67075L9.90451 2.49044C10.1244 2.26619 9.96817 1.88554 9.65856 1.88554H1.38889C0.622106 1.88554 0 2.51995 0 3.3019V13.6886C0 14.4705 0.622106 15.1049 1.38889 15.1049H11.5741C12.3409 15.1049 12.963 14.4705 12.963 13.6886V9.03228C12.963 8.71655 12.5897 8.56016 12.3698 8.78147L11.2124 9.96177C11.1487 10.0296 11.1111 10.1182 11.1111 10.2126Z"
          fill="#1D54B4"
        />
      </svg>
    </span>
  );
};
export interface TagTooltipProps {}

export interface TagTooltipState {}

class OutsideVendorTooltipForm extends React.Component<any, TagTooltipState> {
  handleEditClick = () => {
    const { id, onEditClick } = this.props;
    
    if(typeof(onEditClick) === 'function') {
      onEditClick(id);
    }
  }
  renderToolTipContent = () => {
    return (
      <div className="tooltip-form-content">
        <div className="tooltip-form-content__header">
          <div className="title-container">
            <div className="title">+ Add Outside Vendor</div>
          </div>

          <div className="close-icon-container">
            <CloseIcon className="close-icon" />
          </div>
        </div>
        <div className="tooltip-form-content__body">
        
        <div className="outside-vendor-form-container"> 
          <div className="form-field">
            <div className="form-field__label">Name:</div>
            <Input className="form-field__input" type="text"></Input>
          </div>
          
          <div className="form-field">
            <div className="form-field__label">Domain:</div>
            <Input className="form-field__input" type="text"></Input>
          </div>
          
          <div className="form-action">
            <div className="form-action__button">Save</div>
          </div>
        </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div id="outside-vendor-form">        
        <Tooltip
          overlayClassName="outside-vendor-form"
          overlayStyle={{ width: "192px", zIndex: 9999 }}
          title={this.renderToolTipContent}
          color="#fff"
          placement="right"
          trigger="click"
        >
          {this.props.children}
        </Tooltip>
      </div>
    );
  }
}

export default OutsideVendorTooltipForm;
