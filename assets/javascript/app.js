// Array of topics 
var topics = ["101 Dalmatians", "Aladdin", "Bob's Burgers", "Calvin and Hobbes", "Family Guy", "Garfield", "Johnny Bravo", "Looney Tunes", "Popeye", "Yogi Bear", "Scooby Doo", "South Park", "Simpsons", "Tom and Jerry"];

// Function to add buttons to array/screen
$("#addTopic").on("click", function(event) {
	event.preventDefault();

	// Grabs the name of the topic entered in the text field of the form
	var topicName = capitalizeFirstLetter($("#topic-input").val().trim());
	
	// Check if array already has the value; if not, then add it. Otherwise, don't do anything.
	if (topics.indexOf(topicName) === -1) {
		// Push the name to the existing array
		topics.push(topicName);
	}

	// Clears the text field once the button has been clicked
	$("#topic-input").val("");

	// Calls the function to create buttons on the screen
	renderButtons();
});

// Click event listener to all elements with a class of topic; calls function to display GIFs
$(document).on("click", ".topic", displayGIFs);

// Function to render the buttons
function renderButtons() {

	// Clears out existing buttons to prevent duplicates
	$("#topicButtons").empty();

	for (var i = 0; i < topics.length; i++) {
		// Creates a new button for each element in the array
		var newButton = $("<button>");

		// Adds a class of topic to the button
		newButton.addClass("topic");

		// Sets the data-topic attribute to the name of the topic
		newButton.attr("data-topic", topics[i]);

		// Sets the button text to the name of the topic
		newButton.text(topics[i]);

		// Appends the button to the screen
		$("#topicButtons").append(newButton);
	}
}

// Function to display gifs
function displayGIFs() {

	// Empties out the container before appending new gifs
	$("#topics-container").empty();

	var API_KEY = "RXAVQfOcKQkxZmWTh5qQ9vSnG7wER1AO"; // API Key
	var limit = 10; // Limit the response to 10 GIFs
	var queryTopic = $(this).attr("data-topic"); // Topic to use for the query extracted from the button

	// Query URL per GIPHY's documentation
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + queryTopic + "&api_key=" + API_KEY + "&limit=" + limit;

	// AJAX call
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {

		for (var i = 0; i < response.data.length; i++) {
			// Create a new div to hold the info
			var newDiv = $("<div>");
			var rating = response.data[i]["rating"];

			var gif = $("<img>");
			gif.attr("src", response.data[i]["images"]["fixed_height"]["url"]);

			newDiv.append("<p>Rating: " + rating + "</p>");
			newDiv.append(gif);
			newDiv.addClass("gifs");

			$("#topics-container").append(newDiv);
		}

		console.log(response);
	});
}

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}



renderButtons();
