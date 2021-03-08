import React from "react";
import PanelHeader from "../../../../../../shared/Frx-components/panel-header/PanelHeader";
import DropDown from "../../../../../../shared/Frx-components/dropdown/DropDown";
import FrxDrugGridContainer from "../../../../../../shared/FrxGrid/FrxDrugGridContainer";
import { VersionDrugActivityColumns } from "../../../../../../../utils/grid/columns";
import { VersionDrugActivityMockData } from "../../../../../../../mocks/TierMock";
import { Grid, Input } from "@material-ui/core";
import './VersionDrugActivity.scss';
import { Popover } from "antd";
import FrxGridContainer from "../../../../../../shared/FrxGrid/FrxGridContainer";

const DownArrow = () =>(
  <svg width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M0.223886 0.847055C0.53186 0.532202 0.960622 0.507494 1.33711 0.847055L4.09758 3.49224L6.85804 0.847055C7.23453 0.507494 7.664 0.532202 7.96986 0.847055C8.27783 1.1612 8.25805 1.69208 7.96986 1.98716C7.68307 2.28225 4.65348 5.16534 4.65348 5.16534C4.58134 5.24007 4.49487 5.2995 4.39924 5.3401C4.30361 5.38069 4.20077 5.40161 4.09687 5.40161C3.99297 5.40161 3.89013 5.38069 3.7945 5.3401C3.69887 5.2995 3.6124 5.24007 3.54026 5.16534C3.54026 5.16534 0.512082 2.28225 0.223886 1.98716C-0.0650165 1.69208 -0.0840883 1.1612 0.223886 0.847055Z" fill="#5F80B9"/>
  </svg>
);
export default class VersionDrugActivityGrid extends React.Component<any, any> {
    render(){
      const addDrugButtonDDContent = (
        <div className="add-new-dd">
          <p>Advanced Search</p>
          <p>Criteria Builder</p>
        </div>);
        return(
            <div className="version-drug-activity-container">
             <Grid container spacing={2}>
              <Grid item xs={12}>                
                <div className="bordered category-class-root">
                  <div className="header pr-10 category-class-wrapper">                
                        <p>VERSION DRUG ACTIVITY</p>
                    <div className="category-class-button-wrapper">
                      <div className="header-dropdown">
                       
                      </div>
                     
                      <div className="input-control set-right-margin">
                        <div className="search-input">
                        <Input
                            className="formulary-list-search"
                            placeholder="Search"
                            type="text"
                            disableUnderline={true}
                            startAdornment={
                                <svg
                                className="member-search__icon"
                                width="11"
                                height="11"
                                viewBox="0 0 11 11"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                >
                                <path
                                    d="M10.8504 9.5102L8.70825 7.36842C8.61157 7.27175 8.4805 7.21805 8.34299 7.21805H7.99277C8.58578 6.45972 8.93815 5.50591 8.93815 4.46831C8.93815 2 6.93781 0 4.46908 0C2.00034 0 0 2 0 4.46831C0 6.93663 2.00034 8.93663 4.46908 8.93663C5.50685 8.93663 6.46082 8.58432 7.21928 7.99141V8.34157C7.21928 8.47905 7.27299 8.6101 7.36968 8.70677L9.51183 10.8485C9.7138 11.0505 10.0404 11.0505 10.2402 10.8485L10.8483 10.2406C11.0502 10.0387 11.0502 9.71214 10.8504 9.5102ZM4.46908 7.21805C2.95002 7.21805 1.71888 5.98926 1.71888 4.46831C1.71888 2.94952 2.94787 1.71858 4.46908 1.71858C5.98813 1.71858 7.21928 2.94737 7.21928 4.46831C7.21928 5.98711 5.99028 7.21805 4.46908 7.21805Z"
                                    fill="#999999"
                                />
                                </svg>
                            }
                            />
                        </div>
                    </div>
                    <Popover
                        content={addDrugButtonDDContent}
                        trigger="click"
                        placement="bottom"
                      >
                      <div className="add-file-button">
                       <span>Add Drugs</span>

                     <DownArrow />

                      </div>
                      </Popover>
                    </div>
                  </div>
                  <FrxGridContainer
                    className="umair"
                    enableSettings
                    settingsWidth={50}
                    onSearch={() => {}}
                    enableSearch={false}
                    enableColumnDrag={false}
                    fixedColumnKeys={[]}
                    pagintionPosition="topRight"
                    gridName=""
                    isFetchingData={false}
                    columns={VersionDrugActivityColumns()}
                    isPinningEnabled={true}
                    scroll={{ x: 1800, y: 377 }}
                    enableResizingOfColumns
                    data={VersionDrugActivityMockData()}
                    isCustomCheckboxEnabled={true}
                    handleCustomRowSelectionChange={() => {}}
                    customSettingIcon={"FILL-DOT"}
                  />
                </div>
              </Grid>
            </Grid>
            </div>
        )
    }
}