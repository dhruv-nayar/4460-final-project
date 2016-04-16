//function that registers whenever the dropdown has been changed. Changes scales and then moves dots
function dropdownChange(unit){
	rewriteYAxis(unit);
	moveDots(unit);
}

//function that moves dots when the scales are changed
function moveDots(unit){
	svg.selectAll('.dot')
		.transition()
		.duration(function(d){
			return 2000;
		})
		.delay(function(d){
			return 20;
		})
		.attr("cx", function(d){
			return xScale(d['average rating']);
		})
		.attr("cy", function(d){
			return yScale(d[unit]);
		});
}

//function that filters based on selected year, will be changed onces filterDot is implemented
function yearChange(year){
	svg.selectAll('.dot')
		.transition()
		.duration(function(d){
			return 1100;
		})
		.delay(function(d){
			return 8;
		})
		.attr("fill", function(d){
			if (d.year == year)
				return "red";
			else
				return "#f6f6f6";
		})
		.attr("opacity", function(d){
			if (d.year == year)
				return 1;
			else
				return 0.03;
		});
}

//this function will be used in place of all of the filtering boolean expressions so we can check and combine multiple filters without having to write them into numerous places
function filterDot(datapoint){
	console.log("dot filtered");
}