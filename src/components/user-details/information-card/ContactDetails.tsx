import React, {useState, ReactElement} from "react";

import {Theme, createStyles, makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import MemberData from "../member-data/MemberData";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import TabContext from "@material-ui/lab/TabContext";

import TabPanel from "@material-ui/lab/TabPanel";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "0px",
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),

      color: "#1D54B4",
    },
    tabsRoot: {
      minHeight: "24px",
      height: "24px",
    },
    tabRoot: {
      minHeight: "24px",
      height: "24px",
      fontSize: "12px",
      fontFamily: "Roboto",
      fontWeight: 700,
      borderRadius: "10px",
      outline: "none",
    },

    activeTab: {
      backgroundColor: "#1D54B4",
      color: "#FFFFFF",
      outline: "none",
    },
    indicatorClass: {
      display: "none",
    },
    tabs: {
      border: "2px solid #1D54B4",
      borderRadius: "10px",
      padding: "2px",
    },
  })
);

interface Props {}
let primaryAddress = {
  street1: "719 State St.",
  street2: "",
  city: "Tampa",
  state: "FL",
  zip: "12345",
  county: "",
  country: "",
  mainlingAddress: "Yes",
};

export default function ContactDetails({}: Props): ReactElement {
  const classes = useStyles();

  const [value, setValue] = useState("1");

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <TabContext value={value}>
        <Container className={`${classes.tabs}`}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
            classes={{
              root: classes.tabsRoot,
              indicator: classes.indicatorClass,
            }}
            indicatorColor="primary"
          >
            <Tab
              label="Primary Address"
              value="1"
              className={`${classes.tabRoot} ${
                value === "1" ? classes.activeTab : null
              }`}
            />
            <Tab
              label="secondary Address"
              value="2"
              className={`${classes.tabRoot} ${
                value === "2" ? classes.activeTab : null
              }`}
            />
            <Tab
              label="Mailing Address"
              value="3"
              className={`${classes.tabRoot}  ${
                value === "3" ? classes.activeTab : null
              }`}
            />
          </Tabs>
        </Container>
        <TabPanel value="1">
          <Container>
            <MemberData keyValue="Steet 1" value={primaryAddress.street1} />
            <MemberData keyValue="Steet 2" value={primaryAddress.street2} />
            <MemberData keyValue="City" value={primaryAddress.city} />
            <MemberData keyValue="State" value={primaryAddress.state} />
            <MemberData keyValue="Zip" value={primaryAddress.zip} />
            <MemberData keyValue="County" value={primaryAddress.county} />
            <MemberData keyValue="Country" value={primaryAddress.country} />
            <MemberData
              keyValue="Mailing address"
              value={primaryAddress.mainlingAddress}
            />
          </Container>
        </TabPanel>
        <TabPanel value="2">
          <Container>
            <MemberData keyValue="Steet 1" value={primaryAddress.street1} />
            <MemberData keyValue="Steet 2" value={primaryAddress.street2} />
            <MemberData keyValue="City" value={primaryAddress.city} />
            <MemberData keyValue="State" value={primaryAddress.state} />
            <MemberData keyValue="Zip" value={primaryAddress.zip} />
            <MemberData keyValue="County" value={primaryAddress.county} />
            <MemberData keyValue="Country" value={primaryAddress.country} />
            <MemberData
              keyValue="Mailing address"
              value={primaryAddress.mainlingAddress}
            />
          </Container>
        </TabPanel>
        <TabPanel value="3">
          <Container>
            <MemberData keyValue="Steet 1" value={primaryAddress.street1} />
            <MemberData keyValue="Steet 2" value={primaryAddress.street2} />
            <MemberData keyValue="City" value={primaryAddress.city} />
            <MemberData keyValue="State" value={primaryAddress.state} />
            <MemberData keyValue="Zip" value={primaryAddress.zip} />
            <MemberData keyValue="County" value={primaryAddress.county} />
            <MemberData keyValue="Country" value={primaryAddress.country} />
            <MemberData
              keyValue="Mailing address"
              value={primaryAddress.mainlingAddress}
            />
          </Container>
        </TabPanel>
      </TabContext>
    </div>
  );
}
