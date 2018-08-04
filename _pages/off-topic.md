---
date: 2016-10-24T19:06:28+00:00
layout: archive
permalink: /off-topic
header:
  image: "/content/offtopic.png"
---

<p style="text-align: justify;">
In my free time, I like to work on mini-projects, usually to automate tasks or to learn something. Plus, I have some hobbies like music or supporting the Barcelona football team. In this section, I will post stuff not that related to my job, enjoy!
</p>
<!--&nbsp;

The following is just a tentative list of items to be documented:


<ul>


<li>Football Radio sync</li>




<li>Coding guides</li>




<li>CV ONG/NGO</li>




<li>Subtitles Format fix</li>




<li>Android game</li>


</ul>


-->

{% for post in site.posts %}
  {% if post.categories contains 'Off-topic' %}
    {% include archive-single.html %}
  {% endif %}  
{% endfor %}
