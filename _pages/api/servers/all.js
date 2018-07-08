---
permalink: "/api/servers/all.js"
---
const servers = [
  {% for server in site.servers %}{
{% include server.json %}
  }{% unless forloop.last %},{% endunless %}{% endfor %}
];
