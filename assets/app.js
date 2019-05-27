//Variables
    //Topics needs to be an array of strings...
var topics = {}

function buildQueryURL () {
     //Search URL
     var queryURL = api.giphy.com/GET/v1/gifs/search;

     //API Object and Key 
     var queryParams = {"api-key": "ewxlNgPsFw5Af9hjNTqz6Zl29diA5FRa"};
 
     //Take input from Search Bar and add to queryParams
     queryParams.q=$("#search-api").val().trim()

     //Add limit of 10 to QueryParams
     queryParams.limit = 10

     //Log URL
     console.log(queryURL + $.param(queryParams));
     return queryURL + $.param(queryParams);
}

function updatePage (giphy) {
    //Add to topics array
    var topic = $("#search-api").val().trim();
    $(topics).push(topic);
    
    //Store search item in topics gif
    ("button-div").text(JSON.stringify(response));

    //Stores array of results in results variable
    var results = response.data;

    //Display first 10 Giphy's in "gif-section" 
    var numGiphy = 10

    for(var i=0; 0 < numGiphy; i++){s

        //Create div for each gif
        var gifDiv = $("<div>");

        //Store ratings variable
        var rating = results.rating;

        //Create paragraph tag with rating reults
        var p = $("<p>").text("Rating: " + rating);

        //Create image tag for Giphy
        var giphyImage = $("<img>");

          //Attribute image src to image tag
        giphyImage.attr("src", results.images.fixed_height.url);

        //Append <p> and <img> to gifDiv
        gifDiv.append(p);
        gifDiv.append(giphyImage);

        //Prepend gifts to the "gif-section" in HTML
        $("gif-section").prepend(gifDiv);

    }
    renderButtons();
}

//Click Function to obtain Giphy
$("button").on("click", function(){
    event.preventDefault();
    console.log("button clicked line 68")

    // Obtain QueryURL from BuildQueryURL Function
    var queryURL = buildQueryURL();

    //Search API
    $.ajax({
        url: queryURL,
        method: "GET"
        })
    .then(updatePage)
})

//Create button from "topics" string and append to "button div"
function renderButtons(){
    $("#button-div").empty()
    for(var j = 0; j<topics.length; j++){
        var addButton = $("<button>");
    
        //Add class to button
        addButton.addClass("gif-button")
    
        //Adding a data-attribute
        addButton.attr("data-name", topics[j]);
    
        //Add button text
        addButton.text(topics[j]);
    
        //Add buttons to button-div
        $("#button-div").append(addButton);
    
    }
}

//Click Function to animate Giphy

//Click Function to pause Giphy


// ********* Reference "Click JSON Class Activity **********"