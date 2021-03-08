import React, { Fragment } from "react";
import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid";
import DropDown from "../../shared/Frx-components/dropdown/DropDown";
import FrxDrugGridContainer from "../../shared/FrxGrid/FrxDrugGridContainer";
import Box from '@material-ui/core/Box';
import Button from "../../shared/Frx-components/button/Button";
import FrxMiniTabs from "../../shared/FrxMiniTabs/FrxMiniTabs";
import CustomAccordion from "../../shared/Frx-components/accordion/CustomAccordion"
import { marketingColumns } from "../../../utils/grid/columns";
import { MarketingMockData } from "../../../mocks/MarketingMock";
import {
  getTapList,
  getMaterialTableTab,
} from "../../../mocks/formulary/mock-data";
import downloadIcon from "../../../assets/icons/download.png";
import { DatePicker, TimePicker } from "antd";
import moment from 'moment';
import "./MarketingMaterial.scss";
import MaterialIconPopup from "./MaterialIconPopup";
import AddFileMarketingPopup from "./AddFileMarketingPopup";
import NocReportPopup from "./NocReportPopup";
import WebAnalyticsPopup from "./WebAnalyticsPopup";

import { fetchTable, publishTemplate} from "../../../redux/slices/formulary/marketing_materials/tableSlice";


interface tabsState {
  activeMiniTabIndex: number;
  miniTabs: any;
  tabs: any;
}

interface Props {
  onClose: any;
  openPopup: boolean;
  className?: string;
  mode?: "single" | "multi";
  selectedItem?: any;
  type: string;
  title: "NOC Report"
  title2: "test"
}

interface State {
 
  materialPopupInd: boolean;
  show:boolean;
  
}

function mapDispatchToProps(dispatch) {
  return {
    fetchTable: (params) => dispatch(fetchTable(params)),
    publishTemplate: (params) => dispatch(publishTemplate(params))
  };
}

const mapStateToProps = (state) => {
  // debugger
  return {
    isLoading: state?.marketing_materials_table?.isLoading,
    table_count: state?.marketing_materials_table?.table_count,
    table_list: state?.marketing_materials_table?.table_list,
    current_formulary: state?.application?.formulary,
    // location_home: state?.application?.location_home,
  };
}

const defaultListPayload = {
  index:0,
  limit:10,
  "filter":[],
  "search_key":"",
  "sort_by":["template_group_name"],
  "sort_order":["asc"],
  "template_type":2,
  // "formulary_id":this.props.current_formulary.id_formulary,
  "formulary_id":3910,
  // "base_formulary_id":this.props.current_formulary.id_base_formulary
  "base_formulary_id":3299,
  activeMiniTabIndex:0
};

class MarketingMaterialTable extends React.Component<any, any> {
  listPayload : any = {
    index:0,
    limit:10,
    "filter":[],
    "search_key":"",
    "sort_by":["template_group_name"],
    "sort_order":["asc"],
    "template_type":2,
    // "formulary_id":this.props.current_formulary.id_formulary,
    "formulary_id":3910,
    // "base_formulary_id":this.props.current_formulary.id_base_formulary
    "base_formulary_id":3299,
    activeMiniTabIndex:0
  }
  componentDidMount=()=>{
    this.props.fetchTable(this.listPayload)
  }
  state = {
    miniTabs: getMaterialTableTab(),
    activeTabIndex: 0,
    activeMiniTabIndex: 0,
    materialPopupInd: false,    
    show:false,
    popUpIdn:"",
    title:"",
    communicationPopupHeader: false,
    btnAcordian: false,
    selectedRows: [],
    table_list: []
  };
  UNSAFE_componentWillReceiveProps(newProps){
    if(newProps.table_list !== undefined && newProps.table_list !== null){
      const data = newProps.table_list.map((e,index) => {
        return {
          "id": index,
          "key": index,
          "template_group_name":(e.template_group_name??"N/A"),
          "language": (e.language??"N/A"),
          "template": "sample.svg",
          "liveUrlPublishDateAndTime": (e.live_url_date??"N/A"),
          "archiveUrlPublishDateAndTime": (e.archive_url_date??"N/A"),
          template_packet_language_id: e.template_packet_language_id
        }
      })
      this.setState({
        table_list: data
      })
    }
  }
  onClose = () => {
    console.log("close");
    this.setState({ materialPopupInd: false });
    return true;
  };
  closeClaimsResult = () => {
    this.setState({ materialPopupInd: false });
  };
  handleIconClick = (param,title,headerData) => {
    this.setState({ materialPopupInd: true });
    this.setState({ popUpIdn: param });
    this.setState({ title: title });
    this.setState({ communicationPopupHeader: headerData });
  }

  onClickMiniTab = (num: number) => {
    this.setState({
      activeMiniTabIndex: num,
    });
    this.listPayload.activeMiniTabIndex = num;
    this.props.fetchTable(this.listPayload);
  };

  applyFilterHandler = (filters) => {
    const fetchObjectKeys = Object.keys(filters);
    if (fetchObjectKeys && fetchObjectKeys.length > 0) {
      const fetchedProps = Object.keys(filters)[0];
      const fetchedOperator =
        filters[fetchedProps][0].condition === "is like"
          ? "is_like"
          : filters[fetchedProps][0].condition === "is not"
          ? "is_not"
          : filters[fetchedProps][0].condition === "is not like"
          ? "is_not_like"
          : filters[fetchedProps][0].condition === "does not exist"
          ? "does_not_exist"
          : filters[fetchedProps][0].condition;
      const fetchedValues =
        filters[fetchedProps][0].value !== ""
          ? [filters[fetchedProps][0].value.toString()]
          : [];
      const newFilters = [
        {
          prop: fetchedProps,
          operator: fetchedOperator,
          values: fetchedValues,
        },
      ];
      this.listPayload.filter = newFilters;
      this.props.fetchTable(this.listPayload);
    } else {
      this.listPayload.filter = [];
      this.props.fetchTable(this.listPayload);
    }
  };
  clearFilterHandler = () => {
    // console.log("Clear Filter");
    let base_formulary_id = this.listPayload.base_formulary_id;
    this.listPayload = { ...defaultListPayload };
    this.listPayload.base_formulary_id = base_formulary_id;
    this.props.fetchTable(this.listPayload);
  };
  onGridPageChangeHandler = (pageNumber: any) => {
    this.listPayload.index = (pageNumber - 1) * this.listPayload.limit;
    this.props.fetchTable(this.listPayload);
  };
  onPageSize = pageSize => {
    let base_formulary_id = this.listPayload.base_formulary_id;
    this.listPayload = { ...defaultListPayload };
    this.listPayload.limit = pageSize;
    this.listPayload.base_formulary_id = base_formulary_id;
    this.props.fetchTable(this.listPayload);
  };
  applySortHandler = (key, order) => {
    console.log("key and order ", key, order);
    const listPayload = { ...this.listPayload };
    listPayload.sort_by = [key];
    const sortorder = order && order === "ascend" ? "asc" : "desc";
    listPayload.sort_order = [sortorder];
    this.listPayload = listPayload;
    this.props.fetchTable(this.listPayload);
  };
  rowSelectionChangeFromCell = ( key: string, selectedRow: any, isSelected: boolean ) => {
    if (!selectedRow["isDisabled"]) {
      if (isSelected) {
        const data = this.state.table_list.map((d: any) => {
          if (d["key"] === selectedRow.key) {
            d["isChecked"] = isSelected;
            d["rowStyle"] = "table-row--green-font";
          }
          return d;
        });

        this.setState({ 
          table_list: data, 
          selectedRows: [...this.state.selectedRows, selectedRow.template_packet_language_id] 
        });
      } else {
        const data = this.state.table_list.map((d: any) => {
          if (d["key"] === selectedRow.key) {
            d["isChecked"] = isSelected;
            if (d["rowStyle"]) delete d["rowStyle"];
          }
          return d;
        });
        const newSelectedRows = this.state.selectedRows.filter(
          (item: any) => item !== selectedRow.template_packet_language_id
        );

        this.setState({
          table_list: data,
          selectedRows: newSelectedRows,
        });
      }
    }
  };
  onSelectAllRows = (isSelected: boolean) => {
    const selectedRowKeys: number[] = [];
    const data = this.state.table_list.map((d: any) => {
      if (!d["isDisabled"]) {
        d["isChecked"] = isSelected;
        if (isSelected) {
          selectedRowKeys.push(d["key"]);
          d["rowStyle"] = "table-row--green-font";
        } else {
          if (d["rowStyle"]) delete d["rowStyle"];
        }
      }
      // else d["isSelected"] = false;
      return d.template_packet_language_id;
    });
    this.setState({
      table_list: data,
      isSelectAll: isSelected,
      selectedRows: isSelected ? data : [],
    });
  };

  publishTemplate = ()=>{
    debugger;
    if(this.state.selectedRows.length>0) {
      const params = {
        formulary_id: 3910,
        publish_date: "2021-02-24 00:00:00",
        templates: this.state.selectedRows.map((item)=>{
          return {
            plan_info_id: 0,
            template_packet_language_id: item
          };
        })
      };
      this.props.publishTemplate(params);
    } 
  };

  processCloseActions = () => {
    this.setState({ show: true });
  };

  render() {
    console.log(this.props.table_list)
    return (
        <Fragment>
          <div className="marketing-material-table-container">
          <div className="header-material space-between pr-10">
            MATERIALS AND SEARCH TOOLS
            <div className="button-wrapper">
              <Button label="NOC Report" onClick={(e) => this.handleIconClick("noc", "Noc report",false)} />
              <Button label="Website Analytics" onClick={(e) => this.handleIconClick("web", "Website traffic analysis",false)} className="web-anylaytic-btn" />
              <img
              style={{ marginRight: "20px" }}
              src={downloadIcon}
              alt=""
              width="16px"
              height="16px"
            />
            </div>
          </div>
          <div className="date-time-wrapper">
            <div className="group">
                <label>
                  Publish Date And Time
                </label>
                <DatePicker
                  className="effective-date"
                  placeholder="Select Date"
                  suffixIcon={
                    <svg
                      width="18"
                      height="20"
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
            </div>
            <div className="group time-picker">
            <TimePicker defaultValue={moment('13:30:56', 'HH:mm:ss')} />
            </div>
            <div className="submit-btn">
            <Box display="flex">
              <Button label="Submit" className="sub-btn" onClick={this.publishTemplate} />
            </Box>
            </div>
          </div>
          <div className="marketing-material-table">
          <div className="header space-between pr-10">
            COMMON MATERIALS
            <div className="button-wrapper">
              <Button label="Add File" onClick={(e) => this.handleIconClick("addFile","communication",true)} />
            </div>
          </div>
          <div className="mini-tabs">
            <FrxMiniTabs
              tabList={this.state.miniTabs}
              activeTabIndex={this.state.activeMiniTabIndex}
              onClickTab={this.onClickMiniTab}
            />
          </div>
          </div>
          </div>
          <div className="popup-wrapper-add-file">
          <MaterialIconPopup
            className="frx-claims-result-rooty"
            open= {this.state.materialPopupInd}
            positiveActionText="Communication"
            ulpoadIconBtnText="Select"
            title={this.state.title}
            communicationPopupHeader={this.state.communicationPopupHeader}
            showCloseIcon={true}
            showActions={false}
            handleClose={() => {
              this.onClose();
            }}
            handleAction={() => {
              this.processCloseActions();
            }}
          >
            {this.state.popUpIdn === "addFile" ?
          <AddFileMarketingPopup /> 
          : this.state.popUpIdn === "noc" ?
          <NocReportPopup />
          : 
          <WebAnalyticsPopup />
        }
        </MaterialIconPopup>
        </div>
        <div className="market-tabel-border">
          <div className="bordered">
          {/* <FrxDrugGridContainer
            isPinningEnabled={false}
            enableSearch={false}
            enableColumnDrag
            onSearch={() => {}}
            fixedColumnKeys={["checkbox"]}
            pagintionPosition="topRight"
            totalRowsCount={this.props.table_count}
            onGridPageChangeHandler={this.onGridPageChangeHandler}
            getPerPageItemSize={this.onPageSize}
            gridName="TIER"
            enableSettings
            columns={marketingColumns()}
            scroll={{ x: 2000, y: 377 }}
            isFetchingData={false}
            enableResizingOfColumns
            // applyFilter={this.onApplyFilterHandler}
            // clearFilterHandler={this.onClearFilterHandler}
            applySort={this.applySortHandler}
            rowSelectionChangeFromCell={this.rowSelectionChangeFromCell}
            onSelectAllRows={this.onSelectAllRows}
            //PLACEHOLDER
            // data={MarketingMockData()}
            //SAMPLE API OBJ
            // {
            //   template_packet_language_id: 24142,
            //   template_group_name: '81201',
            //   language: 'English',
            //   publish_date: '2020-12-09 00:00:00',
            //   archive_url_date: '2020-12-08 06:25:52',
            //   live_url_date: '2020-12-09 00:00:00',
            //   archive_url: 'https://host-post-documents.s3.ap-south-1.amazonaws.com/1607408751682/templates_1_20201208T062543.pdf',
            //   live_url: 'https://host-post-documents.s3.ap-south-1.amazonaws.com/2755-24142-1.pdf'
            // }
            data={this.state.table_list}
            rowSelection={{
              columnWidth: 50,
              fixed: true,
              type: "checkbox",
            }}
          /> */}
          <FrxDrugGridContainer
            enableSearch={false}
            enableColumnDrag
            isPinningEnabled={false}
            // isDataLoaded={false}
            onSearch={() => {}}
            fixedColumnKeys={[
              "checkbox"
            ]}
            pagintionPosition="topRight"
            gridName="ALTERNATIVE DRUG LIST"
            enableSettings={true}
            // ** opt start
            showSettingsMenu={true}
            // settingsTriDotMenuClick={(item: any, data?: any) => {
            //   this.props.alternativeListTriDotClick(
            //     item,
            //     this.state.selectedRow
            //   );
            // }}
            // settingsTriDotClick={(item: any) => {
            //   this.setState({
            //     selectedRow: item,
            //   });
            // }}
            onSettingsClick={"grid-menu"}
            // ** opt end
            // ** pagination start
            getPerPageItemSize={this.onPageSize}
            onGridPageChangeHandler={this.onGridPageChangeHandler}
            clearFilterHandler={this.clearFilterHandler}
            totalRowsCount={this.props.table_count}
            pageSize={this.props.pageSize}
            selectedCurrentPage={this.props.selectedCurrentPage}
            // ** pagination end
            // ** filter start
            applyFilter={this.applyFilterHandler}
            applySort={this.applySortHandler}
            columns={marketingColumns()}
            scroll={{ x: 2000, y: 420 }}
            isFetchingData={this.props.isLoading}
            enableResizingOfColumns
            data={this.state.table_list}
            rowSelectionChangeFromCell={this.rowSelectionChangeFromCell}
            onSelectAllRows={this.onSelectAllRows}
          />
            <div className="group-accordian">
            <CustomAccordion name="Group 1" btnAcordian={true}>

            </CustomAccordion>
            </div>
            <div className="group-accordian">
            <CustomAccordion name="Group 2" btnAcordian={true}>

            </CustomAccordion>
          </div>
        </div>
        </div>
    </Fragment>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MarketingMaterialTable);
