var modalButtonEl = $('#modal-button');
var citySearchBtn = $('#citySearchBtn');
var citySearchInput = $('#cities-autocomplete');
var city;
var changeCityBtn = $('#changeCity');
var characterListUl = $("#characterList");

// These are used in Marvel.js, Characters.html, and Profile.html
var statusCode;
var characterName;
var numComics;
var characterDescription;
var profileImage;
var backButton = $('.backButton');
var characterClicked;

// Get character info from Marvel
function getCharacter(characterName) {
  //var characterUrl = "https://gateway.marvel.com/v1/public/characters?hash=5ad57e2950ad170a8c45b38ddb6b3b01&ts=string&name=" + characterName + "&apikey=72b7c45c60389c825df0845f4afd3c85";
  var characterUrl = "https://gateway.marvel.com/v1/public/characters?hash=46493b12f449dd19a8d6f3e9482602b8&ts=1&name=" + characterName + "&apikey=86db0495a9e60056ebd9ecda528d455d";
  return fetch(characterUrl)
  .then((characterResponse) => {
      return characterResponse.json();
  })
  .then((characterResponse) => {
      characterName = characterResponse.data.results[0].name;
      numComics = characterResponse.data.results[0].comics.available;
      characterDescription = characterResponse.data.results[0].description;
      profileImage = characterResponse.data.results[0].thumbnail.path + "." + characterResponse.data.results[0].thumbnail.extension;
      console.log(profileImage);
      characterListUl.append("<li class='character'>"+"<img src="+profileImage+" aria-label='character image'>"+"</li>");
  })
  .catch(error => console.log('error', error));
    
};
      
// getCharacter("thor", "thorBoxImage");
// getCharacter("groot", "grootBoxImage");
// getCharacter("hulk", "hulkBoxImage");
// getCharacter("black widow", "blackwidowBoxImage");
// getCharacter("scarlet witch", "hulkBoxImage");
// getCharacter("iron man", "ironmanBoxImage");
// getCharacter("doctor strange", "doctorstrangeBoxImage");
// getCharacter("captain america", "captainamericaBoxImage");
// getCharacter("captain marvel (carol danvers)", "captainmarvelcaroldanversImage");
// getCharacter("gamora", "gamoraBoxImage");
// getCharacter("black panther", "blackpantherBoxImage");
// getCharacter("spider-man (peter parker)", "spider-manpeterparkerImage");

function autoFilling() {
    var input = document.getElementById("cities-autocomplete");
    var autocomplete = new google.maps.places.Autocomplete(input);
}

modalButtonEl.on('click', function() {
  $(".modal").addClass("is-active");
});

$(".modal-close").click(function() {
  $(".modal").removeClass("is-active");
});

function fetchCharactersAndDisplay() {
  $.getJSON("./assets/json/characters.json", function(data) {
    console.log(data);
    data.forEach(element => {
      getCharacter(element.Character);
    });
  });
}

citySearchBtn.on('click', function() {
  var city = citySearchInput.val();
  citySearchInput.val('');

  changeCityBtn.html(city);

  $(".modal").removeClass("is-active");
  $(".characters").css("visibility", "visible");
  $(".landing-page").css("visibility", "hidden");
});

backButton.on('click', function() {
  console.log(city);
  window.location.replace("./characters.html");
})

changeCityBtn.on('click', function() {
  $(".modal").addClass("is-active");
});

characterListUl.on("click", ".character", function() {
  console.log("clicked");
  characterClicked = event.currentTarget.classList[1];
  localStorage.setItem("characterClicked", characterClicked);
  window.location.replace("./profile.html");
});

fetchCharactersAndDisplay();

// Handle click function on character images
// $(".characterBox").click(function (event) {
//     console.log("click");
// });

// // Handle redirect to profile on click
// $(".characterBox").click(function (event) {
//     console.log(characterClicked);
// });

// Get clicked character onto Profile page
function getClickedCharacter(characterClicked) {
  characterClicked = localStorage.getItem("characterClicked");
  console.log("character:", characterClicked);
};

// Get character info from Characters.json
var favThing;
var favMeal;
var hobbies;
var somethingToEat;
var somethingToDo;
var readMore;
// var city = "{CITY}"

function getCharacterInfo(characterClicked) {
   console.log("character clicked", characterClicked);
    var characterInfoUrl = "./assets/json/characters.json";
    // console.log("Getting Characters");

    return fetch(characterInfoUrl)
    .then((characterInfoResponse) => {
        return characterInfoResponse.json();
    })
    .then((characterInfoResponse) => {
        console.log(characterInfoResponse);
        favThing = characterInfoResponse[3]["Character"];
        favMeal = characterInfoResponse[3]["Food"];
        hobbies = characterInfoResponse[3]["Hobby"];
        somethingToEat = characterInfoResponse[3]["Restaraunts"];
        somethingToDo = characterInfoResponse[3]["Place"];
        readMore = characterInfoResponse[3]["ReadMore"];
        // console.log(somethingToEat.join(', '));

        $(".city").html(city);
        $(".favThing").html(favThing);
        $(".favMeal").html(favMeal);
        $(".hobbies").html(hobbies.join(', '));
        $(".toEat").html(somethingToEat.join(', '));
        $(".toDo").html(somethingToDo.join(', '));
        $(".readMore").attr("href", readMore)
        $(".changeCityButton").click(function (event) {
            console.log("click");
        });
        

    })
    .catch(error => console.log('error', error));
      
} getCharacterInfo();

