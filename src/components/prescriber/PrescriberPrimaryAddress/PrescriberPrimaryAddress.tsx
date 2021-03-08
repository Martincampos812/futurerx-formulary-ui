import * as React from "react";
import { Component } from "react";

//material imports
import { Box, Grid } from "@material-ui/core";
import { Address } from "../../../models/prescriber/prescriber-address.model";

interface PrescriberPrimaryAddressProps {
  prescriberAddress: Address;
}

class PrescriberPrimaryAddress extends Component<
  PrescriberPrimaryAddressProps,
  any
> {
  render() {
    const { prescriberAddress } = this.props;
    return (
      <>
      <Grid container className="member-data">
        <div className="row">
          <Box component="div" display="inline">
            address:
          </Box>
          <Box component="div" className="address-root" display="inline">
            {prescriberAddress.address}
          </Box>
        </div>
        <div className="row">
          <Box component="div" display="inline">
            phone:
          </Box>
          <Box component="div" className="hyperlink-value" display="inline">
            {prescriberAddress.phone}
          </Box>
        </div>
        <div className="row">
          <Box component="div" display="inline">
            fax:
          </Box>
          <Box component="div" display="inline">
            {prescriberAddress.fax}
          </Box>
        </div>
        <div className="row">
          <Box component="div" display="inline">
            Email:
          </Box>
          <Box component="div" className="hyperlink-value" display="inline">
            {prescriberAddress.email}
          </Box>
        </div>
        <div className="row">
          <Box component="div" display="inline" className="oprHours">
            office hours:
          </Box>
          <Box component="div" display="inline" className="timeRow-root">
            {prescriberAddress.workingHours.map((_item: any) => (
              <div className="timeRow">
                <Box component="div" display="inline">
                  {_item.day}
                </Box>
                <Box component="div" display="inline">
                  {_item.time}
                </Box>
              </div>
            ))}
          </Box>
        </div>
      </Grid>
      <Grid className="member-data">
        <span className="additional-info-header">Additional Information</span>
      <div className="row">
          <Box component="div" display="inline">
          County:
          </Box>
          <Box component="div" display="inline">
          {prescriberAddress.county}
          </Box>
        </div>
        <div className="row">
          <Box component="div" display="inline">
          Country:
          </Box>
          <Box component="div" display="inline">
            {prescriberAddress.country}
          </Box>
        </div>
        <div className="row">
          <Box component="div" display="inline">
          Language:
          </Box>
          <Box component="div" display="inline">
            {prescriberAddress.languages.join(",")}
          </Box>
        </div>
        {prescriberAddress.type === "Pharmacy" ? (
        <div className="row">
          <Box component="div" display="inline">
          </Box>
          <Box component="div" className="hyperlink-value" display="inline">
          Location services
          </Box>
        </div>
        ) : null}
      </Grid>
      </>
    );
  }
}

export default PrescriberPrimaryAddress;
