import React, { Component } from "react";

import "./styles.scss";

const EyeIcon = (props) => (
  <span {...props}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="12"
      viewBox="0 0 16 12"
      fill="none"
    >
      <path
        d="M15.6548 5.60078C14.172 2.70754 11.2364 0.75 7.87498 0.75C4.51362 0.75 1.57717 2.70891 0.0951413 5.60105C0.0325903 5.72479 0 5.86149 0 6.00014C0 6.13878 0.0325903 6.27549 0.0951413 6.39922C1.57799 9.29246 4.51362 11.25 7.87498 11.25C11.2364 11.25 14.1728 9.29109 15.6548 6.39895C15.7174 6.27521 15.75 6.13851 15.75 5.99986C15.75 5.86122 15.7174 5.72451 15.6548 5.60078ZM7.87498 9.9375C7.09622 9.9375 6.33495 9.70657 5.68743 9.27391C5.03991 8.84125 4.53523 8.2263 4.23721 7.50682C3.93919 6.78733 3.86121 5.99563 4.01314 5.23183C4.16507 4.46803 4.54008 3.76644 5.09075 3.21577C5.64142 2.6651 6.34302 2.29009 7.10682 2.13816C7.87062 1.98623 8.66232 2.0642 9.3818 2.36222C10.1013 2.66024 10.7162 3.16492 11.1489 3.81244C11.5816 4.45996 11.8125 5.22124 11.8125 6C11.8127 6.51715 11.7111 7.02928 11.5133 7.50711C11.3155 7.98495 11.0255 8.41911 10.6598 8.78479C10.2941 9.15047 9.85993 9.4405 9.3821 9.63829C8.90427 9.83608 8.39213 9.93775 7.87498 9.9375ZM7.87498 3.375C7.64068 3.37827 7.4079 3.41313 7.18291 3.47863C7.36836 3.73065 7.45736 4.04079 7.43376 4.3528C7.41015 4.66481 7.27551 4.95802 7.05426 5.17928C6.83301 5.40053 6.53979 5.53517 6.22778 5.55877C5.91577 5.58237 5.60564 5.49338 5.35362 5.30793C5.21011 5.83665 5.23601 6.39705 5.42769 6.91027C5.61936 7.42349 5.96715 7.86369 6.4221 8.16889C6.87706 8.4741 7.41627 8.62895 7.96384 8.61166C8.51141 8.59436 9.03978 8.40578 9.47456 8.07247C9.90934 7.73915 10.2287 7.27789 10.3876 6.75359C10.5465 6.22929 10.5369 5.66837 10.3603 5.14977C10.1837 4.63116 9.84897 4.18099 9.40313 3.86262C8.95728 3.54425 8.42283 3.37371 7.87498 3.375Z"
        fill="#707683"
      />
    </svg>
  </span>
);

const AddIcon = (props) => (
  <span {...props}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="16"
      viewBox="0 0 15 16"
      fill="none"
    >
      <path
        d="M2.75 3C-0.0069714 5.75697 -0.0069714 10.243 2.75 13C5.50697 15.757 9.99303 15.757 12.75 13C15.507 10.243 15.507 5.75697 12.75 3C9.99303 0.243029 5.50697 0.243029 2.75 3ZM10.8269 7.45625C10.8995 7.45439 10.9717 7.46708 11.0393 7.49357C11.1069 7.52006 11.1685 7.55982 11.2205 7.61049C11.2725 7.66117 11.3138 7.72174 11.342 7.78863C11.3702 7.85553 11.3848 7.9274 11.3848 8C11.3848 8.0726 11.3702 8.14447 11.342 8.21137C11.3138 8.27826 11.2725 8.33883 11.2205 8.38951C11.1685 8.44018 11.1069 8.47994 11.0393 8.50643C10.9717 8.53292 10.8995 8.54561 10.8269 8.54375L8.29399 8.54399L8.29375 11.0769C8.29012 11.2187 8.23124 11.3535 8.12966 11.4525C8.02808 11.5515 7.89185 11.6069 7.75 11.6069C7.60815 11.6069 7.47192 11.5515 7.37034 11.4525C7.26876 11.3535 7.20988 11.2187 7.20625 11.0769L7.20601 8.54399L4.67308 8.54375C4.53128 8.54012 4.3965 8.48124 4.29749 8.37966C4.19849 8.27808 4.14307 8.14185 4.14307 8C4.14307 7.85815 4.19849 7.72192 4.29749 7.62034C4.3965 7.51876 4.53128 7.45988 4.67308 7.45625L7.20601 7.45601L7.20625 4.92308C7.20988 4.78128 7.26876 4.6465 7.37034 4.54749C7.47192 4.44849 7.60815 4.39307 7.75 4.39307C7.89185 4.39308 8.02808 4.44849 8.12966 4.54749C8.23124 4.6465 8.29012 4.78128 8.29375 4.92308L8.29399 7.45601L10.8269 7.45625Z"
        fill="#1D54B4"
      />
    </svg>
  </span>
);

interface FormularyAssemblyComponentListItemProps {
  index?: number;
  id?: any;
  title?: string;
  tag?: string;
  description?: string;
  onAdd?: any;
  onRemove?: any;
  onView?: any
  type?: string;
}

interface FormularyAssemblyComponentListItemState {}

class FormularyAssemblyComponentListItem extends Component<
  FormularyAssemblyComponentListItemProps,
  FormularyAssemblyComponentListItemState
> {
  
  handleOnAddClick = () => {
    const { index, onAdd } = this.props;

    if (typeof onAdd === "function") {
      onAdd(index);
    }
  };

  handleOnRemoveClick = () => {
    const { id, onRemove } = this.props;

    if (typeof onRemove === "function") {
      onRemove(id);
    }
  };
  
  handleOnViewClick = () => {
    const { id, onView } = this.props;

    if (typeof onView === "function") {
      onView(id);
    }
  };

  render() {
    return (
      <div className="formulary-assembly-component-list-item">
        <div className="formulary-assembly-component-list-item__container">
          <div className="formulary-assembly-component-list-item__title-container">
            <div className="formulary-assembly-component-list-item__title">
              {this.props.title}
            </div>
            <span className="formulary-assembly-component-list-item__tag">
              {this.props.tag}
            </span>
          </div>

          <div className="formulary-assembly-component-list-item__actions-container">
            <div className="formulary-assembly-component-list-item__action" onClick={this.handleOnViewClick}>
              <EyeIcon />
            </div>

            {this.props.type !== "assembly" ? (
              <div
                className="formulary-assembly-component-list-item__action"
                onClick={this.handleOnAddClick}
              >
                <AddIcon />
              </div>
            ) : (
              <div
                className="formulary-assembly-component-list-item__action"
                onClick={this.handleOnRemoveClick}
              >
                <span className="remove-icon">-</span>
              </div>
            )}
          </div>
        </div>

        <div className="formulary-assembly-component-list-item__description">
          {this.props.description}
        </div>
      </div>
    );
  }
}

export default FormularyAssemblyComponentListItem;
