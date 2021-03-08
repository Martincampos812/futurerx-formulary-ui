import * as React from "react";
import "./ClaimResultGrid.scss";

// antd
import { Button, Select } from "antd";

//components
import CustomSelect from "../../shared/Frx-components/dropdown/DropDown";
import MemberInfo from "../../ClaimsGridModel/Components/MemberInfo";
import CommonClaimDetail from "../Common/CommonClaimDetail";
import ClaimDetail from "../../ClaimsGridModel/Components/ClaimDetail/ClaimDetail";
import CommonClaimTransaction from "../Common/CommonClaimTransaction";
import ClaimsHistory from "../../ClaimsGridModel/Components/ClaimsHistory/ClaimsHistory";
import ClaimResultTab from "../ClaimResultTab/ClaimResultTab";
import { TabInfo } from "../../../models/tab.model";
import {
  getClaimsResultModalFolderTabData,
  responseStatus,
} from "../../../mocks/ClaimGridModelMock";
import ImportExportSharpIcon from "@material-ui/icons/ImportExportSharp";
import { Container } from "@material-ui/core";
import NewTestClaim from "../../member/NewTestClaim";
import FrxMiniTab from "../../shared/FrxMiniTabs/FrxMiniTabs";
import CustomDropdown from "../../shared/Frx-components/dropdown/DropDown";
import ClaimTransactionAccordion from "../../ClaimsGridModel/Components/ClaimTransaction/ClaimTransactionAccordion";

const {Option} = Select;
interface Props {
  data: any;
  isOpen: boolean;
  onClose: () => void;
  onFlip: any;
  topResult: boolean;
  folderTabs: any;
  activeTabIndex: number;
  onTabClick: any;
  // Claim Details
  detailsMiniTab: any[];
  detailsActiveTabIndex: number;
  handleDetailsMinitabClick: any;
  // Claim Transaction
  transactionBlocks: any[];
  transactionMiniTab: any[];
  transactionActiveTabIndex: number;
  transactionShowButton: boolean;
  handleTransactionMinitabClick: any;
  handleTransactionExpandAllToggle: any;
  handleTransactionExpandToggle: any;
  handleNewTestClaim: any;
}

interface State {}

class ClaimResultGrid extends React.Component<Props, State> {
  state = {
    // folderTab: getClaimsResultModalFolderTabData(),
    // activeTabIndex: 0,
    // newTestClaim: false,
    popUpClose: false,
  };
  componentDidMount() {
    console.log(this.props.data);
  }

  // onClickTab = (selectedTabIndex: number) => {
  //   let activeTabIndex = 0;
  //   const folderTabs = this.state.folderTab.map(
  //     (tab: TabInfo, index: number) => {
  //       if (index === selectedTabIndex) {
  //         activeTabIndex = index;
  //       }
  //       return tab;
  //     }
  //   );
  //   this.setState({ folderTabs, activeTabIndex });
  // };

  handleClosePopup = () => {
    // this.setState({
    //   isOpen: this.props.isOpen
    // })
    console.log("close", this.props.isOpen);
    this.props.onClose();
  };

  // closeNewTestClaim = () => {
  //   this.setState({
  //     newTestClaim: false,
  //   });
  // };

  // openNewTestClaim = () => {
  //   this.setState({
  //     newTestClaim: !this.state.newTestClaim,
  //   });
  // };
  render() {
    const {
      data,
      topResult,
      onFlip,
      activeTabIndex,
      folderTabs,
      onTabClick,

      // Claim details data
      detailsMiniTab,
      detailsActiveTabIndex,

      // Claim details events
      handleDetailsMinitabClick,

      // Claim transaction data
      transactionBlocks,
      transactionMiniTab,
      transactionActiveTabIndex,
      transactionShowButton,

      // claim transaction events
      handleTransactionMinitabClick,
      handleTransactionExpandAllToggle,
      handleTransactionExpandToggle,
    } = this.props;

    const claimData = data;
    console.log(claimData);

    return (
      <div className="claim-result-root">
        <div className="head-container-flex">
          <div className="left-flexbox">
            <div className="claim-text">
              {activeTabIndex === 3 ? (
                <label className="claim-text-key" htmlFor="Claim ID:">
                  TEST CLAIM ID:{" "}
                </label>
              ) : (
                <label className="claim-text-key" htmlFor="Claim ID:">
                  CLAIM ID:{" "}
                </label>
              )}
              <span className="claim-text-value">{claimData.claimId}</span>
            </div>
            <div className="sequence">
              <label className="sequence-text">Sequence</label>
              {/* <Select placeholder="Select Sequence">
                <Option value="01 - B1">01 - B1</Option>
                <Option value="02 - B3">02 - B3</Option>
                <Option value="03 - N1">03 - N1</Option>
              </Select> */}
              <CustomSelect
                className="sequence-dd"
                placeholder="Select Sequence"
                options={["01 - B1", "02 - B3", "03 - N1"]}
              />
            </div>
          </div>
          {topResult ? (
            <div className="right-flexbox">
              <div className="new-test-claim-btn">
                <Button onClick={this.props.handleNewTestClaim}>
                  + New Test Claim
                </Button>
              </div>
              <div className="flip-svg-container">
                <svg
                  // onClick={()=>onFlip()}
                  onClick={onFlip}
                  className="flip-svg"
                  width="14"
                  height="16"
                  viewBox="0 0 14 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.24977 16H3.74977C3.33555 16 2.99977 15.6642 2.99977 15.25L2.99977 4H1.49977C0.832053 4 0.498459 3.19066 0.969428 2.71966L3.46943 0.219656C3.76233 -0.0732193 4.23721 -0.0732193 4.53008 0.219656L7.03008 2.71966C7.49921 3.18888 7.17027 4 6.49977 4H4.99977L4.99977 15.25C4.99977 15.6642 4.66399 16 4.24977 16ZM8.99977 0.75L8.99977 12H7.49977C6.83371 12 6.49727 12.8082 6.96943 13.2803L9.46943 15.7803C9.76233 16.0732 10.2372 16.0732 10.5301 15.7803L13.0301 13.2803C13.4997 12.8107 13.1697 12 12.4998 12H10.9998L10.9998 0.75C10.9998 0.335781 10.664 0 10.2498 0H9.74977C9.33555 0 8.99977 0.335781 8.99977 0.75Z"
                    fill="#666666"
                  />
                </svg>
              </div>
            </div>
          ) : null}
        </div>
        <div className="">
          <MemberInfo claimData={claimData} />
          {/* Member Info */}
          <Container disableGutters>
            <div className={claimData.status === "Reversed" ? "" : ""}>
              <ClaimResultTab
                tabList={folderTabs}
                activeTabIndex={activeTabIndex}
                onClickTab={onTabClick}
              />
              <>
                {activeTabIndex === 0 ? (
                  <>
                    <ClaimDetail
                      claimData={claimData}
                      detailsMiniTab={detailsMiniTab}
                      detailsActiveTabIndex={detailsActiveTabIndex}
                      claimComparedDetails={true}
                      handleDetailsMinitabClick={handleDetailsMinitabClick}
                    />
                    {/* <CommonClaimDetail
                      claimData={claimData}
                      detailsMiniTab={detailsMiniTab}
                      detailsActiveTabIndex={detailsActiveTabIndex}
                      handleDetailsMinitabClick={handleDetailsMinitabClick}
                    /> */}
                  </>
                ) : activeTabIndex === 1 ? (
                  <>
                    <CommonClaimTransaction
                      claimData={claimData}
                      transactionBlocks={transactionBlocks}
                      transactionMiniTab={transactionMiniTab}
                      transactionActiveTabIndex={transactionActiveTabIndex}
                      transactionShowButton={transactionShowButton}
                      handleTransactionMinitabClick={
                        handleTransactionMinitabClick
                      }
                      handleTransactionExpandAllToggle={
                        handleTransactionExpandAllToggle
                      }
                      handleTransactionExpandToggle={
                        handleTransactionExpandToggle
                      }
                    />
                  </>
                ) : activeTabIndex === 3 ? (
                  <>
                    {claimData.status === "Reversed" ? (
                      <></>
                    ) : (
                      <>
                        <ClaimsHistory />
                      </>
                    )}
                  </>
                ) : (
                  ""
                )}
              </>
            </div>
          </Container>
        </div>
      </div>
    );
  }
}

export default ClaimResultGrid;

// /** Claim Transaction */
// <CommonClaimTransaction
//   claimData={claimData}
//   transactionAccordionState={this.props.transactionAccordionState}
// />;

// <>
// <CommonClaimTransaction
//   claimData={claimData}
//   // transactionData={transaction}
// />
// </>;

// <div className="claim-transaction-root scroll-bar">
// <div className="claim-transaction-root__actions">
//   <FrxMiniTab
//     tabList={transactionMiniTab}
//     activeTabIndex={transactionActiveTabIndex}
//     onClickTab={handleTransactionMinitabClick}
//   />
//   {transactionActiveTabIndex === 0 ? (
//     <>
//       {
//         // this.props.claimData.status === "Rejected"
//         claimData.status === "Rejected" ? (
//           <>
//             <label>Show</label>
//             <CustomDropdown
//               placeholder="All"
//               options={[
//                 "All",
//                 "Passed Only",
//                 "Errors Only",
//               ]}
//             />
//           </>
//         ) : (
//           ""
//         )
//       }
//     </>
//   ) : (
//     ""
//   )}
//   <div className="claim-transaction-root__actions--buttons">
//     <button
//       style={{
//         display: transactionShowButton ? "block" : "none",
//       }}
//       type="button"
//       className="claim-transaction-root__actions--buttons__btn"
//       onClick={() =>
//         handleTransactionExpandAllToggle(true)
//       }
//     >
//       Expand All
//     </button>
//     <button
//       style={{
//         display: transactionShowButton ? "none" : "block",
//       }}
//       type="button"
//       className="claim-transaction-root__actions--buttons__btn"
//       onClick={() =>
//         handleTransactionExpandAllToggle(false)
//       }
//     >
//       Collapse All
//     </button>
//   </div>
// </div>
// <dl className="accordion">
//   {transactionActiveTabIndex === 0 ? (
//     <>
//       {transactionBlocks.map((item) => (
//         <>
//           <ClaimTransactionAccordion
//             claimStatus={claimData.status}
//             key={item.id}
//             title={item.label}
//             content={item.content}
//             expand={item.expanded}
//             onClick={() =>
//               handleTransactionExpandToggle(item.id)
//             }
//           />
//         </>
//       ))}
//     </>
//   ) : transactionActiveTabIndex === 1 ? (
//     <>
//       <div className="response-status">
//         {responseStatus.map((status, i) => (
//           <div className="fields">
//             <label>{status.label}</label>
//             {/* {this.props.claimData.status === "Rejected" ? ( */}
//             <div className="fields-status">
//               <span>{status.statusValue}</span>
//             </div>
//             {/* ) : ""} */}
//             {/* {this.props.claimData.status === "Paid" || this.props.claimData.status === "Reversed" ? (
//   <span>{status.statusValue2}</span>
//   ) : ""} */}
//           </div>
//         ))}
//       </div>
//       <div className="accordion-response">
//         {transactionBlocks.map((item) => (
//           <>
//             <ClaimTransactionAccordion
//               claimStatus={claimData.status}
//               key={item.id}
//               title={item.responseLabel}
//               content={item.content}
//               expand={item.expanded}
//               onClick={() =>
//                 handleTransactionExpandToggle(item.id)
//               }
//             />
//           </>
//         ))}
//       </div>
//     </>
//   ) : (
//     ""
//   )}
// </dl>
// </div>
