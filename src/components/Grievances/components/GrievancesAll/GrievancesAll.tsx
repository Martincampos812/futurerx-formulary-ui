import React from 'react';
import { Input, Table } from "antd";
import NotesPopup from "../../../member/MemberNotesPopup";
import FrxTermRecord from "../../../shared/FrxTermRecord/FrxTermRecord";
import FrxLoader from "../../../shared/FrxLoader/FrxLoader";
import FrxGrid from "../../../shared/FrxGrid/FrxGrid";
import SimpleSearch from "../../../communication/Search/SimpleSearch/SimpleSearch";
import FrxGridContainer from "../../../shared/FrxGrid/FrxGridContainer";
import CallsListDetails from "../../../communication/CallListDetails";
import RowInfo from './RowInfo';
import './GrievancesAll.scss';

interface SimpleSearchState {
    searchText: string;
}
interface SimpleSearchProps {
    onSearch: (searchObject: SimpleSearchState) => void;
}
class grievancesAll extends React.Component<any,any>{
    state={
        searchText: '',
        isNotesOpen: false,
        openPopup: false,
        filteredData: [],
        isFetchingData: false,
        data: []
    }
    handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        if (
            (e && e.target && e.target.value) ||
            (e && e.target && e.target.value === "")
        ) {
            const key = e.currentTarget.name;
            let value = e.target.value;

            if (Object.keys(this.state).includes(key)) {
                this.setState({ ...this.state, [key]: value } as Pick<
                    SimpleSearchState,
                    keyof SimpleSearchState
                >);
            }
            this.onSearch(value)
        }
    };
    onSearch = (text: string) => {
        this.handleSearch({ searchText: text });
    };
    handleNoteClick = () => {
        this.setState({isNotesOpen: !this.state.isNotesOpen}); 
    }
    processData() {
        const data = this.props.data;
        this.setState({ data, filteredData: data, isFetchingData: false });
    }
    componentDidMount() {
        this.processData();
    }
    handleSearch = (searchObject: any) => {
        this.setState({ isFetchingData: true });
        if (searchObject) {
          setTimeout(() => {
            const newData = this.state.data.filter((item: any) =>
              Object.keys(item)
                .map((_item: any) =>
                  item[_item]
                    .toString()
                    .toLocaleLowerCase()
                    .includes(searchObject.searchText)
                )
                .includes(true)
            );
            this.setState({ isFetchingData: false, filteredData: newData });
          }, 2000);
        } else {
          this.setState({ isFetchingData: false });
        }
    };
    render(){
        const { columns } = this.props;
        return (
            <div className="all-info tabs-info">
                <div className="title mb-15">
                    <span>All Grievances</span>
                    <div className="icon-wrapper">
                        <svg onClick={this.handleNoteClick} width="10" height="12" viewBox="0 0 10 12" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7 0L10 3H7V0ZM6 0H1C0.447715 0 0 0.447715 0 1V11C0 11.5523 0.447715 12 1 12H9C9.55229 12 10 11.5523 10 11V4H7H6V0Z" fill="#2055B5"></path>
                        </svg>
                        {this.state.isNotesOpen ? (
                            <NotesPopup
                                category="Grievances"
                                openPopup={this.state.isNotesOpen}
                                onClose={this.handleNoteClick}
                            />
                            ) : (
                            ""
                        )}
                    </div>
                </div>
                <div className="simple-search">
                    <div className="simple-search__first-row">
                        <Input
                            className="simple-search__input simple-search__input--text"
                            onChange={this.handleInputChange}
                            value={this.state.searchText}
                            placeholder="Search"
                            name="searchText"
                            prefix={
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M1.5 7C1.5 3.96243 3.96243 1.5 7 1.5C10.0376 1.5 12.5 3.96243 12.5 7C12.5 10.0376 10.0376 12.5 7 12.5C3.96243 12.5 1.5 10.0376 1.5 7ZM7 0.5C3.41015 0.5 0.5 3.41015 0.5 7C0.5 10.5899 3.41015 13.5 7 13.5C8.61495 13.5 10.0923 12.911 11.2291 11.9362L14.6464 15.3536C14.8417 15.5488 15.1583 15.5488 15.3536 15.3536C15.5488 15.1583 15.5488 14.8417 15.3536 14.6464L11.9362 11.2291C12.911 10.0923 13.5 8.61495 13.5 7C13.5 3.41015 10.5899 0.5 7 0.5Z" fill="#999999" />
                                </svg>
                            }
                        />
                    </div>
                </div>
                <div className="all-grievance-table">
                    <FrxGrid
                        showSettingsMenu={false}
                        isRowSelectionEnabled={true}
                        isRowSelectorCheckbox
                        enableColumnDrag={false}
                        pagintionPosition="bottomRight"
                        columns={columns}
                        data={this.state.filteredData}
                        gridName={this.props.title}
                        fixedColumnKeys={["record_type"]}
                        hideClearFilter={true}
                        hideItemsPerPage={false}
                        loading={{
                            spinning: this.state.isFetchingData,
                            indicator: <FrxLoader />
                        }}
                        hideMultiSort={false}
                        hidePageJumper={true}
                        hidePagination={true}
                        hideResults={false}
                        scroll={{ x: 860, y: 350 }}
                        enableSettings={false}
                        settingsTriDotMenuClick={(item: any) => {
                            if (item.title === "Term Record") {
                            this.setState({ openPopup: true, poupType: item });
                            } else if (item.title === "Add Note") {
                            this.setState({ openPopup: true, poupType: item });
                            }
                        }}
                        onSettingsClick="grid-menu"
                        expandable={{
                            isExpandable: true,
                            // 11 => length of columns - 1 if enableSettings is not there or length of columns
                            expandIconColumnIndex: 4,
                            expandedRowRender: props => <RowInfo intakeData={this.props.intakeData}
                            details={this.props.details}
                            issueResolutionData={this.props.issueResolutionData}
                            notificationData={this.props.notificationData}/>,
                            expandCloseIcon: (
                                <span>
                                    <svg width="9" height="5" viewBox="0 0 9 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0.223752 0.24549C0.531543 -0.0693596 0.960049 -0.0940675 1.33632 0.24549L4.09513 2.89065L6.85395 0.24549C7.23022 -0.0940675 7.65943 -0.0693596 7.9651 0.24549C8.27289 0.559634 8.25313 1.0905 7.9651 1.38559C7.67849 1.68067 4.65071 4.56373 4.65071 4.56373C4.57861 4.63846 4.49219 4.69789 4.39662 4.73849C4.30104 4.77908 4.19827 4.8 4.09443 4.8C3.99059 4.8 3.88782 4.77908 3.79224 4.73849C3.69666 4.69789 3.61025 4.63846 3.53815 4.56373C3.53815 4.56373 0.511776 1.68067 0.223752 1.38559C-0.0649778 1.0905 -0.0840382 0.559634 0.223752 0.24549Z" fill="#999999"/>
                                    </svg>
                                </span>
                            ),
                            expandOpenIcon: (
                                <span>
                                    <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0.245493 7.96947C-0.0693603 7.6615 -0.0940685 7.23274 0.245493 6.85625L2.89068 4.09578L0.245492 1.33532C-0.0940688 0.958827 -0.0693606 0.529358 0.245492 0.223503C0.559639 -0.0844708 1.09051 -0.0646925 1.3856 0.223503C1.68069 0.510286 4.56378 3.53987 4.56378 3.53987C4.63851 3.61202 4.69794 3.69849 4.73853 3.79412C4.77913 3.88975 4.80005 3.99259 4.80005 4.09649C4.80005 4.20039 4.77913 4.30322 4.73853 4.39886C4.69794 4.49449 4.63851 4.58096 4.56378 4.6531C4.56378 4.6531 1.68069 7.68128 1.3856 7.96947C1.09051 8.25838 0.55964 8.27745 0.245493 7.96947Z" fill="#323C47"/>
                                    </svg>
                                </span>
                            )
                        }}
                    />
                </div>
            </div>
        )
        }
}
export default grievancesAll;