import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "../../../../../shared/Frx-components/button/Button";
import PanelHeader from "../../FormularyConfigure/components/PanelHeader";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Collapse } from "antd";
import "./formularycomponent.scss";
import "../../../../../SetupFormularyGrid/MarketingMaterial/CostShareDetails.scss";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: "33.33%",
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
  })
);

export default function ControlledAccordions() {
  const { Panel } = Collapse;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string) => (
    event: React.ChangeEvent<{}>,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <div className="compare-formularies-container-component">
      <div className="compare-formulary">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div className="limited-access">
              <PanelHeader title="SUMMARY OF RXCUI COUNT" />

              <Grid container>
                <Grid item xs={3}>
                  <div className="main-container-formulary border-right">
                    <Grid container>
                      <Grid item xs={6}>
                        <span className="checkbox-text">
                          <i className="fa fa-eye" aria-hidden="true"></i>Show
                          Checkboxes
                        </span>
                      </Grid>
                      <Grid item xs={6}>
                        <span className="checkbox-text">Collapse All</span>
                      </Grid>
                    </Grid>
                  </div>
                  <div className="cost-share-details_content">
                    <Collapse defaultActiveKey={["1"]}>
                      <Panel className="tb-tier" header="TIER" key="1">
                        <div className="body">
                          <div className="row table-row">
                            <div className="item">Tier 1</div>
                            <div className="item">Tier 2</div>
                            <div className="item">Tier 3</div>
                            <div className="item">Tier 4</div>
                          </div>
                        </div>
                      </Panel>
                    </Collapse>
                    <Collapse defaultActiveKey={["1"]}>
                      <Panel className="tb-category" header="CATEGORY/VIEW" key="1">
                        <div className="body">
                          <div className="row table-row">
                            <div className="item">TX CATEGORY</div>
                            <div className="item">TX CLASS</div>
                          </div>
                        </div>
                      </Panel>
                    </Collapse>

                    <Collapse defaultActiveKey={["1"]}>
                      <Panel className="tb-pa" header="PRIOR AUTHORIZATION (PA)" key="1">
                        <div className="body">
                          <div className="row table-row">
                            <div className="item">PA TYPE 1</div>
                            <div className="item">PA TYPE 2</div>
                            <div className="item">PA TYPE 3</div>
                            <div className="item">PA TYPE 4</div>
                          </div>
                        </div>
                      </Panel>
                    </Collapse>

                    <Collapse defaultActiveKey={["1"]}>
                      <Panel className="tb-st" header="STEP THERAPY (ST)" key="1">
                        <div className="body">
                          <div className="row table-row">
                            <div className="item">ST TYPE 1</div>
                            <div className="item">ST TYPE 2</div>
                            <div className="item">ST TYPE 3</div>
                            <div className="item">ST TYPE 4</div>
                          </div>
                        </div>
                      </Panel>
                    </Collapse>

                    <Collapse defaultActiveKey={["1"]}>
                      <Panel className="tb-ql" header="QUANTITY LIMITS (QL)" key="1">
                        <div className="body">
                          <div className="row table-row">
                            <div className="item">QL TYPE 1</div>
                            <div className="item">QL TYPE 2</div>
                            <div className="item">QL TYPE 3</div>
                            <div className="item">QL TYPE 4</div>
                          </div>
                        </div>
                      </Panel>
                    </Collapse>
                  </div>
                </Grid>

                <Grid item xs={9}>
                  <Grid container>
                    <div className="main-container-formulary bg-formulary">
                      <Grid item xs={12}>
                        <p className="base-formulary">BASE FORMULARY</p>
                      </Grid>
                    </div>
                  </Grid>

                  <div>
                    <table className="custom-table">
                      <tr>
                        <td>11</td>
                      </tr>
                      <tr>
                        <td>140</td>
                      </tr>
                      <tr>
                        <td>44</td>
                      </tr>
                      <tr>
                        <td>46</td>
                      </tr>
                    </table>
                  </div>

                  <div>
                    <table className="custom-table">
                      <tr>
                        <td>11</td>
                      </tr>
                      <tr>
                        <td>25</td>
                      </tr>
                      <tr>
                        <td>44</td>
                      </tr>
                      <tr>
                        <td>23</td>
                      </tr>
                    </table>
                  </div>

                  <div>
                    <table className="custom-table">
                      <tr>
                        <td>11</td>
                      </tr>
                      <tr>
                        <td>25</td>
                      </tr>
                      <tr>
                        <td>44</td>
                      </tr>
                      <tr>
                        <td>23</td>
                      </tr>

                      <tr>
                        <td>11</td>
                      </tr>
                      <tr>
                        <td>94</td>
                      </tr>
                      <tr>
                        <td>32</td>
                      </tr>
                      <tr>
                        <td>32</td>
                      </tr>

                      <tr>
                        <td>22</td>
                      </tr>
                      <tr>
                        <td>25</td>
                      </tr>
                      <tr>
                        <td>44</td>
                      </tr>
                      <tr>
                        <td>23</td>
                      </tr>

                      <tr>
                        <td>11</td>
                      </tr>
                      <tr>
                        <td>25</td>
                      </tr>
                      <tr>
                        <td>44</td>
                      </tr>
                      <tr>
                        <td>23</td>
                      </tr>

                      <tr>
                        <td>11</td>
                      </tr>
                      <tr>
                        <td>25</td>
                      </tr>
                      <tr>
                        <td>44</td>
                      </tr>
                      <tr>
                        <td>23</td>
                      </tr>
                    </table>
                  </div>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
