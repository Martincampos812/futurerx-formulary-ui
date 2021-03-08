import React, {Component} from "react";
import * as d3 from "d3";
import "./FrxDonutChart.scss";

interface FrxDonutChartProps {
  data: any;
}

class FrxDonutChart extends Component<FrxDonutChartProps> {
  arc: any;
  outerRadius: any;
  innerRadius: any;

  arcTween = (event: any, i: any) => {
    return (() => {
      // d3.select(event.srcElement).transition().delay(150).attrTween("d", (d: any) => {
      //     d3.select('#' + this.props.data[d.index].key).style("visibility", event.type === 'mouseover' ? "visible" : "hidden")
      //     var i = d3.interpolate(d.outerRadius, event.type === 'mouseout' ? this.outerRadius - 20 : this.outerRadius - 10);
      //     return (t) => {
      //         d.outerRadius = i(t);
      //         return this.arc(d);
      //     };
      // });
    })();
  };

  componentDidMount = () => {
    const {data} = this.props;
    var __data = data.sort(function (a: any, b: any) {
      return a.key === "open" ? 1 : -1;
    });
    var svg = d3.select("#donut"),
      width: number = 180,
      height = 180,
      g = svg.append("g").attr("transform", "translate(110,100)"),
      cornerRadius = 3,
      padAngle = 0.02;

    this.outerRadius = 80;
    this.innerRadius = 60;
    console.log(this.outerRadius, this.innerRadius);

    svg.data(data);
    var total: any = data.reduce(
      (a: any, b: any) => {
        return {value: a.value + b.value};
      },
      {value: 0}
    )["value"];

    // Generate the pie
    var pie = d3.pie().sort(null);
    var _data = pie(
      __data.map((item: any) => {
        return (item.value / total) * 100;
      })
    );

    this.arc = d3
      .arc()
      .padRadius(this.outerRadius)
      .innerRadius(this.innerRadius)
      .cornerRadius(cornerRadius)
      .padAngle(padAngle);

    //Generate groups
    var arcs = g
      .selectAll("arc")
      .data(_data)
      .enter()
      .append("g")
      .attr("class", "arc");

    //Draw arc paths
    arcs
      .append("path")
      .attr("fill", function (d: any, i: number) {
        return __data[i].key === "open"
          ? "#59B35E"
          : "#F65A1C" && __data[i].key === "other"
          ? "#F65A1C"
          : "#666666";
      })
      .each((d: any) => {
        d.outerRadius =
          __data[d.index].key === "open"
            ? this.outerRadius
            : this.outerRadius + 11;
      })
      .attr("d", this.arc)
      .attr("d", (d) => {
        return this.arc(d);
      })
      .attr("cursor", "pointer");

    var circleParent = arcs
      .append("g")
      .attr("id", function (d: any) {
        return __data[d.index].key;
      })
      .style("visibility", function (d: any) {
        return d.data < 10 ? "hidden" : "visible";
      });

    circleParent
      .append("circle")
      .attr("transform", (d: any) => {
        d.outerRadius = d.outerRadius + (this.outerRadius / 2 - 7);
        d.innerRadius = d.innerRadius + (this.innerRadius / 2 - 7);
        return "translate(" + this.arc.centroid(d) + ")";
      })
      .attr("r", 20)
      .attr("text-anchor", "middle")
      .style("stroke", "#fff")
      .style("stroke-width", 2)
      .attr("fill", function (d: any, i: number) {
        return __data[i].key === "open"
          ? "#59B35E"
          : "#F65A1C" && __data[i].key === "other"
          ? "#F65A1C"
          : "#666666";
      });

    circleParent
      .append("text")
      .attr("text-anchor", "middle")
      .attr("x", (d: any): number => {
        return this.arc.centroid(d)[0];
      })
      .attr("y", (d: any): number => {
        return this.arc.centroid(d)[1] + 5;
      })
      .text((d: any, i) => {
        return Math.round((__data[d.index].value / total) * 100) + "%";
      })
      .style("font-size", "14px")
      .style("font-weight", "bold")
      .style("fill", "#fff");

    d3.select("#donut").selectAll("g").on("mouseover", this.arcTween);
    d3.select("#donut").selectAll("g").on("mouseout", this.arcTween);
  };
  componentDidUpdate = () => {
    d3.select("#donut").html("");
    this.componentDidMount();
  };
  render() {
    return (
      <>
        <svg id="donut" height={220} width={230}></svg>
      </>
    );
  }
}
export default FrxDonutChart;
