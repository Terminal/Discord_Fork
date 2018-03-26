function shuffle(o) {
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};

function createList(target, input) {
	for (var i = 0; i < input.length; i++) {
		// Elements
		var card = document.createElement("div");

		var name = document.createElement("h2");
		var logo = document.createElement("div");
		var desc = document.createElement("span");
		var link = document.createElement("div");

		// Load the content
		$(card).addClass("card")

		$(name)
			.text(input[i].name)
			.addClass("name")

		if (input[i].verified == true) $(name).addClass("verified")

		$(desc)
			.text(input[i].description)
			.addClass("description")

		// Check NSFW
		var nsfwfilter = "avatar";
		if (input[i].nsfw == true) {
			nsfwfilter = "avatar nsfw";
			$(name).append('<span class="nsfw-tag">NSFW</span>');
		}

		$(logo)
			.addClass("avatar")
			.append('<img class="'+nsfwfilter+'" src="'+input[i].avatar+'">')

		$(link)
			.addClass("link buttons")
			.append('<a target="_blank" href="'+input[i].link+'" class="btn green">Add this bot</a>')


		$(card).append(logo, name, desc, link); // Append content
		$(target).append(card); // Append result
	}
}

window.addEventListener('load', function() {
  var target = document.getElementById("allbots");

  $.getJSON("/bots.json", function(json) {
    var randomlist = shuffle(json);
		var verified = [];
		var therest = [];
		var collected = [];

		// Split between verified and not verified
		for (var i = 0; i < json.length; i++) {
			if (json[i].verified == true) {
				verified.push(json[i]);
			} else {
				therest.push(json[i]);
			}
		}

		createList(target, shuffle(verified));
		createList(target, shuffle(therest));

  });
});
