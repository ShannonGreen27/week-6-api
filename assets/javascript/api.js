var topics = ['dalmation', 'bloodhound', 'labrador', 'husky', 'pug'];

$(document).ready(function(){

	createButtons();



	$('#addDogBreed').on('click', function(){
		addDogBreed();

		return false;
	})

});

function displayDogBreedInfo(){
	var dogBreed = $(this).data('breed');

	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + dogBreed + "&api_key=dc6zaTOxFJmzC&limit=10";

	$.ajax({url: queryURL, method: 'GET'}).done(function(response) {

	    var results = response.data;

		for (var i = 0; i < results.length; i++) {

            var gifDiv = $('<div class="gifDiv">')

            var rating = results[i].rating;

            var p = $('<p>').text( "Rating: " + rating);

            var dogBreedImage = $('<img>');
            dogBreedImage.attr('src', results[i].images.fixed_height_still.url);
            dogBreedImage.attr('data-still', results[i].images.fixed_height_still.url);
            dogBreedImage.attr('data-animate', results[i].images.fixed_height.url);
            dogBreedImage.attr('data-state', 'still');
            dogBreedImage.attr('class', 'gif');

            gifDiv.append(dogBreedImage)
            gifDiv.append(p)

            $('#gifsAppearHere').prepend(gifDiv);
        }

    });
}

function animateAndpauseGif(){

    var state = $(this).attr('data-state');

    if ( state == 'still'){

        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');

    }else{

        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');

    }

}

function createButtons(){

	$('#buttonsAppearHere').empty();

	for (var i = 0; i < topics.length; i++) {

		var x = $('<button>')
		x.addClass('buttons');
		x.text(topics[i]);
		x.attr('data-breed', topics[i]);
		$('#buttonsAppearHere').append(x);

	}

}

function addDogBreed(){

	var newBreed = $('#dogBreed-input').val().trim();

	topics.push(newBreed);

	createButtons();

}

$(document).on('click', '.gif', animateAndpauseGif)
$(document).on('click', '.buttons', displayDogBreedInfo)