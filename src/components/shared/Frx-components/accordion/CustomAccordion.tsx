import React, { Fragment, ReactElement } from "react";

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import Button from "@material-ui/core/Button";
import PanelHeader from "../../../NewFormulary/DrugDetails/components/FormularyConfigure/components/PanelHeader";
import "../../../SetupFormularyGrid/MarketingMaterial/MaterialIconList.scss";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      marginBottom: "20px",
    },
    heading: {
      //   fontSize: theme.typography.pxToRem(15),
      //   fontWeight: theme.typography.fontWeightRegular,
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "12px",
      // lineHeight: "30px",

      color: "#1D54B4",
    },
    accordionSummary: {
      background: "#FFFFFF",
      border: "1px solid #E5E5E5",
      boxSizing: "border-box",
      borderRadius: "5px 5px 5px 5px",
      minHeight: 56,
      // height: 56,
      // "&$expanded": {
      //   minHeight: 50,
      //   height: 50,
      //   borderRadius: "5px 5px 0px 0px",
      // },
    },
    accordionDetails: {
      background: "#FFFFFF",
      border: "1px solid #E5E5E5",
      boxSizing: "border-box",
      borderRadius: "0 0 5px 5px",
    },
  })
);

interface Props {
  children: any;
  name: string;
  style?: any;
  btnAcordian?: boolean,
  activity?: boolean
}

export default function CustomAccordion({
  children,
  name,
  btnAcordian,
  activity,
}: Props): ReactElement {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          className={classes.accordionSummary}
          expandIcon={<ExpandLessIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          {activity &&
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.99981 0.761719C4.00271 0.761719 0.761719 4.00271 0.761719 7.99981C0.761719 11.9969 4.00271 15.2379 7.99981 15.2379C11.9969 15.2379 15.2379 11.9969 15.2379 7.99981C15.2379 4.00271 11.9969 0.761719 7.99981 0.761719ZM11.1261 5.63612L7.72354 10.3538C7.67598 10.4202 7.61329 10.4743 7.54066 10.5116C7.46803 10.5489 7.38755 10.5684 7.30589 10.5684C7.22424 10.5684 7.14376 10.5489 7.07113 10.5116C6.9985 10.4743 6.93581 10.4202 6.88825 10.3538L4.87354 7.56197C4.81214 7.47634 4.87354 7.35679 4.97856 7.35679H5.73629C5.90109 7.35679 6.05781 7.43595 6.15475 7.57167L7.30509 9.16793L9.84488 5.64582C9.94182 5.51172 10.0969 5.43094 10.2633 5.43094H11.0211C11.1261 5.43094 11.1875 5.55049 11.1261 5.63612Z" fill="#80C483"/>
            </svg>            
          }
          <Typography className={classes.heading}>{name}</Typography>
          {btnAcordian ? (
            <Fragment>
              <div className="accordian-btn-wrapper">
            <Button className="popup-btn file-btn first search-btn">Search Tool</Button>
            {name === "Group 1" ? (
              <Button className="popup-btn file-btn publish-btn">Publish URL</Button>
            ) : name === "Group 2" ? (
              <Button className="popup-btn file-btn publish-url-btn">
              <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.5241 10.3128C12.93 11.0627 12.4205 12 11.6098 12H1.05675C0.244477 12 -0.262673 11.0612 0.14244 10.3128L5.41903 0.562149C5.82513 -0.188062 6.84227 -0.186703 7.24765 0.562149L12.5241 10.3128ZM6.33334 8.29688C5.77467 8.29688 5.32177 8.77957 5.32177 9.375C5.32177 9.97043 5.77467 10.4531 6.33334 10.4531C6.89202 10.4531 7.34491 9.97043 7.34491 9.375C7.34491 8.77957 6.89202 8.29688 6.33334 8.29688ZM5.37294 4.42158L5.53607 7.60908C5.5437 7.75823 5.65941 7.875 5.79956 7.875H6.86712C7.00727 7.875 7.12298 7.75823 7.13061 7.60908L7.29374 4.42158C7.30199 4.26047 7.18163 4.125 7.03025 4.125H5.63641C5.48503 4.125 5.36469 4.26047 5.37294 4.42158Z" fill="#F65A1C"/>
              </svg>
              Publish URL Pending<PanelHeader className="field-group__label-special-character" tooltip="12/15/2020 12:24:30 PM"  />
            </Button>
            ) : ("")}
            <Button className="popup-btn file-btn add-file">Add File</Button>
            </div>
            </Fragment>
          ) : (
            ""
          )}
          
        </AccordionSummary>
        {/* <hr/> */}
        {/* {children.map((chilElement: any, index: number) => ( */}
        {/* <React.Fragment key={index}> */}
        <AccordionDetails className={classes.accordionDetails}>
          {children}
        </AccordionDetails>
        {/* </React.Fragment> */}
        {/* ))} */}
      </Accordion>
    </div>
  );
}
