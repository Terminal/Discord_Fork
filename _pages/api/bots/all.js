---
permalink: "/api/bots/all.js"
---
const bots = [
  {% for bot in site.bots %}{
{% include bot.json %}
  }{% unless forloop.last %},{% endunless %}{% endfor %}
];
