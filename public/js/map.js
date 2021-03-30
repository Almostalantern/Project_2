let fillColor;
let plan = false;
// eslint-disable-next-line prefer-const
let stateValues = {};

$(document).on("ready", () => {
  getStates();
});

function getStates() {
  console.log("Getting states...");
  const email = $(".member-name").text();
  console.log(email);
  $.get("/api/states/").then(data => {
    console.log(data);
    stateValues = data;
    generateMap(stateValues);
  });
}

$("#plan").on("click", event => {
  event.preventDefault();
  if (plan) {
    plan = false;
    $("#plan").text("Press to Select the States You Want to Visit");
    $("#user-direction").text("Click the States Below that You've Visited");
  } else {
    plan = true;
    $("#plan").text("Press to Select the States You've Visited");
    $("#user-direction").text("Click the States Below that You Want to Visit");
  }

  generateMap(stateValues);
});

function generateMap(stateValues) {
  // get the states visited and planned by the user
  console.log(stateValues);
  $("#map").empty();
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
    // eslint-disable-next-line no-unused-vars
    onRegionSelected: function(e, code, isSelected, selectedRegions) {
      $(".jvectormap-tip").remove();
      if (plan) {
        // get the code of the state and post to the planned api
        const email = $(".member-name").text();
        Object.assign(stateValues, { [code]: "planned" });
        $.post("/api/planned/" + email + "/" + code, data => {
          console.log(data);
        });
        generateMap(stateValues);
      } else {
        // get the code of the state and post to the visited api
        const email = $(".member-name").text();
        Object.assign(stateValues, { [code]: "visited" });
        $.post("/api/visited/" + email + "/" + code, data => {
          console.log(data);
        });
        generateMap(stateValues);
      }
    }
  });
}
