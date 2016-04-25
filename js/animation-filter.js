window.selectedGenres = [];
window.backgroundOpacity = 0.1;
window.backgroundColor = "gray";

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
	var year = document.getElementById('year').value;
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
		})
		.attr("fill", function(d){
			var contained = "gray";
			if (d.year == year){
				//console.log(this);
				//d3.select(this).moveToFront();
				if(selectedGenres.length == 0)
					return "red";
				else{
					d.genres.forEach(function(genre){
						if(selectedGenres.indexOf(genre) != -1){
							contained = "red";
							return 0;
						}
					});
					return contained;
				}
			}
			else
				return backgroundColor;
			})
		.attr("opacity", function(d){
			var contained = backgroundOpacity;
			if(d.year == year){
				if(selectedGenres.length == 0)
					return 1;
				else{
					d.genres.forEach(function(genre){
						if(selectedGenres.indexOf(genre) != -1){
							contained = 1
							return false;
						}
					});
					return contained;
				}
			}
			else
				return backgroundOpacity;
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
			var contained = "gray";
			if (d.year == year){
				//console.log(this);
				//d3.select(this).moveToFront();
				if(selectedGenres.length == 0)
					return "red";
				else{
					d.genres.forEach(function(genre){
						if(selectedGenres.indexOf(genre) != -1){
							contained = "red";
							return 0;
						}
					});
					return contained;
				}
			}
			else
				return backgroundColor;

			})
		.attr("opacity", function(d){
			var contained = backgroundOpacity;
			if (d.year == year){
				//console.log(this);
				//d3.select(this).moveToFront();
				if(selectedGenres.length == 0)
					return 1;
				else{
					d.genres.forEach(function(genre){
						if(selectedGenres.indexOf(genre) != -1){
							contained = 1;
							return 0;
						}
					});
					return contained;
				}
			}
			else
				return backgroundOpacity;

			});
}

//this function will be used in place of all of the filtering boolean expressions so we can check and combine multiple filters without having to write them into numerous places
function filterDots(){
	var year = document.getElementById('year').value;
	svg.selectAll('.dot')
		.transition()
		.duration(function(d){
			return 700;
		})
		.delay(function(d){
			return 0;
		})
		.attr("fill", function(d){
			var contained = "gray";
			if (d.year == year){
				//console.log(this);
				//d3.select(this).moveToFront();
				if(selectedGenres.length == 0)
					return "red";
				else{
					d.genres.forEach(function(genre){
						if(selectedGenres.indexOf(genre) != -1){
							contained = "red";
							return 0;
						}
					});
					return contained;
				}
			}
			else
				return backgroundColor;

			})
		.attr("opacity", function(d){
			var contained = backgroundOpacity;
			if (d.year == year){
				//console.log(this);
				if(selectedGenres.length == 0)
					return 1;
				else{
					d.genres.forEach(function(genre){
						if(selectedGenres.indexOf(genre) != -1){
							contained = 1;
							return 0;
						}
					});
					return contained;
				}
				d3.select(this).moveToFront();
			}
			else
				return backgroundOpacity;
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
	filterDots();
}

function selectAll(box){
	label = document.getElementById('select-all-label');
	if($(box).is(':checked')){
		label.innerHTML = 'Deselect All';
		$('.genre-checkbox').each(function(d){
			$(this).prop('checked','true');
			//checkboxClicked();
		})
	}
	else{
		label.innerHTML = 'Select All';
		$('.genre-checkbox').each(function(d){
			$(this).attr('checked','false');
			//checkboxClicked();
		})
	}
}