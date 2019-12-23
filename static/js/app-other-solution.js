function DrawBargraph(desiredSampleID)
{
    console.log("DrawBargraph: sample = ", desiredSampleID);

    d3.json("static/data/samples.json").then((data) => {

        var samples = data.samples;
        var resultArray = samples.filter(sampleObj => sampleObj.id == desiredSampleID);
        var result = resultArray[0];

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();    
        var barData = [
            {
                x: sample_values.slice(0, 10).reverse(),
                y: yticks, 
                type: "bar",
                text: otu_labels.slice(0, 10).reverse(),
                orientation: "h"
            }
        ];

    var barLayout = {
        title: "Top 10 Bacteria Cultures Found",
        margin: {t: 30, 1: 150}
    };

    Plotly.newPlot("bar", barData, barLayout);

    var trace1 = {
        x: otu_ids,
        y: sample_values,
        mode: 'markers',
        text: otu_labels,
        marker: {
            color: otu_ids,
            size: sample_values, 
            colorscale: 'Earth'
        }

    };
    var data = [trace1];

    var layout = {
        title: 'Bacteria Cultures',
        xaxis: { title: "OTU ID's" },
        yaxis: { title: "Number of Bacteria" },

    }

    Plotly.newPlot ('bubble',data, layout)
});

}

// function DrawBubbleChart(desiredSampleID)
// {
//     console.log("DrawBubbleChart: sample = ", desiredSampleID);    

//     d3.json("static/data/samples.json").then((data) => {

//         var samples = data.samples;
//         var resultArray = samples.filter(sampleObj => sampleObj.id == desiredSampleID);
//         var result = resultArray[0];

//         var otu_ids = result.otu_ids;
//         var otu_labels = result.otu_labels;
//         var sample_values = result.sample_values;
   
//         var trace1 = [
//             {
//                 x: [otu_ids],
//                 y: [sample_values], 
//                 mode: 'markers',
//                 marker: {
//                    size: [sample_values],
//                    color: [otu_ids],
//                 }
//                 text: [otu_labels]
//             }
//         ];
//         var bubbleData = [trace1]

//     var bubbleLayout = {
//         title: "Top 10 Bacteria Cultures Found",
//         margin: {t: 30, 1: 150}
//     };

//     Plotly.newPlot("bubble", bubbleData, bubbleLayout);
// }); 
// }

function ShowMetadata(desiredSampleID)
{
    console.log("ShowMetadata: sample = ", desiredSampleID);
    d3.json("static/data/samples.json").then((data) => {
        var metadata = data.metadata;
        // Filter the data for the object with the desired sample number
        var resultArray = metadata.filter(sampleObj => sampleObj.id == desiredSampleID);
        var result = resultArray[0];  
        // Use d3 to select the panel with id of `#sample-metadata`
        var panel = d3.select("#sample-metadata");
         // Use `.html("") to clear any existing metadata
        panel. html('');
           // Use `Object.entries` to add each key and value pair to the panel
        Object.entries(result).forEach(([key, value]) => 
        {      panel.append("h6").text(`${key.toUpperCase()}: ${value}`); 
       });  
    });
}

function optionChanged(newSampleID)
{
    console.log("Dropdown changed to: ", newSampleID)
    DrawBargraph(newSampleID);
    // DrawBubbleChart(newSampleID);
    ShowMetadata(newSampleID);
}

function Init ()
{
    console.log("initializing screen");

    // populate the drop down with all ID's
    var selector = d3.select("#selDataset");
    
    d3.json("static/data/samples.json").then((data) => {
        var sampleNames = data.names;

        sampleNames.forEach((sampleID) => {
            selector
                .append("option")
                .text(sampleID)
                .property("value", sampleID);
        });
    });

    
    DrawBargraph(sampleID);
    // DrawBubbleChart(sampleID);
    ShowMetadata(sampleID);
}

Init ();