import React from 'react';
import Button from '../../../../../../../shared/Frx-components/button/Button';
import DialogPopup from '../../../../../../../shared/FrxDialogPopup/FrxDialogPopup';
import FrxGridContainer from "../../../../../../../shared/FrxGrid/FrxDrugGridContainer";
import {uploadFileColumns} from "../../../../../../../../utils/grid/columns";
import FileExpanded from './fileExpanded';
import FileUploadDetails from './FileUploadDetails';
import './fileUpload.scss';

const uploadData = [
    {
        id: 1,
        key: 1,
        file_name: "FRX Standard Template",
        upload_status: "Complete",
        user: "Preeti Patel",
        uload_date: "09/09/2020 @ 10:21 AM"
    },
    {
        id: 2,
        key: 2,
        file_name: "FRX Standard Template 1",
        upload_status: "Complete",
        user: "Preeti Patel",
        uload_date: "09/09/2020 @ 10:21 AM"
    },
    {
        id: 3,
        key: 3,
        file_name: "FRX Standard Template 2",
        upload_status: "Complete",
        user: "Preeti Patel",
        uload_date: "09/09/2020 @ 10:21 AM"
    }
]
class FileUpload extends React.Component<any,any> {
    state = {
        showModal: true,
        uploadData: [],
        isDetail: false,
        dialogHeader: 'COMMERCIAL UPLOADS'
    }
    handleContinueAction = () => {

    }
    handleCloseAction = () => {
        this.setState({
            showModal: false
        })
    }
    componentDidMount() {
        this.setState({
            uploadData: uploadData
        })
    }
    onShowDetails = (fileName) => {
        console.log(fileName)
        this.setState({
            isDetail: true,
            dialogHeader: fileName
        })
    }
    backToUploadList = () => {
        this.setState({
            isDetail: false
        })
    }
    render(){
        const { showModal } = this.state;
        return (
            !this.state.isDetail ? (
                <DialogPopup
                showCloseIcon={false}
                positiveActionText="Download Templates"
                negativeActionText=""
                title={"COMMERCIAL UPLOADS"}
                headJSX={() => (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.75 0H9.25C9.66562 0 10 0.334375 10 0.75V6H12.7406C13.2969 6 13.575 6.67188 13.1812 7.06563L8.42813 11.8219C8.19375 12.0562 7.80937 12.0562 7.575 11.8219L2.81562 7.06563C2.42188 6.67188 2.7 6 3.25625 6H6V0.75C6 0.334375 6.33437 0 6.75 0ZM16 11.75V15.25C16 15.6656 15.6656 16 15.25 16H0.75C0.334375 16 0 15.6656 0 15.25V11.75C0 11.3344 0.334375 11 0.75 11H5.33437L6.86562 12.5312C7.49375 13.1594 8.50625 13.1594 9.13437 12.5312L10.6656 11H15.25C15.6656 11 16 11.3344 16 11.75ZM12.125 14.5C12.125 14.1562 11.8438 13.875 11.5 13.875C11.1562 13.875 10.875 14.1562 10.875 14.5C10.875 14.8438 11.1562 15.125 11.5 15.125C11.8438 15.125 12.125 14.8438 12.125 14.5ZM14.125 14.5C14.125 14.1562 13.8438 13.875 13.5 13.875C13.1562 13.875 12.875 14.1562 12.875 14.5C12.875 14.8438 13.1562 15.125 13.5 15.125C13.8438 15.125 14.125 14.8438 14.125 14.5Z" fill="#1D54B4"/>
                    </svg>                            
                )}
                handleClose={this.props.onClose}
                handleAction={this.handleContinueAction}
                showActions={true}
                open={showModal}
                popupMaxWidth={"lg"}
                className="file-upload-dialog"
                >
                    <FrxGridContainer
                        enableSearch={false}
                        enableColumnDrag
                        hidePagination
                        isDataLoaded={true}
                        fixedColumnKeys={[]}
                        pagintionPosition="topRight"
                        gridName="Upload File"
                        columns={uploadFileColumns()}
                        scroll={{ x: 0, y: 377 }}
                        isFetchingData={false}
                        enableResizingOfColumns
                        data={this.state.uploadData}
                        expandable={{
                            isExpandable: true,
                            expandIconColumnIndex: 4,
                            expandedRowRender: props => (
                            <FileExpanded showDetails={this.onShowDetails}/>
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
                </DialogPopup>
            ) : (
                
                    <DialogPopup
                        showCloseIcon={false}
                        positiveActionText=""
                        negativeActionText=""
                        title={this.state.dialogHeader}
                        headJSX={() => (
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.75 0H9.25C9.66562 0 10 0.334375 10 0.75V6H12.7406C13.2969 6 13.575 6.67188 13.1812 7.06563L8.42813 11.8219C8.19375 12.0562 7.80937 12.0562 7.575 11.8219L2.81562 7.06563C2.42188 6.67188 2.7 6 3.25625 6H6V0.75C6 0.334375 6.33437 0 6.75 0ZM16 11.75V15.25C16 15.6656 15.6656 16 15.25 16H0.75C0.334375 16 0 15.6656 0 15.25V11.75C0 11.3344 0.334375 11 0.75 11H5.33437L6.86562 12.5312C7.49375 13.1594 8.50625 13.1594 9.13437 12.5312L10.6656 11H15.25C15.6656 11 16 11.3344 16 11.75ZM12.125 14.5C12.125 14.1562 11.8438 13.875 11.5 13.875C11.1562 13.875 10.875 14.1562 10.875 14.5C10.875 14.8438 11.1562 15.125 11.5 15.125C11.8438 15.125 12.125 14.8438 12.125 14.5ZM14.125 14.5C14.125 14.1562 13.8438 13.875 13.5 13.875C13.1562 13.875 12.875 14.1562 12.875 14.5C12.875 14.8438 13.1562 15.125 13.5 15.125C13.8438 15.125 14.125 14.8438 14.125 14.5Z" fill="#1D54B4"/>
                            </svg>                            
                        )}
                        handleClose={this.props.onClose}
                        handleAction={()=>{}}
                        showActions={false}
                        open={showModal}
                        popupMaxWidth={"lg"}
                        className="file-upload-dialog file-details-dialog"
                    >
                        <div className="file-details-wrapper">
                        <FileUploadDetails back={this.backToUploadList}/>
                        </div>
                    </DialogPopup>
            )
        )
    }
}
export default FileUpload;