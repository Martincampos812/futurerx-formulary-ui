import { Button } from "@material-ui/core";
import React, { Component } from "react";
import { getPrescriberBarChartData, getPrescriberBarChartDataFilters } from "../../../mocks/ChartMock";
import FrxBarChart from "../FrxBarChart/FrxBarChart";
import FrxLoader from "../FrxLoader/FrxLoader";
import './FrxColumnChart.scss';

class FrxColumnChart extends Component {
  state = {
    selectedItem: {},
    filter: [],
    data: {},
    filters: [],
    loading: true
  }
  colorMap = {
    Adherence: "#ACE2AE",
    GDR: "#92B2EB",
    CMR: "#FFD5A5"
  }
  componentDidMount = () => {
    let data = getPrescriberBarChartData()
    let filters = getPrescriberBarChartDataFilters()
    this.setState({
      filter: filters.map((item: any) => item.key),
      filters: filters,
      selectedItem: Object.keys(data)[new Date().getMonth()],
      data: data,
      loading: false
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
    let { data, filters, loading } = this.state
    let filter: any = this.state.filter

    let scale = Math.max(
      ...Object.keys(data).map((item: string) => {
        return Math.max(
          ...[data[item][0].value, data[item][1].value, data[item][2].value]
        );
      })
    );
    return <div className="FrxColumnChart-root">
      <div className="filterArea">
        {filters.map((item: any) => (
          <Button style={{ backgroundColor: filter.includes(item.key) ? this.colorMap[item.key] : "#ffffff" }} className={filter.includes(item.key) ? 'filtered' : 'unfiltered'} onClick={() => { this.filter(item) }}>
            {item.display}
          </Button>
        ))}
      </div>
      <div className="graphArea">
        {loading ? <FrxLoader /> : Object.keys(data).map((item: string) => {
          var total: number = data[item].reduce((_i1: any, _i2: any) => { return { value: _i1.value + _i2.value } }).value
          return (
            <FrxBarChart
              colorMap={this.colorMap}
              scale={scale}
              width={90 / data[item].filter((_item: any) => filter.includes(_item.key)).length}
              height={317}
              padding={0}
              gap={2}
              radius={5}
              key={item}
              showText
              showFullTitle={filter.length <= 2}
              textFormatter="percent"
              total={total}
              isSelected={this.state.selectedItem === item}
              itemClicked={() => {
                this.setState({
                  selectedItem: item
                });
              }}
              data={data[item].filter((_item: any) => filter.includes(_item.key))}
              title={item.trim()}
            />
          )
        })}

      </div>
    </div>;
  }
}

export default FrxColumnChart;
