import React from 'react';
import * as d3 from 'd3';
import './FrxBarChart.scss';

import { Box, Button } from '@material-ui/core';
import ToolTip from '../Frx-components/tooltips/ToolTip';

interface FrxBarChartProps {
    data: any;
    id?: string;
    scale: number;
    title: string;
    isSelected: boolean;
    colorMap: any;
    margin?: any;
    height?: number;
    width?: number;
    gap?: number;
    padding?: number;
    radius?: number;
    showText?: boolean;
    total?: number;
    showFullTitle?:boolean;
    textFormatter?: 'percent' | 'currency' | 'text'
    itemClicked: Function;
};

class FrxBarChart extends React.Component<FrxBarChartProps>{
    componentDidMount = () => {
        let { data, scale, title } = this.props
        let total: number = this.props.total ? this.props.total : data.reduce((item1: any, item2: any) => { return { value: item1.value + item2.value } }).value
        var _data = data.sort(function (a: any, b: any) { return a.key === 'paid' ? -1 : 1 })
        var margin = this.props.margin ? this.props.margin : { top: 0, right: 0, bottom: 0, left: 0 },
            width = this.props.width ? ((this.props.width * data.length) + 20) : 0.012 * window.innerWidth - margin.left - margin.right,
            height = this.props.height ? this.props.height : 0.222 * window.innerHeight - margin.top - margin.bottom;
        // append the svg object to the body of the page
        var svg = d3.select(`#${this.props.id ? this.props.id + this.props.title : this.props.title}`)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        // Add X axis
        let x = d3.scaleBand()
            .range([0, width])
            .domain(_data.map(function (d: any) { return d.key; }))
            .padding(this.props.padding !== undefined ? this.props.padding : 0.2);

        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");

        // Add Y axis
        let y = d3.scaleLinear()
            .domain([0, 100])
            .range([height, 0]).nice();

        svg.append("g")

        // Bars
        svg.selectAll("mybar")
            .data(_data)
            .enter()
            .append("g")
            .attr("class", "bars")
            .append("rect")
            .attr("x", (d: any, index: any): any => {
                return (this.props.padding !== undefined && this.props.padding === 0)
                    ? (this.props.width ? this.props.width : x.bandwidth()) * index + (this.props.gap ? this.props.gap : 0) * index
                    : x(d.key);
            })
            .attr("width", this.props.width ? this.props.width : x.bandwidth())
            .attr("fill", (d: any) => { return this.props.colorMap[d.key] })
            .attr("y", function (d): any { return y(0); })

        if (this.props.showText) {
            svg.selectAll(".bars")
                .attr("transform", "translate(10,0)")
                .append("text")
                .attr("class", "barlabel")
                .attr("x", (d: any, index: any): any => {
                    // return (((this.props.padding !== undefined && this.props.padding === 0)
                    //     ? (this.props.width ? this.props.width : x.bandwidth()) * index + (this.props.gap ? this.props.gap : 0) * index
                    //     : x(d.key) || 0) + ((this.props.width ? this.props.width : x.bandwidth()) / 2));
                    return (((this.props.width ? this.props.width : x.bandwidth()) * index + (this.props.gap ? this.props.gap : 0) * index) + ((this.props.width ? this.props.width : x.bandwidth()) / 2)) + 8;
                })
                .attr("y", (d: any): number => {
                    var __y: number = y(((d.value / scale) * 100)) || 0
                    var _y: number = this.props.showText ? __y + 10 : __y
                    return _y
                })
                .attr("dy", ".35em")
                .style("text-anchor", "end")
                .text((d: any): any => {
                    var formatter: any = this.props.textFormatter || 'text'
                    switch (formatter) {
                        case 'text': return d.value;
                        case 'currency': return '$' + d.value;
                        case 'percent': return ((d.value / total) * 100).toFixed(0) + '%';
                    }

                });
        }
        // Text

        svg.selectAll("rect")
            .transition()
            .duration(800)
            .attr("y", (d: any): number => {
                var __y: number = y(((d.value / scale) * 100)) || 0
                var _y: number = this.props.showText ? __y + 20 : __y
                return _y
            })
            .attr("height", (d: any): number => {
                return height - (this.props.showText ? (y(((d.value / scale) * 100)) || 0) - 20 : (y(((d.value / scale) * 100)) || 0));
            })
            .attr("rx", this.props.radius ? this.props.radius : 0.25 * width)
            .delay(function (d, i) { return (i * 200) });

    }
    componentDidUpdate = () => {
        if (this.props.isSelected) {
            d3.select('#' + this.props.id ? this.props.id + this.props.title : this.props.title).html("")
            this.componentDidMount()
        }
    }
    render() {
        let isDisabled: boolean = Math.max(...this.props.data.map((item: any) => item.value)) === 0
        let colors = ['#59B35E', '#F65A1C', '#2055B5']
        return (
            <div className={this.props.isSelected ? "barDiag Selected" : "barDiag unSelected"}>
                <Box component="span" display="block">
                    <svg id={this.props.id ? this.props.id + this.props.title : this.props.title}></svg>
                </Box>
                <Box component="span" display="block">
                    <Button variant="outlined" disabled={isDisabled} onClick={() => { this.props.itemClicked() }} style={{ borderRadius: 25, paddingLeft: 30, paddingRight: 30, fontSize: 18, fontWeight: 'bold' }}>{this.props.showFullTitle ? this.props.title : this.props.title.substr(0, 3).toLocaleUpperCase()}</Button>
                    <ToolTip>
                        {this.props.data.map((item: any, index: number) => (
                            <div className="tooltip-data">
                                <div>{item.key}</div>
                                <div style={
                                    { 'color': this.props.colorMap[item.key] || "#000000" }
                                }>{item.value}</div>
                            </div>
                        ))}
                        <div className="tooltip-data">
                            <div>total</div>
                            <div style={
                                { 'color': colors[2] }
                            }>{this.props.data.reduce((a: any, b: any) => { return { value: a.value + b.value } }, { value: 0 }).value}</div>
                        </div>
                    </ToolTip>
                </Box>
            </div >
        )
    };
};
export default FrxBarChart;