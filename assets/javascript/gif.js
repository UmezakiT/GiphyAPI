$(document).ready(function () {

    var topics = ["Animals", "dog", "cat"];

    function displayGifButtons() {
        $("#gifButtons").empty();
        for (var i = 0; i < topics.length; i++) {
            var gifButton = $("<button>");
            gifButton.addClass("action");
            gifButton.addClass("btn")
            gifButton.attr("data-name", topics[i]);
            gifButton.text(topics[i]);
            $("#gifButtons").append(gifButton);
        }
    }

    function addNewButton() {
        $("#addGif").on("click", function () {
            var action = $("#topics-input").val().trim();
            if (action == "") {
                return false;
            }
            topics.push(action);

            displayGifButtons();
            return false;
        });
    }

    function removeLastButton() {
        $("removeGif").on("click", function () {
            topics.pop(action);
            displayGifButtons();
            return false;
        });
    }

    function displayGifs() {
        var action = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + action + "&api_key=mWFZJPQq5PUKqLVCPIZ0I69hry2cgDtI";
        console.log(queryURL);
        $.ajax({
                url: queryURL,
                method: 'GET'
            })
            .done(function (response) {
                console.log(response);
                $("#gifsView").empty();
                var results = response.data;
                if (results == "") {
                    console.log("No Gif");
                }
                for (var i = 0; i < results.length; i++) {

                    var gifDiv = $("<div>");
                    gifDiv.addClass("gifDiv");
                    var gifImage = $("<img>");
                    gifImage.attr("src", results[i].images.fixed_height_small_still.url);
                    gifImage.attr("data-still", results[i].images.fixed_height_small_still.url);
                    gifImage.attr("data-animate", results[i].images.fixed_height_small.url);
                    gifImage.attr("data-state", "still");
                    gifImage.addClass("image");
                    gifDiv.append(gifImage);
                    $("#gifsView").prepend(gifDiv);
                }
            });
    }

    displayGifButtons();
    addNewButton();
    removeLastButton();
    $(document).on("click", ".action", displayGifs);
    $(document).on("click", ".image", function () {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });


});






// var gifRating = $("<p>").text("Rating: " + results[i].rating);
//                     gifDiv.append(gifRating);