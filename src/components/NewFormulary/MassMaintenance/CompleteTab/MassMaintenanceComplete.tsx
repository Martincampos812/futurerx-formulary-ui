import React from 'react';
import { connect } from "react-redux";
import "./MassMaintenanceComplete.scss";
import FrxGridContainer from "../../../shared/FrxGrid/FrxDrugGridContainer";
import FrxLoader from "../../../shared/FrxLoader/FrxLoader";
import Button from "../../../shared/Frx-components/button/Button";
import {getMassMaintenanceCompleteTabColumns} from "../../../../utils/grid/columns";
import { getMaintenanceMassCompleteSelected } from "../../../../mocks/MassMCompleteSelectedMock";
import {formatDate, formatDateAndTime} from "../../../../utils/formatters/date-format";
import { fetchCompleteTabData, setSelectedRow } from "../../../../redux/slices/maintenance/maintenanceSlice";
import { gridSettingsSlice } from "../../../../redux/slices/formulary/gridHandler/gridSettingsSlice";
import { Column } from "../../../../models/grid.model";
import * as _ from "lodash";
import {
  setFormulary,
  setLocation,
  setLocationHome,
  clearApplication,
  setModeLob
} from "../../../../redux/slices/formulary/application/applicationSlice";
import {postCompleteMaintenanceFomulary} from "../../../../redux/slices/maintenance/maintenanceService"
import showMessage from '../../Utils/Toast';
class MassMaintenanceComplete extends React.Component<any, any> {
    state = {
        isFetchingData: false,
        data: [] as any[],
        filteredData: [] as any[],
        gridSingleSortInfo: null,
        isGridSingleSorted: false,
        gridMultiSortedInfo: [],
        isGridMultiSorted: false,
    }

    listPayload: any = {
        id_maintenance_formulary: this.props.rowId,
    };

    componentDidMount() {  
        this.props.fetchCompleteTabData(this.listPayload);
    }

    componentWillReceiveProps(newProps){
        console.log("newProps",newProps)
        if(newProps.lob_id !== this.props.lob_id){
         this.props.fetchLandingData(this.listPayload);
        }
    }

    handleSearch = searchObject => {
        console.log(searchObject);
        this.setState({ isFetchingData: true });
        if (searchObject && searchObject.status) {
        setTimeout(() => {
            const newData = this.state.data.filter(
            d => d.status === searchObject.status
            );
            this.setState({ isFetchingData: false, filteredData: newData });
        }, 2000);
        } else {
        this.setState({ isFetchingData: false });
        }
    };

    applySortHandler = (key, order, sortedInfo) => {
        console.log("sorted info for single sorting ", sortedInfo);
        this.setState(
          {
            gridSingleSortInfo: sortedInfo,
            isGridSingleSorted: true,
            isGridMultiSorted: false,
            gridMultiSortedInfo: [],
          },
          () => {
            // this.props.applySortHandler(key, order);
            this.onApplySortHandler(key, order)
          }
        );
        // this.props.fetchFormularies(this.listPayload);
      };
    
      onApplySortHandler = (key, order) => {
        console.log("key and order ", key, order);
        const listPayload = { ...this.listPayload };
        listPayload.sort_by = [key];
        const sortorder = order && order === "ascend" ? "asc" : "desc";
        listPayload.sort_order = [sortorder];
        this.listPayload = listPayload;
        this.props.fetchCompleteTabData(this.listPayload);
      };

      handleApplyChanges = () => {

          this.props.postCompleteMaintenanceFomulary(this.listPayload).then((json) => {
            showMessage("success" ,"success");
            this.props.history.push("/")
          });
          
      }

      handleAdditionalChanges = () => {
          this.props.onClickTab()
      }
    

    render() {
        console.log("selectedFormulary", this.props.rowData)
        const selected_formularies_columns = getMassMaintenanceCompleteTabColumns();
        const data = this.props.maintenanceGrid.landing
        let GridElement =  this.props.maintenanceGrid.isLoading;
        const gridData = [] as any;
        if(data){
            let selectedFormularies = {
                formulary_name: this.props.rowData.formulary_names ? this.props.rowData.formulary_names.length > 18 ? this.props.rowData.formulary_names.slice(0, 18) + "..." : this.props.rowData.formulary_names : "NA",
                formulary_version: data.id_lob !== undefined ? data.id_lob : "NA",
                contact_year: data.contract_year !== undefined ? data.contract_year : "NA",
                formulary_type: data.lob_name !== undefined ? data.lob_name : "NA",
                effective_date: formatDateAndTime(data.effective_date)
            }
            gridData.push(selectedFormularies)
        }
        console.log("result", data, gridData);
        return (
            <>
            <div className="bordered mass-maintenance-complete-root">
                <div className="complete-header">
                    <span>Selected Formularies</span>
                </div>
                {GridElement ? <FrxLoader /> : (
                <div className="mass-maintenance-selected-root">
                <FrxGridContainer
                    enableSearch
                    enableColumnDrag
                    onSearch={this.handleSearch}
                    enableSettings={false}
                    fixedColumnKeys={["formulary_name"]}
                    gridName="SELECTED FORMULARIES"
                    isFetchingData={this.state.isFetchingData}
                    columns={selected_formularies_columns}
                    // data={this.state.filteredData}
                    data = {gridData}
                    pagintionPosition="topRight"
                    onSettingsClick="grid-menu"
                    scroll={{ x: 0, y: 300 }}
                    hidePagination
                    hideClearFilter
                    applySort={this.applySortHandler}
                />
                </div>
                )}
            </div>
            <div className="bordered mass-maintenance-complete-action-root">
                <div className="complete-header">
                    <span>COMPLETE MAINTENANCE SETTINGS</span>
                </div>
                <div className="action-info">
                    <span>Are you ready to apply changes to each formulary?</span>
                <div className="action-btn">
                    {/* <Button onClick={this.handleApplyChanges} label="Cancel" /> */}
                    <Button onClick={this.handleAdditionalChanges} label="Make Additional Changes" />
                    <Button onClick={this.handleApplyChanges} label="Apply Changes" />
                </div>
                </div>
            </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    console.log("stateLOb", state)
    return {
      maintenanceGrid: {
        count: state.maintenance.selectedFormularies.count,
        landing: state.maintenance.selectedFormularies.list,
        isLoading: state.maintenance.isLoading,
        grid_settings: state.gridSettings,
        refernce_id: state.maintenance.selectedFormularies.list.id_formulary_maintenance
      },
      rowId: state.maintenance.selectedRow.id_maintenance_formulary,
      rowData: state.maintenance.selectedRow
    };
  };
  
  function mapDispatchToProps(dispatch) {
    return {
      fetchCompleteTabData: (a) => dispatch(fetchCompleteTabData(a)),
      setHiddenColumn: hiddenColumns =>
        dispatch(gridSettingsSlice.actions.setHiddenColum(hiddenColumns)),
      clearHiddenColumns: () =>
        dispatch(gridSettingsSlice.actions.clearHiddenColumns(true)),
        setModeLob: a => dispatch(setModeLob(a)),
        postCompleteMaintenanceFomulary:(a) => dispatch(postCompleteMaintenanceFomulary(a)),
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(MassMaintenanceComplete);


