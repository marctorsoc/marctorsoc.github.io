---
date: 2017-02-05T12:57:13+00:00
permalink: /divulgation
header:
  image: "/content/divulgation.png"
---

  In this section, I will post different resources that may be useful in your undergrad days, at work, or preparing a job interview. You will review something from the past, or maybe learn something new. I will include my findings in data science, coding, and maths.

  I also keep notes about different topics in the form of Google Slides presentations:

  * <a href="https://docs.google.com/presentation/d/1abzvRA6VQyMPIfuLVh43QgDdgH-7XgnfE7v73kxNYWw/edit?usp=sharing">Machine Learning</a>
  * <a href="https://docs.google.com/presentation/d/14B0zzok1l1Zl-lUTigtAKubvBdVwBQfxhh1XWADHCRo/edit?usp=sharing">NLP</a>
  * <a href="https://docs.google.com/presentation/d/1EhUGzJlXeU0T1RZiDByrt9szTwanSFvTtFziHTyVFCk/edit?usp=sharing">Algorithms and coding</a>
  * <a href="https://docs.google.com/presentation/d/1ugNBNu3AcacuTo5aGWleNnYK5JqrubO_AUpDDRh-yWM/edit?usp=sharing">Maths</a>

These do not pretend to be exhaustive and are (and will always be) in construction.  I update them many times a month, as I find out new concepts, properties, or even better ways to explain things.

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
