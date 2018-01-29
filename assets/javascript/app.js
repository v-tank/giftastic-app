// Array of topics 
var topics = ["Eye roll", "Face-palm", "Happy", "High-Five", "LOL", "No", "Sad", "Shrug", "Thumbs Up", "Wings", "Yes", "Cool Story Bro", "Awesome", "Finger Guns", "Mic drop", "Oh no you didn't", "Yolo"];

// Function to add buttons to array/screen
$("#addTopic").on("click", function(event) {
	event.preventDefault();

	// Grabs the name of the topic entered in the text field of the form
	var topicName = $("#topic-input").val().trim();
	
	// Check if array already has the value; if not, then add it. Otherwise, don't do anything.
	if ((topics.indexOf(topicName) === -1) && (topicName !== '')) {
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

// Click event listener to stop and start gif
$(document).on("click", ".gif-image", toggleGIF);

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

		// Sets the button text to the name of the topic; capitalizeFirstLetter is called to make sure the first letter of each word is capitalized if the string contains multiple words
		newButton.text(capitalizeFirstLetter(topics[i]));

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
	}).done(function(response) { // Promise function

		// For-loop to create divs equal to the number of items in the response array
		for (var i = 0; i < response.data.length; i++) {

			// Create a new div to hold the info
			var newDiv = $("<div>");

			// Save the data in variables to be used later
			var rating = response.data[i]["rating"];
			var stillImage = response.data[i]["images"]["fixed_height_still"]["url"];
			var gif = response.data[i]["images"]["fixed_height"]["url"];
			var imgCaption = capitalizeFirstLetter(response.data[i]["title"]);

			// Create a new image tag in the div
			var gifDiv = $("<img>");

			// Set the initial image source to the moving GIF and set the class to gif-image (will be used later for the click function). Could also make it still in the beginning but I'd like some movement at the beginning instead of still images :)
			gifDiv.attr("src", gif);
			gifDiv.attr("alt", imgCaption);
			gifDiv.addClass("gif-image");

			// Store data to the image in an object
			gifDiv.data("values", {
				"still-image": stillImage, 
				"gif": gif,
				"state": "still"
			});

			// Dynamically append the created variables and image to the empty div called newDiv
			newDiv.append("<p>Rating: " + rating + "</p>");
			newDiv.append(gifDiv);
			newDiv.addClass("gifs");

			// Append the div to the container one-by-one; there should be a total of 10 on the page.
			$("#topics-container").append(newDiv);
		}

		// console.log(response);
	});
}

// Function to toggle between the GIF and image upon click event
function toggleGIF() {
	// console.log($(this).data().values);

	// 'if' statement checks whether the current state is still
	if ($(this).data().values.state === "still") {
		// Sets the source to the moving gif if the condition is met
		$(this).attr('src', $(this).data().values.gif);
		// Resets the state to moving for the toggle to work properly
		$(this).data().values.state = "moving";
	} 
	// Checks whether the current state is moving
	else if ($(this).data().values.state === "moving") {
		// Sets the source to the still image if the condition is met
		$(this).attr('src', $(this).data().values["still-image"]);
		// Resets the state to still 
		$(this).data().values.state = "still";
	}
}

// Function to capitalize the first letter of each word if there are multiple words in the button string
function capitalizeFirstLetter(string) {
  return string.replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
}

// function to fetch the audio from the html page and play it
function playClip() {
  var audio = $("audio")[0];
  audio.play();
}

// Sse a document 'mouseenter' event for dynamically created buttons to play the audio file upon hover
$(document).on("mouseenter", ".topic", function() {
  playClip();
});

// Calls the main function to render buttons at the beginning
renderButtons();