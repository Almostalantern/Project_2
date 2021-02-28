let fillColor;
let plan = false;
// eslint-disable-next-line prefer-const
let stateValues = {
  "US-IN": "visited",
  "US-CA": "visited",
  "US-IA": "planned",
  "US-NE": "planned"
};

$("#plan").on("click", event => {
  event.preventDefault();
  if (plan) {
    plan = false;
  } else {
    plan = true;
  }
  $("#map").empty();
  generateMap();
});

generateMap();

function generateMap() {
  console.log(stateValues);
  if (plan) {
    fillColor = "#0000ff";
  } else {
    fillColor = "#ff0000";
  }
  $("#map").vectorMap({
    map: "us_aea",
    backgroundColor: "none",
    zoomOnScroll: false,
    regionsSelectable: true,
    regionStyle: {
      initial: {
        fill: "white",
        "fill-opacity": 1,
        stroke: "black",
        "stroke-width": 1,
        "stroke-opacity": 1
      },
      hover: {
        fill: "red",
        "fill-opacity": 0.3,
        cursor: "pointer"
      },
      selected: {
        fill: fillColor,
        "fill-opacity": 1
      },
      selectedHover: {}
    },
    // selectedRegions: [
    //   // 'US-VA',
    // ],
    series: {
      regions: [
        {
          scale: {
            visited: "#ff0000",
            planned: "#0000ff"
          },
          attribute: "fill",
          values: stateValues,
          legend: {
            horizontal: true,
            title: "Legend"
          }
        }
      ]
    },
    // onRegionClick: function(selectedRegions, code){
    // },
    // eslint-disable-next-line no-unused-vars
    onRegionSelected: function(e, code, isSelected, selectedRegions) {
      console.log(code);
      if (plan) {
        Object.assign(stateValues, { [code]: "planned" });
        console.log(stateValues);
      } else {
        Object.assign(stateValues, { [code]: "visited" });
        console.log(stateValues);
      }
    }
  });
}
