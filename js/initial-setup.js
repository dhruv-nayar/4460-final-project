$(document).ready(function(){
	initializeGraph();
});

window.margin = {top: 50, right: 60, bottom: 30, left: 30};
window.width = 700 - margin.left - margin.right;
window.height = 500 - margin.top - margin.bottom;

// add the tooltip area to the webpage
var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 1);

var tip = d3.tip()
	.attr('class', 'd3-tip')
	.offset([-10, 0])
	.html(function(d) {
		return "<strong>Movie:</strong> <span style='color:red'>" + d.title + "</span><br />"+
				"<span style='color:#19C800'>$" + d["gross ($)"] + "</span>";
	});

console.log("added tooltip");

function initializeGraph(){

	var yAxisSelect = document.getElementById('selection');
	var year = document.getElementById('year');

	window.svg = d3.select("#graph").append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	    .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
	svg.call(tip);


	window.xScale = d3.scale.linear().range([0, width]);
	window.yScale = d3.scale.linear().range([height, 0]);

	d3.csv("movies_edited.csv", function(error,data1){

		window.data = [];
		var lg = new Set();

		data1.forEach(function(d){
			if (d.genres != ""){
					d.genres.split("|").forEach(function(g){
						lg.add(g);
					})
				}
			//console.log(+d["gross ($)"]);
			if(!isNaN(Number(d["gross ($)"]))){
				//console.log(Number(d['gross ($)']));
				data.push({"movieId": d.movieId, "title": d.title, "year": d.year, "gross ($)": +d["gross ($)"], 'average rating': +d["average rating"], '# oscar nominations': +d['# oscar nominations'], 'golden globe': +d['golden globe']});
			}
		})


		console.log(lg);

		var xAxis = createXAxis(data, xScale);
		var yAxis = createYAxis(data, yScale, yAxisSelect.value);


		svg.append('g')
			.attr("class", "x axis")
			.attr("fill", "white")
			.attr("width", 2)
			.attr("transform", "translate("+margin.left+","+height+")")
			.call(xAxis)
			.append("text")
		      .attr("class", "label")
		      .attr("x", width+30)
		      .attr("y", -6)
		      .style("text-anchor", "end")
		      .text("Average Rating");

		svg.append('g')
			.attr("class", "y axis")
			.attr("fill", "white")
			.attr("transform", "translate("+margin.left+",0)")
			.call(yAxis)
				.append("text")
			    .attr("class", "label")
			    .attr("transform", "rotate(-90)")
			    .attr("y", 6)
			    .attr("dy", ".71em")
			    .style("text-anchor", "end")
			    .text(yAxisSelect.value);

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
						return "#202020";
				})
				.attr("opacity", function(d){
					if (d.year == year.value)
						return 1;
					else
						return 0.3;
				})
				.attr("cx", function(d){return xScale(d['average rating']);})
				.attr("cy", function(d){return yScale(d['# oscar nominations']) - 6;})
				.on("mouseover", tip.show)
				.on("mouseout", tip.hide)
				.on("click", function(d){
					// // setting up framework for second view
					// var relatedMovies = findRelatedMovies(d.MovieId);
					// newBubbleChart(relatedMovies);
					newBubbleChart([{text: d.title, count: d['average rating']}, {text: d.title+" 2", count: +d['average rating'] + .2}]);
					console.log("graph clicked");
				});

		//createGenreChecklist(lg);

	})

	console.log('graph initialized');
}

/* algorithm to find 10 related movies to the clicked bubble */
function findRelatedMovies(movieId) {

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