
// Initial array of cartoons for the buttons at the top of the page
var topics = ["spongeBob squarePants", "rugrats", "the simpsons", "ren and stimpy", "tom and jerry", "adventure time", "adult swim", "family guy", "southpark", "hey arnold", "rick and morty", "robot chicken"];

// Function that will display the JSON content for each button into the #cartoons div
function displayCartoonInfo () {

    $("#cartoons").empty();

    var cartoon = $(this).attr("data-name");

    var limit = 10;

    // My queryURL for Giphy API using the API key provided
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + cartoon + "&limit=" + limit + "&api_key=f5vRa7rEx6OYgSYr44q3kDC0AAyxaXkF";

    // Performing GET request to the Giphy API and displaying the response in the #cartoons div as a JSON string
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        for (var j = 0; j < limit; j++) {

            // Creates a div to hold the cartoon
            var cartoonDiv = $("<div class='holdCartoons'>");

            // Creates an element to hold the image
            var image = $("<img>").addClass("gif");
            
            // Adds a src attribute to the image
            image.attr("src", response.data[j].images.fixed_height_still.url);

            // Adds data-still attribute to the image
            image.attr("data-still", response.data[j].images.fixed_height_still.url);

            // Adds data-animate attribute  to the image
            image.attr("data-animate", response.data[j].images.fixed_height.url);

            // Adds data-state attribute to the image
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

function changeImage() {

    var state = $(this).attr("data-state");
    var animateImage = $(this).attr("data-animate");
    var stillImage = $(this).attr("data-still");

    if (state === "still") {
        $(this).attr("src", animateImage);
        $(this).attr("data-state", "animate");
    }

    else {
        $(this).attr("src", stillImage);
        $(this).attr("data-state", "still");
    }
}

// This will handle events when the Add a cartoon button is clicked
$("#addCartoon").on("click", function(event) {
    event.preventDefault();

    // This will grab the input from the textbox
    var cartoon = $("#cartoon-input").val().trim();

    // This adds the cartoon from the textbox to our array
    topics.push(cartoon);

    // Calls the renderButtons which will handle the processing of the topics array
    renderButtons();

    $("#cartoon-input").val("");
});


// This will add event listeners to dynamically added elements (in this case, buttons)
$(document).on("click", ".cartoon", displayCartoonInfo);

$(document).on("click", ".gif", changeImage);

// Adds the initial buttons by calling this function
renderButtons();