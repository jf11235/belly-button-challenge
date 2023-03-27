const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

d3.json(url).then(function(data) {
  // Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
  let sample_values = data.samples[0].sample_values;
  let otu_ids = data.samples[0].otu_ids;
  let otu_labels = data.samples[0].otu_labels;


  // creating the bar chart
  let trace1 = {
    x: sample_values.slice(0,10).reverse(),
    y: otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse(),
    text: otu_labels.slice(0,10).reverse(),
    name: "Top 10 OTUs",
    type: "bar",
    orientation: "h"
  };

// creating the bubble chart

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

    //change the metadata panel to display the individual's demographic information


// setup the dropdown menu to display the sample names
let selector = d3.select("#selDataset");
data.names.forEach((sample) => {
    selector
    .append("option")
    .text(sample)
    .property("value", sample);
});

//update the individual's demographic information when a new sample is selected in the dropdown menu

//initialze the panael with the first sample
let metadata = data.metadata[0];
let panel = d3.select("#sample-metadata");
panel.html("");
Object.entries(metadata).forEach(([key, value]) => {
    panel.append("h6").text(`${key.toUpperCase()}: ${value}`);
    }
);

//create a function to update the panel with the new sample when a new sample is selected in the dropdown menu
function optionChanged(e) {

    let newSample = Number(e.target.value)
    let metadata = data.metadata.find(d => d.id === newSample);
    let panel = d3.select("#sample-metadata");
    panel.html("");
    if (metadata){
        console.log(Object.entries(metadata))
        Object.entries(metadata).forEach(([key, value]) => {
            panel.append("h6").text(`${key.toUpperCase()}: ${value}`);
                }
            )
        }
    }   

const select = document.getElementById("selDataset");
select.addEventListener("change", optionChanged);

});

