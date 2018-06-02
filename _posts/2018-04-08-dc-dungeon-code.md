---
title: "DC: Dungeon & Code"
layout: single
author_profile: true
date: '2018-04-08 22:43:44 +0100'
comments: true
permalink: /posts/dc-dungeon-code/
categories:
- Divulgation
---

Today I come with a fairly easy but interesting problem. Consider a dungeon grid like this:

[<img class="alignnone size-full wp-image-426" src="/content/2018/04/yX1T7D.png" alt="" width="1596" height="900" srcset="/content/2018/04/yX1T7D.png 1596w, /content/2018/04/yX1T7D-300x169.png 300w, /content/2018/04/yX1T7D-768x433.png 768w, /content/2018/04/yX1T7D-1024x577.png 1024w" sizes="(max-width: 1596px) 100vw, 1596px" />](/content/2018/04/yX1T7D.png)

Ok, we will have something much more simplified, e.g:

<p style="text-align: center;">
  XXXXXXXXX..e..XXXXXXXX<br /> XXXXX&#8230;&#8230;&#8230;&#8230;&#8230;&#8230;&#8230;&#8230;XXXXX<br /> XXX&#8230;&#8230;&#8230;&#8230;.XXX&#8230;&#8230;.s&#8230;..XXX<br /> XXXXX&#8230;&#8230;&#8230;&#8230;&#8230;&#8230;&#8230;&#8230;XXXXX<br /> XXXXXXXXXXXXXXXXXXX
</p>

<p style="text-align: justify;">
  This array of strings can represent somehow the previous dungeon, where each character is a position, &#8220;s&#8221; is the starting position, &#8220;e&#8221; the ending one, and &#8220;X&#8221; the obstacles, so positions that cannot be landed.
</p>

<p style="text-align: justify;">
  The objective will be to find an algorithm to get the shortest path from start to end positions. Instantly, when we see shortest path we think on <a href="https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm">Dijkstra algorithm</a>, basically because is the first result when googling it. The problem is that we don&#8217;t have a graph. Hence, once transformed to a graph this problem is fairly easy. I refer you to <a href="https://github.com/marctorrellas/dungeon-code">my code</a> in Github for this conversion and the rest of this post will be devoted to the Dijkstra algorithm through an example. As always any doubts about the code, more than happy to help.
</p>

### **Dijsktra Algorithm: an example**

<p style="text-align: justify;">
  I&#8217;m not going to create a new long tutorial on this algorithm, because there are thousands over the Internet. Just give a visual example of how this works.
</p>

Consider we have a graph like the one next:[<img class="alignnone size-full wp-image-427" src="/content/2018/04/spa1.png" alt="" width="1568" height="664" srcset="/content/2018/04/spa1.png 1568w, /content/2018/04/spa1-300x127.png 300w, /content/2018/04/spa1-768x325.png 768w, /content/2018/04/spa1-1024x434.png 1024w" sizes="(max-width: 1568px) 100vw, 1568px" />](/content/2018/04/spa1.png)

<p style="text-align: justify;">
  where every node initially is at a big distance from A except A itself. Number in edges represent the distance between each pair of nodes. Note than in our example distance is one for each pair of positions, so this example addresses a more general case.
</p>

<p style="text-align: justify;">
  To solve the shortest path from A to G, we need a <a href="https://en.wikipedia.org/wiki/Heap_(data_structure)">heap</a>. A heap is data structure very useful in computer science where items are appended in such a way that you can get the maximum or minimum of the list in constant time (i.e. independent of the list length). This strictly doesn&#8217;t mean that the list is ordered (as noted in the image), though I will show it ordered to simplify.
</p>

<p style="text-align: justify;">
  On the right hand side I have the code with the algorithm. So let&#8217;s try to follow it. In the first iteration we select A and for each of its neighbors compute the distance to A, obtaining:
</p>

[<img class="alignnone size-full wp-image-428" src="/content/2018/04/spa2.png" alt="" width="1564" height="660" srcset="/content/2018/04/spa2.png 1564w, /content/2018/04/spa2-300x127.png 300w, /content/2018/04/spa2-768x324.png 768w, /content/2018/04/spa2-1024x432.png 1024w" sizes="(max-width: 1564px) 100vw, 1564px" />](/content/2018/04/spa2.png)

<p style="text-align: justify;">
  Notice that I&#8217;ve saved the best way to arrive from A to B and from A to C, together with the distance (in the code this is saved in the attribute parent).
</p>

<p style="text-align: justify;">
  Then, the following minimum becomes C, so for each neighbor we compute the distance from A to this node by summing 2 (the distance from A to C) plus the distance from C to this node. This is done for all neighbors except A, which is no more in the heap. This is a way to save computation time, omitting the nodes already visited. The graph after processing C looks as follows:
</p>

[<img class="alignnone size-full wp-image-429" src="/content/2018/04/spa3.png" alt="" width="1566" height="666" srcset="/content/2018/04/spa3.png 1566w, /content/2018/04/spa3-300x128.png 300w, /content/2018/04/spa3-768x327.png 768w, /content/2018/04/spa3-1024x435.png 1024w" sizes="(max-width: 1566px) 100vw, 1566px" />](/content/2018/04/spa3.png)

<p style="text-align: justify;">
  Now a human probably would go with E, because it&#8217;s closer to G and has a reasonable short distance of 4. However, following the algorithm the following node to extract is B. This ensures that all possibles paths are explored so that the solution is optimal.
</p>

[<img class="alignnone size-full wp-image-430" src="/content/2018/04/spa4.png" alt="" width="1570" height="658" srcset="/content/2018/04/spa4.png 1570w, /content/2018/04/spa4-300x126.png 300w, /content/2018/04/spa4-768x322.png 768w, /content/2018/04/spa4-1024x429.png 1024w" sizes="(max-width: 1570px) 100vw, 1570px" />](/content/2018/04/spa4.png)

<p style="text-align: justify;">
  This is an interesting iteration, since we can see that node E has not been modified as it&#8217;s faster moving there from C than from B. Next move could be either of H or E, but in this case we select H and nothing changes.
</p>

[<img class="alignnone size-full wp-image-431" src="/content/2018/04/spa5.png" alt="" width="1564" height="648" srcset="/content/2018/04/spa5.png 1564w, /content/2018/04/spa5-300x124.png 300w, /content/2018/04/spa5-768x318.png 768w, /content/2018/04/spa5-1024x424.png 1024w" sizes="(max-width: 1564px) 100vw, 1564px" />](/content/2018/04/spa5.png)

After that, we select E:

[<img class="alignnone size-full wp-image-432" src="/content/2018/04/spa6.png" alt="" width="1562" height="654" srcset="/content/2018/04/spa6.png 1562w, /content/2018/04/spa6-300x126.png 300w, /content/2018/04/spa6-768x322.png 768w, /content/2018/04/spa6-1024x429.png 1024w" sizes="(max-width: 1562px) 100vw, 1562px" />](/content/2018/04/spa6.png)

<p style="text-align: justify;">
  But notice that we need to end up with the elements in the heap, even though nothing changes, to ensure there are no better solutions. I just show you the state of the graph for all those iterations.
</p>

[<img class="alignnone size-full wp-image-433" src="/content/2018/04/spa7.png" alt="" width="1564" height="646" srcset="/content/2018/04/spa7.png 1564w, /content/2018/04/spa7-300x124.png 300w, /content/2018/04/spa7-768x317.png 768w, /content/2018/04/spa7-1024x423.png 1024w" sizes="(max-width: 1564px) 100vw, 1564px" />](/content/2018/04/spa7.png)

[<img class="alignnone size-full wp-image-434" src="/content/2018/04/spa8.png" alt="" width="1556" height="646" srcset="/content/2018/04/spa8.png 1556w, /content/2018/04/spa8-300x125.png 300w, /content/2018/04/spa8-768x319.png 768w, /content/2018/04/spa8-1024x425.png 1024w" sizes="(max-width: 1556px) 100vw, 1556px" />](/content/2018/04/spa8.png)

[<img class="alignnone size-full wp-image-435" src="/content/2018/04/spa9.png" alt="" width="1564" height="700" srcset="/content/2018/04/spa9.png 1564w, /content/2018/04/spa9-300x134.png 300w, /content/2018/04/spa9-768x344.png 768w, /content/2018/04/spa9-1024x458.png 1024w" sizes="(max-width: 1564px) 100vw, 1564px" />](/content/2018/04/spa9.png)

<p style="text-align: justify;">
  Ta-da! So we have it, now we can use a loop to get the path by using the attribute parent saved in each node.
</p>

<p style="text-align: justify;">
  Hope you enjoyed, and see you in the next post!
</p>

<p style="text-align: justify;">
  PS: these images are part of one huge <a href="https://docs.google.com/presentation/d/1EhUGzJlXeU0T1RZiDByrt9szTwanSFvTtFziHTyVFCk/edit?usp=sharing">Google slides document</a> I manage. It&#8217;s about Algorithms and tips and tricks and concepts for coding, especially to deal with coding exercises for interviews. Check it out if you have interest
</p>

<div id="wp-ulike-post-425" class="wpulike wpulike-default " >
  <div class="wp_ulike_general_class wp_ulike_is_unliked">
    <a data-ulike-id="425" data-ulike-nonce="42c7ca1d05" data-ulike-type="likeThis" data-ulike-status="3" class="wp_ulike_btn wp_ulike_put_image"> </a> <span class="count-box"></span>
  </div>
</div>
