// Array of animals 
var arrayOfAnimals = ["Dog", "Cat", "Kangaroo", "Squirrel", "Crocodile", "Chinchilla", "Chicken", "Pig", "Elephant", "Monkey", "Raccoon"];

// Function to add buttons to array/screen
$("#addAnimal").on("click", function(event) {
	event.preventDefault();

	// Grabs the name of the animal entered in the text field of the form
	var animalName = capitalizeFirstLetter($("#animal-input").val().trim());
	
	// Check if array already has the value; if not, then add it. Otherwise, don't do anything.
	if (arrayOfAnimals.indexOf(animalName) === -1) {
		// Push the name to the existing array
		arrayOfAnimals.push(animalName);
	}

	// Clears the text field once the button has been clicked
	$("#animal-input").val("");

	// Calls the function to create buttons on the screen
	renderButtons();
});

// Click event listener to all elements with a class of animal; calls function to display GIFs
$(document).on("click", ".animal", displayGIFs);

// Function to render the buttons
function renderButtons() {

	// Clears out existing buttons to prevent duplicates
	$("#animalButtons").empty();

	for (var i = 0; i < arrayOfAnimals.length; i++) {
		// Creates a new button for each element in the array
		var newButton = $("<button>");

		// Adds a class of animal to the button
		newButton.addClass("animal");

		// Sets the data-animal attribute to the name of the animal
		newButton.attr("data-animal", arrayOfAnimals[i]);

		// Sets the button text to the name of the animal
		newButton.text(arrayOfAnimals[i]);

		// Appends the button to the screen
		$("#animalButtons").append(newButton);
	}
}

// Function to display gifs
function displayGIFs() {

	// Empties out the container before appending new gifs
	$("#animals").empty();

	var API_KEY = "RXAVQfOcKQkxZmWTh5qQ9vSnG7wER1AO"; // API Key
	var limit = 10; // Limit the response to 10 GIFs
	var queryAnimal = $(this).attr("data-animal"); // Animal to use for the query extracted from the button

	// Query URL per GIPHY's documentation
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + queryAnimal + "&api_key=" + API_KEY + "&limit=" + limit;

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

			$("#animals").append(newDiv);
		}

		console.log(response);
	});
}

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}



renderButtons();
