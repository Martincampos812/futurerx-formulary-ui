import React, { Component } from "react";
import PureAccordion from "../../../../../../shared/Frx-components/accordion/PureAccordion";
import { formularyTypesGridData } from "./CompareTable";
import InnerGrid from "./InnerGrid";
import * as commonConstants from "../../../../../../../api/http-commons";
import * as compareConstants from "../../../../../../../api/http-compare-view";
import { connect } from "react-redux";
import showMessage from "../../../../../Utils/Toast";
import getLobCode from "../../../../../Utils/LobUtils";
import { getMainComparison } from "../../../../../../../redux/slices/formulary/compareView/compareViewService";
import FrxLoader from "../../../../../../shared/FrxLoader/FrxLoader";
import {
  dateFilters,
  textFilters,
  numberFilters,
} from "../../../../../../../utils/grid/filters";

function mapDispatchToProps(dispatch) {
  return {};
}

const mapStateToProps = (state) => {
  return {
    clientId: state?.application?.clientId,
    id_formulary_maintenance: state.maintenance?.selectedRow?.id_maintenance_formulary,
    id_lob: state.maintenance?.selectedRow?.id_lob,
    formulary_lob_id:state.maintenance?.selectedRow?.id_lob,
  };
};


class ViewTable extends Component<any, any> {
  state = {
    showCheckbox: false,
    toggleAllAccordion: true,
    showViewAll: false,
    showViewAllNonMatch: false,
    formularyTypesGridData: Array(),
    isRequestFinished: false,
  };

  componentWillReceiveProps(nextProps){
    if(nextProps.baseformulary){
      if (
        nextProps.baseformulary &&
        nextProps.baseformulary["id_formulary"]
      ) {
        this.setState({
          isRequestFinished: false
        });
        this.populateSummaryData();
      }
    }

  }
  componentDidMount() {
    debugger;
    if (
      this.props.baseformulary &&
      this.props.baseformulary["id_formulary"]
    ) {
      this.setState({
        isRequestFinished: false
      });
      this.populateSummaryData();
    }
  }

  getBackgroundColor = (type) => {
    switch (type) {
      case "Tier":
        return "rgba(31, 187, 196, 0.4)";

      case "Category/Class":
        return "rgba(10, 123, 225, 0.4)";

      case "Prior Authorization (PA)":
        return "#FFF5F0";

      case "Step Therpay (ST)":
        return "rgba(244, 175, 100, 0.4)";

      case "Quantity Limits (QL)":
        return "rgba(213, 255, 215, 0.5)";

      case "Drug Details":
        return "rgba(224, 237, 81, 0.4)";

      case "User Defined":
        return "#ECF5FA";
    }
  };

  areAllNull = (type) => {
    switch (type) {
      case "Category/Class":
        return true;

      case "Drug Details":
        return true;

      case "User Defined":
        return true;

      default:
        return false;
    }
  };

  getGridColumns = (type, subType: any = null) => {
    let columns = [
      {
        id: 1,
        position: 1,
        sorter: {},
        textCase: "upper",
        pixelWidth: 600,
        key: "label",
        displayTitle: "Label Name",
        dataType: "string",
        isFilterable: true,
        filters: textFilters,
        hidden: false,
        sortDirections: ["ascend", "descend"],
      },

      {
        id: 2,
        position: 2,
        sorter: {},
        textCase: "upper",
        pixelWidth: 600,
        key: "fileType",
        displayTitle: "File Type",
        dataType: "string",
        isFilterable: true,
        filters: textFilters,
        hidden: false,
        sortDirections: ["ascend", "descend"],
      },

      {
        id: 3,
        position: 3,
        sorter: {},
        textCase: "upper",
        pixelWidth: 600,
        key: "dataSource",
        displayTitle: "Data Source",
        dataType: "string",
        isFilterable: true,
        filters: textFilters,
        hidden: false,
        sortDirections: ["ascend", "descend"],
      },

      {
        id: 4,
        position: 4,
        sorter: {},
        textCase: "upper",
        pixelWidth: 600,
        key: "gpi",
        displayTitle: "GPI",
        dataType: "string",
        isFilterable: true,
        filters: textFilters,
        hidden: false,
        sortDirections: ["ascend", "descend"],
      },
    ];

    let lastSectionColumns = [...columns];
    switch (type) {
      case "Tier":
        columns = [
          ...columns,
          ...[
            {
              id: 5,
              position: 5,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "tier",
              displayTitle: "Tier",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
          ],
        ];

        return columns;

      case "Category/Class":
        columns = [
          {
            id: 1,
            position: 1,
            sorter: {},
            textCase: "upper",
            pixelWidth: 600,
            key: "category",
            displayTitle: "Category",
            dataType: "string",
            isFilterable: true,
            filters: textFilters,
            hidden: false,
            sortDirections: ["ascend", "descend"],
          },
          {
            id: 2,
            position: 2,
            sorter: {},
            textCase: "upper",
            pixelWidth: 600,
            key: "class",
            displayTitle: "Class",
            dataType: "string",
            isFilterable: true,
            filters: textFilters,
            hidden: false,
            sortDirections: ["ascend", "descend"],
          },
        ];
        return columns;

      case "PA Group Descriptions":
        columns = [
          {
            id: 1,
            position: 1,
            sorter: {},
            textCase: "upper",
            pixelWidth: 600,
            key: "groupDescription",
            displayTitle: "Group Description",
            dataType: "string",
            isFilterable: true,
            filters: textFilters,
            hidden: false,
            sortDirections: ["ascend", "descend"],
          },
        ];

        return columns;

      case "Prior Authorization (PA)":
        columns = [
          ...columns,
          ...[
            {
              id: 5,
              position: 5,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "paType",
              displayTitle: "PA Type",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 6,
              position: 6,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "paGroupDescription",
              displayTitle: "PA Group Description",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
          ],
        ];

        return columns;


      case "Step Therpay (ST)":
        columns = [
          ...columns,
          ...[
            {
              id: 5,
              position: 5,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "stType",
              displayTitle: "ST Type",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 6,
              position: 6,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "stGroupDescription",
              displayTitle: "ST Group Description",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 7,
              position: 7,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "stValue",
              displayTitle: "ST Value",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
          ],
        ];
        return columns;

      case "ST Group Descriptions":
        columns = [
          {
            id: 1,
            position: 1,
            sorter: {},
            textCase: "upper",
            pixelWidth: 600,
            key: "groupDescription",
            displayTitle: "Group Description",
            dataType: "string",
            isFilterable: true,
            filters: textFilters,
            hidden: false,
            sortDirections: ["ascend", "descend"],
          },
        ];

        return columns;

      case "Quantity Limits (QL)":
        columns = [
          ...columns,
          ...[
            {
              id: 5,
              position: 5,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "qlType",
              displayTitle: "QL Type",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 6,
              position: 6,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "qlDays",
              displayTitle: "QL Days",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 7,
              position: 7,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "qlPeriodofTime",
              displayTitle: "QL Period of Time",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 8,
              position: 8,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "qlQuantity",
              displayTitle: "QL Quantity",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 9,
              position: 9,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "fillsAllowed",
              displayTitle: "Fills Allowed",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 10,
              position: 10,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "fullLimitPeriod",
              displayTitle: "Full Limit Period of Time",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
          ],
        ];
        return columns;

      case "Drug Details":
        switch (subType) {
          case "Age Limits":
            columns = [
              ...columns,
              ...[
                {
                  id: 5,
                  position: 5,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "minCovered",
                  displayTitle: "Minimum Age [Covered]",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 6,
                  position: 6,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "maxCovered",
                  displayTitle: "Maximum Age [Covered]",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 7,
                  position: 7,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "minCoveredCond",
                  displayTitle: "Minimum Condition [Covered]",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 8,
                  position: 8,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "maxCoveredCond",
                  displayTitle: "Maximum Condition [Covered]",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 9,
                  position: 9,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "minNotCovered",
                  displayTitle: "Minimum Age [Not Covered]",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 10,
                  position: 10,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "maxNotCovered",
                  displayTitle: "Maximum Age [Not Covered]",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 11,
                  position: 11,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "minNotCoveredCond",
                  displayTitle: "Minimum Condition [Not Covered]",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 12,
                  position: 12,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "maxNotCoveredCond",
                  displayTitle: "Maximum Condition [Not Covered]",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
              ],
            ];
            return columns;

          default:
            columns = [
              ...columns,
              ...[
                {
                  id: 5,
                  position: 5,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "covered",
                  displayTitle: "Covered",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 6,
                  position: 6,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "notCovered",
                  displayTitle: "Not Covered",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
              ],
            ];
            return columns;
        }

      case "User Defined":
        columns = [
          ...columns,
          ...[
            {
              id: 5,
              position: 5,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "userDefined",
              displayTitle: "User Defined",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
          ],
        ];
        return columns;
    }
    return Array();
  };

  populateSummaryData = async () => {
    if (this.props.id_lob && this.props.id_lob === 4) {
      let formularyTypesGridData = Array();
      let apiDetails = {};
      apiDetails["apiPart"] = compareConstants.COMMERCIAL_FORMULARY_SUMMARY;
      apiDetails["pathParams"] = this.props.baseformulary["id_formulary"]

      try {
        const data = await getMainComparison(apiDetails);
        if (data && data.length > 0) {
          let idCount = 1;
          data.map((value) => {
            let header = {
              id: idCount,
              title: value["attribute_type"],
              titleBG: this.getBackgroundColor(value["attribute_type"]),
              attribute_type: value["attribute_type"],
              file_type: value["file_type"],
              gridColumns: ['Tier', 'Prior Authorization (PA)', 'Step Therpay (ST)', 'Quantity Limits (QL)'].includes(value["attribute_type"]) ? this.getGridColumns(value["attribute_type"]) : Array(),
              headDrugsCount: {
                baseFormulary: null,
              },
              formularies: Array(),
            };
            if (!this.areAllNull(value["attribute_type"])) {
              header.headDrugsCount.baseFormulary =
                  value["total_base_drugs_count"];
            }
            let valueId = 1;
            if (value["values"] && value["values"].length > 0) {
              value["values"].map((subValue) => {
                let gridColumns: any[] = Array();
                if (
                  subValue["attribute_name"] === "PA Group Descriptions" ||
                  subValue["attribute_name"] === "ST Group Descriptions"
                ) {
                  gridColumns = this.getGridColumns(subValue["attribute_name"]);
                } else if (value["attribute_type"] === "Drug Details") {
                  gridColumns = this.getGridColumns(
                    value["attribute_type"],
                    subValue["attribute_name"]
                  );
                } else {
                  gridColumns = this.getGridColumns(value["attribute_type"]);
                }
                let subItem = {
                  name: subValue["attribute_name"],
                  baseFormulary: subValue["base_formulary_drugs_count"],
                  attribute_type: value["attribute_type"],
                  file_type: value["file_type"],
                  attribute_field_data_type:
                    subValue["attribute_field_data_type"],
                  attribute_field_name: subValue["attribute_field_name"],
                  attribute_field_value: subValue["attribute_field_value"],
                  attribute_name: subValue["attribute_name"],
                  source: subValue["source"],
                  gridColumns: gridColumns,
                };
                header.formularies.push(subItem);
                valueId++;
              });
            }
            formularyTypesGridData.push(header);
            idCount++;
          });
          this.setState({
            formularyTypesGridData: formularyTypesGridData,
            isRequestFinished: true
          });
        } else {
          showMessage("Compare data is empty", "error");
          this.setState({
            formularyTypesGridData: formularyTypesGridData,
            isRequestFinished: true
          });
        }
      } catch (err) {
        console.log(err);
        showMessage("Error while fetching data", "error");
        this.setState({
          formularyTypesGridData: formularyTypesGridData,
          isRequestFinished: true
        });
      }
    } else {
      this.setState({
        formularyTypesGridData: formularyTypesGridData,
        isRequestFinished: true
      });
    }
  };
  render() {
    const { showCheckbox, toggleAllAccordion } = this.state;
    if(!this.state.isRequestFinished){
      return <FrxLoader />;
    }
    return (
      <>
        <div className="bordered-grid">
          <div className="__root_compare-grid-container">
            <div className="__root_view-grid-container-parent-el">
              {/* Top Header Grid*/}
              <div className="border-bottom accordion-section-wrapper-first-col">
                <div className="header-first-child-container">
                  <div
                    className="header-first-child-container-child"
                    onClick={() =>
                      this.setState({
                        showCheckbox: !this.state.showCheckbox,
                      })
                    }
                  >
                    {showCheckbox ? (
                      <svg 
                        style={{
                          margin: "2px 3px 0 0",
                        }}
                        width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.49995 9.37506C5.72221 9.37506 4.28315 7.99905 4.15073 6.2553L1.69214 4.35522C1.36893 4.76069 1.07151 5.18936 0.831512 5.65811C0.777897 5.76416 0.749962 5.88134 0.749962 6.00018C0.749962 6.11902 0.777897 6.23619 0.831512 6.34225C2.10253 8.82217 4.61878 10.5001 7.49995 10.5001C8.13065 10.5001 8.73909 10.4063 9.3255 10.2549L8.10932 9.31389C7.90847 9.35269 7.70451 9.37316 7.49995 9.37506ZM14.8551 10.7368L12.2641 8.73428C13.0512 8.07098 13.6985 7.25779 14.1684 6.34201C14.222 6.23596 14.2499 6.11878 14.2499 5.99994C14.2499 5.8811 14.222 5.76393 14.1684 5.65787C12.8974 3.17795 10.3811 1.50006 7.49995 1.50006C6.29327 1.50152 5.10619 1.8053 4.04714 2.38366L1.06542 0.0790459C1.02654 0.0487898 0.982073 0.0264921 0.93457 0.0134268C0.887067 0.000361472 0.837454 -0.00321528 0.788568 0.00290091C0.739682 0.00901711 0.692481 0.0247064 0.649661 0.0490721C0.606841 0.0734379 0.569241 0.106003 0.539012 0.144905L0.0789337 0.737171C0.0179021 0.815683 -0.00944578 0.915221 0.00290487 1.01389C0.0152555 1.11257 0.0662933 1.2023 0.144793 1.26334L13.9345 11.9211C13.9734 11.9513 14.0178 11.9736 14.0653 11.9867C14.1128 11.9998 14.1624 12.0033 14.2113 11.9972C14.2602 11.9911 14.3074 11.9754 14.3502 11.951C14.3931 11.9267 14.4307 11.8941 14.4609 11.8552L14.9212 11.263C14.9822 11.1844 15.0095 11.0849 14.9971 10.9862C14.9847 10.8875 14.9336 10.7978 14.8551 10.7368ZM10.5492 7.40865L9.62807 6.69662C9.70564 6.47244 9.74679 6.23727 9.74995 6.00006C9.75452 5.65278 9.67758 5.30926 9.52532 4.99711C9.37305 4.68496 9.14969 4.41286 8.87319 4.20269C8.59669 3.99252 8.27475 3.85012 7.93323 3.78694C7.59171 3.72375 7.24014 3.74155 6.90675 3.83889C7.04808 4.0304 7.12453 4.26205 7.12495 4.50006C7.12145 4.57926 7.10935 4.65785 7.08886 4.73444L5.36362 3.40108C5.96291 2.90027 6.71895 2.62564 7.49995 2.62506C7.94323 2.62481 8.38221 2.71194 8.7918 2.88147C9.20138 3.05099 9.57354 3.29958 9.88698 3.61303C10.2004 3.92647 10.449 4.29863 10.6185 4.70821C10.7881 5.1178 10.8752 5.55678 10.8749 6.00006C10.8749 6.50701 10.751 6.97951 10.5492 7.40889V7.40865Z" fill="#707683"/>
                      </svg>
                    ) : (
                      <svg 
                        style={{
                          margin: "2px 3px 0 0",
                        }}
                        width="13" height="9" viewBox="0 0 13 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.3002 4.18633C11.1351 1.91307 8.82856 0.375 6.18749 0.375C3.54641 0.375 1.23921 1.91414 0.0747539 4.18654C0.0256066 4.28376 0 4.39117 0 4.50011C0 4.60904 0.0256066 4.71645 0.0747539 4.81367C1.23985 7.08693 3.54641 8.625 6.18749 8.625C8.82856 8.625 11.1358 7.08586 12.3002 4.81346C12.3494 4.71624 12.375 4.60883 12.375 4.49989C12.375 4.39096 12.3494 4.28355 12.3002 4.18633ZM6.18749 7.59375C5.5756 7.59375 4.97746 7.4123 4.46869 7.07236C3.95993 6.73241 3.56339 6.24924 3.32924 5.68393C3.09508 5.11862 3.03381 4.49657 3.15318 3.89644C3.27256 3.29631 3.56721 2.74506 3.99988 2.31239C4.43254 1.87972 4.9838 1.58507 5.58393 1.4657C6.18406 1.34632 6.80611 1.40759 7.37141 1.64175C7.93672 1.87591 8.4199 2.27244 8.75985 2.7812C9.09979 3.28997 9.28124 3.88811 9.28124 4.5C9.28144 4.90633 9.20155 5.30872 9.04614 5.68416C8.89074 6.0596 8.66286 6.40073 8.37554 6.68805C8.08822 6.97537 7.74709 7.20325 7.37165 7.35865C6.99621 7.51406 6.59382 7.59395 6.18749 7.59375ZM6.18749 2.4375C6.00339 2.44007 5.82049 2.46746 5.64372 2.51893C5.78943 2.71694 5.85935 2.96062 5.84081 3.20577C5.82226 3.45092 5.71648 3.6813 5.54263 3.85515C5.36879 4.02899 5.13841 4.13477 4.89326 4.15332C4.64811 4.17186 4.40443 4.10194 4.20641 3.95623C4.09366 4.37165 4.11401 4.81197 4.26461 5.21522C4.41521 5.61846 4.68848 5.96433 5.04594 6.20413C5.4034 6.44394 5.82707 6.56561 6.2573 6.55202C6.68754 6.53842 7.10268 6.39026 7.4443 6.12837C7.78591 5.86648 8.0368 5.50405 8.16165 5.09211C8.2865 4.68016 8.27902 4.23943 8.14027 3.83196C8.00151 3.42449 7.73847 3.07078 7.38817 2.82063C7.03787 2.57048 6.61794 2.43649 6.18749 2.4375Z" fill="#707683"/>
                      </svg>
                    )}
                    <p>{showCheckbox ? "Hide" : "Show"} Checkboxes</p>
                  </div>
                  <div
                    className="header-first-child-container-child"
                    onClick={() => {
                      this.setState({
                        toggleAllAccordion: !toggleAllAccordion,
                      });
                    }}
                  >
                    <p>{!toggleAllAccordion ? "Expand All" : "Collapse All"}</p>
                  </div>
                </div>
              </div>
              <div className="border-bottom font-style bg-grey">
                <span>BASE FORMULARY</span>
              </div>
            </div>
            {this.state.formularyTypesGridData.map((accordionHeader) => (
              <div key={accordionHeader.id}>
                <PureAccordion
                  tableType={"VIEW"}
                  title={accordionHeader.title}
                  titleBG={accordionHeader.titleBG}
                  showCheckbox={showCheckbox}
                  baseformulary={this.props.baseformulary}
                  gridColumns={accordionHeader.gridColumns}
                  fileType={accordionHeader.file_type}
                  formularyLobId={this.props.formulary_lob_id}
                  content={() => {
                    return (
                      <InnerGrid
                        tableType={"VIEW"}
                        clientId={this.props.clientId}
                        dataArr={accordionHeader.formularies}
                        formularyType={accordionHeader.title}
                        baseformulary={this.props.baseformulary}
                        formularyLobId={this.props.formulary_lob_id}
                      />
                    );
                  }}
                  headerData={accordionHeader.headDrugsCount}
                  toggleAllAccordion={toggleAllAccordion}
                />
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewTable);
