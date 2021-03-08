import React, {Component} from "react";

import {Theme, withStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CustomAccordion from "../../shared/Frx-components/accordion/CustomAccordion";
import ContactDetails from "./ContactDetails";
import "./InformationCard.scss";

const styles = (theme: Theme) => ({
  root: {
    flexGrow: 1,
    padding: "0px",
  },
  // paper: {
  //   padding: theme.spacing(2),
  //   textAlign: "center",
  //   color: theme.palette.text.secondary,
  // },
});

interface Props {
  children?: any;
  classes?: any;
}
interface State {}

class InformationCard extends Component<Props, State> {
  state = {};

  render() {
    const {children, classes} = this.props;
    // const {classes = useStyles();
    return (
      <Container className="information-card">
        <CustomAccordion name="Contact Information">
          <ContactDetails />
        </CustomAccordion>
        <CustomAccordion name="Eligibility">
          {/* <ContactDetails /> */}
        </CustomAccordion>
        <CustomAccordion name="PCP">{/* <ContactDetails /> */}</CustomAccordion>
        <CustomAccordion name="Pharmacy">
          {/* <ContactDetails /> */}
        </CustomAccordion>
      </Container>
    );
  }
}

export default withStyles(styles, {withTheme: true})(InformationCard);

// export default function InformationCard({children}: Props): ReactElement {
//   const classes = useStyles();

//   return (
//     <Container className={classes.root}>
//       <CustomAccordion name="Contact Information">
//         <ContactDetails />
//       </CustomAccordion>
//       <CustomAccordion name="Eligibility">
//         {/* <ContactDetails /> */}
//       </CustomAccordion>
//       <CustomAccordion name="PCP">{/* <ContactDetails /> */}</CustomAccordion>
//       <CustomAccordion name="Pharmacy">
//         {/* <ContactDetails /> */}
//       </CustomAccordion>
//     </Container>
//   );
// }
