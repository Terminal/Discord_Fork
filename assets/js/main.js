function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle
  while (0 !== currentIndex) {

    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

window.addEventListener('load', function() {
  var target = document.getElementById("allbots");

  $.getJSON("/bots.json", function(json) {
    for (var i = 0; i < shuffle(json).length; i++) {
      // Elements
      var card = document.createElement("div");

      var name = document.createElement("h2");
      var logo = document.createElement("div");
      var desc = document.createElement("span");
      var link = document.createElement("div");

      // Load the content
      $(card).addClass("card")

      $(name)
        .text(json[i].name)
        .addClass("name")

      $(desc)
        .text(json[i].description)
        .addClass("description")

      $(logo)
        .addClass("avatar")
        .append('<img class="avatar" src="'+json[i].avatar+'">')

      $(link)
        .addClass("link buttons")
        .append('<a target="_blank" href="'+json[i].link+'" class="btn green">Add this bot</a>')


      $(card).append(logo, name, desc, link); // Append content
      $(target).append(card); // Append result
    }
  });

});
