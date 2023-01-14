import { dummy_data }from "./data.js"


// bar chart
const margin = 150 
const container = d3.select('svg.wrapper')
        .attr('height', 350 + margin)
        .attr('width', 500 + margin)

const xScale = d3.scaleBand()
    .domain(dummy_data.map(dataPoint => dataPoint.xdata))
    .range([0, 450])
    .padding(0.1)

const yScale = d3.scaleLinear()
    .domain([40, 100])
    .range([300, 0])
    
container
        .selectAll('.stats')
        .data(dummy_data)
        .enter()
        .append('rect')
        .classed('stats', true)
        .attr('width', xScale.bandwidth())
        .attr('height', (data) => 300 - yScale(data.ydata))
        .attr("transform", "translate(" + 100 + "," + 100 + ")")
        .attr('x', data => xScale(data.xdata))
        .attr('y', data => yScale(data.ydata))


const group = container.append("g")
                .attr("transform", "translate(" + 100 + "," + 100 + ")");


group.append("g")
        .attr("transform", "translate(0," + 300 + ")")
        .call(d3.axisBottom(xScale));

group.append("g")
        .call(d3.axisLeft(yScale));



// line chart 

const marginLineChart = 150

const svg = d3.select("svg.line")
        .attr("height", 350 + marginLineChart)
        .attr("width", 500 + marginLineChart)


const xScaleLine = d3.scaleBand()
        .domain(dummy_data.map(dataPoint => dataPoint.xdata))
        .range([0, 500])

const yScaleLine = d3.scaleLinear()
        .domain([40, 100])
        .range([350, 0]);

const g = svg.append("g")
        .attr("transform", "translate(" + 100 + "," + 100 + ")");


svg.append('text')
        .attr('x', 500 + 100)
        .attr('y', 350 + 140)
        .attr('text-anchor', 'middle')
        .style('font-family', 'Helvetica')
        .text('x-data');

svg.append('text')
        .attr('text-anchor', 'middle')
        .attr('transform', 'translate(60,' + 100 + ')rotate(-90)')
        .style('font-family', 'Helvetica')
        .text('y-data');


g.append("g")
        .attr("transform", "translate(0," + 350 + ")")
        .call(d3.axisBottom(xScaleLine));

g.append("g")
        .call(d3.axisLeft(yScaleLine));


svg.append('g')
        .selectAll("dot")
        .data(dummy_data)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return xScaleLine(d.xdata); } )
        .attr("cy", function (d) { return yScaleLine(d.ydata); } )
        .attr("r", 3)
        .attr("transform", "translate(" + 130 + "," + 100 + ")")
        .style("fill", "#CC0000");
      
const line = d3.line()
        .x(function(d) { return xScaleLine(d.xdata); }) 
        .y(function(d) { return yScaleLine(d.ydata); }) 

svg.append("path")
        .datum(dummy_data) 
        .attr("class", "line") 
        .attr("transform", "translate(" + 130 + "," + 100 + ")")
        .attr("d", line)
        .style("fill", "none")
        .style("stroke", "#CC0000")
        .style("stroke-width", "2");