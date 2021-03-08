import { Grid } from '@material-ui/core';
import React, { Component } from 'react';
import FrxDialogPopup from '../shared/FrxDialogPopup/FrxDialogPopup';
import FrxMiniTabs from '../shared/FrxMiniTabs/FrxMiniTabs';
import FrxGrid from '../shared/FrxGrid/FrxGrid';
import FrxLoader from '../shared/FrxLoader/FrxLoader';

import { getAuditMockColumns } from "../../utils/grid/columns";
import { getAuditMockData } from "../../mocks/grid/audit-mock";

import './MemberAuditPopup.scss';

const sampleImage = require('../../mocks/sample.svg')

interface MemberAuditPopupProps {
    onClose: any;
    openPopup: any;
}
interface MemberAuditPopupState {
    activeMiniTabIndex: number;
    miniTabs: any;
    filteredData: any;
    isFetchingData: boolean;
    data: any;
}

class MemberAuditPopup extends Component<MemberAuditPopupProps, MemberAuditPopupState>{
    state = {
        activeMiniTabIndex: 0,
        filteredData: [],
        isFetchingData: false,
        data: [],
        miniTabs: [
            {
                id: 1,
                text: "Update"
            },
            {
                id: 2,
                text: "View"
            }
        ]
    }
    /**
   *@function onClose
   *
   * Close the member audit popup
   * will call callback function from onclose parameter.
   * @memberof MemberAuditPopup
   */

    onClose = () => {
        this.props.onClose()
    }

    /**
      *@function onClickMiniTab
      *
      * onClickMiniTab the member audit popup
      * 
      * @memberof MemberAuditPopup
      */

    onClickMiniTab = (num: number) => {
        this.setState({
            activeMiniTabIndex: num,
            isFetchingData: true
        })
        this.processData(num)
    }
    /**
       * Action method if any action is required for dialog popup
       *
       * @memberof MemberAuditPopup
       */
    action = () => {
        console.log('no action to perform')
    }

    processData(num: number) {
        const data = getAuditMockData()[num]
        this.setState({ data, filteredData: data, isFetchingData: false });
    }
    componentDidMount() {
        this.processData(0)
    }
    handleSearch = (searchObject: any) => {
        console.log(searchObject);
        this.setState({ isFetchingData: true });
        if (searchObject && searchObject.status) {
            setTimeout(() => {
                const newData = this.state.data.filter(
                    (d: any) => d.status === searchObject.status
                );
                this.setState({ isFetchingData: false, filteredData: newData });
            }, 2000);
        } else {
            this.setState({ isFetchingData: false });
        }
    };
    render() {
        const columns = getAuditMockColumns();

        return (<>
            <FrxDialogPopup
                positiveActionText=""
                negativeActionText="Close"
                title="MEMBER AUDITS"
                handleClose={this.onClose}
                handleAction={this.action}
                open={this.props.openPopup}
                showActions={false}
                className="member-audit-popup-root"
                height="80%"
                width="90%"
            >
                <>
                    <FrxMiniTabs tabList={this.state.miniTabs} activeTabIndex={this.state.activeMiniTabIndex} onClickTab={this.onClickMiniTab} />

                    <div className="frx-grid-container">
                        <FrxGrid
                            showSettingsMenu={false}
                            enableColumnDrag={false}
                            pagintionPosition="topRight"
                            columns={columns}
                            data={this.state.filteredData}
                            gridName={"Audit"}
                            fixedColumnKeys={['record_type']}
                            hideClearFilter={true}
                            hideItemsPerPage={true}
                            loading={{
                                spinning: this.state.isFetchingData,
                                indicator: <FrxLoader />
                            }}
                            hideMultiSort={true}
                            hidePageJumper={true}
                            hideResults={true}
                            scroll={{ x: 300, y: 400 }}
                            enableSettings={false}
                            hidePagination={true}
                        />
                    </div>
                </>
            </FrxDialogPopup>
        </>)
    }
}

export default MemberAuditPopup;