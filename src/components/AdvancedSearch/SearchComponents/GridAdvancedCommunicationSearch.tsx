//react imports
//ant and materil imports
//3rd party imports
import { Moment } from "moment";
import * as React from "react";
//style imports
import "./GridSearch.scss";
//Components
import { TabInfo } from "../../../models/tab.model";
import FrxMiniTabs from "../../shared/FrxMiniTabs/FrxMiniTabs";
import AdvGridCallsSearch from "./CommunicationComponents/AdvGridCallsSearch";
import AdvGridDocumentSearch from "./CommunicationComponents/AdvGridDocumentSearch";
import AdvGridOtherSearch from "./CommunicationComponents/AdvGridOtherSearch";

interface GridAdvancedCommunicationSearchState {
  miniTabs: Array<TabInfo>;
  activeMiniTabIndex: number;
}

// interface GridAdvancedMemberSearchProps {
//     onSearch: (searchObject: GridAdvancedMemberSearchState) => void;
// }

interface GridAdvancedCommunicationSearchProps {
	searchType: string;
	onCommunicaionTabChange:(selectedTab:number) => void
}

const miniTabs = [
  { id: 1, text: "Calls" },
  { id: 2, text: "Documents" },
  { id: 2, text: "Other" }
];

class GridAdvancedCommunicationSearch extends React.Component<
  GridAdvancedCommunicationSearchProps,
  GridAdvancedCommunicationSearchState
> {
  state = {
    miniTabs: miniTabs,
    activeMiniTabIndex:
      this.props.searchType === "communicationscall"
        ? 0
        : this.props.searchType === "communicationsdocument"
        ? 1
        : this.props.searchType === "communicationsother"
        ? 2
        : 0
  };

  componentDidUpdate(previousProps, previousState) {
    if (this.props.searchType && previousProps.searchType)
      if (previousProps.searchType && this.props.searchType) {
        if (previousProps.searchType !== this.props.searchType) {
          console.log("updating data and columns");
          this.setState({
            activeMiniTabIndex:
              this.props.searchType === "communicationscall"
                ? 0
                : this.props.searchType === "communicationsdocument"
                ? 1
                : this.props.searchType === "communicationsother"
                ? 2
                : 0
          });
        }
      }
  }


  onClickMiniTab = (selectedTabIndex: number) => {
    // let activeMiniTabIndex = 0;

    // const miniTabs = this.state.miniTabs.map(
    //   (miniTab: TabInfo, index: number) => {
    //     if (index === selectedTabIndex) {
    //       activeMiniTabIndex = index;
    //     }
    //     return miniTab;
    //   }
    // );

		// this.setState({ miniTabs, activeMiniTabIndex });
		this.props.onCommunicaionTabChange(selectedTabIndex)
  };

  render() {
   
    return (
      <>
        <FrxMiniTabs
          tabList={this.state.miniTabs}
          activeTabIndex={this.state.activeMiniTabIndex}
          onClickTab={this.onClickMiniTab}
        />
        {this.state.activeMiniTabIndex === 0 ? (
          <AdvGridCallsSearch />
        ) : this.state.activeMiniTabIndex === 1 ? (
          <AdvGridDocumentSearch />
        ) : this.state.activeMiniTabIndex === 2 ? (
          <AdvGridOtherSearch />
        ):null}
      </>
    );
  }
}

export default GridAdvancedCommunicationSearch;
