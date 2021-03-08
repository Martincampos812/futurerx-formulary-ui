import React from "react";
import { selectFormularyGridMock } from "../../../../mocks/selectFormularyGrid-mock";
import { selectFormularyGrid } from "../../../../utils/grid/columns";
import FormularyExpandedDetails from "./FormularyExpandedDetails";
import FrxGridContainer from "../../../shared/FrxGrid/FrxGridContainer";
import "./style.scss";

interface SelectFormularyPopUpProps {
  formularyToggle(): void;
}

interface SelectFormularyPopUpState {}

export default class SelectFormularyPopUp extends React.Component<
  SelectFormularyPopUpProps,
  SelectFormularyPopUpState
> {
  render() {
    return (
      <FrxGridContainer
        onSettingsClick="grid-menu"
        enableSearch={false}
        enableColumnDrag
        onSearch={() => {}}
        settingsWidth={50}
        fixedColumnKeys={["claimId"]}
        pagintionPosition="topRight"
        gridName="Select Formulary"
        enableSettings
        columns={selectFormularyGrid({
          onFormularyNameClick: null,
        })}
        customSettingIcon={"PLUS-BTN"}
        scroll={{ x: 2000, y: 377 }}
        isFetchingData={false}
        enableResizingOfColumns
        data={selectFormularyGridMock()}
        expandable={{
          isExpandable: true,
          expandIconColumnIndex: selectFormularyGrid({}).length + 1,
          expandedRowRender: (props) => (
            <FormularyExpandedDetails
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
          ),
        }}
      />
    );
  }
}
