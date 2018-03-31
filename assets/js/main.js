function shuffle(o) {
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if(pair[0] == variable){return pair[1];}
  }
  return(false);
}

function createList(target, input) {
	for (var i = 0; i < input.length; i++) {
		// Elements
		var card = document.createElement("section");

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


$(document).ready(function() {
  var target = document.getElementById("allbots");

  $.getJSON("/bots.json", function(json) {
    var randomlist = shuffle(json);
		var verified = [];
		var therest = [];
		var collected = [];
		var filtersearch = [];

		// Split between verified and not verified
		for (var i = 0; i < json.length; i++) {
			if (json[i].verified == true) {
				verified.push(json[i]);
			} else {
				therest.push(json[i]);
			}
		}

		// If URL contains bot, stop trying to get rest
		if (getQueryVariable("bot")) {
			var search = getQueryVariable("bot");
			for (var i = 0; i < json.length; i++) {
				if (json[i].name == search) {
					filtersearch.push(json[i]);
				}
			}
		}

		if (filtersearch.length != 0) {
			createList(target, filtersearch);
		} else {
			createList(target, shuffle(verified));
			createList(target, shuffle(therest));
		}

		/* NOTE: Unlock this when it's needed
		$('#allbots').easyPaginate({
			paginateElement: 'section',
			elementsPerPage: 5,
			effect: 'default'
		});*/
  });

	$(".spinner").hide();

	// Search function
	$("#search").on("keyup", function() {
		var value = $(this).val().toLowerCase();
		$(".card").filter(function() {
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
		});
	});
});
