---
date: 2016-10-23T21:36:20+00:00
layout: archive
permalink: /academia
header:
  image: "/content/TUCAN3G_UPCPlanningTeam.jpg"
---

<p style="text-align: justify;">
I developed a PhD in Wireless Communications during four years (2011-2015). Prior to that, while finishing my M.Sc (2006-2011), I became an intern (2009-2011) at the Signal Theory and Communications (TSC)
<a href="https://spcom.upc.edu/">group</a> of the Universitat Politècnica de Catalunya (UPC), in Barcelona.
</p>

<div style="text-align: justify;">
All papers produced during my PhD, as well as my thesis, can be easily found, see <a href="https://spcom.upc.edu/index.php?user=marc">here</a>, also available in <a href="https://scholar.google.es/citations?user=__4XCdYAAAAJ&hl=en">Google Scholar</a>. Some of them can also be obtained from <a href="https://arxiv.org/">arXiv</a>.
</div>

{% for post in site.posts %}
  {% if post.categories contains 'Academia' %}
    {% include archive-single.html %}
  {% endif %}  
{% endfor %}
