---
date: 2016-10-24T19:06:28+00:00
permalink: /off-topic
header:
  image: "/content/offtopic.png"
---

Apart from maths and data science, *a man has many faces*. 
In this section, I will post stuff not that related to my job, enjoy!

Some resources about Lithuanian language:
* [My notes about Lithuanian language](https://docs.google.com/document/d/10_oMegG_znrgvay_M33PTWF6XIIypNG_Tji44IWA2eo/edit#heading=h.1nihs4t9nrtp)
* [My flash cards about Lithuanian language](https://www.brainscape.com/p/3P84P-LH-AAWC6)
* [Cooljugator](https://cooljugator.com/lt). This really applies to any language.


{% for post in site.posts %}
  {% if post.categories contains 'Off-topic' %}
    {% include archive-single.html %}
  {% endif %}
{% endfor %}
