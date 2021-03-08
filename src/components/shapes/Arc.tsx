import React, { Component } from 'react';
import * as d3 from 'd3';
import { Tooltip } from "@material-ui/core";
import { Right } from 'react-bootstrap/lib/Media';

interface Props {
  innerRadius: number;
  outerRadius: number;
  strokeWidth: number;
  circleRadius: number;
  startAngle: number;
  endAngle: number;
  label: string;
  color: string;
  index: number;
  text: any;
}

const cornerRadius = 3;

class Arc extends Component<Props, any> {
  arc: any;
  arcForCentroid: any;
  isShowLabel: boolean;

  constructor(props: any) {
    super(props);
    this.arc = d3.arc();
    this.arcForCentroid = d3.arc();
    this.arc.innerRadius(this.props.innerRadius);
    this.arc.outerRadius(this.props.outerRadius);
    this.arc.cornerRadius(cornerRadius);
    this.isShowLabel = true;
    const angDiff = Math.abs(this.props.endAngle - this.props.startAngle);
    console.log("Arc::label: " + this.props.label, this.props.text);
    console.log("Arc::Angle width: " + angDiff);
    if (angDiff < 2 * Math.PI / 10) {
      this.isShowLabel = false;
    }

    this.arcForCentroid.outerRadius(this.props.outerRadius);
    this.arcForCentroid.innerRadius(this.props.outerRadius * 0.9);
  }

  render() {
    // this.arc.inn
    // Offset 20 required to make sure the arcs dont go out of bounds of svg.
    let pathTrX = 20 + this.props.outerRadius + (this.props.strokeWidth / 2);
    let pathTrY = 20 + this.props.outerRadius + (this.props.strokeWidth / 2);
    let pathTranslate = `translate(${pathTrX}, ${pathTrY})`;
    let cent = this.arcForCentroid.centroid({
      startAngle: this.props.startAngle,
      endAngle: this.props.endAngle
    }),
      labelTranslate = `translate(${cent[0] + pathTrX}, ${cent[1] + pathTrY})`;
    console.log("labelxy: " + cent[0] + " " + cent[1]);
    // To center the text, it has to be pushed down a little (thats the +5)
    let textLabelTranslate = `translate(${cent[0] + pathTrX}, ${cent[1] + pathTrY + 5})`;
    return (
      <g>
        {/* <svg width={2*this.props.outerRadius + this.props.circleRadius + this.props.strokeWidth} 
                    height={2*this.props.outerRadius + this.props.circleRadius + this.props.strokeWidth}> */}
        {!this.isShowLabel ? <Tooltip title={this.props.text} arrow={true} placement="right" classes={{ tooltip: 'Arc-tooltip', arrow: 'Arc-arrow' }}>
          <path d={this.arc({
            startAngle: this.props.startAngle,
            endAngle: this.props.endAngle,
          })}
            fill={this.props.color}
            stroke={"#FFFFFF"}
            strokeWidth={this.props.strokeWidth}
            transform={pathTranslate}
          >

          </path>
        </Tooltip> : <path d={this.arc({
          startAngle: this.props.startAngle,
          endAngle: this.props.endAngle,
        })}
          fill={this.props.color}
          stroke={"#FFFFFF"}
          strokeWidth={this.props.strokeWidth}
          transform={pathTranslate}
        >

          </path>}

        {
          this.isShowLabel &&
          <circle cx={0}
            cy={0}
            r={this.props.circleRadius}
            transform={labelTranslate}
            stroke={"#ffeeff"}
            fill={this.props.color}
          />
        }
        {
          this.isShowLabel &&
          <Tooltip title={this.props.text} arrow={true} placement="right" classes={{ tooltip: 'Arc-tooltip circle-tooltip', arrow: 'Arc-arrow' }}>
            <text transform={textLabelTranslate}
              fill={"#ffffff"}
              textAnchor="middle">
              {this.props.label}
            </text>
          </Tooltip>
        }

        {/* </svg> */}
      </g>


    );
  }
}
export default Arc;

// Not used.
class LabeledArc extends Arc {
  render() {
    let cent = this.arc.centroid({
      startAngle: this.props.startAngle,
      endAngle: this.props.endAngle
    }),
      labelTranslate = `translate(${cent[0]}, ${cent[1]})`;
    console.log("labelxy: " + cent[0] + " " + cent[1]);
    return (
      <g>
        {super.render()}
        <text transform={labelTranslate}
          textAnchor="middle">
          {"My label"}
        </text>
      </g>
    );
  }
}
export { LabeledArc };