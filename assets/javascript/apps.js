var golfer = ['Tiger Woods', 'Phil Mickelson', 'Jack Nicklause', 'Jason Day', 'Bubba Watson', 'Dustin Johnson', 'Rickie Fowler', 'Jordan Spieth', 'Patrick Reed', 'Justin Rose']
// create buttons based on the array
// render buttons here
renderButton()

function renderButton() {

  // Deleting  prior to ading new golfer
  // (this is necessary otherwise you will have repeat buttons)
  $('#button-view').empty()
  // Looping through the array of golfer
  for (var i = 0; i < golfer.length; i++) {
    // Then Dynamicaly generating buttons for each golfer in the array
    // This code $("<button>") is all Jquery needs to create the beginning and end tag.(<button></button>)
    var a = $('<button>')
    // Adding a class of golfer-btn to our button
    a.addClass('golfer-btn')
    // Adding a data-attribute
    a.attr('data-topic', golfer[i])
    // Providing the initial button text
    a.text(golfer[i])
    // Adding the button to the button-view div
    $('#button-view').append(a)
  }
}

$('button').on('click', function () {
  $("#gifs-appear-here").empty();
  
  var topic = $(this).attr('data-topic')

  var queryURL =
    'https://api.giphy.com/v1/gifs/search?q=' +
    topic +
    '&api_key=dc6zaTOxFJmzC&limit=10'

  function playerButtonClicked() {
    var userInput = $('#player-input').val()
    searchGif(userInput)
  }

  // $(document).on("click", "golfer-button", displayGolferInfo);
  //  renderButton();

  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function (response) {
    var results = response.data
    console.log(response)

    for (var i = 0; i < results.length; i++) {
      var gifDiv = $("<div class='item'>")

      var rating = results[i].rating
      var topicImage = $('<img>')
      topicImage.attr('src', results[i].images.fixed_height.url)

      gifDiv.prepend(topicImage)

      $('#gifs-appear-here').prepend(gifDiv)
    }
  })
})

$('#add-golfer').on('click', function (event) {
  event.preventDefault()
  // grab user input and store it as var newGolfer
  var newGolfer = $('#golfer-input').val().trim()
  //
  golfer.push(newGolfer);
  renderButton()
})