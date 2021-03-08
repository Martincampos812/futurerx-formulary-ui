import React, { Component } from "react";
import shortid from "shortid";
import { Accumulator_Data_Type } from "../../models/accumulator-model";

interface Props {
  handleStepperClick?: (stage: number) => void;
  // currentValue: number;
  config: Array<Accumulator_Data_Type>;
  // total: number;
  numStages: number;
}

class Stepper extends Component<Props> {
  xStart: number;
  yStageRect: number;

  circleRadius: number;
  progressBarHeight: number;
  stageWidth: number;

  baseProgressBarHeight: number;
  baseProgressBarWidth: number;

  activeStageMinWidth: number;
  totalWidth: number;
  currentValue: number;

  // Props
  numOfStages: number;

  constructor(props: any) {
    super(props);

    this.xStart = 50;
    this.yStageRect = 20;
    this.circleRadius = 25;
    this.progressBarHeight = 50;
    this.baseProgressBarHeight = 30;
    this.baseProgressBarWidth = 480;
    this.stageWidth = 165; // Init value. Should be computed from number of stages
    this.activeStageMinWidth = 80;
    this.totalWidth = 550; // For now.
    // Props. For now in this.
    this.numOfStages = props.config.length - 1;
    this.currentValue = 0;
  }

  componentDidMount = () => {
    this.computeStageWidth();
  };

  componentDidUpdate = () => {
    this.computeStageWidth();
  };

  computeStageWidth = () => {
    const numOfCircles = this.numOfStages + 1;
    const totalCircleWidth = numOfCircles * 2 * this.circleRadius;
    const stageWidthBetweenCircles = Math.floor(
      (this.totalWidth - totalCircleWidth) / this.numOfStages
    );
    this.stageWidth = stageWidthBetweenCircles + 2 * this.circleRadius;
    console.log("Stepper::Computed stage width: " + this.stageWidth);
  };

  drawBaseRect = () => {
    const y =
      this.yStageRect +
      (this.progressBarHeight - this.baseProgressBarHeight) / 2;
    return (
      <rect
        x={this.xStart}
        y={y}
        width={this.baseProgressBarWidth}
        height={this.baseProgressBarHeight}
        style={{ fill: "#E5E5E5", stroke: "#E5E5E5", strokeWidth: 1 }}
      />
    );
  };

  getStageStartX = (stage: number): number => {
    if (stage < 1) {
      console.log("Stepper::getStageStartX: Invalid stage: " + stage);
      return -1;
    }
    return this.xStart + this.stageWidth * (stage - 1);
  };

  getActiveStageStartX = (stage: number): number => {
    if (stage < 1) {
      console.log("Stepper::getStageStartX: Invalid stage: " + stage);
      return -1;
    }
    return this.xStart + this.stageWidth * (stage - 1) - 15;
  };

  getActiveStageUnusedLabelX = (
    stage: number,
    stageStartX: number,
    activeRectWidth: number,
    labelLength: number
  ) => {
    const inactiveX = stageStartX + activeRectWidth;
    const nextStageX = this.getStageStartX(stage + 1);
    const mid = (inactiveX + nextStageX - this.circleRadius) / 2;
    const labelWidth = labelLength * 7;
    const ret = Math.floor(mid - labelWidth / 2);
    console.log("Stepper::getActiveStageUnusedLabelX: ", ret);
    return ret;
  };

  getUnusedStageLabelX = (stage: number, labelLength: number) => {
    const stageStartX = this.getStageStartX(stage);
    const nextStageX = this.getStageStartX(stage + 1);
    const mid = (stageStartX + nextStageX) / 2;
    const labelWidth = labelLength * 7;
    const ret = Math.floor(mid - labelWidth / 2);
    console.log("Stepper::getUnusedStageLabelX: ", ret);
    return ret;
  };

  drawStageRectDone = (stage: number, label: string) => {
    const startX = this.getStageStartX(stage);
    if (startX === -1) {
      return;
    }
    const textX = startX + this.stageWidth / 2 - 20; // 20 - depends on the length of text
    const textY = (this.yStageRect + this.progressBarHeight) / 2 + 15;
    return (
      <g
        key={shortid.generate()}
        onClick={() => this.props.handleStepperClick!(stage)}
      >
        <rect
          x={startX}
          y={this.yStageRect}
          width={this.stageWidth}
          height={this.progressBarHeight}
          style={{ fill: "#80C483", stroke: "white", strokeWidth: 1 }}
        />
        <text x={textX} y={textY} fill="white" className="step--done__text">
          {" "}
          {label}{" "}
        </text>
        <path
          style={{ fill: "none", stroke: "white", strokeWidth: 2 }}
          strokeDasharray={"1,2"}
          d={"M" + textX + " " + (textY + 3) + " h" + label.length * 7}
        />
      </g>
    );
  };

  drawStageRectActive = (stage: number, label: string, unusedLabel: string) => {
    const startX = this.getActiveStageStartX(stage);
    if (startX === -1) {
      return;
    }
    const textX = startX + 90 / 2 + 3; // 20 - depends on the length of text, its different for active rectangle
    const textY = (this.yStageRect + this.progressBarHeight) / 2 + 15;
    console.log(
      "Stepper::drawStageRectActive: startX, textX, textY: ",
      startX,
      textX,
      textY
    );
    const unusedTextX = this.getActiveStageUnusedLabelX(
      stage,
      startX,
      90,
      label.length
    );
    return (
      <g
        key={shortid.generate()}
        onClick={() => this.props.handleStepperClick!(stage)}
      >
        <rect
          x={startX}
          y={this.yStageRect}
          width={90}
          height={this.progressBarHeight}
          rx={this.circleRadius}
          ry={this.circleRadius}
          style={{ fill: "#6E90CF", stroke: "white", strokeWidth: 3 }}
        />
        <text x={textX} y={textY} fill="white" className="step--active__text">
          {" "}
          {label}{" "}
        </text>
        <path
          style={{ fill: "none", stroke: "white", strokeWidth: 2 }}
          strokeDasharray={"1,2"}
          d={"M" + textX + " " + (textY + 3) + " h" + label.length * 7}
        />

        <text
          x={unusedTextX}
          y="50"
          fill="#999999"
          style={{ fontFamily: "Roboto", fontSize: "12px", fontWeight: 700 }}
        >
          {" "}
          {unusedLabel}{" "}
        </text>
      </g>
    );
  };

  /**
   *
   * @param index - 1,2,3...
   * @param label - typically same as index.
   * @param fill - color of the circle.
   */
  drawCircle = (
    index: number,
    label: string,
    stageName: string,
    stageValue: number
  ) => {
    const startX = this.getStageStartX(index);

    let fill = "";
    let fillv = "";
    if (stageValue === 0) {
      fill = "#80C483";
    } else if (this.currentValue > stageValue) {
      fill = "#6E90CF";
      fillv = "#80C483";
    } else if (this.currentValue < stageValue) {
      fill = "#E5E5E5";
      fillv = "#694298";
    }

    if (startX === -1) {
      return;
    }
    const cy = this.yStageRect + this.circleRadius;
    // Text co-ordinates are approximations.
    const textX = startX - 5;
    const textY = cy + 5;

    // Text co-ordinates for circle names
    const ntextX = startX - (stageName.length * 7) / 2;
    const ntextY = cy + 5 + this.circleRadius * 2 - 10;

    // Text co-ordinates for circle value
    const stageValueStr = "$" + stageValue.toString();
    const vTextRectWidth = stageValueStr.length * 9 + 20;

    const vtextX = startX - vTextRectWidth / 2;
    const vtextY = cy + 20 + this.circleRadius * 2 - 5;
    console.log(
      "Stepper::drawCircle: startX, vTextX, vTextRectWidth: ",
      startX,
      vtextX,
      vTextRectWidth
    );

    return (
      <g>
        <circle
          cx={startX}
          cy={cy}
          r={this.circleRadius}
          stroke="white"
          strokeWidth="3"
          fill={fill}
        />

        {/* Text 1. Position slightly to the left and a little down */}
        <text
          x={textX}
          y={textY}
          fill="white"
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            letterSpacing: "0.5px",
            fontFamily: "Roboto"
          }}
        >
          {" "}
          {label}{" "}
        </text>
        <text
          x={ntextX}
          y={ntextY}
          fill="#333333"
          style={{
            fontSize: "12px",
            letterSpacing: "0px",
            textDecoration: "underline",
            fontFamily: "Roboto",
            fontWeight: "bold",
            textTransform: "uppercase"
          }}
        >
          {" "}
          {stageName}{" "}
        </text>
        {/* <line style={{"fill":"none", "stroke":"#333333", "strokeWidth":1 }} stroke-dasharray={"0"} x1={ntextX} y1={ntextY+3} x2={ntextX+stageName.length*7} y2={ntextY+3} /> */}
        {label !== "1" && stageValue < 1000 && (
          <>
            <rect
              x={vtextX}
              y={vtextY - 15}
              width={vTextRectWidth}
              height={24}
              rx={12}
              ry={12}
              style={{ fill: fillv, stroke: "white", strokeWidth: 3 }}
            />
            <text
              x={vtextX + 12}
              y={vtextY + 2}
              fill="#FFFFFF"
              style={{
                fontSize: "14px",
                fontFamily: "Roboto",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                fontWeight: "bold"
              }}
            >
              {" "}
              {"$"}
              {stageValue}{" "}
            </text>
          </>
        )}
        {label !== "1" && stageValue > 1000 && (
          <>
            <rect
              x={vtextX}
              y={vtextY - 15}
              width={vTextRectWidth}
              height={24}
              rx={12}
              ry={12}
              style={{ fill: fillv, stroke: "white", strokeWidth: 3 }}
            />
            <text
              x={vtextX + 12}
              y={vtextY + 2}
              fill="#FFFFFF"
              style={{
                fontSize: "14px",
                fontFamily: "Roboto",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                fontWeight: "bold"
              }}
            >
              {" "}
              {"$"}
              {stageValue}{" "}
            </text>
          </>
        )}
      </g>
    );
  };

  computeCurrentValue = () => {
    const data = this.props.config;
    if (data.length <= 1) {
      console.log("Stepper::computeCurrentValue: invalid input data");
      return;
    }
    let sum = 0;
    for (let i = 1; i < data.length; i++) {
      if (data[i].fill) {
        sum += data[i].fill!;
      }
    }
    this.currentValue = sum;
    console.log("Stepper::computeCurrentValue ", this.currentValue);
  };

  render() {
    this.computeCurrentValue();
    this.computeStageWidth();

    const { config } = this.props;
    return (
      <svg height={120} width={600}>
        {this.drawBaseRect()}

        {/* {this.drawStageRectDone(1, "$320")} */}
        {config.map((item, index) => {
          if (index === 0) {
            return;
          }
          if (item.fill && item.fill !== 0) {
            // The stage is either active or done.
            if (item.max <= this.currentValue) {
              return this.drawStageRectDone(
                item.stage,
                "$" + item.max.toString()
              );
            } else {
              return this.drawStageRectActive(
                item.stage,
                "$" + item.fill!.toString(),
                "$" + (item.max - this.currentValue).toString()
              );
            }
          } else {
            // Unused stage
            let value = config[index].max;
            if (index !== 1) {
              value = config[index].max - config[index - 1].max;
            }
            const valueStr = "$" + value.toString();
            const unusedStageX = this.getUnusedStageLabelX(
              item.stage,
              valueStr.length
            );
            return (
              <text
                key={shortid.generate()}
                x={unusedStageX}
                y="50"
                fill="#999999"
                style={{
                  fontFamily: "Roboto",
                  fontSize: "12px",
                  fontWeight: 700
                }}
              >
                {" "}
                {valueStr}{" "}
              </text>
            );
          }
        })}

        {/* {this.drawStageRectActive(2, "$800")} */}
        {config.map((item: Accumulator_Data_Type) => {
          // this.drawCircle(item.stage,item.label,item.name,item.value)
          const stage = item.stage + 1;
          const label = stage.toString();
          const name = item.name;
          const value = item.max;
          return this.drawCircle(stage, label, name, value);
        })}
        {/* <text x="305" y="50" fill="#999999" style={{"fontFamily":"Roboto", "fontSize":"12px", "fontWeight": 700}}> $2880 </text> */}
        {/* <text x="445" y="50" fill="#999999" style={{"fontFamily":"Roboto", "fontSize":"12px", "fontWeight": 700}}> $2250 </text> */}
      </svg>
    );
  }
}

export default Stepper;
