
// Initial array of cartoons for the buttons at the top of the page
var topics = ["SpongeBob SquarePants", "Rugrats", "The Simpsons", "Ren and Stimpy", "Tom and Jerry", "Adventure Time", "Rocko's Modern Life", "Adult Swim", "Family Guy", "South Park", "Hey Arnold", "Rick and Morty", "Doug", "Robot Chicken", "Archer", "Big Mouth", "Pokemon", "Ninja Turtles"];

// Function that will display the content from the Giphy API for each button into the #cartoons div
function displayCartoonInfo () {

    // When displayCartoonInfo function is started, empties/clears the cartoon div
    $("#cartoons").empty();

    // cartoon variable is assigned an attribute of "data-name"
    var cartoon = $(this).attr("data-name");

    // Limit of GIFs returned is 10
    var limit = 10;

    // My queryURL for Giphy API using the API key provided
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + cartoon + "&limit=" + limit + "&api_key=f5vRa7rEx6OYgSYr44q3kDC0AAyxaXkF";

    // Performing GET request to the Giphy API
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        // For loop to go gifs up until the limit is reached
        for (var j = 0; j < limit; j++) {

            // Creates a div to hold the cartoon
            var cartoonDiv = $("<div class='holdCartoons'>");

            // Creates an element to hold the image
            var image = $("<img>").addClass("gif");
            
            // Adds a src attribute to the image
            image.attr("src", response.data[j].images.fixed_height_still.url);

            // Adds "data-still" attribute to the image
            image.attr("data-still", response.data[j].images.fixed_height_still.url);

            // Adds "data-animate" attribute  to the image
            image.attr("data-animate", response.data[j].images.fixed_height.url);

            // Adds "data-state" attribute to the image
            image.attr("data-state", "still");

            // Appends the image
            cartoonDiv.append(image);

            var Rating = response.data[j].rating;
            console.log(response);

            // Stores the rating data
            var Rating = response.data[j].rating;

            // Creates a paragraph element to display the rating
            var pRating = $("<p>").text("Rating: " + Rating);

            // Displays the rating
            cartoonDiv.append(pRating);

            // Puts the cartoon above the previous cartoons
            $("#cartoons").prepend(cartoonDiv);
        }
    });
}

// Function for rendering the buttons
function renderButtons () {

    // Deletes buttons to avoid repeating buttons
    $("#cartoonButtons").empty();

    // Looping through the array of cartoons
    for (var i = 0; i < topics.length; i++) {
        
        //Creates a button and gives it the botoncito variable
        var botoncito = $("<button>");

        // Add a class of .cartoon to botoncito
        botoncito.addClass("cartoon");

        // Add a "data-name" attribute to botoncito
        botoncito.attr("data-name", topics[i]);

        // Adds text of the cartoon to the button
        botoncito.text(topics[i]);

        // Appends the button to the #cartoonButtons div
        $("#cartoonButtons").append(botoncito);
    }
}

// Function for changing the gif from still to animated and vice versa
function changeImage() {

    // state variable is equal to the attribute "data-state" of the image
    var state = $(this).attr("data-state");

    // animateImage variable is equal to the attribute "data-animate" of the image
    var animateImage = $(this).attr("data-animate");

    // stillImage variable is equal to the attribute "data-still" of the image
    var stillImage = $(this).attr("data-still");

    // if "data-state" attribute of the image is "still", source is animateImage and "data-state" is changed to animate
    if (state === "still") {
        $(this).attr("src", animateImage);
        $(this).attr("data-state", "animate");
    }

    // if "data-state" attribute of the image is NOT "still", source is stillImage and "data-state" is changed to still
    else {
        $(this).attr("src", stillImage);
        $(this).attr("data-state", "still");
    }
}

// This will handle events when the "Add a cartoon" button is clicked
$("#addCartoon").on("click", function(event) {
    event.preventDefault();

    // This will grab the input from the textbox
    var cartoon = $("#cartoon-input").val().trim();

    // This adds the cartoon from the textbox to our array
    topics.push(cartoon);

    // Calls the renderButtons which will handle the processing of the topics array
    renderButtons();
    
    // After the renderButtons function is called, clear the input box
    $("#cartoon-input").val("");
});


// This will add event listeners to dynamically added elements (in this case, buttons)
$(document).on("click", ".cartoon", displayCartoonInfo);

$(document).on("click", ".gif", changeImage);

// Adds the initial buttons by calling this function
renderButtons();