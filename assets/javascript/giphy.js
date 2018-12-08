// Array of games
var topics = ["The Last of Us", "Red Dead Redemption", "Spyro", "Halo", "World of Warcraft", "League of Legends", "Overwatch", "Minecraft", "Mario", "Fortnite"];
// display the gifs
function displayGameInfo() {

  var game = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topics + "&api_key=WTs6DtQ1Q81c3F76pOWMIG1b0lMMhkcr&limit=10&rating=pg-13";

  // AJAX call for game
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
      var results = response.data
      console.log(queryURL);
      console.log(response);
      // Get the gifs from the results to the page using for loop

      for (var i = 0; i < results.length; i++) {

        // Grab the gif div and display the gifs and ratings
        $("#games-view").append("<p>Rating: " + results[i].rating + "</p>");
        $("#games-view").append($("<img class='gamegif' data-state='still'>").attr("src", results[i].images.fixed_height_still));

        // Make gif animate when clicked
        $(".gamegif").on("click", function () {
          var state = $(this).attr("data-state");

          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          }

          else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
        })
      }
    });
    // empty every time new button is pressed
    $("#games-view").empty();
  
}

// appends the game buttons to the page
function renderButtons() {

  $("#buttons-view").empty();

  // Loops through the array of games to generate buttons to the page
  for (var i = 0; i < topics.length; i++) {

    var gameBtn = $("<button>");
    gameBtn.addClass("game");
    gameBtn.attr("data-name", topics[i]);
    gameBtn.text(topics[i]);
    $("#buttons-view").append(gameBtn);
  }
}

// Take user input and add to the array of games

$("#add-game").on("click", function (event) {
  event.preventDefault();

  // grab userinput from the text box and push to array
  var userInput = $("#game-input").val().trim();
  topics.push(userInput);
  renderButtons();
  $("#game-input").val('');
});

// allows dynamic buttons to be clickable
$(document).on("click", ".game", displayGameInfo);


// render buttons initially
renderButtons();