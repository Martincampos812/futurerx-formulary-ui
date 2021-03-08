import { Button } from "@material-ui/core";
import React, { Component } from "react";
import { getPrescribedMemberServiced } from "../../../mocks/ChartMock";
import FrxBarChart from "../FrxBarChart/FrxBarChart";
import FrxLoader from "../FrxLoader/FrxLoader";
import './FrxGraphCard.scss';
interface Props {
  data: any;
  type: string;
  colorMap: any;
  textFormatter?: any;
  showText?: boolean;
  title?: string;
}
interface State {

}
class FrxGraphCard extends Component<Props, State> {
  state = {
    selectedItem: {},
    filter: [],
    data: {},
    filters: [],
    loading: true
  }

  componentDidMount = () => {
    this.setState({
      loading: false,
      selectedItem: Object.keys(this.props.data)[new Date().getMonth()]
    })
  }

  filter = (item: any) => {
    let filter: any = this.state.filter
    if (filter.includes(item.key)) {
      this.setState({
        filter: [...filter.filter((_i: any) => _i !== item.key)],
        loading: true
      })
    } else {
      this.setState({
        filter: [...filter, item.key],
        loading: true
      })
    }
    setTimeout(() => {
      this.setState({
        loading: false
      })
    }, 1000);
  }

  render() {
    let { loading } = this.state
    let { colorMap, showText, data, textFormatter, type, title } = this.props

    let scale = Math.max(
      ...Object.keys(data).map((item: string) => {
        var t: any = Math.max(
          ...data[item].map((_item: any) => _item.value)
        )
        console.log(t);

        return t;
      })
    );
    return <div className="FrxGraphCard-root">
      {/* <div className="filterArea">
        {filters.map((item: any) => (
          <Button style={{ backgroundColor: filter.includes(item.key) ? colorMap[item.key] : "#ffffff" }} className={filter.includes(item.key) ? 'filtered' : 'unfiltered'} onClick={() => { this.filter(item) }}>
            {item.display}
          </Button>
        ))}
      </div> */}
      <div className="header">{title}</div>
      <div className="graphArea">
        {loading ? <FrxLoader /> : Object.keys(data).map((item: string) => {
          var total: number = data[item].reduce((_i1: any, _i2: any) => { return { value: _i1.value + _i2.value } }).value
          return (
            <FrxBarChart
              colorMap={colorMap}
              scale={scale}
              width={42}
              height={196}
              padding={0}
              gap={2}
              radius={5}
              key={item}
              id={type}
              showText={showText}
              textFormatter={textFormatter ? textFormatter : 'text'}
              total={total}
              isSelected={this.state.selectedItem === item}
              itemClicked={() => {
                this.setState({
                  selectedItem: item
                });
              }}
              data={data[item]}
              title={item.trim()}
            />
          )
        })}

      </div>
    </div>;
  }
}

export default FrxGraphCard;
