/* CONSTANTS AND GLOBALS */

 // set the dimensions and margins of the graph
//  At first, it was challenging to think what is a margin.
// The greater the numbers, the smallest the chart, which was contra-intuitive for me
// Then, I understand that the margins are not the chart measurements, but the object in the middle of it
// Setting up a marging means defining the space which does not contain a chart
// It is where we don't have a chart
// that's the reason why it's easier to define the width and the height by subtracting the left and right margin, and the top and botton, in this order
var margin = {
  top: 100, 
  bottom: 150, 
  right: 200, 
  left: 100},

width = 860 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;

 
// It does not work when I add const in front of the variable
// const width = 500;
// const height = 300;
const data = "https://gist.githubusercontent.com/d3noob/08cc6159b9315e20e74a72e85a50dd3e/raw/ac7e0ab5c8684caec0b5784a54bf8cbfd3e2c21d/sales.csv"
const data2 = "https://raw.githubusercontent.com/prasertcbs/basic-dataset/master/Startups%20in%202021%20end.csv"


function load_data(data){
  var data = d3.csv(data, d3.autoType).
    then(data)
  return data
}

function make_x_scale(){
  var x = d3.scaleBand()
          .range([0, width])
          .padding(0.1);
  return x
}

function make_y_scale(){
  var y = d3.scaleLinear()
            .range([height, 50]);
  return y
}

function select_html_element(selector){
  /* HTML ELEMENTS */
  /** Select your container and append the visual elements to it */
  // append the svg object to the body of the page
  // append a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  var svg = d3.select(selector).append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  return svg
}

function append_axis(svg_element){
  svg_element.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // y Axis
  svg_element.append("g")
    .call(d3.axisLeft(y));
}

// chart 1
/* LOAD DATA */
d3.csv(data, d3.autoType)
  .then(data => {
    // SCALES: from data to pixel space - set the axes ranges
    var x = make_x_scale()
    var y = make_y_scale()

    // Scale the range of the data in the domains
    x.domain(data.map(function(d) { return d.salesperson; }));
    y.domain([0, d3.max(data, function(d) { return d.sales; })]);

  /* HTML ELEMENTS */
    var svg = select_html_element(div_1)

// append the data/ rectangles for the bar chart
    svg.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.salesperson); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d.sales); })
      .attr("height", function(d) { return height - y(d.sales); });

// append the axes to the chart 
// x Axis
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // y Axis
    svg.append("g")
      .call(d3.axisLeft(y));

});


// chart 2
/* LOAD DATA */
d3.csv(data, d3.autoType)
  .then(data => {
    console.log("data", data)

    /* SCALES */
    // set the axes ranges
    var x = d3.scaleBand()
    .range([0, width])
    .padding(0.1);

    var y = d3.scaleLinear()
        .range([height, 10]);

    // Scale the range of the data in the domains
    x.domain(data.map(function(d) { return d.salesperson; }));
    y.domain([0, d3.max(data, function(d) { return d.sales; })]);

/* HTML ELEMENTS */
    var svg2 = select_html_element(div_2)

    // append the data/ rectangles for the bar chart
    svg2.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.salesperson); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d.sales); })
      .attr("height", function(d) { return height - y(d.sales); });

    // append the axes to the chart 
    // x Axis
    svg2.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // y Axis
    svg2.append("g")
      .call(d3.axisLeft(y));


});

// // chart 3
// /* LOAD DATA */
// d3.csv(data, d3.autoType)
//   .then(data => {
//     console.log("data", data)

//     /* SCALES */
//     // set the axes ranges
//     var x = d3.scaleBand()
//     .range([0, width])
//     .padding(0.1);

//     var y = d3.scaleLinear()
//         .range([height, 10]);

//     // Scale the range of the data in the domains
//     x.domain(data.map(function(d) { return d.salesperson; }));
//     y.domain([0, d3.max(data, function(d) { return d.sales; })]);

// /* HTML ELEMENTS */
//     var svg2 = d3.select(div_3).append("svg")
//           .attr("width", width + margin.left + margin.right)
//           .attr("height", height + margin.top + margin.bottom)
//           .append("g")
//             .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// // append the data/ rectangles for the bar chart
//     svg2.selectAll(".bar")
//       .data(data)
//       .enter().append("rect")
//       .attr("class", "bar")
//       .attr("x", function(d) { return x(d.salesperson); })
//       .attr("width", x.bandwidth())
//       .attr("y", function(d) { return y(d.sales); })
//       .attr("height", function(d) { return height - y(d.sales); });

//     // append the axes to the chart 
//     // x Axis
//     svg2.append("g")
//       .attr("transform", "translate(0," + height + ")")
//       .call(d3.axisBottom(x));

//     // y Axis
//     svg2.append("g")
//       .call(d3.axisLeft(y));

// });


// ---- OLD DATA 

//     /* SCALES */
//     /** This is where you should define your scales from data to pixel space */

//     // set the axes ranges
// var x = d3.scaleBand()
//           .range([0, width])
//           .padding(0.1);

// var y = d3.scaleLinear()
//           .range([height, 10]);

// // Scale the range of the data in the domains
// x.domain(data.map(function(d) { return d.salesperson; }));
// y.domain([0, d3.max(data, function(d) { return d.sales; })]);


//     /* HTML ELEMENTS */
//     /** Select your container and append the visual elements to it */
// // append the svg object to the body of the page
// // append a 'group' element to 'svg'
// // moves the 'group' element to the top left margin
// var svg = d3.select("body").append("svg")
//             .attr("width", width + margin.left + margin.right)
//             .attr("height", height + margin.top + margin.bottom)
//             .append("g")
//               .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// // append the data/ rectangles for the bar chart
// svg.selectAll(".bar")
//     .data(data)
//     .enter().append("rect")
//     .attr("class", "bar")
//     .attr("x", function(d) { return x(d.salesperson); })
//     .attr("width", x.bandwidth())
//     .attr("y", function(d) { return y(d.sales); })
//     .attr("height", function(d) { return height - y(d.sales); });

// // append the axes to the chart 
// // x Axis
// svg.append("g")
//     .attr("transform", "translate(0," + height + ")")
//     .call(d3.axisBottom(x));

// // y Axis
// svg.append("g")
//     .call(d3.axisLeft(y));

//   // })


// // // format the data
// // data.forEach(function(d) {
// //  d.sales = +d.sales;
// // });



// });

