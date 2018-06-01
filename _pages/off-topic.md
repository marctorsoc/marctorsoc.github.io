---
date: 2016-10-24T19:06:28+00:00
layout: archive
---
<img class="aligncenter" src="/content/2016/10/evolution4-1-e1479033493669-940x198.png" alt="" width="100%" height="300">

<p style="text-align: justify;">
In my free time, I like to work on mini-projects, usually to solve little problems or to automate or ease tasks I used to do. While sometimes they are simpler than others, I see them as an opportunity for learning something. This is usually more important than the final objective, since most tasks manually would have been more time-efficient 🙂
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
