---
date: 2016-10-24T19:06:28+00:00
layout: archive
permalink: /off-topic
header:
  image: "/content/offtopic.png"
---

<p style="text-align: justify;">
In my free time, I like to work on mini-projects, usually to solve little problems or to automate or ease tasks I used to do. While sometimes they are simpler than others, I see them as an opportunity for learning something. This is usually more important than the final objective, since most tasks manually would have been more time-efficient 🙂

In this section, I will post projects and stuff not that related to my job:
music, tech, or anything else.
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
