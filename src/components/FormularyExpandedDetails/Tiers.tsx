import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import DropDown from ".././shared/Frx-components/dropdown/DropDown";


class FormularyTiers extends React.Component<any, any> {

  getAllTierOptions = () => {
    let htmlElement: any;
    let options = [] as any;
    if (this.props.tiers) {
      options = this.props.tiers.map(e => {
        return this.props.tiersOptions?.find((el) => el.id_tier_label === e.id_tier_label) ? {
                seletedVal: this.props.tiersOptions.find(
                  (el) => el.id_tier_label === e.id_tier_label
                ).tier_label,
                tierName: e.tier_name
            }
            : "";
      })
      htmlElement = options.map(e => {
        return (
          <div className="tier">
            <label>{e.tierName}</label>
            <div>
                <DropDown
                  className="formulary-tier-dropdown"
                  value={e.seletedVal}
                  options={[]}
                  disabled
                  onChange={() => {}}
                />
            </div>
          </div>
        );
      });
      return htmlElement;
    }
  };

  numberOfTiers = () => {
    let selectedCount = this.props.tiers ? this.props.tiers.length : null;
    // if(this.props.selectedTiersOptions){
    let htmlElement = (
      <DropDown
        className="formulary-type-dropdown number-of-tier-dropdown"
        placeholder="Select Tiers"
        options={[]}
        value={selectedCount}
        disabled
        onChange={this.props.selectTier}
      />
    );
    // }
    return htmlElement;
  };
  render() {
    return (
      <Fragment>
        <div className="tiers-information-container">
          <div className="tiers-information-fields-wrapper setup-label">
            <Grid container>
              <Grid item xs={4}>
                <div className="group">
                  <label>
                    NUMBER OF TIERS
                  </label>
                  {this.numberOfTiers()}
                </div>
                <div className="tiers-dropdown-wrapper">
                  {this.getAllTierOptions()}
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default FormularyTiers;
