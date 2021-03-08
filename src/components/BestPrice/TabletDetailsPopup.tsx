import React from "react";
import { Spin } from 'antd';
import { Button } from "@material-ui/core";
import DialogPopup from "../shared/FrxDialogPopup/FrxDialogPopup";
import FrxLoader from '../shared/FrxLoader/FrxLoader';
import TabletDetailsMapPopup from './TabletDetailsMapPopup';
import { RightOutlined, DownOutlined } from '@ant-design/icons';
// import Messages from '../../constants/Messages';
import DrugPopup1 from '../../assets/img/DrugPopup1.png';
import { drugData, timeData } from '../../mocks/BestPriceDrugMock';

import "./TabletDetailsPopup.scss";

interface TabletDetailsPopupProps {
    isOpen: boolean;
    description: string;
    mapData: any;
    title: string;
    subTitle: string;
    onClose: () => void;
}

class TabletDetailsPopup extends React.Component<TabletDetailsPopupProps> {
    state = {
        isMemberNotificationsDialogOpen: this.props.isOpen,
        formList: [],
        selectedTab: 0,
        setOpen: false,
        activeTabIndex: 0,
        isFetchingData: false,
        isLoader: false,
        isOpenMapDialog: false,
        isTimeToggle: false
    };

    componentDidMount() {

    }



    openMemberNotificationsEditDialog = () => {
        this.setState({ isMemberNotificationsDialogOpen: true });
    };

    handleMemberNotificationEditDialogAction = (action: string) => {
        this.setState({ isMemberNotificationsDialogOpen: false });
        this.props.onClose();
    };

    handleMemberNotificationDialogClose = () => {
        this.setState({ isMemberNotificationsDialogOpen: false });
        this.props.onClose();
    };

    onHandleMapDialogClick = () => {
        this.setState({ isOpenMapDialog: !this.state.isOpenMapDialog, isMemberNotificationsDialogOpen: true })
    }

    handleTimeToggle = () => {
        this.setState({ isTimeToggle: !this.state.isTimeToggle })
    }

    render() {
        const { isMemberNotificationsDialogOpen } = this.state;
        const { mapData } = this.props
        return (
            <div>

                <React.Fragment>
                    <DialogPopup
                        positiveActionText="Edit"
                        negativeActionText="Cancel"
                        title={'VOLTAREN'}
                        handleClose={this.handleMemberNotificationDialogClose}
                        handleAction={this.handleMemberNotificationEditDialogAction}
                        open={isMemberNotificationsDialogOpen}
                        showActions={false}
                        className="tablet-details-popup-root"
                    >

                        <div>
                            <Spin spinning={this.state.isLoader} indicator={<FrxLoader />}>
                                <div className="TabletDetailsHeading">
                                    <h3>{this.props.subTitle}</h3>
                                    <Button className="Head-Btn" onClick={this.onHandleMapDialogClick}>Map It</Button>
                                </div>
                                <div className="TabletBodyDetails">
                                    <div className="TabletBodyDetails__leftside">
                                        <div className="TabletBodyDetails__leftside_bgimg">
                                            <img src={DrugPopup1} />
                                        </div>
                                        <span><span className="astreak">*</span>Image may vary by manufacturer </span>
                                        <div className="TabletBodyDetails__leftside_typography">
                                            <p>{this.props.description}</p>
                                        </div>
                                    </div>

                                    <div className="TabletBodyDetails__rightside">
                                        {mapData.map((item) => (
                                            <div >
                                                <div className="TabletBodyDetails__rightside_box">
                                                    <div className="price">{item.bestPrice}</div>
                                                    <div className="companyName">{item.pharmacy}</div>
                                                    <div className="address">{item.address}</div>
                                                    <div className="phoneNumber">{item.phone}</div>

                                                    <div className="operatingHours">
                                                        Operating Hours {this.state.isTimeToggle ? (<svg className="svgIcon" onClick={() => this.handleTimeToggle()} width="9" height="5" viewBox="0 0 9 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M0.223752 0.24549C0.531543 -0.0693596 0.960049 -0.0940675 1.33632 0.24549L4.09513 2.89065L6.85395 0.24549C7.23022 -0.0940675 7.65943 -0.0693596 7.9651 0.24549C8.27289 0.559634 8.25313 1.0905 7.9651 1.38559C7.67849 1.68067 4.65071 4.56373 4.65071 4.56373C4.57861 4.63846 4.49219 4.69789 4.39662 4.73849C4.30104 4.77908 4.19827 4.8 4.09443 4.8C3.99059 4.8 3.88782 4.77908 3.79224 4.73849C3.69666 4.69789 3.61025 4.63846 3.53815 4.56373C3.53815 4.56373 0.511776 1.68067 0.223752 1.38559C-0.0649778 1.0905 -0.0840382 0.559634 0.223752 0.24549Z" fill="#666666" />
                                                        </svg>) : (<svg className="svgIcon" onClick={() => this.handleTimeToggle()} width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M0.939826 8.27039C0.624976 7.9626 0.600268 7.53409 0.939826 7.15782L3.58499 4.39901L0.939826 1.64019C0.600268 1.26392 0.624976 0.834709 0.939826 0.529037C1.25397 0.221246 1.78484 0.241013 2.07992 0.529037C2.37501 0.815649 5.25807 3.84343 5.25807 3.84343C5.3328 3.91553 5.39223 4.00195 5.43282 4.09752C5.47341 4.1931 5.49434 4.29587 5.49434 4.39971C5.49434 4.50355 5.47341 4.60633 5.43282 4.7019C5.39223 4.79748 5.3328 4.88389 5.25807 4.95599C5.25807 4.95599 2.37501 7.98236 2.07992 8.27039C1.78484 8.55912 1.25397 8.57818 0.939826 8.27039Z" fill="#666666" />
                                                        </svg>)}
                                                    </div>
                                                    <div className="hours-container">
                                                        {item.workingHours.map((_item) => (
                                                            this.state.isTimeToggle ? (
                                                                <div className="hoursBox">
                                                                    <div className="monthsTitle">{_item.day}</div>
                                                                    <div className="timeTitle">{_item.time}</div>
                                                                </div>
                                                            ) : ""
                                                        ))}
                                                    </div>

                                                </div>
                                                <span className="hr"></span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Spin>
                            {this.state.isOpenMapDialog ? (
                                <TabletDetailsMapPopup
                                    description={this.props.description}
                                    title={this.props.title}
                                    subTitle={this.props.subTitle}
                                    mapData={this.props.mapData}
                                    isOpenMapDialog={this.state.isOpenMapDialog}
                                    onClose={this.onHandleMapDialogClick} />
                            ) : ""}
                        </div>
                    </DialogPopup>
                </React.Fragment>

            </div>
        );
    }
}

export default TabletDetailsPopup;
