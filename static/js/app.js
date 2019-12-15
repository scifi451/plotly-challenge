// Use d3.json() to fetch data from JSON file
// Incoming data is internally referred to as incomingData
d3.json("static/data/samples.json").then((incomingData) => {
    function filteredData(button) {
      return button.samples.otu_ids > 250;
    }
    console.log(filteredData);
    // Use filter() to pass the function as its argument
    var filteredData = incomingData.filter(filteredData);
  
    //  Check to make sure your are filtering your button.
    console.log(filteredData);
  
    // Use the map method with the arrow function to return all the filtered movie titles.
    var otu = filteredData.map(button =>  button.otu_ids);
  
    // Use the map method with the arrow function to return all the filtered movie metascores.
    var samples = filteredData.map(button => button.sample_values);
  
    // Check your filtered metascores.
    console.log(ratings);
  
    // Create your trace.
    var trace = {
      x: samples,
      y: otu,
      type: "bar",
      orientation: "h"
    };
  
    // Create the data array for our plot
    var data = [trace];
  
    // Define the plot layout
    var layout = {
      title: "The highest critically acclaimed button.",
      xaxis: { title: "Title" },
      yaxis: { title: "Metascore (Critic) Rating"}
    };
  
    // Plot the chart to a div tag with id "bar-plot"
    Plotly.newPlot("bar", data, layout);
  });
  