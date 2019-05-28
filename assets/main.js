var topics = [];
console.log(topics)

//render buttons
function renderButtons () {
    $("#button-div").empty()
    //assign each topic a button
    for(var i = 0; i < topics.length; i++){
        var addButton = $("<button type='button'>");

        //Add class to buttons
        addButton.addClass("gifButton")
    
        //Adding a data-attribute
        addButton.attr("data-name", topics[i]);
    
        //Add button text
        addButton.text(topics[i]);
    
        //Add buttons to button-div
        $("#button-div").append(addButton);
    }
};

//When a topic button is clicked        ************      Why doesn't this work?         *******
$(".gifButton").on("click", function() {
    event.preventDefault();

    alert("Topic Button Clicked")

    var userInput = $("data-name").val().trim();

    searchGif(userInput);
})

//When the submit/search button is clicked
$("#search-api").on("click", function() {
    event.preventDefault();

    var userInput = $('#search-box').val().trim();
    topics.push(userInput)
    if (userInput) {
        $('#button-div').append("<button type='button' value=' " + userInput + "'> " + userInput + " </button>");
    }
    searchGif(userInput);
})

//Call API and search for requested giphy
function searchGif(giphyName) {
    console.log("Search Enabled")

    var q = giphyName

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + q + "&api_key=ewxlNgPsFw5Af9hjNTqz6Zl29diA5FRa&limit=10";
    
    $.ajax({
        url: queryURL,
        method: "GET"
        })
    .done(function(response){
            displayGiphy(response);
        })
}

//Display all the giphy's
function displayGiphy(response) {
    console.log(response)
    console.log("Display Giphy Enabled")

    $('#gif-section').empty();

    for (var j = 0; j < response.data.length; j++) {
        //Stores array of results in results variable
        var results = response.data;
    
        //Create div for each gif
        var gifDiv = $("<div>");
    
        //Store ratings variable
        var rating = results[j].rating;
        console.log("Line 48: " + rating)
    
        //Create paragraph tag with rating reults
        var p = $("<p>").text("Rating: " + rating);
    
        //Create image tag for Giphy
        var giphyImage = $("<img>");

        //Add class to gifDiv for still/animate click function
        giphyImage.addClass("movement")
    
        //Attribute image src to image tag
        giphyImage.attr("src", results[j].images.fixed_height.url);
    
        //Append <p> and <img> to gifDiv
        gifDiv.append(p);
        gifDiv.append(giphyImage);
    
        //Prepend gifts to the "gif-section" in HTML
        $("#gif-section").prepend(gifDiv);
    }

    //When the movement class/div is clicked...       
    $(".movement").on("click", function(){
        event.preventDefault();
        alert("It worked!")  
        //"state" = the data-state of the clicked image
        var state = $(this).attr("data-state", "animate");
        console.log(this);

        //If state is 'still', assign animated link to image and change value to animated.   ********NEITHER OF THESE WORK*******
        if (state === "still"){
            $(this).attr("src", $(this).attr(response.data.images.fixed_height.url)); 
            $(this).attr("data-state", "animate");

        //If state is 'animated', assign still link to image and change value to still.
        } else {
            $(this).attr("src", $(this).attr(response.data.images.fixed_height_still.url)); 
            $(this).attr("data-state", "still");
        }
    });

    renderButtons();
}