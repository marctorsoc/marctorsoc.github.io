---
id: 409
title: Christmas routes
date: 2017-12-20T22:43:43+00:00
author: admin_mtorrellas
layout: post
guid: https://marctorrellas.com/?p=409
permalink: /christmas-routes/
categories:
  - Teaching
---
Hi all!

Last Christmas I was told about this problem and think it&#8217;s quite interesting. Santa needs to deliver presents to all kids in a bunch of cities. To do so, he needs to design routes for his 8 reindeers to visit each city almost once.

To make it easy, it is assumed that the reindeers just need to get to the city and presents are distributed instantly (yes, not realistic, but we are only interested in maths and coding). The objective is to find the minimum speed at which they have to travel to visit all the cities, assuming a constant speed, and a maximum time of 10 hours. Hence, assuming that 30.000 km are travelled by one reindeer, its speed would be 3000 kmph.

We are provided with a matrix of distances, i.e. each position  <img src="https://marctorrellas.com/wp-content/ql-cache/quicklatex.com-dd63b4f7d223b938206abd02d3c06a42_l3.png" class="ql-img-inline-formula quicklatex-auto-format" alt="&#40;&#105;&#44;&#106;&#41;" title="Rendered by QuickLaTeX.com" height="18" width="34" style="vertical-align: -4px;" />in the matrix is the distance from city  <img src="https://marctorrellas.com/wp-content/ql-cache/quicklatex.com-8511b1f6cf9db17d46ddabb67bac99f5_l3.png" class="ql-img-inline-formula quicklatex-auto-format" alt="&#105;" title="Rendered by QuickLaTeX.com" height="12" width="6" style="vertical-align: 0px;" />to city <img src="https://marctorrellas.com/wp-content/ql-cache/quicklatex.com-9565fa6c9b8cbe9c2d2a57f38bbf9670_l3.png" class="ql-img-inline-formula quicklatex-auto-format" alt="&#106;" title="Rendered by QuickLaTeX.com" height="16" width="9" style="vertical-align: -4px;" />, and of course there is some redundancy in the matrix since almost half of the numbers are repeated.

I have solved this in a Python [notebook](https://github.com/marctorrellas/christmas_routes) to explain while coding. I have no clue that this is the best solution, but at least is quite fast to compute and as you&#8217;ll see I have improved after trying different ideas 🙂

I hope you enjoy this problem (please like in such a case!) and I wish you a merry Christmas!

PS: if anyone finds a better solution, please let me know!

<div id="wp-ulike-post-409" class="wpulike wpulike-default " >
  <div class="wp_ulike_general_class wp_ulike_is_unliked">
    <a data-ulike-id="409" data-ulike-nonce="69542e4c11" data-ulike-type="likeThis" data-ulike-status="3" class="wp_ulike_btn wp_ulike_put_image"> </a> <span class="count-box"></span>
  </div>
</div>