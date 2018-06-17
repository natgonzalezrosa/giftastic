
// Initial array of cartoons for the buttons at the top of the page
var topics = ["spongeBob squarePants", "rugrats", "the simpsons", "ren and stimpy", "tom and jerry", "adventure time", "adult swim", "family guy", "southpark", "hey arnold", "rick and morty", "robot chicken"];

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

// Function that will display the JSON content for each button into the #cartoons div
function displayCartoonInfo () {

    var cartoon = $(this).attr("data-name");

    // My queryURL for Giphy API using the API key provided
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + cartoon + "&api_key=f5vRa7rEx6OYgSYr44q3kDC0AAyxaXkF&limit=10";

    // Performing GET request to the Giphy API and displaying the response in the #cartoons div as a JSON string
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        for (var i = 0; i < topics.length; i++) {

            // Creates a div to hold the cartoon
            var cartoonDiv = $("<div class='holdCartoons'>");

            // Stores the rating data
            var Rating = response.data[i].rating;
            console.log(Rating);

            // Creates a paragraph element to display the rating
            var paraElement = $("<p>").text("Rating: " + Rating);

            // Displays the rating
            cartoonDiv.append(paraElement);

            // Retrieves the URL for the image
            var imgURL = response.data[i].images.fixed_height_still.url;
            console.log(imgURL);

            // Creates an element to hold the image
            var image = $("<img>").attr("src", imgURL);

            // Appends the image
            cartoonDiv.append(image);

            // Puts the cartoon above the previous cartoons
            $("#cartoons").prepend(cartoonDiv);
        }
    });
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
});

// This will add event listeners to dynamically added elements (in this case, buttons)
$(document).on("click", ".cartoon", displayCartoonInfo);

// Adds the initial buttons by calling this function
renderButtons();