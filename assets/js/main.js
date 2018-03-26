function shuffle(o) {
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};

window.addEventListener('load', function() {
  var target = document.getElementById("allbots");

  $.getJSON("/bots.json", function(json) {
    var randomlist = shuffle(json);
    for (var i = 0; i < randomlist.length; i++) {
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

			// Check NSFW
			var nsfwfilter = "avatar";
			if (json[i].nsfw == true) {
				nsfwfilter = "avatar nsfw";
				$(name).append('<span class="nsfw-tag">NSFW</span>');
			}

      $(logo)
				.addClass("avatar")
        .append('<img class="'+nsfwfilter+'" src="'+json[i].avatar+'">')

      $(link)
        .addClass("link buttons")
        .append('<a target="_blank" href="'+json[i].link+'" class="btn green">Add this bot</a>')


      $(card).append(logo, name, desc, link); // Append content
      $(target).append(card); // Append result
    }
  });

});
