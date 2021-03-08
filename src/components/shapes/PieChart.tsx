import React, { Component } from "react";
import Arc from "./Arc";
import "./Shapes.scss";

interface Props {
  data: Array<number>;
  total: number;
  tooltips?: Array<string>;
  showPercentage?: boolean;
  colors?: Array<string>;
  onClickArc?: (index:number)=>void;
}

interface State {
  arcArray: Array<Arc_Type>;
  selectedIndex: number;
}

interface Arc_Type { 
  startAngle: number; 
  endAngle: number; 
  value: number; 
  color : string;
}

class PieChart extends Component<Props, State> {

  state: State = {
    arcArray: [],
    selectedIndex: -1
  }

  innerRadius: number;
  outerRadius: number;
  strokeWidth: number;
  circleRadius: number;
  colors: Array<string>;
  sum: number;

  constructor(props: any) {
    super(props);

    this.innerRadius = 50;
    this.outerRadius = 80;
    this.strokeWidth = 1;
    this.circleRadius = 20;
    this.colors = ["#F65A1C", "#E5AC25", "#59B35E", "#5069C5",
                  "#37B0AB", "#694298"];
    this.sum = 0;
  }

  componentDidMount = () => {
    this.processData();
  }

  componentDidUpdate = () => {
    this.processData();
  }

  /**
   * @function isSameArcArray
   * @param arcArray - The arcs array to be compared with the arcs array in the state.
   * @author Sumanth
   */
  isSameArcArray = (arcArray: Array<Arc_Type>) => {
    const stateArr = this.state.arcArray;
    if(stateArr === undefined && arcArray === undefined) {
      return true;
    }
    if(stateArr === undefined || arcArray === undefined) {
      return false;
    }
    if(stateArr.length !== arcArray.length) {
      return false;
    }
    for(let i=0; i<stateArr.length; i++) {
      if(stateArr[i].value !== arcArray[i].value) {
        return false;
      }
    }
    return true;
  }

  /**
   * @function processData
   * @author Sumanth
   * Generates arcs for the data from the props.
   * If the arcs array is different from the one in the state, the state is set.
   * Its very important to compare the arrays before setting the state.
   */
  processData = () => {
    let colors = (this.props.colors)? this.props.colors : this.colors;
    let arcs = this.getArcs(this.props.data, colors);
    if(!this.isSameArcArray(arcs)) {
      this.setState({ arcArray: arcs});
    } else {
      console.log("PieChart::generateArcs: The arrays are the same");
    }
  }

  getArcs = (data: Array<any>, colors:Array<string>) => {
    let sum = 0;
    let angArr: Array<Arc_Type> = [];
    let lastAng = 0;
    data.forEach(value => {
      sum += value;
    });
    console.log("PieChart::getArcs:sum: " + sum);
    this.sum = sum;
    let colorIdx = 0;
    data.forEach(value => {
      let ang = ((value * 1.0) / sum) * 2 * Math.PI;
      angArr.push({
        startAngle: lastAng,
        endAngle: lastAng + ang,
        value: value,
        color: colors[colorIdx]
      });
      console.log("PieChart::getArcs:value: " + value);
      console.log("PieChart::getArcs:start and end angles: " + lastAng + " , " + lastAng + ang);
      lastAng += ang;
      colorIdx = (colorIdx + 1) % colors.length;
    });
    return angArr;
  };

  render() {
    const arcArr = this.state.arcArray;
    const getLabel = (arc:Arc_Type, isShowPercentage:boolean|undefined) => {
      if(isShowPercentage === undefined || !isShowPercentage) {
        console.log("**",arc);
        
        return arc.value.toString();
      }
      if(this.sum === 0) {
        return "";
      }
      const percent = Math.floor((arc.value/this.sum) * 100 + 0.5);
      return percent.toString() + "%";
    };
    return (
      <div className="pie-chart-root">
        <svg
          width={2 * this.outerRadius + (2*this.circleRadius) + this.strokeWidth}
          height={2 * this.outerRadius + (2*this.circleRadius) + this.strokeWidth}
        >
          {arcArr.map((arc,index) => {
            return (
              <Arc
                startAngle={arc.startAngle}
                endAngle={arc.endAngle}
                innerRadius={this.innerRadius}
                outerRadius={this.outerRadius}
                strokeWidth={this.strokeWidth}
                circleRadius={this.circleRadius}
                label={getLabel(arc,this.props.showPercentage)}
                text={this.props.tooltips?this.props.tooltips[index]:''}
                color={arc.color!}
                index={index}
              />
            );
          })}
        </svg>
      </div>
    );
  }
}

export default PieChart;
