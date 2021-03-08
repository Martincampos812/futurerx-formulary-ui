import React, { Component } from "react";
import "./PrescriberClaimsSummaryCharts.scss";
import FrxDonutChart from "../../../components/shared/FrxDonutChart/FrxDonutChart";
import { Grid } from "@material-ui/core";
import StatsSummary from "../../../components/shared/FrxStatsSummary/FrxStatsSummary";

interface FrxChartProps {
  data: any;
  onSelectStatItem?: (label: string) => void;
}

interface FrxChartState {
  selectedItem: string;
  loading: boolean;
}

class PrescriberClaimsSummaryDonut extends Component<FrxChartProps, FrxChartState> {
  state = {
    selectedItem: "",
    loading: true
  };

  componentDidMount() {
    this.setState({
      selectedItem: Object.keys(this.props.data)[new Date().getMonth()],
      loading: false
    });
    window.onresize = () => {
      this.setState({ loading: true });
      setTimeout(() => {
        this.setState({ loading: false });
      }, 100);
    };
  }

  render() {
    var scale = Math.max(
      ...Object.keys(this.props.data).map((item: string) => {
        return Math.max(
          ...[this.props.data[item][0].value, this.props.data[item][1].value]
        );
      })
    );
    console.log(
      this.props.data["october"].reduce(
        (a: any, b: any) => {
          return { value: a.value + b.value };
        },
        { value: 0 }
      ).value
    );

    return (
      <>
        {!this.state.loading && (
          <Grid item xs={12}  className="FrxChart-content-prescriber__claimssummary">
            <h4>Claim Summary</h4>
            {this.state.selectedItem !== "" && (
            <Grid item xs={12}  className="FrxChart-content-prescriber__claimssummary-donut">
              <Grid item xs={5} className="donut">
                <FrxDonutChart
                  data={this.props.data[this.state.selectedItem]}
                ></FrxDonutChart>
                </Grid>
                <Grid item className="claimssummary-legend" xs={5}>
                <StatsSummary
                  onSelectStatItem={(label: string) => {
                    if (this.props.onSelectStatItem)
                      this.props.onSelectStatItem(label);
                  }}
                  data={[
                    ...this.props.data[this.state.selectedItem].map(
                      (item: any) => {
                        return item.value;
                      }
                    ),
                    this.props.data[this.state.selectedItem].reduce(
                      (a: any, b: any) => {
                        return { value: a.value + b.value };
                      },
                      { value: 0 }
                    ).value
                  ]}
                  labels={[
                    ...this.props.data[this.state.selectedItem].map(
                      (item: any) => {
                        return item.key;
                      }
                    ),
                    "total"
                  ]}
                  total={2}
                  heading={""}
                //   heading={`
                //   ${this.state.selectedItem
                //     .split("")[0]
                //     .toLocaleUpperCase() +
                //     this.state.selectedItem.substr(1)} 2020
                // `}
                  colors={["#59B35E", "#F65A1C"]}
                />
              </Grid>
              </Grid>
            )}

            {/* <div className="barChart-container">
              {Object.keys(this.props.data).map((item: string) => (
                <FrxBarChart
                  scale={scale}
                  key={item}
                  isSelected={this.state.selectedItem === item}
                  itemClicked={() => {
                    this.setState({
                      selectedItem: item
                    });
                  }}
                  data={this.props.data[item]}
                  title={item.trim()}
                ></FrxBarChart>
              ))}
            </div> */}
          </Grid>
        )}
      </>
    );
  }
}
export default PrescriberClaimsSummaryDonut;
