import React from "react";
import TabletDetailsPopup from "./TabletDetailsPopup";
import TabletDetailsInfoPopup from "./TabletDetailsInfoPopup";
import BestPharmacy from './BestPharmacy';
import MapView from './MapView';
// import "./Demographics.scss";
import { MemberInfo } from "../../models/member-info.model";


class Demopage extends React.Component {
  state = {
    openPopupTabFirst: false,
    openPopupTabSecond: false,
  };

  onHeadingFirstClick = () => {
    console.log("invoked onHeadingClick", this.state.openPopupTabFirst);

    this.setState({
      openPopupTabFirst: !this.state.openPopupTabFirst
    });
  };
  onHeadingSecondClick = () => {
    this.setState({
      openPopupTabSecond: !this.state.openPopupTabSecond
    });
  };

  render() {


    return (
      <div className="demographics-root">

        <button onClick={this.onHeadingFirstClick}>Popup-1</button>
        <button onClick={this.onHeadingSecondClick}>Popup-2</button>

        {/* <BestPharmacy/> */}
        <MapView />
        {this.state.openPopupTabFirst ? (
          // <TabletDetailsPopup
          //   isOpen={this.state.openPopupTabFirst}
          //   onClose={this.onHeadingFirstClick}
          // />
          ""
        ) : (
            ""
          )}

        {this.state.openPopupTabSecond ? (
          // <TabletDetailsInfoPopup
          //   isOpen={this.state.openPopupTabSecond}
          //   onClose={this.onHeadingSecondClick}
          // />
          ""
        ) : (
            ""
          )}
      </div>
    );
  }
}

export default Demopage;
