import React from "react";
import * as d3 from "d3";
import "./FrxBarChart.scss";

import {Box, Button} from "@material-ui/core";
import ToolTip from "../Frx-components/tooltips/ToolTip";

interface FrxBarChartProps {
  data: any;
  scale: number;
  title: string;
  isSelected: boolean;
  itemClicked: Function;
}

class FrxPaBarChart extends React.Component<FrxBarChartProps> {
  componentDidMount = () => {
    let {data, scale, title} = this.props;
    var _data = data.sort(function (a: any, b: any) {
      return a.key === "open" ? -1 : 1;
    });
    var margin = {top: 0, right: 0, bottom: 0, left: 0},
      width = 0.015 * window.innerWidth - margin.left - margin.right,
      height = 0.222 * window.innerHeight - margin.top - margin.bottom;
    // append the svg object to the body of the page
    var svg = d3
      .select(`#${title}`)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Add X axis
    let x = d3
      .scaleBand()
      .range([0, width])
      .domain(
        _data.map(function (d: any) {
          return d.key;
        })
      )
      .padding(0.2);

    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Add Y axis
    let y = d3.scaleLinear().domain([0, 100]).range([height, 0]).nice();

    svg.append("g");

    // Bars
    svg
      .selectAll("mybar")
      .data(_data)
      .enter()
      .append("rect")
      .attr("x", function (d: any): any {
        return x(d.key);
      })
      .attr("width", x.bandwidth())
      .attr("fill", function (d: any) {
        return d.key === "open"
          ? "#59B35E"
          : "#666666" && d.key === "denied"
          ? "#666666"
          : "#F65A1C";
      })
      .attr("y", function (d): any {
        return y(0);
      });

    // Animation

    svg
      .selectAll("rect")
      .transition()
      .duration(800)
      .attr("y", function (d: any): number {
        return y((d.value / scale) * 100) || 0;
      })
      .attr("height", function (d: any): number {
        return height - (y((d.value / scale) * 100) || 0);
      })
      .attr("rx", 0.25 * width)
      .delay(function (d, i) {
        return i * 200;
      });
  };
  componentDidUpdate = () => {
    if (this.props.isSelected) {
      d3.select("#" + this.props.title).html("");
      this.componentDidMount();
    }
  };
  render() {
    let isDisabled: boolean =
      Math.max(...this.props.data.map((item: any) => item.value)) === 0;
    let colors = ["#666666", "#59B35E", "#F65A1C", "#CCCCCC", "#2055B5"];
    return (
      <div
        className={
          this.props.isSelected ? "barDiag Selected" : "barDiag unSelected"
        }
      >
        <Box component="span" display="block">
          <svg id={this.props.title}></svg>
        </Box>
        <Box component="span" display="block">
          <Button
            variant="outlined"
            disabled={isDisabled}
            onClick={() => {
              this.props.itemClicked();
            }}
            style={{
              borderRadius: 25,
              paddingLeft: 30,
              paddingRight: 30,
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            {this.props.title.substr(0, 3).toLocaleUpperCase()}
          </Button>
          <ToolTip>
            {this.props.data.map((item: any, index: number) => (
              <div className="tooltip-data">
                <div>{item.key}</div>
                <div style={{color: colors[index % colors.length]}}>
                  {parseInt(item.value)}
                </div>
              </div>
            ))}
            <div className="tooltip-data">
              <div>total</div>
              <div style={{color: colors[4]}}>
                {
                  this.props.data.reduce(
                    (a: any, b: any) => {
                      return {value: parseInt(a.value + b.value)};
                    },
                    {value: 0}
                  ).value
                }
              </div>
            </div>
          </ToolTip>
        </Box>
      </div>
    );
  }
}
export default FrxPaBarChart;
