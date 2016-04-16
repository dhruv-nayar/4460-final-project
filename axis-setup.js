//All the functions for creating and re-writing x and y axis

function createXAxis(data, scale){
	scale.domain([0,d3.max(data,function(d){return d['average rating'];})]);
	var xAxis = d3.svg.axis().scale(scale).orient("bottom");
	console.log('x axis created');
	return xAxis;
}

function createYAxis(data, scale, unit){
	scale.domain([d3.min(data, function(d){return d[unit];}), d3.max(data,function(d){return d[unit];})]);
	var yAxis = d3.svg.axis().scale(scale).ticks(5).orient("left");
	console.log('y axis created');
	return yAxis;
}

function rewriteYAxis(unit){
	svg.selectAll('.y-axis').remove();
	yScale.domain([d3.min(data, function(d){return d[unit];}), d3.max(data,function(d){return d[unit];})]);
	var yAxis = createYAxis(data, yScale, unit);

	svg.append('g')
			.attr("class", "y-axis")
			.attr("transform", "translate(40,0)")
			.call(yAxis);
	console.log('y axis rewritten');
}

function changeDomain(data, scale, unit){
	console.log('domain changed');
}