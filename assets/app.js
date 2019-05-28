//Variables
    //Topics needs to be an array of strings...
var topics = [];
console.log(topics);

//Click Function to obtain Giphy from input
$("#search-api").on("click", function(){
    event.preventDefault();
    console.log("button clicked line 10")

    //Add to topics array
    var topic = $("#search-box").val().trim();
    topics.push(topic);
    console.log(topics);

    //Take input from Search Bar and add to queryParams
    var q = $("#search-box").val().trim()

    // Obtain QueryURL from BuildQueryURL Function
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + q + "&api_key=ewxlNgPsFw5Af9hjNTqz6Zl29diA5FRa&limit=10";

    console.log("Line 22" + queryURL);

    //Search API
    $.ajax({
        url: queryURL,
        method: "GET"
        })
    .then(function(response){
        console.log("Line 30");
    
        //Display first 10 Giphy's in "gif-section" 
        for(var i=0; i < 10; i++){
            
            console.log("Line 41: " + i);
            //Stores array of results in results variable
            var results = response.data;
    
            //Create div for each gif
            var gifDiv = $("<div>");
    
            //Store ratings variable
            var rating = results[i].rating;
            console.log("Line 48: " + rating)
    
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
            $("#gif-section").prepend(gifDiv);
    
        }
    })
    renderButtons();
})


//Create button from "topics" string and append to "button div"
function renderButtons(){
    $("#button-div").empty()
    
    for(var j = 0; j < topics.length; j++){
        var addButton = $("<button type='submit'>");

        //Add class to buttons
        addButton.addClass("gif-button")
    
        //Adding a data-attribute
        addButton.attr("data-name", topics[j]);
    
        //Add button text
        addButton.text(topics[j]);
    
        //Add buttons to button-div
        $("#button-div").append(addButton);
    
    }
}

//Click Function to animate or pause Giphy
//When an <img> is clicked...
$("<img>").on("click",function(){
    //"state" = the data-state of the clicked image
    var state = $(this).attr("data-state");
    //If state is 'still', assign animated link to image and change value to animated.
    if (state === "still"){
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    //If state is 'animated', assign still link to image and change value to animated.
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

renderButtons()


// ********* Reference "Click JSON Class Activity **********"