import React, { Component } from "react";
import * as d3 from "d3";

const sampleData = [
  {
    categorie: "Student",
    values: [
      {
        value: 0,
        rate: "Not at all"
      },
      {
        value: 4,
        rate: "Not very much"
      },
      {
        value: 12,
        rate: "Medium"
      },
      {
        value: 6,
        rate: "Very much"
      },
      {
        value: 0,
        rate: "Tremendously"
      }
    ]
  },
  {
    categorie: "Liberal Profession",
    values: [
      {
        value: 1,
        rate: "Not at all"
      },
      {
        value: 21,
        rate: "Not very much"
      },
      {
        value: 13,
        rate: "Medium"
      },
      {
        value: 18,
        rate: "Very much"
      },
      {
        value: 6,
        rate: "Tremendously"
      }
    ]
  },
  {
    categorie: "Salaried Staff",
    values: [
      {
        value: 3,
        rate: "Not at all"
      },
      {
        value: 22,
        rate: "Not very much"
      },
      {
        value: 6,
        rate: "Medium"
      },
      {
        value: 15,
        rate: "Very much"
      },
      {
        value: 3,
        rate: "Tremendously"
      }
    ]
  },
  {
    categorie: "Employee",
    values: [
      {
        value: 12,
        rate: "Not at all"
      },
      {
        value: 7,
        rate: "Not very much"
      },
      {
        value: 18,
        rate: "Medium"
      },
      {
        value: 13,
        rate: "Very much"
      },
      {
        value: 6,
        rate: "Tremendously"
      }
    ]
  },
  {
    categorie: "Craftsman",
    values: [
      {
        value: 6,
        rate: "Not at all"
      },
      {
        value: 15,
        rate: "Not very much"
      },
      {
        value: 9,
        rate: "Medium"
      },
      {
        value: 12,
        rate: "Very much"
      },
      {
        value: 3,
        rate: "Tremendously"
      }
    ]
  },
  {
    categorie: "Inactive",
    values: [
      {
        value: 6,
        rate: "Not at all"
      },
      {
        value: 6,
        rate: "Not very much"
      },
      {
        value: 6,
        rate: "Medium"
      },
      {
        value: 2,
        rate: "Very much"
      },
      {
        value: 3,
        rate: "Tremendously"
      }
    ]
  }
];

class BarChart extends Component {
  constructor(props: any) {
    super(props);
    console.log(sampleData);
  }

  drawChart = () => {
    const h = 300;
    const w = 700;
    const data = [
      { v1: 12, v2: 10 },
      { v1: 8, v2: 3 },
      { v1: 10, v2: 5 },
      { v1: 8, v2: 12 }
    ];
    const svg = d3
      .select(".bar-chart")
      .append("svg")
      .attr("width", w)
      .attr("height", h);

    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * 70)
      .attr("y", (d, i) => h - d.v1 * 20)
      .attr("width", 10)
      .attr("height", (d, i) => d.v1 * 20)
      .attr("fill", "blue")
      .attr("rx", "10px")
      .attr("ry", "10px");

    // svg.data(data)
    //     .enter()
    //     .append("rect")
    //     .attr("x", (d, i) => (i * 70) + 20)
    //     .attr("y", (d,i) => h - (d.v2*20))
    //     .attr("width", 10)
    //     .attr("height", (d, i) => d.v2*20)
    //     .attr("fill", "red")
    //     .attr("rx", "10px")
    //     .attr("ry", "10px");

    // svg.selectAll("rect")
    //     .data(data)
    //     .enter()
    //     .append("rect")
    //     .attr("x", (d, i) => (i * 70) + 20)
    //     .attr("y", (d,i) => h - (d.v2*20))
    //     .attr("width", 10)
    //     .attr("height", (d, i) => d.v2*20)
    //     .attr("fill", "red")
    //     .attr("rx", "10px")
    //     .attr("ry", "10px");

    svg
      .selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .text(d => d.v1)
      .attr("x", (d, i) => i * 70)
      .attr("y", (d, i) => h - 20 * d.v1 - 3);
  };
  componentDidMount = () => {
    this.drawChart();
  };

  render() {
    return <div className="bar-chart"></div>;
  }
}

export default BarChart;
