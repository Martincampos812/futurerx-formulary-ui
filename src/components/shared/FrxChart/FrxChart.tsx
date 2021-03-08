import React, { Component } from "react";
import "./FrxChart.scss";
import FrxBarChart from "../FrxBarChart/FrxBarChart";
import FrxDonutChart from "../FrxDonutChart/FrxDonutChart";

import { Box, createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import StatsSummary from "../FrxStatsSummary/FrxStatsSummary";

interface FrxChartProps {
  data: any;
  onSelectStatItem?: (label: string) => void;
}

interface FrxChartState {
  selectedItem: string;
  loading: boolean;
}

class FrxChart extends Component<FrxChartProps, FrxChartState> {
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
          <div className="FrxChart-content">
            {this.state.selectedItem !== "" && (
              <div className="donut">
                <FrxDonutChart
                  data={this.props.data[this.state.selectedItem]}
                ></FrxDonutChart>
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
                  total={3}
                  heading={`${this.state.selectedItem
                    .split("")[0]
                    .toLocaleUpperCase() +
                    this.state.selectedItem.substr(1)} 2020`}
                  colors={["#59B35E", "#F65A1C", "#2055B5"]}
                />
              </div>
            )}

            <div className="barChart-container">
              {Object.keys(this.props.data).map((item: string) => (
                <FrxBarChart
                  colorMap={{
                    paid: "#59B35E",
                    rejected: "#F65A1C"
                  }}
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
            </div>
          </div>
        )}
      </>
    );
  }
}
export default FrxChart;
