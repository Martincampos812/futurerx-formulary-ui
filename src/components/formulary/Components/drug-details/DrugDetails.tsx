import React, {Component} from "react";
import {Grid, List, ListItem} from "@material-ui/core";
import Imag1 from "../../../../assets/icons/drug-img/pd155and10.png";
import DialogPopup from "../../../shared/FrxDialogPopup/FrxDialogPopup";
import getDrugDetails from "../../../../mocks/DrugDetailMock";
import "./DrugDetails.scss";

export interface DrugDetailsProps {
  openPopup: boolean,
  onClose: any
}
interface State {}

export default class DrugDetails extends Component<DrugDetailsProps, State> {
  state = {
    category: getDrugDetails(),
    selectedItem: getDrugDetails()[0],
    isDialogpopOpen: true,
  };

  handleSelectItem = (e, id) => {
    const {category, selectedItem} = this.state;
    let findObject = category.find((item) => item.id === id);
    this.setState({selectedItem: findObject});

    console.log("item with id :" + id + ": details", findObject);
    console.log(e);
  };
  handleOnCloseDialogpopup = () => {
    this.setState({isDialogpopOpen: false});
  };

  render() {
    const {category, selectedItem} = this.state;
    const {openPopup} = this.props;
    return (
      <DialogPopup
        className="frx-Drug-Details-Dialogpopup"
        open={openPopup}
        positiveActionText="Set Location"
        negativeActionText="Cancel"
        title="Drug Details"
        // showCloseIcon
        showActions={false}
        handleClose={this.props.onClose}
        handleAction={() => {
          console.log("do some action");
        }}
        height="100vh"
      >
        <div className="drug-details">
          <Grid container className="drug-details-main-grid">
            <Grid item className="drug-details-grid-item" sm={3}>
              <List className="drug-details-grid-item-list">
                {category.map((list, ind) => (
                  <ListItem
                    className="drug-details-item-list-type"
                    key={list.id}
                    onClick={(e) => this.handleSelectItem(e, list.id)}
                    selected={selectedItem.id === list.id ? true : false}
                  >
                    {list.type}
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid
              item
              className="drug-details-grid-item drug-details-grid-item-details-container"
              sm={6}
              spacing={4}
            >
              <h4 className="drug-details-grid-item-heading">
                {selectedItem.type}
              </h4>
              <div className="drug-details-grid-item-summary">
                {selectedItem.summary}
              </div>
            </Grid>
            <Grid
              item
              className="drug-details-grid-item drug-details-grid-drug-image-container"
              sm={3}
              direction="column"
            >
              <img
                src={selectedItem.imgProp.imgUrl}
                alt="drug-image"
                className="drug-details-drug-image"
              />
              <p className="drug-details-drug-image-note">
                {selectedItem.imgProp.note}
              </p>
            </Grid>
          </Grid>
        </div>
      </DialogPopup>
    );
  }
}
