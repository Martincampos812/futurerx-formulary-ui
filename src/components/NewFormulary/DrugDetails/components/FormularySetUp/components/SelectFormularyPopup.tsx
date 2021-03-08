import React from "react";
import { selectFormularyGridMock } from "../../../../../../mocks/selectFormularyGrid-mock";
import {
  selectFormularyGrid,
  selectFormularyGridMedicare
} from "../../../../../../utils/grid/columns";
import FrxGridContainer from "../../../../../shared/FrxGrid/FrxDrugGridContainer";
import FormularyExpandedDetails from "../../../SelectFormularyPopUp/FormularyExpandedDetails";
import { getformularies } from "../../../../../../redux/slices/formulary/dashboard/dashboardService";
import getLobName from "../../../../Utils/LobNameUtils";
import { connect } from "react-redux";
import { Column } from "../../../../../../models/grid.model";
import FrxStatusField from "../../../../../shared/FrxStatusField/FrxStatusField";

const medicareFormularyColumns: (data) => Column<any>[] = data => {
  return [
    {
      position: 1,
      sorter: {},
      textCase: "upper",
      pixelWidth: 100,
      key: "serviceYear",
      displayTitle: "Service Year",
      dataType: "string",
      hidden: false,
      sortDirections: ["ascend", "descend"]
    },
    {
      position: 2,
      sorter: {},
      textCase: "upper",
      pixelWidth: 100,
      key: "lob",
      displayTitle: "LOB",
      customContent: props => (
        <FrxStatusField
          text={"Medicare"}
          type={"pill"}
          fill={"fill"}
          variant={4}
        />
      ),
      isFilterable: false,
      dataType: "string",
      hidden: false,
      sortDirections: ["ascend", "descend"]
    },
    {
      position: 3,
      sorter: {},
      textCase: "upper",
      pixelWidth: 150,
      key: "formulary_name",
      className: "input-link",
      displayTitle: "FORMULARY NAME",
      // customContent: props => {
      //   console.log("props row ", props);
      //   return (
      //     <div className="input-link" onClick={() => {}}>
      //       {props.record}
      //     </div>
      //   );
      // },
      dataType: "string",
      hidden: false,
      sortDirections: ["ascend", "descend"]
    },
    {
      position: 4,
      sorter: {},
      textCase: "upper",
      pixelWidth: 100,
      key: "formularyId",
      displayTitle: "FORMULARY ID",
      dataType: "string",
      hidden: false,
      sortDirections: ["ascend", "descend"]
    },
    {
      position: 5,
      sorter: {},
      textCase: "upper",
      pixelWidth: 100,
      key: "version",
      displayTitle: "VERSION",
      dataType: "string",
      hidden: false,
      sortDirections: ["ascend", "descend"]
    },
    {
      position: 6,
      sorter: {},
      textCase: "upper",
      pixelWidth: 100,
      key: "tierCount",
      displayTitle: "TIER COUNT",
      dataType: "string",
      hidden: false,
      sortDirections: ["ascend", "descend"]
    },
    {
      position: 7,
      sorter: {},
      textCase: "upper",
      pixelWidth: 100,
      key: "drugCount",
      displayTitle: "DRUG COUNT",
      dataType: "string",
      hidden: false,
      sortDirections: ["ascend", "descend"]
    },
    {
      position: 8,
      sorter: {},
      textCase: "upper",
      pixelWidth: 100,
      key: "step",
      displayTitle: "STEP",
      dataType: "string",
      hidden: false,
      sortDirections: ["ascend", "descend"]
    },
    {
      position: 9,
      sorter: {},
      textCase: "upper",
      pixelWidth: 100,
      key: "assign",
      displayTitle: "ASSIGNED",
      dataType: "string",
      hidden: false,
      sortDirections: ["ascend", "descend"]
    },
    {
      position: 10,
      sorter: {},
      textCase: "upper",
      pixelWidth: 100,
      key: "status",
      displayTitle: "status",
      dataType: "string",
      hidden: false,
      sortDirections: ["ascend", "descend"]
    },
    {
      position: 11,
      sorter: {},
      textCase: "upper",
      pixelWidth: 100,
      key: "effectiveDate",
      displayTitle: "effective date",
      dataType: "string",
      hidden: false,
      sortDirections: ["ascend", "descend"]
    },
    {
      position: 12,
      sorter: {},
      textCase: "upper",
      pixelWidth: 100,
      key: "dueDate",
      displayTitle: "due date",
      dataType: "string",
      hidden: false,
      sortDirections: ["ascend", "descend"]
    }
  ];
};

const defaultListPayload = {
  index: 0,
  limit: 10,
  filter: [],
  id_lob: 4,
  search_by: null,
  search_key: "",
  search_value: [],
  sort_by: ["cms_formulary_id"],
  sort_order: ["desc"]
};

const columnFilterMapping = {
  serviceYear: "contract_year",
  fromularyName: "formulary_name",
  formularyId: "id_formulary",
  version: "version_number",
  tierCount: "number_of_tiers",
  drugCount: "number_of_drugs",
  step: "step",
  assign: "assigned_to",
  status: "status",
  effectiveDate: "effective_date",
  dueDate: "due_date"
};

class SelectFormularyPopup extends React.Component<any, any> {
  selectFormularyClick = dataRow => {
    console.log("dta row ", dataRow);
    if (this.props.selectFormularyClick) {
      let actualData = this.props.resembleFormularyData.filter(
        item => item.id_base_formulary === parseInt(dataRow.id_base_formulary)
      );
      if (actualData && actualData.length > 0) {
        this.props.selectFormularyClick(actualData[0]);
      }
    }
  };
  render() {
    let gridColumns: any[] =
      this.props.type === "medicare"
        ? medicareFormularyColumns({ onFormularyNameClick: null })
        : selectFormularyGrid({ onFormularyNameClick: null });
    // gridColumns = gridColumns.filter(column => !this.state.hiddenColumns.includes(column['key']));

    return (
      <>
        {this.props.type === "medicare" && (
          <FrxGridContainer
            onSettingsClick="grid-menu"
            enableSearch={false}
            enableColumnDrag
            onSearch={() => {}}
            settingsWidth={50}
            //give the keys of columns that should be fixed . At least the key of first column
            fixedColumnKeys={["id_base_formulary"]}
            pagintionPosition="topRight"
            gridName="Select Formulary"
            // pass the prop isDataLoaded if data is preloaded on front end
            isDataLoaded
            enableSettings
            columns={gridColumns}
            customSettingIcon={"PLUS-BTN"}
            scroll={{ x: 2100, y: 377 }}
            isFetchingData={false}
            enableResizingOfColumns
            // data={this.state.formularyGridData}
            data={this.props.resembleFormularyData}
            settingsTriDotClick={this.selectFormularyClick}
            isPinningEnabled
            expandable={{
              isExpandable: true,
              expandIconColumnIndex: gridColumns.length + 1,
              expandedRowRender: props => (
                <FormularyExpandedDetails
                  {...props}
                  formularyToggle={this.props.formularyToggle}
                />
              ),
              expandCloseIcon: (
                <span>
                  <svg
                    width="9"
                    height="5"
                    viewBox="0 0 9 5"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.223752 0.24549C0.531543 -0.0693596 0.960049 -0.0940675 1.33632 0.24549L4.09513 2.89065L6.85395 0.24549C7.23022 -0.0940675 7.65943 -0.0693596 7.9651 0.24549C8.27289 0.559634 8.25313 1.0905 7.9651 1.38559C7.67849 1.68067 4.65071 4.56373 4.65071 4.56373C4.57861 4.63846 4.49219 4.69789 4.39662 4.73849C4.30104 4.77908 4.19827 4.8 4.09443 4.8C3.99059 4.8 3.88782 4.77908 3.79224 4.73849C3.69666 4.69789 3.61025 4.63846 3.53815 4.56373C3.53815 4.56373 0.511776 1.68067 0.223752 1.38559C-0.0649778 1.0905 -0.0840382 0.559634 0.223752 0.24549Z"
                      fill="#999999"
                    />
                  </svg>
                </span>
              ),
              expandOpenIcon: (
                <span>
                  <svg
                    width="5"
                    height="9"
                    viewBox="0 0 5 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.245493 7.96947C-0.0693603 7.6615 -0.0940685 7.23274 0.245493 6.85625L2.89068 4.09578L0.245492 1.33532C-0.0940688 0.958827 -0.0693606 0.529358 0.245492 0.223503C0.559639 -0.0844708 1.09051 -0.0646925 1.3856 0.223503C1.68069 0.510286 4.56378 3.53987 4.56378 3.53987C4.63851 3.61202 4.69794 3.69849 4.73853 3.79412C4.77913 3.88975 4.80005 3.99259 4.80005 4.09649C4.80005 4.20039 4.77913 4.30322 4.73853 4.39886C4.69794 4.49449 4.63851 4.58096 4.56378 4.6531C4.56378 4.6531 1.68069 7.68128 1.3856 7.96947C1.09051 8.25838 0.55964 8.27745 0.245493 7.96947Z"
                      fill="#323C47"
                    />
                  </svg>
                </span>
              )
            }}
          />
        )}
      </>
    );
  }
}

export default SelectFormularyPopup;
