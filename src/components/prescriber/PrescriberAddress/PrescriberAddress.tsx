import * as React from "react";
import { Component } from "react";

import { PrescriberAddressModel } from "../../../models/prescriber/prescriber-address.model";
import FrxMiniTabs from "../../shared/FrxMiniTabs/FrxMiniTabs";

import "./PrescriberAddress.scss";
import PrescriberPrimaryAddress from "../PrescriberPrimaryAddress/PrescriberPrimaryAddress";


interface PrescriberAddressProps {
  prescriberAddress?: PrescriberAddressModel;
}
interface PrescriberAddressState {
  selectedTabIndex: number;
}

class PrescriberAddress extends Component<
  PrescriberAddressProps,
  PrescriberAddressState
> {
  state = {
    selectedTabIndex: 0
  };

  onClickTab = (selectedTabIndex: number) => {
    this.setState({ selectedTabIndex });
  };

  renderMiniTabs = () => {
    return (
      <FrxMiniTabs
        tabList={[
          {
            id: 1,
            text: "Primary Office"
          },
          {
            id: 2,
            text: "Secondary Office"
          }
        ]}
        activeTabIndex={this.state.selectedTabIndex}
        onClickTab={this.onClickTab}
      />
    );
  };

  render() {
    const { prescriberAddress } = this.props;
    const addressType =
      this.state.selectedTabIndex === 0 ? "primary" : "secondary";
    const address = prescriberAddress![addressType];

    return (
      <div className="BestPharmacy-info">
        {address.type === "Prescriber" ? (
        <>
        {this.renderMiniTabs()}
        </>
        ) : null}
        {this.state.selectedTabIndex === 0 ? (
          <PrescriberPrimaryAddress prescriberAddress={address} />
        ) : this.state.selectedTabIndex === 1 ? (
          <PrescriberPrimaryAddress prescriberAddress={address} />
        ) : null}  
      </div>
    );
  }
}

export default PrescriberAddress;
