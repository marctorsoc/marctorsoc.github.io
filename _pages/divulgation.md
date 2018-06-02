---
date: 2017-02-05T12:57:13+00:00
layout: archive
permalink: /divulgation
header:
  image: "/content/2017/12/academia_msg-1-940x198.png"
---

<p style="text-align: justify;">
  In this section, I will post different resources that may be useful in your undergrad days or in your work, to review something from the past, or to teach to someone else, including my findings in data science / coding, thanks to my current work and thirst for knowledge.
</p>

<div id="wp-ulike-post-181" class="wpulike wpulike-default " >
  <div class="wp_ulike_general_class wp_ulike_is_unliked">
    <a data-ulike-id="181" data-ulike-nonce="488aa8e0cc" data-ulike-type="likeThis" data-ulike-status="3" class="wp_ulike_btn wp_ulike_put_image"> </a> <span class="count-box"></span>
  </div>
</div>

{% for post in site.posts %}
  {% if post.categories contains 'Divulgation' %}
    {% include archive-single.html %}
  {% endif %}  
{% endfor %}
