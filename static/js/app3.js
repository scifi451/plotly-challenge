// Use D3 fetch to read the JSON file
// The data from the JSON file is arbitrarily named importedData as the argument
d3.json("static/data/samples.json").then((importedData) => {
    // console.log(importedData);
    var data = importedData;
    
    var samples = data.samples

    var result = samples.filter(sampleObj => sampleObj.id == 45);
    // console.log(result);
    console.log(samples);
    
    // Sort the data array using the greekSearchResults value
    result.sort(function(a, b) {
      return parseFloat(b.samples) - parseFloat(a.samples);
    });
  
    // Slice the first 10 objects for plotting
    data2 = result.slice(0, 10);
  
    // // Reverse the array due to Plotly's defaults
    data3 = data2.reverse();
  
    // Trace1 for the Sample  Data
    var trace1 = {
      x: data3.map(row => row.sample_values),
      y: data3.map(row => row.otu_ids),
      text: data3.map(row => row.otu_labels),
      name: "OTU",
      type: "bar",
      orientation: "h"
    };
  
    // // data
    var chartData = [trace1];
  
    // Apply the group bar mode to the layout
    var layout = {
      title: "Top 10 OTU",
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
      }
    };
  
    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("bar", chartData, layout);
  });
  