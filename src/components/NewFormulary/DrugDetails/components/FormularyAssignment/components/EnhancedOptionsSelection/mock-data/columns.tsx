import React from "react";
import { Column } from "../../../../../../../../models/grid.model";

const EyeIcon = (props) => (
  <span {...props} style={{cursor: 'pointer'}}>
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

const RemoveIcon = (props) => (
  <span {...props} style={{cursor: 'pointer'}}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12ZM3.63158 5.68421C3.36997 5.68421 3.15789 5.89629 3.15789 6.15789C3.15789 6.4195 3.36997 6.63158 3.63158 6.63158H8.68421C8.94582 6.63158 9.1579 6.4195 9.1579 6.15789C9.1579 5.89629 8.94582 5.68421 8.68421 5.68421H3.63158Z"
        fill="#1F55B6"
      />
    </svg>
  </span>
);

export const getTierColumns = (props) => {
  return [
    {
      key: "sequence",
      dataIndex: "sequence",
      title: "Sequence",
    },
    {
      key: "tier",
      dataIndex: "tier",
      title: "Tier",
    },
    {
      key: "exception_details",
      dataIndex: "exception_details",
      title: "EXCEPTION DETAILS",
      align: 'center' as const,
      render: () => {
        return (
          <div >
            <EyeIcon onClick={props.onViewClick}/>
          </div>
        );
      },
    },
    {
      key: "remove",
      dataIndex: "remove",
      title: "REMOVE",
      align: 'center' as const,
      render: () => {
        return (
          <div>
            <RemoveIcon />
          </div>
        );
      },
    },
  ];
};

export const getTierExceptionDetailsColumns: () => Column<any>[] = () => {
  return [
    {
      id: 1,
      position: 1,
      pixelWidth: 20,
      sorter: {},
      textCase: "upper",
      key: "ddid",
      displayTitle: "DDID",
      isFilterable: true,
      dataType: "string",
      hidden: false,
      sortDirections: ["ascend", "descend"],
    },
    {
      id: 2,
      position: 2,
      pixelWidth: 10,
      sorter: {},
      textCase: "upper",
      key: "drug_name",
      displayTitle: "DRUG NAME",
      isFilterable: true,
      dataType: "string",
      hidden: false,
      sortDirections: ["ascend", "descend"],
    },
    {
      id: 3,
      position: 3,
      pixelWidth: 10,
      sorter: {},
      textCase: "upper",
      key: "change_type",
      displayTitle: "CHANGE TYPE",
      isFilterable: true,
      dataType: "string",
      hidden: false,
      sortDirections: ["ascend", "descend"],
    },
    {
      id: 4,
      position: 4,
      pixelWidth: 15,
      sorter: {},
      textCase: "upper",
      key: "tier",
      displayTitle: "TIER",
      isFilterable: true,
      dataType: "string",
      hidden: false,
      sortDirections: ["ascend", "descend"],
    }
  ];
};


export const getPAColumns = (props) => {
  return [
    {
      key: "sequence",
      dataIndex: "sequence",
      title: "Sequence",
    },
    {
      key: "pa",
      dataIndex: "pa",
      title: "PA",
    },
    {
      key: "exception_details",
      dataIndex: "exception_details",
      title: "EXCEPTION DETAILS",
      align: 'center' as const,
      render: () => {
        return (
          <div >
            <EyeIcon onClick={props.onViewClick}/>
          </div>
        );
      },
    },
    {
      key: "remove",
      dataIndex: "remove",
      title: "REMOVE",
      align: 'center' as const,
      render: () => {
        return (
          <div>
            <RemoveIcon />
          </div>
        );
      },
    },
  ];
};

export const getPAExceptionDetailsColumns: () => Column<any>[] = () => {
  return [
    {
      id: 1,
      position: 1,
      pixelWidth: 20,
      sorter: {},
      textCase: "upper",
      key: "ddid",
      displayTitle: "DDID",
      isFilterable: true,
      dataType: "string",
      hidden: false,
      sortDirections: ["ascend", "descend"],
    },
    {
      id: 2,
      position: 2,
      pixelWidth: 10,
      sorter: {},
      textCase: "upper",
      key: "drug_name",
      displayTitle: "DRUG NAME",
      isFilterable: true,
      dataType: "string",
      hidden: false,
      sortDirections: ["ascend", "descend"],
    },
    {
      id: 3,
      position: 3,
      pixelWidth: 10,
      sorter: {},
      textCase: "upper",
      key: "change_type",
      displayTitle: "CHANGE TYPE",
      isFilterable: true,
      dataType: "string",
      hidden: false,
      sortDirections: ["ascend", "descend"],
    },
    {
      id: 4,
      position: 4,
      pixelWidth: 15,
      sorter: {},
      textCase: "upper",
      key: "pa_group_description",
      displayTitle: "PA GROUP DESCRIPTION",
      isFilterable: true,
      dataType: "string",
      hidden: false,
      sortDirections: ["ascend", "descend"],
    },
    {
      id: 5,
      position: 5,
      pixelWidth: 15,
      sorter: {},
      textCase: "upper",
      key: "pa_type",
      displayTitle: "PA TYPE",
      isFilterable: true,
      dataType: "string",
      hidden: false,
      sortDirections: ["ascend", "descend"],
    }
  ];
};

export const getSTColumns = (props) => {
  return [
    {
      key: "sequence",
      dataIndex: "sequence",
      title: "Sequence",
    },
    {
      key: "st",
      dataIndex: "st",
      title: "ST",
    },
    {
      key: "exception_details",
      dataIndex: "exception_details",
      title: "EXCEPTION DETAILS",
      align: 'center' as const,
      render: () => {
        return (
          <div >
            <EyeIcon onClick={props.onViewClick}/>
          </div>
        );
      },
    },
    {
      key: "remove",
      dataIndex: "remove",
      title: "REMOVE",
      align: 'center' as const,
      render: () => {
        return (
          <div>
            <RemoveIcon />
          </div>
        );
      },
    },
  ];
};

export const getSTExceptionDetailsColumns: () => Column<any>[] = () => {
  return [
    {
      id: 1,
      position: 1,
      pixelWidth: 20,
      sorter: {},
      textCase: "upper",
      key: "ddid",
      displayTitle: "DDID",
      isFilterable: true,
      dataType: "string",
      hidden: false,
      sortDirections: ["ascend", "descend"],
    },
    {
      id: 2,
      position: 2,
      pixelWidth: 10,
      sorter: {},
      textCase: "upper",
      key: "drug_name",
      displayTitle: "DRUG NAME",
      isFilterable: true,
      dataType: "string",
      hidden: false,
      sortDirections: ["ascend", "descend"],
    },
    {
      id: 3,
      position: 3,
      pixelWidth: 10,
      sorter: {},
      textCase: "upper",
      key: "change_type",
      displayTitle: "CHANGE TYPE",
      isFilterable: true,
      dataType: "string",
      hidden: false,
      sortDirections: ["ascend", "descend"],
    },
    {
      id: 4,
      position: 4,
      pixelWidth: 15,
      sorter: {},
      textCase: "upper",
      key: "st_group_description",
      displayTitle: "ST GROUP DESCRIPTION",
      isFilterable: true,
      dataType: "string",
      hidden: false,
      sortDirections: ["ascend", "descend"],
    },
    {
      id: 5,
      position: 5,
      pixelWidth: 15,
      sorter: {},
      textCase: "upper",
      key: "st_type",
      displayTitle: "ST TYPE",
      isFilterable: true,
      dataType: "string",
      hidden: false,
      sortDirections: ["ascend", "descend"],
    }
  ];
};


export const getQLColumns = () => {
  return [
    {
      key: "sequence",
      dataIndex: "sequence",
      title: "Sequence",
    },
    {
      key: "ql",
      dataIndex: "ql",
      title: "QL",
    },
    {
      key: "exception_details",
      dataIndex: "exception_details",
      title: "EXCEPTION DETAILS",
      align: 'center' as const,
      render: () => {
        return (
          <div>
            <EyeIcon />
          </div>
        );
      },
    },
    {
      key: "remove",
      dataIndex: "remove",
      title: "REMOVE",
      align: 'center' as const,
      render: () => {
        return (
          <div>
            <RemoveIcon />
          </div>
        );
      },
    },
  ];
};

export const getOtherUMColumns = () => {
  return [
    {
      key: "sequence",
      dataIndex: "sequence",
      title: "Sequence",
    },
    {
      key: "other_um",
      dataIndex: "other_um",
      title: "OTHER UM EDITS",
    },
    {
      key: "exception_details",
      dataIndex: "exception_details",
      title: "EXCEPTION DETAILS",
      align: 'center' as const,
      render: () => {
        return (
          <div>
            <EyeIcon />
          </div>
        );
      },
    },
    {
      key: "remove",
      dataIndex: "remove",
      title: "REMOVE",
      align: 'center' as const,
      render: () => {
        return (
          <div>
            <RemoveIcon />
          </div>
        );
      },
    },
  ];
};

export const getFormularyBenefitColumns = () => {
  return [
    {
      key: "formulary_benefits",
      dataIndex: "formulary_benefits",
      title: "Formulary Benefit",
    },
    {
      key: "exception_details",
      dataIndex: "exception_details",
      title: "EXCEPTION DETAILS",
      align: 'center' as const,
      render: () => {
        return (
          <div>
            <EyeIcon />
          </div>
        );
      },
    },
  ];
};
