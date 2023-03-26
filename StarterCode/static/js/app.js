const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

d3.json(url).then(function(data) {
  // Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
  let sample_values = data.samples[0].sample_values;
  let otu_ids = data.samples[0].otu_ids;
  let otu_labels = data.samples[0].otu_labels;

  let trace1 = {
    x: sample_values.slice(0,10).reverse(),
    y: otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse(),
    text: otu_labels.slice(0,10).reverse(),
    name: "Top 10 OTUs",
    type: "bar",
    orientation: "h"
  };

  // Create a bubble chart that displays each sample.
  // Use otu_ids for the x values.
  // Use sample_values for the y values.
  // Use sample_values for the marker size.
  // Use otu_ids for the marker colors.
  // Use otu_labels for the text values.

  let trace2 = {
    x: sample_values,
    y: otu_ids,
    text: otu_labels,
    mode: 'markers',
    marker: {
      color: otu_ids,
      size: sample_values
    }
  };

  let layout = {
    title: "Top 10 OTUs and Bubble Chart for Sample",
    xaxis: { title: "OTU IDs" },
    yaxis: { title: "Sample Values" }
  };

  let chartData1 = [trace1];
    Plotly.newPlot("bar", chartData1);


  let chartData2 = [trace2];
  Plotly.newPlot("bubble", chartData2, layout);

    // Display the sample metadata, i.e., an individual's demographic information.
let metadata = data.metadata[0];
let panel = d3.select("#sample-metadata");
panel.html("");
Object.entries(metadata).forEach(([key, value]) => {
    panel.append("h6").text(`${key.toUpperCase()}: ${value}`);
    }
);
// setup the dropdown menu to display the sample names
d3.selectAll("#selDataset").on("change", getData);

function getData(data) {
let dropdownMenu = d3.select("#selDataset");
let dataset = dropdownMenu.property("value");   
let metadata = data.metadata[0];
let panel = d3.select("#sample-metadata");
panel.html("");
Object.entries(metadata).forEach(([key, value]) => {
    panel.append("h6").text(`${key.toUpperCase()}: ${value}`);
    }
);
}



});

