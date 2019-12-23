function DrawBarGraph(desiredSampleID)
{
    console.log("DrawBarGraph: sample = ", desiredSampleID);

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

});

}

function DrawBubbleChart(desiredSampleID)
{
    console.log("DrawBubbleChart: sample = ", desiredSampleID);    

    d3.json("static/data/samples.json").then((data) => {

        var samples = data.samples;
        var resultArray = samples.filter(sampleObj => sampleObj.id == desiredSampleID);
        var result = resultArray[0];

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        var bubbleData = [
            {
                x: otu_ids,
                y: sample_values,
                text: otu_labels,
                mode: "markers",
                marker: {
                    size: sample_values,
                    color: otu_ids,
                    colorscale: "Earth"
                }
            }
        ];

        var bubleLayout = {
            title: "Bacteria Cultures Per Sample",
            margin: {t: 0},
            hovermode: "closet",
            xaxis: {title: "OTU ID"},
            margin: {t : 30}
        };

        Plotly.newPlot("bubble", bubbleData, bubleLayout);

    }); 
}

function ShowMetadata(desiredSampleID)
{
    console.log("ShowMetadata: sample = ", desiredSampleID);

    d3.json("static/data/samples.json").then((data) => {
        var metadata = data.metadata;

        var resultArray = metadata.filter(sampleObj => sampleObj.id == desiredSampleID);
        var result = resultArray[0];

        var panel = d3.select('#sample-metadata');
        panel.html("");
        Object.entries(result).forEach(([key, value]) => {
            var textToShow = `${key.toUpperCase()}: ${value}`;
            panel.append("h6").text(textToShow);
        });
     });

}

function optionChanged(newSampleID)
{
    console.log("Dropdown changed to: ", newSampleID)
    DrawBarGraph(newSampleID);
    DrawBubbleChart(newSampleID);
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

        var sampleID = sampleNames[0];

        DrawBarGraph(sampleID);
        DrawBubbleChart(sampleID);
        ShowMetadata(sampleID);
    });
}

Init ();