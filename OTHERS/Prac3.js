import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import input_data1 from "./1월-top1.csv";
import input_data2 from "./1월-top2.csv";
import input_data3 from "./1월-top3.csv";


function Prac3({month}) {

    /*if(month == 1){
        input_data = input_data1;
    }
    if(month == 2){
        input_data = input_data2;
    }
    if(month == 3){
        input_data = input_data3;
    }
    if(month == 4){
        input_data = input_data4;
    }
    if(month == 5){
        input_data = input_data5;
    }
    if(month == 6){
        input_data = input_data6;
    }
    if(month == 7){
        input_data = input_data7;
    }
    if(month == 8){
        input_data = input_data8;
    }
    if(month == 9){
        input_data = input_data9;
    }
    if(month == 10){
        input_data = input_data10;
    }
    if(month == 11){
        input_data = input_data11;
    }
    if(month == 12){
        input_data = input_data12;
    }*/

    var margin = {top: 200, right: 200, bottom: 200, left: 200},
    width = 400 - margin.left/2 - margin.right/2,
    height = 400 - margin.top/2 - margin.bottom/2;

    const [data, setdata] = useState();
    const svgRef = useRef();

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        var line;
        d3.csv(input_data1).then(function(data) {
            setdata(data);
            const max = d3.max(data, function(d) { return +d.빈도수; })

            const xScale = d3
                .scaleBand()
                .domain(data.map(function(d){return d.시;}))
                .range([0, width])
                .padding(0.6);
            
           const yScale = d3
                .scaleLinear()
                .domain([0,max+10])
                .range([height, 0]);
        
            const xAxis1 = d3.axisBottom(xScale).ticks(data.length);
            svg.select('.x-axis1').style('transform', 'translateY(205px)').call(xAxis1);
            const yAxis1 = d3.axisRight(yScale);
            svg.select('.y-axis1').style("transform", "translateX(0px)").call(yAxis1);

            svg.append("linearGradient")
                .attr("id", "line-gradient")
                .attr("gradientUnits", "userSpaceOnUse")
                .attr("x1", 0)
                .attr("y1", yScale(0))
                .attr("x2", 0)
                .attr("y2", yScale(max))
                .selectAll("stop")
                .data([
                    {offset: "0%", color: "blue"},
                    {offset: "100%", color: "red"}
                ])
                .enter().append("stop")
                .attr("offset", function(d) { return d.offset; })
                .attr("stop-color", function(d) { return d.color; });

            line= svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "url(#line-gradient)" )
            .attr("stroke-width", 3)
            .attr("d", d3.line()
                .x(function(d) { return xScale(d.시) })
                .y(function(d) { return yScale(d.빈도수) }) )
        })

        d3.csv(input_data2).then(function(data) {
            setdata(data);
            const max = d3.max(data, function(d) { return +d.빈도수; })

            const xScale = d3
                .scaleBand()
                .domain(data.map(function(d){return d.시;}))
                .range([0, width])
                .padding(0.6);
            
           const yScale = d3
                .scaleLinear()
                .domain([0,max+10])
                .range([height, 0]);
        
            const xAxis = d3.axisBottom(xScale).ticks(data.length);
            svg.select('.x-axis').style('transform', 'translateY(205px)').call(xAxis);
            const yAxis = d3.axisRight(yScale);
            svg.select('.y-axis').style("transform", "translateX(0px)").call(yAxis);

            svg.append("linearGradient")
                .attr("id", "line-gradient")
                .attr("gradientUnits", "userSpaceOnUse")
                .attr("x1", 0)
                .attr("y1", yScale(0))
                .attr("x2", 0)
                .attr("y2", yScale(max))
                .selectAll("stop")
                .data([
                    {offset: "0%", color: "purple"},
                    {offset: "100%", color: "orange"}
                ])
                .enter().append("stop")
                .attr("offset", function(d) { return d.offset; })
                .attr("stop-color", function(d) { return d.color; });

            line= svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "url(#line-gradient)" )
            .attr("stroke-width", 3)
            .attr("d", d3.line()
                .x(function(d) { return xScale(d.시) })
                .y(function(d) { return yScale(d.빈도수) }) )
        })

        d3.csv(input_data3).then(function(data) {
            setdata(data);
            const max = d3.max(data, function(d) { return +d.빈도수; })

            const xScale = d3
                .scaleBand()
                .domain(data.map(function(d){return d.시;}))
                .range([0, width])
                .padding(0.6);
            
           const yScale = d3
                .scaleLinear()
                .domain([0,max+10])
                .range([height, 0]);
        
            const xAxis = d3.axisBottom(xScale).ticks(data.length);
            svg.select('.x-axis').style('transform', 'translateY(205px)').call(xAxis);
            const yAxis = d3.axisRight(yScale);
            svg.select('.y-axis').style("transform", "translateX(0px)").call(yAxis);

            svg.append("linearGradient")
                .attr("id", "line-gradient")
                .attr("gradientUnits", "userSpaceOnUse")
                .attr("x1", 0)
                .attr("y1", yScale(0))
                .attr("x2", 0)
                .attr("y2", yScale(max))
                .selectAll("stop")
                .data([
                    {offset: "0%", color: "yellow"},
                    {offset: "100%", color: "green"}
                ])
                .enter().append("stop")
                .attr("offset", function(d) { return d.offset; })
                .attr("stop-color", function(d) { return d.color; });

            line= svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "url(#line-gradient)" )
            .attr("stroke-width", 3)
            .attr("d", d3.line()
                .x(function(d) { return xScale(d.시) })
                .y(function(d) { return yScale(d.빈도수) }) )
        })
    }, [data])

    return (
        <>
            <svg ref={svgRef} width={400} height={400}>
                <g className="x-axis"></g>
                <g className="y-axis"></g> 
                
                </svg>
        </>
    );
}
export default Prac3;
