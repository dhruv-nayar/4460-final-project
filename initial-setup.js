window.onload = initializeGraph;

window.margin = {top: 50, right: 0, bottom: 30, left: 0};
window.width = 700 - margin.left - margin.right;
window.height = 500 - margin.top - margin.bottom;

function initializeGraph(){

	var yAxisSelect = document.getElementById('selection');
	var year = document.getElementById('year');

	window.svg = d3.select("#graph").append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	    .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	window.xScale = d3.scale.linear().range([0, width]);
	window.yScale = d3.scale.linear().range([height, 0]);


	d3.csv("movies_edited.csv", function(error,data1){

		window.data = data1;
		var lg = new Set();

		data.forEach(function(d){
			if (d.genres != ""){
					d.genres.split("|").forEach(function(g){
						lg.add(g);
					})
				}
		})

		console.log(lg);

		var xAxis = createXAxis(data, xScale);
		var yAxis = createYAxis(data, yScale, yAxisSelect.value);


		svg.append('g')
			.attr("class", "x-axis")
			.attr("fill", "white")
			.attr("width", 2)
			.attr("transform", "translate(40,"+height+")")
			.call(xAxis);

		svg.append('g')
			.attr("class", "y-axis")
			.attr("fill", "white")
			.attr("transform", "translate(40,0)")
			.call(yAxis);

		svg.selectAll("dot")
			.data(data)
			.enter()
				.append("circle")
				.attr("class", "dot")
				.attr("r", 5)
				.attr("fill", function(d){
					if (d.year == year.value)
						return "red";
					else
						return "#f6f6f6";
				})
				.attr("opacity", function(d){
					if (d.year == year.value)
						return 1;
					else
						return 0.5;
				})
				.attr("cx", function(d){return xScale(d['average rating']);})
				.attr("cy", function(d){return yScale(d['# oscar nominations']);});

		createGenreChecklist(lg);

	})

	console.log('graph initialized');
}

function createGenreChecklist(lg){
	var legendContainer = document.getElementById('legend-container');
	lg.forEach(function(d){
		legendContainer.append("input")
		.attr("type", "checkbox")
		.value(d)
		.innerHTML(d);
	})
}