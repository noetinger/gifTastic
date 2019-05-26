//Variables
    //Topics needs to be an array of strings...
var topics = {}

//Click Function to obtain Giphy
$("button").on("click", function(){
    event.preventDefault();
   
    //Varibale to reference the index of the Topics Array for when button is pushed
    var topicButton = $(this).attr("data-name");

    //Create URL from search term         ********************************** 
    var queryURL = "*****" + topicButton + "*****";

    //API Object and Key        **********************************    
    var queryParams = {"api-key": ####};

    //Take input from Search Bar and add to queryParams
    queryParams.q=$("#search-api").val().trim()

    //Add to topics array
    var topic = $("#search-api").val().trim();
    $(topics).push(topic);

    //Search API
    $.ajax({
        url: queryURL,
        method: "GET"
        })
    .then(function(response){
        //Store search item in topics gif
        $("button-div").text(JSON.stringify(response));

        //Stores array of results in results variable        ********************************** 
        var results = response.data;

        //Display first 10 Giphy's in "gif-section" 
        var numGiphy = 10

        for(var i=0; 0 < numGiphy; i++){

            //Create div for each gif
            var gifDiv = $("<div>");

            //Store ratings variable
            var rating = results[i].rating;

            //Create paragraph tag with rating reults
            var p = $("<p>").text("Rating: " + rating);

            //Create image tag for Giphy
            var giphyImage = $("<img>");

            //Attribute image src to image tag
            giphyImage.attr("src", results[i].images.fixed_height.url);

            //Append <p> and <img> to gifDiv
            gifDiv.append(p);
            gifDiv.append(giphyImage);

            //Prepend gifts to the "gif-section" in HTML
            $("gif-section").prepend(gifDiv);

        }
    })
    renderButtons();
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
//Should I break up Click function into click function and display information function?