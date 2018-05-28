---
id: 162
title: Basic zero-forcing concepts
date: 2017-05-28T15:09:06+00:00
author: admin_mtorrellas
layout: post
guid: https://marctorrellas.com/?p=162
permalink: /background/
categories:
  - PhD
---
<p style="text-align: justify;">
  Sometimes I get my mind back to 2009, when Prof. Josep Vidal came to me with <a href="https://arxiv.org/abs/0707.0323">this</a> then recently published amazing paper. At that moment, I had never imagined that <a href="http://www.ece.uci.edu/~syed/">Jafar</a>, a name that I related more to Disney Aladdin&#8217;s <a href="https://en.wikipedia.org/wiki/List_of_Disney%27s_Aladdin_characters#Jafar">antagonist</a>, would be the origin of my PhD. In short, the thing is that two (very smart) guys: Syed Ali Jafar and his PhD student Viveck Cadambe, ideated an innovative an disruptive way of communicating nodes in a wireless network.
</p>

<p style="text-align: justify;">
  The main achievement is that, regardless the number of active nodes located in a network, each achieves the same performance! To be practical, consider a room with 2 pairs of people, all communicating by turns. This means that to understand each other, each pair can only talk during half the time. So we say that the <em>efficiency </em>is of 50% per pair or 0.5 per pair<span style="color: #000000;">. What this incredible result claims is that, if we now put 100 pairs in the same room, this same per-pair efficiency can be maintained, so there is way to transmit information where they don&#8217;t mind how many people there is in the room!</span>
</p>

<p style="text-align: justify;">
  <span style="color: #000000;">In a world where there are increasingly more and more devices communicating at the same time, one can understand how this idea may bring a revolution to the wireless communications.</span>
</p>

<p style="text-align: justify;">
  To understand the idea, probably it is necessary some background. I will try to make things simpler than they are, but obviously some maths are needed.
</p>

<img class="aligncenter" src="https://marctorrellas.com/wp-content/uploads/2016/11/BC-300x85.png" width="300" height="85" />

<p style="text-align: center;">
  <span style="font-size: 10pt;">Fig. 1 The Broadcast Channel</span>
</p>

### **Null Steering**

<p style="text-align: justify;">
  To explain the concept of Interference Alignment, let&#8217;s start by explaining first the well-known idea of <em><a href="https://en.wikipedia.org/wiki/Zero-forcing_precoding">Zero Forcing</a> at the transmitter</em> or <em>Null Steering</em>. In this regard, consider a network as in Figure 1, where there is one transmitter (Tx), who wants to send information to two receivers (Rx1 and Rx2). This model is known as the Broadcast Channel (BC). In this case, we consider the case where transmitter has two antennas, whereas receivers have only one. We can model the signal received at Rx<em>i </em>as follows:
</p>

<p align="center">
  <p class="ql-center-displayed-equation" style="line-height: 21px;">
    <span class="ql-right-eqno"> (1) </span><span class="ql-left-eqno"> &nbsp; </span><img src="https://marctorrellas.com/wp-content/ql-cache/quicklatex.com-7654ac202d06e64475fadb92b6bc35e3_l3.png" height="21" width="206" class="ql-img-displayed-equation quicklatex-auto-format" alt="&#92;&#98;&#101;&#103;&#105;&#110;&#123;&#101;&#113;&#117;&#97;&#116;&#105;&#111;&#110;&#42;&#125;&#32;&#92;&#100;&#105;&#115;&#112;&#108;&#97;&#121;&#115;&#116;&#121;&#108;&#101;&#32;&#123;&#121;&#125;&#95;&#105;&#32;&#61;&#32;&#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#104;&#125;&#94;&#84;&#95;&#105;&#32;&#40;&#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#118;&#125;&#95;&#49;&#32;&#120;&#95;&#49;&#32;&#43;&#32;&#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#118;&#125;&#95;&#50;&#32;&#120;&#95;&#50;&#41;&#32;&#43;&#32;&#110;&#95;&#105;&#32;&#36;&#32;&#32;&#32;&#92;&#101;&#110;&#100;&#123;&#101;&#113;&#117;&#97;&#116;&#105;&#111;&#110;&#42;&#125;" title="Rendered by QuickLaTeX.com" />
  </p>
</p>

<p style="text-align: justify;">
  where <img src="https://marctorrellas.com/wp-content/ql-cache/quicklatex.com-833e20fb9788dec8352906b92ffc7868_l3.png" class="ql-img-inline-formula quicklatex-auto-format" alt="&#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#104;&#125;&#94;&#84;&#95;&#105;" title="Rendered by QuickLaTeX.com" height="20" width="21" style="vertical-align: -5px;" /> is a vector whose two components denote the channel gains from each antenna of the transmitter to the single antenna of <img src="https://marctorrellas.com/wp-content/ql-cache/quicklatex.com-12c40f46b92902d433b0d32f12e646c5_l3.png" class="ql-img-inline-formula quicklatex-auto-format" alt="&#92;&#116;&#101;&#120;&#116;&#123;&#82;&#120;&#125;&#105;" title="Rendered by QuickLaTeX.com" height="13" width="28" style="vertical-align: -1px;" />. As you may notice from the figure, <img src="https://marctorrellas.com/wp-content/ql-cache/quicklatex.com-e263b110e89016895180fee26a0cf4c2_l3.png" class="ql-img-inline-formula quicklatex-auto-format" alt="&#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#120;&#125;&#95;&#105;" title="Rendered by QuickLaTeX.com" height="11" width="16" style="vertical-align: -3px;" /> denotes messages intended to each receiver, while <img src="https://marctorrellas.com/wp-content/ql-cache/quicklatex.com-c9565c8012e2ff3ad5c283da5e14acd0_l3.png" class="ql-img-inline-formula quicklatex-auto-format" alt="&#92;&#104;&#97;&#116;&#123;&#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#120;&#125;&#125;&#95;&#105;" title="Rendered by QuickLaTeX.com" height="16" width="16" style="vertical-align: -3px;" /> denotes its estimation, hopefully the true one.
</p>

<p style="text-align: justify;">
  Regarding the term <img src="https://marctorrellas.com/wp-content/ql-cache/quicklatex.com-535592e0f2b99655e0c6d4a23f926704_l3.png" class="ql-img-inline-formula quicklatex-auto-format" alt="&#110;&#95;&#105;" title="Rendered by QuickLaTeX.com" height="11" width="16" style="vertical-align: -3px;" />, it represents the noise originated at the receiver when &#8220;listening&#8221;. This noise may be the result of a number of unknown contributions such as external interference, fluctuations in the receiving antennas, and others. For these reasons, it is usually assumed to be Gaussian and <a href="https://en.wikipedia.org/wiki/White_noise">white</a>. My intention is that the reader does not need to understand all these concepts to catch the main message, but do not hesitate to contact me or post a comment if any extra info is wished. I would be more than happy to provide answers up to the limits of my knowledge.
</p>

<p style="text-align: justify;">
  As you may have noticed, I have left the beamforming vectors <img src="https://marctorrellas.com/wp-content/ql-cache/quicklatex.com-26a62ea405d164d914a162c6fc197300_l3.png" class="ql-img-inline-formula quicklatex-auto-format" alt="&#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#118;&#125;&#95;&#105;" title="Rendered by QuickLaTeX.com" height="12" width="16" style="vertical-align: -3px;" /> for the last part. The name basically tells us what they do: steer the transmitted signal to some desired direction.  This can be used twofold: to increase the power a desired signal is received with, or to alleviate or remove the interference a signal causes. Most of the scenarios considered in my thesis and papers always focus on the case where the transmission power is not problem, so we assume that we can spend as much power as required, and the only problem is the interference. Therefore, we are more oriented to remove the interference rather than increasing the desired signal power. To this end, consider the following constraints:
</p>

<p style="text-align: center;">
  <p class="ql-center-displayed-equation" style="line-height: 43px;">
    <span class="ql-right-eqno"> (2) </span><span class="ql-left-eqno"> &nbsp; </span><img src="https://marctorrellas.com/wp-content/ql-cache/quicklatex.com-aedb85e6b4d3ee9e465cfb5b2c4ae4cd_l3.png" height="43" width="73" class="ql-img-displayed-equation quicklatex-auto-format" alt="&#92;&#98;&#101;&#103;&#105;&#110;&#123;&#101;&#113;&#117;&#97;&#116;&#105;&#111;&#110;&#42;&#125;&#32;&#92;&#98;&#101;&#103;&#105;&#110;&#123;&#109;&#97;&#116;&#114;&#105;&#120;&#125;&#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#104;&#125;&#94;&#84;&#95;&#49;&#32;&#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#118;&#125;&#95;&#50;&#32;&#61;&#32;&#48;&#32;&#92;&#92;&#32;&#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#104;&#125;&#94;&#84;&#95;&#50;&#32;&#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#118;&#125;&#95;&#49;&#32;&#61;&#32;&#48;&#32;&#92;&#101;&#110;&#100;&#123;&#109;&#97;&#116;&#114;&#105;&#120;&#125;&#32;&#36;&#32;&#32;&#32;&#32;&#92;&#101;&#110;&#100;&#123;&#101;&#113;&#117;&#97;&#116;&#105;&#111;&#110;&#42;&#125;" title="Rendered by QuickLaTeX.com" />
  </p>
</p>

<p style="text-align: justify;">
  which can be read as follows: there exists one direction for vector <img src="https://marctorrellas.com/wp-content/ql-cache/quicklatex.com-26a62ea405d164d914a162c6fc197300_l3.png" class="ql-img-inline-formula quicklatex-auto-format" alt="&#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#118;&#125;&#95;&#105;" title="Rendered by QuickLaTeX.com" height="12" width="16" style="vertical-align: -3px;" />, such that when the signal travels through the channel it is null out. This direction, clearly, is pointed by a vector orthogonal to the channel, thus it is straightforward to derive a system completely removing the interference!
</p>

<p style="text-align: justify;">
  This idea can be generalized to the case with <img src="https://marctorrellas.com/wp-content/ql-cache/quicklatex.com-316287c6f5fadf7cd4af9475c28d18d1_l3.png" class="ql-img-inline-formula quicklatex-auto-format" alt="&#77;" title="Rendered by QuickLaTeX.com" height="12" width="19" style="vertical-align: 0px;" /> antennas and <img src="https://marctorrellas.com/wp-content/ql-cache/quicklatex.com-f14690ce7d5e650372f8e91fb634b128_l3.png" class="ql-img-inline-formula quicklatex-auto-format" alt="&#75;&#61;&#77;" title="Rendered by QuickLaTeX.com" height="12" width="59" style="vertical-align: 0px;" /> single-antenna users by forcing the following general set of constraints:
</p>

<p style="text-align: center;">
  <p class="ql-center-displayed-equation" style="line-height: 22px;">
    <span class="ql-right-eqno"> (3) </span><span class="ql-left-eqno"> &nbsp; </span><img src="https://marctorrellas.com/wp-content/ql-cache/quicklatex.com-995336f91da2c84fa2c302e334c3d7f6_l3.png" height="22" width="131" class="ql-img-displayed-equation quicklatex-auto-format" alt="&#92;&#98;&#101;&#103;&#105;&#110;&#123;&#101;&#113;&#117;&#97;&#116;&#105;&#111;&#110;&#42;&#125;&#32;&#92;&#100;&#105;&#115;&#112;&#108;&#97;&#121;&#115;&#116;&#121;&#108;&#101;&#32;&#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#104;&#125;&#94;&#84;&#95;&#105;&#32;&#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#118;&#125;&#95;&#106;&#32;&#61;&#32;&#48;&#44;&#32;&#92;&#44;&#32;&#92;&#102;&#111;&#114;&#97;&#108;&#108;&#32;&#106;&#32;&#92;&#110;&#101;&#113;&#32;&#105;&#32;&#92;&#101;&#110;&#100;&#123;&#101;&#113;&#117;&#97;&#116;&#105;&#111;&#110;&#42;&#125;" title="Rendered by QuickLaTeX.com" />
  </p>
</p>

Then, each  <img src="https://marctorrellas.com/wp-content/ql-cache/quicklatex.com-47fff14a3e3b0fc5842a2e5572003b2e_l3.png" class="ql-img-inline-formula quicklatex-auto-format" alt="&#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#118;&#125;&#95;&#106;" title="Rendered by QuickLaTeX.com" height="15" width="17" style="vertical-align: -6px;" />appears in  <img src="https://marctorrellas.com/wp-content/ql-cache/quicklatex.com-cb5fae6060a520388d222c2ed82c73ff_l3.png" class="ql-img-inline-formula quicklatex-auto-format" alt="&#75;&#45;&#49;" title="Rendered by QuickLaTeX.com" height="13" width="46" style="vertical-align: -1px;" />equations, written in matrix form as:

<p style="text-align: center;">
  <p class="ql-center-displayed-equation" style="line-height: 151px;">
    <span class="ql-right-eqno"> (4) </span><span class="ql-left-eqno"> &nbsp; </span><img src="https://marctorrellas.com/wp-content/ql-cache/quicklatex.com-e261438316c4b9a86203ff513a71a110_l3.png" height="151" width="172" class="ql-img-displayed-equation quicklatex-auto-format" alt="&#92;&#98;&#101;&#103;&#105;&#110;&#123;&#101;&#113;&#117;&#97;&#116;&#105;&#111;&#110;&#42;&#125;&#32;&#92;&#100;&#105;&#115;&#112;&#108;&#97;&#121;&#115;&#116;&#121;&#108;&#101;&#32;&#92;&#98;&#101;&#103;&#105;&#110;&#123;&#98;&#109;&#97;&#116;&#114;&#105;&#120;&#125;&#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#104;&#125;&#94;&#84;&#95;&#105;&#32;&#92;&#92;&#32;&#92;&#118;&#100;&#111;&#116;&#115;&#32;&#92;&#92;&#32;&#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#104;&#125;&#94;&#84;&#95;&#123;&#105;&#45;&#49;&#125;&#92;&#92;&#32;&#32;&#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#104;&#125;&#94;&#84;&#95;&#123;&#105;&#45;&#49;&#125;&#32;&#92;&#92;&#32;&#92;&#118;&#100;&#111;&#116;&#115;&#32;&#92;&#92;&#32;&#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#104;&#125;&#94;&#84;&#95;&#123;&#75;&#125;&#32;&#92;&#101;&#110;&#100;&#123;&#98;&#109;&#97;&#116;&#114;&#105;&#120;&#125;&#32;&#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#118;&#125;&#95;&#106;&#32;&#61;&#32;&#92;&#116;&#105;&#108;&#100;&#101;&#123;&#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#72;&#125;&#125;&#95;&#106;&#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#118;&#125;&#95;&#106;&#32;&#61;&#32;&#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#48;&#125;&#32;&#92;&#101;&#110;&#100;&#123;&#101;&#113;&#117;&#97;&#116;&#105;&#111;&#110;&#42;&#125;" title="Rendered by QuickLaTeX.com" />
  </p>
</p>

<p style="text-align: justify;">
  The design above is usually referred to as <em>Null Steering</em>, since each transmitter steers its signal along the direction where the receivers have nulls in their antenna pattern diagram. Moreover, notice that the vector <img src="https://marctorrellas.com/wp-content/ql-cache/quicklatex.com-47fff14a3e3b0fc5842a2e5572003b2e_l3.png" class="ql-img-inline-formula quicklatex-auto-format" alt="&#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#118;&#125;&#95;&#106;" title="Rendered by QuickLaTeX.com" height="15" width="17" style="vertical-align: -6px;" /> lies on the <em>null space</em> of <img src="https://marctorrellas.com/wp-content/ql-cache/quicklatex.com-6b1e5caf0bde9b4fe9a579cd0c26a3ad_l3.png" class="ql-img-inline-formula quicklatex-auto-format" alt="&#92;&#116;&#105;&#108;&#100;&#101;&#123;&#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#72;&#125;&#125;&#95;&#106;" title="Rendered by QuickLaTeX.com" height="23" width="22" style="vertical-align: -6px;" />, denoted as <span style="font-family: 'courier new', courier, monospace;">null</span><img src="https://marctorrellas.com/wp-content/ql-cache/quicklatex.com-7461bca289aadc371d2d303cb8dd3407_l3.png" class="ql-img-inline-formula quicklatex-auto-format" alt="&#92;&#108;&#101;&#102;&#116;&#40;&#92;&#116;&#105;&#108;&#100;&#101;&#123;&#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#72;&#125;&#125;&#92;&#114;&#105;&#103;&#104;&#116;&#41;" title="Rendered by QuickLaTeX.com" height="33" width="32" style="vertical-align: -12px;" />. This null space may not always exists, and actually depends on the parameters of the system <img src="https://marctorrellas.com/wp-content/ql-cache/quicklatex.com-316287c6f5fadf7cd4af9475c28d18d1_l3.png" class="ql-img-inline-formula quicklatex-auto-format" alt="&#77;" title="Rendered by QuickLaTeX.com" height="12" width="19" style="vertical-align: 0px;" /> and <img src="https://marctorrellas.com/wp-content/ql-cache/quicklatex.com-b760ebc707e08dd6e1888ea8da4c2454_l3.png" class="ql-img-inline-formula quicklatex-auto-format" alt="&#75;" title="Rendered by QuickLaTeX.com" height="12" width="16" style="vertical-align: 0px;" />.
</p>

<img class="size-medium wp-image-156 aligncenter" src="https://marctorrellas.com/wp-content/uploads/2016/11/2MAC-300x89.png" alt="" width="300" height="89" srcset="https://marctorrellas.com/wp-content/uploads/2016/11/2MAC-300x89.png 300w, https://marctorrellas.com/wp-content/uploads/2016/11/2MAC-768x228.png 768w, https://marctorrellas.com/wp-content/uploads/2016/11/2MAC.png 1012w" sizes="(max-width: 300px) 100vw, 300px" />

<h3 style="text-align: center;">
  <span style="font-size: 10pt;">Fig.2. The two-user multiple-access channel (MAC)</span>
</h3>

### **Zero-forcing**

<p style="text-align: justify;">
  The dual case of the broadcast channel is the multiple-access channel (MAC), where there are <img src="https://marctorrellas.com/wp-content/ql-cache/quicklatex.com-b760ebc707e08dd6e1888ea8da4c2454_l3.png" class="ql-img-inline-formula quicklatex-auto-format" alt="&#75;" title="Rendered by QuickLaTeX.com" height="12" width="16" style="vertical-align: 0px;" /> transmitters, and a single receiver, see Fig. 2. Consider the case where the receiver is equipped with <img src="https://marctorrellas.com/wp-content/ql-cache/quicklatex.com-e3415a95888e7ebf9eb102d650e81702_l3.png" class="ql-img-inline-formula quicklatex-auto-format" alt="&#77;&#61;&#75;" title="Rendered by QuickLaTeX.com" height="12" width="59" style="vertical-align: 0px;" /> antennas, i.e. as antennas as users, and transmitters are single-antenna. Then, similarly to the null steering idea, the receiver may filter out the directions the interference comes from, by processing the received signal with a linear filter <img src="https://marctorrellas.com/wp-content/ql-cache/quicklatex.com-4676a0b2ed44a93819ce563dbf9d0944_l3.png" class="ql-img-inline-formula quicklatex-auto-format" alt="&#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#119;&#125;&#95;&#105;" title="Rendered by QuickLaTeX.com" height="12" width="20" style="vertical-align: -3px;" />. Such approach is usually denoted as Zero-Forcing (ZF), and this is the reason why Null Steering may also be denoted as Zero Forcing at the transmitter.
</p>

<p style="text-align: justify;">
  Given the idea, let&#8217;s see how this translates to maths. Assuming that <img src="https://marctorrellas.com/wp-content/ql-cache/quicklatex.com-4676a0b2ed44a93819ce563dbf9d0944_l3.png" class="ql-img-inline-formula quicklatex-auto-format" alt="&#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#119;&#125;&#95;&#105;" title="Rendered by QuickLaTeX.com" height="12" width="20" style="vertical-align: -3px;" /> is used to decode <img src="https://marctorrellas.com/wp-content/ql-cache/quicklatex.com-00fcdab0346c01a638ca045594942fb6_l3.png" class="ql-img-inline-formula quicklatex-auto-format" alt="&#120;&#95;&#105;" title="Rendered by QuickLaTeX.com" height="11" width="15" style="vertical-align: -3px;" />, for the <img src="https://marctorrellas.com/wp-content/ql-cache/quicklatex.com-9c3dce8a94a2d6e145b93bb717d7bfa0_l3.png" class="ql-img-inline-formula quicklatex-auto-format" alt="&#75;&#61;&#77;&#61;&#50;" title="Rendered by QuickLaTeX.com" height="12" width="91" style="vertical-align: 0px;" /> case the processed signal is given by:
</p>

<p style="text-align: justify;">
  <p class="ql-center-displayed-equation" style="line-height: 21px;">
    <span class="ql-right-eqno"> (5) </span><span class="ql-left-eqno"> &nbsp; </span><img src="https://marctorrellas.com/wp-content/ql-cache/quicklatex.com-e639a4aaacb3a605b637751d01d22a2a_l3.png" height="21" width="213" class="ql-img-displayed-equation quicklatex-auto-format" alt="&#92;&#98;&#101;&#103;&#105;&#110;&#123;&#101;&#113;&#117;&#97;&#116;&#105;&#111;&#110;&#42;&#125;&#32;&#123;&#122;&#125;&#95;&#105;&#32;&#61;&#32;&#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#119;&#125;&#94;&#84;&#95;&#105;&#32;&#92;&#108;&#101;&#102;&#116;&#40;&#32;&#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#104;&#125;&#95;&#49;&#32;&#120;&#95;&#49;&#32;&#43;&#32;&#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#104;&#125;&#95;&#50;&#32;&#120;&#95;&#50;&#32;&#43;&#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#110;&#125;&#95;&#105;&#32;&#92;&#114;&#105;&#103;&#104;&#116;&#41;&#32;&#36;&#32;&#32;&#32;&#92;&#101;&#110;&#100;&#123;&#101;&#113;&#117;&#97;&#116;&#105;&#111;&#110;&#42;&#125;" title="Rendered by QuickLaTeX.com" />
  </p>
</p>

<p style="text-align: justify;">
  where channels are now 2&#215;1 (2 antennas at the receiver, 1 antenna at each transmitter), and precoding vectors have been omitted since with only one antenna we cannot give direction to the transmitted signals. According to the above equation, we force the following set of constraints:
</p>

<p style="text-align: justify;">
  <p class="ql-center-displayed-equation" style="line-height: 43px;">
    <span class="ql-right-eqno"> (6) </span><span class="ql-left-eqno"> &nbsp; </span><img src="https://marctorrellas.com/wp-content/ql-cache/quicklatex.com-a9a4dd42ad62db0dc65828fe42194140_l3.png" height="43" width="78" class="ql-img-displayed-equation quicklatex-auto-format" alt="&#92;&#98;&#101;&#103;&#105;&#110;&#123;&#101;&#113;&#117;&#97;&#116;&#105;&#111;&#110;&#42;&#125;&#32;&#92;&#98;&#101;&#103;&#105;&#110;&#123;&#109;&#97;&#116;&#114;&#105;&#120;&#125;&#32;&#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#119;&#125;&#94;&#84;&#95;&#49;&#32;&#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#104;&#125;&#95;&#50;&#32;&#61;&#32;&#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#48;&#125;&#32;&#92;&#92;&#32;&#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#119;&#125;&#94;&#84;&#95;&#50;&#32;&#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#104;&#125;&#95;&#49;&#32;&#61;&#32;&#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#48;&#125;&#32;&#92;&#101;&#110;&#100;&#123;&#109;&#97;&#116;&#114;&#105;&#120;&#125;&#92;&#101;&#110;&#100;&#123;&#101;&#113;&#117;&#97;&#116;&#105;&#111;&#110;&#42;&#125;" title="Rendered by QuickLaTeX.com" />
  </p>
</p>

<p style="text-align: justify;">
  such that all the interference is removed when decoding each signal. To do so, the rows of the receiving filter (in this case only one since we are decoding a single message) should be contained on the left null space of the channels, similarly to the case of null steering explained above. A generalization to the case of general <img src="https://marctorrellas.com/wp-content/ql-cache/quicklatex.com-f14690ce7d5e650372f8e91fb634b128_l3.png" class="ql-img-inline-formula quicklatex-auto-format" alt="&#75;&#61;&#77;" title="Rendered by QuickLaTeX.com" height="12" width="59" style="vertical-align: 0px;" /> users is straightforward following the same approach as for null steering.
</p>

**Degrees of Freedom**

During this post I have talked about efficiency, referring to what rigorously is denoted as the \textit{degrees of freedom} (DoF) of the channel. I&#8217;m not going to explain in detail this concept, because I think it&#8217;s the less interesting part for common people who don&#8217;t have passion for maths.

To put it simply, think about the DoF as the number of messages that can be transmitted per time unit, received without interference. For each scenario (topology, number of users, and distribution of antennas), there is a value which is the optimal. This means that it&#8217;s not feasible to obtain more than this. I will refer to this as the \textit{optimal} DoF, or just the \textit{DoF of the channel}.

In addition to this, based on (usually) complicated Information Theory tools, it is possible to bound the DoF of the channel, such that we know that more than this is not possible to achieve. This is known as DoF \textit{upper bound} or \textit{outer bound}.

Finally, for each proposed transmission technique we can analyze how many DoF are achieved, leading to a DoF \textit{inner bound}. Therefore, the only way to derive the DoF of the channel is to find the DoF of the channel is to find a DoF inner bound coinciding with a DoF upper bound.

### **Conclusion**

In this first post, we have seen the ideas of zero forcing and null steering. In short, the idea in the former is to make use of multiple antennas to transmit in such a way that no interference is generated to other users. Likewise, for the latter all signals received through directions corresponding to other users&#8217; channels are filtered out. Both techniques are formulated in mathematical terms by referring to the concept of _null space_ of a matrix.

Finally, I have explained the concept of Degrees of Freedom, used to explain the efficiency of a technique in terms of transmission rate. For the two scenarios explained in this post, BC and MAC, the two techniques explained are sufficient to attain the DoF of the channel for any number of users and antennas. The problems arise when we consider other topologies, such as the Interference Channel, and here is where Interference Alignment comes to the rescue.

I hope to you enjoyed these concepts as much as I do, and still want to continue in this journey through my research days in academia. If so, go to my next post dedicated on the [Interference Alignment](https://marctorrellas.com/interference-alignment/) concept. Comments and likes more than welcome!

&nbsp;

<div id="wp-ulike-post-162" class="wpulike wpulike-default " >
  <div class="wp_ulike_general_class wp_ulike_is_unliked">
    <a data-ulike-id="162" data-ulike-nonce="f199d2e9c3" data-ulike-type="likeThis" data-ulike-status="3" class="wp_ulike_btn wp_ulike_put_image"> </a> <span class="count-box"></span>
  </div>
</div>