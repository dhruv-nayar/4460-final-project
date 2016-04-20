window.selectedGenres = [];

d3.selection.prototype.moveToFront = function() {
  return this.each(function(){
    this.parentNode.appendChild(this);
  });
};

//function that registers whenever the dropdown has been changed. Changes scales and then moves dots
function dropdownYChange(unit){
	yAxisUnit = unit;
	rewriteYAxis(unit);
	moveDots();
}

function dropdownXChange(unit){
	console.log(unit);
	xAxisUnit = unit;
	rewriteXAxis(unit);
	moveDots();
}

//function that moves dots when the scales are changed
function moveDots(){
	svg.selectAll('.dot')
		.transition()
		.duration(function(d){
			return 2000;
		})
		.delay(function(d){
			return 20;
		})
		.attr("cx", function(d){
			return xScale(d[xAxisUnit]) + margin.left;
		})
		.attr("cy", function(d){
			return yScale(d[yAxisUnit]) - 6;
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
			if (d.year == year){
				//console.log(this);
				//d3.select(this).moveToFront();
				return "red";
			}
			else
				return "none";
		})
		.attr("opacity", function(d){
			if (d.year == year)
				return 1;
			else
				return 0.3;
		});
}

//this function will be used in place of all of the filtering boolean expressions so we can check and combine multiple filters without having to write them into numerous places
function filterDots(){
	svg.selectAll('.dot')
		.transition()
		.duration(function(d){
			return 700;
		})
		.delay(function(d){
			return 0;
		})
		.attr("opacity", function(d){
			if(selectedGenres.length == 0)
				return 1;
			else{
				d.genres.forEach(function(genre){
					if(selectedGenres.indexOf(genre) != -1){
						console.log(genre);
						return 1;
					}
				});
				return 0;
			}
			});
				
	console.log("dots filtered");
}

function checkboxClicked(){
	selectedGenres = [];
	$('.genre-checkbox').each(function(d){
		if($(this).is(':checked'))
			selectedGenres.push($(this).val());
	});
	console.log(selectedGenres);
	//filterDots();
}