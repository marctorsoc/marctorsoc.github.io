---
title: Interference Alignment
layout: single
author_profile: true
date: 2017-05-30T16:04:03+00:00
comments: true
permalink: /posts/interference-alignment/
categories:
  - Academia
---
In the [last blog post](https://marctorrellas.com/background/), I explained the concept of Zero Forcing, either at the transmitter (also known as null steering) or the receiver. Mathematically, it is based on computing the null space of some matrix, whose existence (for completely random entries as in this case) depends on the dimensions of that matrix. In turn, the matrix dimensions depend on the number of antennas at the transmitter and the receiver. Therefore, Zero Forcing will only be feasible for antenna settings where the corresponding null space exists. Otherwise, other approaches may be used:

  * Use less antennas at the transmitter or the receiver. Obviously, this is usually non-optimal.
  * Time-sharing: use a [round-robin](https://en.wikipedia.org/wiki/Round-robin) scheme to alleviate the number of users to be removed per round

For the Broadcast and Multiple Access channels introduced in the last post, the tools we have reviewed so far are enough to obtain the optimal degrees of freedom. However, there exist other scenarios where this is not always true, and it is when **Interference Alignment (IA) **gives us the opportunity to attain (or at least approach to) the channel DoF.

**Interference Channel**

Let&#8217;s then review this scenario, since it is the first one where IA was shown to provide a boost in the DoF.

<p style="text-align: center;">
  <a href="/content/2017/09/IC.png"><img class="alignnone wp-image-309" src="/content/2017/09/IC.png" alt="" width="350" height="186" srcset="/content/2017/09/IC.png 451w, /content/2017/09/IC-300x160.png 300w" sizes="(max-width: 350px) 100vw, 350px" /></a>
</p>

Now there are <img src="/wp-content/ql-cache/quicklatex.com-b760ebc707e08dd6e1888ea8da4c2454_l3.png" class="ql-img-inline-formula quicklatex-auto-format" alt="&#75;" title="Rendered by QuickLaTeX.com" height="12" width="16" style="vertical-align: 0px;" /> transmitter-receivers, who only communicate with each other, so they receive interference containing messages intended to other users. They can be equipped with multiple antennas and then apply linear transformations via precoding and receiving filter as shown for null-steering and zero-forcing techniques.

**Results**

Surprisingly, the IA approach shows that considering an arbitrary number of pairs of users  <img src="/wp-content/ql-cache/quicklatex.com-b760ebc707e08dd6e1888ea8da4c2454_l3.png" class="ql-img-inline-formula quicklatex-auto-format" alt="&#75;" title="Rendered by QuickLaTeX.com" height="12" width="16" style="vertical-align: 0px;" />with the same number of antennas  <img src="/wp-content/ql-cache/quicklatex.com-316287c6f5fadf7cd4af9475c28d18d1_l3.png" class="ql-img-inline-formula quicklatex-auto-format" alt="&#77;" title="Rendered by QuickLaTeX.com" height="12" width="19" style="vertical-align: 0px;" />at transmitters and receivers, the DoF sum is <img src="/wp-content/ql-cache/quicklatex.com-dac9764e172333a891b769b0f550b6ce_l3.png" class="ql-img-inline-formula quicklatex-auto-format" alt="&#75;&#77;&#47;&#50;" title="Rendered by QuickLaTeX.com" height="18" width="51" style="vertical-align: -5px;" />. This means that independently of the number of users, we can achieve the same performance per user!

**Ok, nice&#8230;but how?**

I&#8217;m going to explain the simplest scenario where IA can be applied, in which there are 3 users, each node is equipped with 2 antennas, and every user will be able to transmit one message.

If you are interested, it&#8217;s interesting to see that with ZF concepts we cannot achieve more than 2 DoF, by turning off one of the pairs, and one receiving antenna per user. However, neglecting resources is not usually a good idea.

Let&#8217;s assume that each transmitter  <img src="/wp-content/ql-cache/quicklatex.com-8511b1f6cf9db17d46ddabb67bac99f5_l3.png" class="ql-img-inline-formula quicklatex-auto-format" alt="&#105;" title="Rendered by QuickLaTeX.com" height="12" width="6" style="vertical-align: 0px;" />uses a 2&#215;1 precoding vector  <img src="/wp-content/ql-cache/quicklatex.com-26a62ea405d164d914a162c6fc197300_l3.png" class="ql-img-inline-formula quicklatex-auto-format" alt="&#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#118;&#125;&#95;&#105;" title="Rendered by QuickLaTeX.com" height="12" width="16" style="vertical-align: -3px;" />to transmit the symbol <img src="/wp-content/ql-cache/quicklatex.com-93518ff4640ca3b07a808137037206b7_l3.png" class="ql-img-inline-formula quicklatex-auto-format" alt="&#123;&#120;&#95;&#105;&#125;" title="Rendered by QuickLaTeX.com" height="11" width="15" style="vertical-align: -3px;" />. Then, the signal obtained at receiver  <img src="/wp-content/ql-cache/quicklatex.com-9565fa6c9b8cbe9c2d2a57f38bbf9670_l3.png" class="ql-img-inline-formula quicklatex-auto-format" alt="&#106;" title="Rendered by QuickLaTeX.com" height="16" width="9" style="vertical-align: -4px;" />can be written as:

<p align="center">
  <p class="ql-center-displayed-equation" style="line-height: 18px;">
    <span class="ql-right-eqno"> (1) </span><span class="ql-left-eqno"> &nbsp; </span><img src="/wp-content/ql-cache/quicklatex.com-54e05f94699dec5cf9ec26de027bc941_l3.png" height="18" width="319" class="ql-img-displayed-equation quicklatex-auto-format" alt="&#92;&#98;&#101;&#103;&#105;&#110;&#123;&#97;&#108;&#105;&#103;&#110;&#42;&#125;&#32;&#92;&#100;&#105;&#115;&#112;&#108;&#97;&#121;&#115;&#116;&#121;&#108;&#101;&#32;&#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#121;&#125;&#95;&#105;&#32;&#61; &#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#72;&#125;&#95;&#123;&#106;&#49;&#125;&#32;&#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#118;&#125;&#95;&#49;&#32;&#120;&#95;&#49;&#32;&#43; &#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#72;&#125;&#95;&#123;&#106;&#50;&#125;&#32;&#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#118;&#125;&#95;&#50;&#32;&#120;&#95;&#50;&#32;&#43; &#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#72;&#125;&#95;&#123;&#106;&#51;&#125;&#32;&#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#118;&#125;&#95;&#51;&#32;&#120;&#95;&#51; &#43;&#32;&#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#110;&#125;&#95;&#105;&#32;&#32;&#32;&#92;&#101;&#110;&#100;&#123;&#97;&#108;&#105;&#103;&#110;&#42;&#125;" title="Rendered by QuickLaTeX.com" />
  </p>
</p>

where  <img src="/wp-content/ql-cache/quicklatex.com-8787bc85d5d457b3e30f9dad92bdd68c_l3.png" class="ql-img-inline-formula quicklatex-auto-format" alt="&#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#72;&#125;&#95;&#123;&#106;&#105;&#125;" title="Rendered by QuickLaTeX.com" height="19" width="27" style="vertical-align: -6px;" />is the 2&#215;2 matrix whose entries are channel gains from each antenna of transmitter  <img src="/wp-content/ql-cache/quicklatex.com-8511b1f6cf9db17d46ddabb67bac99f5_l3.png" class="ql-img-inline-formula quicklatex-auto-format" alt="&#105;" title="Rendered by QuickLaTeX.com" height="12" width="6" style="vertical-align: 0px;" />to receiver <img src="/wp-content/ql-cache/quicklatex.com-9565fa6c9b8cbe9c2d2a57f38bbf9670_l3.png" class="ql-img-inline-formula quicklatex-auto-format" alt="&#106;" title="Rendered by QuickLaTeX.com" height="16" width="9" style="vertical-align: -4px;" />, and  <img src="/wp-content/ql-cache/quicklatex.com-2b3a6fc80b9e76924d7e7ca24349eef5_l3.png" class="ql-img-inline-formula quicklatex-auto-format" alt="&#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#110;&#125;&#95;&#105;" title="Rendered by QuickLaTeX.com" height="11" width="16" style="vertical-align: -3px;" />is the noise term.

Let&#8217;s consider that the values for the precoding vectors are randomly chosen. Then we would have the following situation:

[<img class="wp-image-317 aligncenter" src="/content/2017/09/IA_random.png" alt="" width="357" height="291" srcset="/content/2017/09/IA_random.png 761w, /content/2017/09/IA_random-300x245.png 300w" sizes="(max-width: 357px) 100vw, 357px" />](/content/2017/09/IA_random.png)

This is problematic, since we have to resolve 3 messages, but we only have 2 equations (one for each receiving antenna).

The interesting idea here is that we are not actually interesting in resolving all the messages at all the receivers, only one. Then, it&#8217;s not a problem for us if the two interference symbols are observed mixed. So, a let&#8217;s assume that there is a way to transmit the symbols such that they are received as follows:

[<img class="wp-image-318 aligncenter" src="/content/2017/09/IA_CJ.png" alt="" width="357" height="291" srcset="/content/2017/09/IA_CJ.png 761w, /content/2017/09/IA_CJ-300x245.png 300w" sizes="(max-width: 357px) 100vw, 357px" />](/content/2017/09/IA_CJ.png)

In this situation, we can resolve at each receiver the desired symbol, and also a combination of the interference, which is not interesting and we can just drop it. Intrinsically, we have been able to resolve the desired messages, thanks to the fact that the interference is \textit{aligned}. In other words, the two vectors representing the interference at each receiver, are collapsed to a subspace of one dimension, or a line. Since we have two dimensions to allocate 3 signals, compressing the two interference signals to one dimension leaves one dimension free to allocate the desired signal.

The mathematical formulation for IA in this case is as simple as

<p class="ql-center-displayed-equation" style="line-height: 70px;">
  <span class="ql-right-eqno"> (2) </span><span class="ql-left-eqno"> &nbsp; </span><img src="/wp-content/ql-cache/quicklatex.com-01d60bdfa7330274158d3361dbddec2c_l3.png" height="70" width="130" class="ql-img-displayed-equation quicklatex-auto-format" alt="&#92;&#98;&#101;&#103;&#105;&#110;&#123;&#97;&#108;&#105;&#103;&#110;&#42;&#125; &#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#72;&#125;&#95;&#123;&#49;&#50;&#125;&#32;&#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#86;&#125;&#95;&#50;&#32;&#61;&#32;&#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#72;&#125;&#95;&#123;&#49;&#51;&#125;&#32;&#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#86;&#125;&#95;&#51;&#32;&#92;&#92; &#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#72;&#125;&#95;&#123;&#50;&#49;&#125;&#32;&#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#86;&#125;&#95;&#49;&#32;&#61;&#32;&#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#72;&#125;&#95;&#123;&#50;&#51;&#125;&#32;&#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#86;&#125;&#95;&#51;&#32;&#92;&#92; &#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#72;&#125;&#95;&#123;&#51;&#49;&#125;&#32;&#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#86;&#125;&#95;&#49;&#32;&#61;&#32;&#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#72;&#125;&#95;&#123;&#51;&#50;&#125;&#32;&#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#86;&#125;&#95;&#50;&#32;&#32;&#32;&#92;&#101;&#110;&#100;&#123;&#97;&#108;&#105;&#103;&#110;&#42;&#125;" title="Rendered by QuickLaTeX.com" />
</p>

but in general would be

<p class="ql-center-displayed-equation" style="line-height: 71px;">
  <span class="ql-right-eqno"> (3) </span><span class="ql-left-eqno"> &nbsp; </span><img src="/wp-content/ql-cache/quicklatex.com-c3615d597e27f4721fa3e83e75336b88_l3.png" height="71" width="231" class="ql-img-displayed-equation quicklatex-auto-format" alt="&#92;&#98;&#101;&#103;&#105;&#110;&#123;&#97;&#108;&#105;&#103;&#110;&#42;&#125; &#92;&#109;&#97;&#116;&#104;&#115;&#102;&#123;&#115;&#112;&#97;&#110;&#125;&#32;&#92;&#108;&#101;&#102;&#116;&#40;&#32;&#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#72;&#125;&#95;&#123;&#49;&#50;&#125;&#32;&#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#86;&#125;&#95;&#50;&#32;&#92;&#114;&#105;&#103;&#104;&#116;&#41;&#32;&#61; &#92;&#109;&#97;&#116;&#104;&#115;&#102;&#123;&#115;&#112;&#97;&#110;&#125;&#32;&#92;&#108;&#101;&#102;&#116;&#40;&#32;&#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#72;&#125;&#95;&#123;&#49;&#51;&#125;&#32;&#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#86;&#125;&#95;&#51;&#32;&#92;&#114;&#105;&#103;&#104;&#116;&#41;&#32;&#92;&#92; &#92;&#109;&#97;&#116;&#104;&#115;&#102;&#123;&#115;&#112;&#97;&#110;&#125;&#32;&#92;&#108;&#101;&#102;&#116;&#40;&#32;&#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#72;&#125;&#95;&#123;&#50;&#49;&#125;&#32;&#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#86;&#125;&#95;&#49;&#92;&#114;&#105;&#103;&#104;&#116;&#41;&#32;&#61; &#92;&#109;&#97;&#116;&#104;&#115;&#102;&#123;&#115;&#112;&#97;&#110;&#125;&#32;&#92;&#108;&#101;&#102;&#116;&#40;&#32;&#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#72;&#125;&#95;&#123;&#50;&#51;&#125;&#32;&#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#86;&#125;&#95;&#51;&#92;&#114;&#105;&#103;&#104;&#116;&#41;&#32;&#92;&#92; &#92;&#109;&#97;&#116;&#104;&#115;&#102;&#123;&#115;&#112;&#97;&#110;&#125;&#32;&#92;&#108;&#101;&#102;&#116;&#40;&#32;&#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#72;&#125;&#95;&#123;&#51;&#49;&#125;&#32;&#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#86;&#125;&#95;&#49;&#32;&#61; &#92;&#109;&#97;&#116;&#104;&#115;&#102;&#123;&#115;&#112;&#97;&#110;&#125;&#32;&#92;&#108;&#101;&#102;&#116;&#40;&#32;&#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#72;&#125;&#95;&#123;&#51;&#50;&#125;&#32;&#92;&#109;&#97;&#116;&#104;&#98;&#102;&#123;&#86;&#125;&#95;&#50;&#32;&#92;&#114;&#105;&#103;&#104;&#116;&#41;&#32;&#32;&#92;&#101;&#110;&#100;&#123;&#97;&#108;&#105;&#103;&#110;&#42;&#125;" title="Rendered by QuickLaTeX.com" />
</p>

where  <img src="/wp-content/ql-cache/quicklatex.com-36d405c32fc33579a09685f842c6c454_l3.png" class="ql-img-inline-formula quicklatex-auto-format" alt="&#92;&#109;&#97;&#116;&#104;&#115;&#102;&#123;&#115;&#112;&#97;&#110;&#125;" title="Rendered by QuickLaTeX.com" height="11" width="33" style="vertical-align: -3px;" />refers to the subspace generated, so we actually only need that the subspace generated is the same, but it&#8217;s easier  to equate the operands to find a closed-form solution. Since the objective of these posts is to see the main ideas and concepts behind my research in academia, I&#8217;m not going to enter into mathematical details, and I refer you to my [thesis](/content/2016/11/marcPhd.pdf) and the original [paper](https://arxiv.org/abs/0707.0323) by Cadambe and Jafar.

**Conclusion**

In this post I have introduced the idea of Interference Alignment, as a way of looking at the wireless transmissions from a different perspective. The main idea is that we need to reduce the number of variables to resolve the equations we have, and consequently obtain the desired variables. In our case the equations are observations at each receiving antenna, and the variables are the messages transmitted to the different users. To reduce variables, we transmit the signals in such a way the interference is mixed (aligned) at the receivers, thus releasing enough spatial dimensions for desired signals to be resolved without interference.

While this has been a very introductory description of Interference Alignment, I think that it&#8217;s enough to catch the concept, and could motivate you to continue this journey in the study of wireless communications. After 10 years, there are still many research papers using IA, and many questions still to be answered in the research community where IA could have a principal role.

IA as explained here was the main topic in my Master thesis. However, it is assumed that we know the channels perfect and instantaneously, which is something not really realistic, specially in scenarios where the terminals are moving, e.g. travelling in a train. In the next posts I will explain how this concept can be applied to the case where we have delayed information of the channel, which is the door to understand a bit more about my Phd thesis. Likes and comments welcome!

<div id="wp-ulike-post-205" class="wpulike wpulike-default " >
  <div class="wp_ulike_general_class wp_ulike_is_unliked">
    <a data-ulike-id="205" data-ulike-nonce="50fa6c3ce2" data-ulike-type="likeThis" data-ulike-status="3" class="wp_ulike_btn wp_ulike_put_image"> </a> <span class="count-box"></span>
  </div>
</div>
