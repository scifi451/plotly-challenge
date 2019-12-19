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
});

}

function DrawBubbleChart(sampleID)
{
    console.log("DrawBargraph: sample = ", sampleID);    
}

function ShowMetadata(sampleID)
{
    console.log("ShowMetadata: sample = ", sampleID);
}

function optionChanged(newSampleID)
{
    console.log("Dropdown changed to: ", newSampleID)
    DrawBargraph(newSampleID);
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
    });


    DrawBargraph(sampleID);
    DrawBubbleChart(sampleID);
    ShowMetadata(sampleID);
}

Init ();