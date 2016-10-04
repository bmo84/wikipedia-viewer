// Author: Brandon Martinez
// Date: 9/1/2016
// Description: Wikipedia Viewer

// Calls the Wikipedia API to get a list of pages based on the users query and appends to the document
function processQuery() {

  var strQuery = document.querySelector(".txtSearch").value;
  if (strQuery === '') {
    $(".results-container").append("<div class='center-text'><p>Type something to search for.</p></div>")
  } else {
    var url = "https://en.wikipedia.org/w/api.php?action=opensearch&datatype=json&limit=10&search=" + strQuery + "&callback=?";

    $.getJSON(url, function(data) {
      // Check for empty result
      if (data[1] != "") {
        // Empties container if full, moves search box and    handing to top of view
        $(".results-container").empty();
        $(".wrapper").css('justify-content', 'flex-start');
        $(".wrapper").css('-webkit-justify-content', 'flex-start');

        // Display each result in it's own div
        for (i = 0; i <= data[1].length - 1; i++) {

          $(".results-container").append(
            "<div class='result'><p><h4>" + data[1][i] + "</h4><p>" + data[2][i] + "</p>" + "<a href='" + data[3][i] + "' target='_blank'>" + data[3][i] + "</a>" + "</div>"); // end append
        } // end for loop

      } else { // if no results found, display a message
        $(".results-container").empty();
        $(".results-container").append("<div class='center-text'><p>No results found.</p></div>")
      }
    });

  }

}

// This function is called with the random button and gets a random wikipedia article and open in a new window
function randomWiki() {

  $.getJSON("https://en.wikipedia.org/w/api.php?action=query&format=json&prop=info&list=random&inprop=url&rnlimit=1&callback=?", function(data) {

    // parse page ID
    var randomPageID = data.query.random[0]['id'];

    var randomURL = "https://en.wikipedia.org/?curid=" + randomPageID;
    window.open(randomURL);
  }); // end JSON function

} // end randomWiki

// Keypress event triggers the search button
$(".txtSearch").keyup(function(event) {
  if (event.keyCode == 13) {
    $(".btnSearch").click();
  }
});