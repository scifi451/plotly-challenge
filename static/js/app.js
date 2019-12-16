// Use d3.json() to fetch data from JSON file
// Incoming data is internally referred to as incomingData
d3.json("static/data/samples.json").then((incomingData) => {
    function filteredData(data) {
      return data.samples.otu_ids > 250;
    }
    console.log(filteredData);
    // Use filter() to pass the function as its argument
    var filteredSample = incomingData.filter(filteredData);
  
    //  Check to make sure your are filtering your data.
    console.log(filteredSample);
  
    // Use the map method with the arrow function to return all the filtered movie titles.
    var otu = filteredSample.map(data =>  data.otu_ids);
  
    // Use the map method with the arrow function to return all the filtered movie metascores.
    var samples = filteredSample.map(data => data.sample_values);
  
    // Check your filtered metascores.
    console.log(filteredSample);
  
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
      title: "The highest critically acclaimed data.",
      xaxis: { title: "Title" },
      yaxis: { title: "Metascore (Critic) Rating"}
    };
  
    // Plot the chart to a div tag with id "bar-plot"
    Plotly.newPlot("bar", data, layout);
  });
  