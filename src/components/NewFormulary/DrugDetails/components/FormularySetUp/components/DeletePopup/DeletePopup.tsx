import { Box, Grid } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import Button from "../../../../../../shared/Frx-components/button/Button";
import "../CommercialPopup.scss";
import {
  getAllFormularyVersions,
  deleteFormulary,
  deleteFullFormulary,
} from "../../../../../../../redux/slices/formulary/setup/setupService";
import { setLocationHome } from "../../../../../../../redux/slices/formulary/application/applicationSlice";

import showMessage from "../../../../../Utils/Toast";

export class DeletePopup extends React.Component<any, any> {
  refreshApp = () => {
    // window.location.reload(true);
    this.props.setLocationHome(2);
  };

  onCancelClicked = () => {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  };

  onDeleteVersionClicked = async () => {
    if (this.props.currentFormulary) {
      try {
        let response = await deleteFormulary(
          this.props.currentFormulary.id_formulary
        );
        if (response && response.status && response.status === 200) {
          showMessage("Successfully deleted formulary version", "success");
          this.refreshApp();
        } else {
          showMessage("Failed to delete formulary version", "error");
        }
      } catch (error) {
        console.log(error);
        showMessage("Error while deleting formulary version", "error");
      }
    }
  };

  onDeleteFullFormularyClicked = async () => {
    if (this.props.currentFormulary) {
      try {
        let payload = { filter: [], search_key: "" };
        let response = await getAllFormularyVersions(
          payload,
          this.props.currentFormulary.id_base_formulary,
          10000,
          0
        );
        if (response && response.status && response.status === 200) {
          let versions = response.data?.data;
          if (versions && versions.length > 0) {
            let formularyIds = Array();
            versions.map((version) => {
              formularyIds.push(version["id_formulary"]);
            });
            //formularyIds.push(this.props.currentFormulary.id_base_formulary);
            response = await deleteFullFormulary(formularyIds);
            if (response && response === "success") {
              showMessage("Successfully deleted full formulary", "success");
              this.refreshApp();
            } else {
              showMessage("Failed to delete full formulary", "error");
            }
          }
        } else {
          showMessage("Failed to fetch all formulary versions", "error");
        }
      } catch (error) {
        console.log(error);
        showMessage("Error while deleting full formulary", "error");
      }
    }
  };

  render() {
    return (
      <div className="popup-container">
        <Grid container>
          <Grid item xs={12}>
            <p>
              Do you want to delete the version or the full formulary:{" "}
              <span>
                {this.props?.currentFormulary?.formulary_info?.formulary_name
                  ? this.props?.currentFormulary?.formulary_info?.formulary_name
                  : ""}{" "}
                ?
              </span>
            </p>
          </Grid>
          <Grid item xs={12}>
            <div className="action-btn">
              <Button
                label="Cancel"
                htmlFor="upload-file"
                className="upload-button cancel-btn"
                onClick={this.onCancelClicked}
              />
              <Button
                label="Delete Version"
                htmlFor="upload-file"
                className="upload-button save-btn"
                onClick={this.onDeleteVersionClicked}
              />
              <Button
                label="Delete Full Formulary"
                htmlFor="upload-file"
                className="upload-button save-btn"
                onClick={this.onDeleteFullFormularyClicked}
              />
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
    return {
      setLocationHome: (a) => dispatch(setLocationHome(a)),
    };
  }
  
  export default connect(
    null,
    mapDispatchToProps
  )(DeletePopup);
  