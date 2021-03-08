import React from "react";

// antd
import {  Tooltip } from 'antd';

// Components
import {FormularyTierColumn,FormularyLimitColumn} from "./FormularyColumns";
import DrugDetails from "../drug-details/DrugDetails";

export interface FormularyDetailedTableProps {
    rowData: any,
}


class FormularyDetailedHeader extends React.Component<FormularyDetailedTableProps> {
    state = {
        drugDetailPopup: false
    };
    
    handleDrugDetailPopup = () => {
        this.setState({
            drugDetailPopup: !this.state.drugDetailPopup
        })
    }

    render() {
        const {rowData} = this.props;
        return(
          <React.Fragment>
                <div key={rowData.key} className="formulary-detailed-table-root__header">
                    <div className="formulary-detailed-table-root__header--fields">
                        <span className="field-tier-cell">
                            <FormularyTierColumn data={rowData} />
                        </span>
                    </div>
                    <div className="formulary-detailed-table-root__header--fields drug-field">
                        <div className="formulary-detailed-table-root__header--fields">
                        <label>Drug label</label>
                        <span className="formulary-detailed-table-root__header--fields__labelvalue">{rowData.labelname}</span>
                        </div>
                        <svg onClick={this.handleDrugDetailPopup} className="icon-info" width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.4688 8.5C16.4688 13.1945 12.7821 17 8.23438 17C3.68668 17 0 13.1945 0 8.5C0 3.80554 3.68668 0 8.23438 0C12.7821 0 16.4688 3.80554 16.4688 8.5ZM15.5 8.5C15.5 12.6421 12.2471 16 8.23438 16C4.22167 16 0.96875 12.6421 0.96875 8.5C0.96875 4.35791 4.22167 1 8.23438 1C12.2471 1 15.5 4.35791 15.5 8.5ZM9.53006 11.6562L9.61202 11.3229C9.5428 11.3472 9.44262 11.3681 9.31148 11.3854C9.18397 11.4028 9.08561 11.4115 9.01639 11.4115C8.80874 11.4115 8.65756 11.375 8.56284 11.3021C8.47177 11.2292 8.42623 11.0938 8.42623 10.8958C8.42623 10.8125 8.43898 10.7066 8.46448 10.5781C8.49362 10.4462 8.52641 10.3125 8.56284 10.1771L9.14754 7.96354C9.17669 7.8559 9.19854 7.74826 9.21311 7.64062C9.22769 7.53299 9.23497 7.44792 9.23497 7.38542C9.23497 7.15625 9.16758 6.97396 9.03279 6.83854C8.898 6.70312 8.68124 6.63542 8.38251 6.63542C8.25137 6.63542 8.07286 6.66493 7.84699 6.72396C7.62113 6.78299 7.36612 6.87326 7.08197 6.99479L7 7.32812C7.06922 7.31076 7.1694 7.28993 7.30055 7.26562C7.43534 7.24132 7.54281 7.22917 7.62295 7.22917C7.8306 7.22917 7.96721 7.26215 8.03279 7.32812C8.102 7.39062 8.13661 7.5191 8.13661 7.71354C8.13661 7.81076 8.12204 7.92882 8.0929 8.06771C8.0674 8.2066 8.04007 8.33681 8.01093 8.45833L7.43169 10.6719C7.39891 10.8038 7.37523 10.9132 7.36066 11C7.34608 11.0868 7.3388 11.1701 7.3388 11.25C7.3388 11.4618 7.41166 11.6406 7.55738 11.7865C7.7031 11.9288 7.92168 12 8.21311 12C8.35519 12 8.52641 11.974 8.72678 11.9219C8.92714 11.8733 9.1949 11.7847 9.53006 11.6562ZM9.79781 5.1875C9.9326 5.03819 10 4.86458 10 4.66667C10 4.48958 9.93443 4.33507 9.80328 4.20312C9.67213 4.06771 9.50273 4 9.29508 4C9.10929 4 8.949 4.07118 8.81421 4.21354C8.67942 4.3559 8.61202 4.52257 8.61202 4.71354C8.61202 4.8941 8.67942 5.05556 8.81421 5.19792C8.949 5.33681 9.10929 5.40625 9.29508 5.40625C9.49545 5.40625 9.66302 5.33333 9.79781 5.1875Z" fill="#5F80B9"/>
                        </svg>
                        {this.state.drugDetailPopup ? (
                        <DrugDetails
                            openPopup={this.state.drugDetailPopup}
                            onClose={this.handleDrugDetailPopup}
                        />
                        ) : ""}
                    </div>
                    <div className="formulary-detailed-table-root__header--fields">
                        <label>Brand/Generic</label>
                        <span className="formulary-detailed-table-root__header--fields__labelvalue">{rowData.brandgeneric}</span>
                    </div>
                    <div className="formulary-detailed-table-root__header--fields">
                        <label>Therapeutic Category/Class</label>
                        <span className="formulary-detailed-table-root__header--fields__labelvalue">{rowData.category}</span>
                    </div>
                    <div className="formulary-detailed-table-root__header--fields">
                    <span className="field-limit-cell">
                        <FormularyLimitColumn data={rowData} />
                    </span>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}


export default FormularyDetailedHeader;