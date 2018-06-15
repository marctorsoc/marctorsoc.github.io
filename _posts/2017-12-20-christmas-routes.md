---
title: Christmas routes
layout: single
author_profile: true
date: 2017-12-20T22:43:43+00:00
comments: true
permalink: /posts/christmas-routes/
categories:
  - Divulgation
---
Hi all!

<p style="text-align: justify;">Last Christmas I was told about this problem and think it's quite interesting. Santa needs to deliver presents to all kids in a bunch of cities. To do so, he needs to design routes for his 8 reindeers to visit each city almost once.</p>

<p style="text-align: justify;">To make it easy, it is assumed that the reindeers just need to get to the city and presents are distributed instantly (yes, not realistic, but we are only interested in maths and coding). The objective is to find the minimum speed at which they have to travel to visit all the cities, assuming a constant speed, and a maximum time of 10 hours. Hence, assuming that 30.000 km are travelled by one reindeer, its speed would be 3000 kmph.</p>

<p style="text-align: justify;">We are provided with a matrix of distances, i.e. each position $(i,j)$ in the matrix is the distance from city $i$ to city $j$, and of course there is some redundancy in the matrix since almost half of the numbers are repeated.</p>

<p style="text-align: justify;">I have solved this in a Python <a href="https://nbviewer.jupyter.org/github/marctorrellas/christmas_routes/blob/master/christmas_routes.ipynb">notebook</a> to explain while coding. I have no clue whether this is the best solution, but at least is quite fast to compute and as you'll see I have improved after trying different ideas 🙂</p>

<p style="text-align: justify;">I hope you enjoy this problem (please like in such a case!) and I wish you a merry Christmas!</p>

PS: if anyone finds a better solution, please let me know!
