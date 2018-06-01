---
title: PDF of the sum of independent random variables
layout: single
author_profile: true
date: 2017-12-17T01:02:19+00:00
comments: true
permalink: /pdf-of-the-sum-of-independent-random-variables/
categories:
  - Divulgation
---
<p style="text-align: justify;">
  Today I review a result that I&#8217;m gonna use in other posts, e.g. the <span style="font-size: 8pt;"><a href="https://marctorrellas.com/the-survivor-frog/"><em><span style="font-size: 12pt;">survivor frog problem</span></em></a><strong>.</strong></span> Also, it can be useful for you to solve mathematical problems, or to remember a simple but elegant proof. I&#8217;ll give a simple but intuitive proof for the derivation of the <a href="https://en.wikipedia.org/wiki/Probability_density_function">probability density function</a> (pdf) of the sum of independent random variables.
</p>

Imagine you have two random variables:

<p class="ql-center-displayed-equation" style="line-height: 44px;">
  <span class="ql-right-eqno"> (1) </span><span class="ql-left-eqno"> &nbsp; </span><img src="/wp-content/ql-cache/quicklatex.com-9acd5563b0a1379d4fa24b168d1b3b7a_l3.png" height="44" width="79" class="ql-img-displayed-equation quicklatex-auto-format" alt="&#92;&#98;&#101;&#103;&#105;&#110;&#123;&#97;&#108;&#105;&#103;&#110;&#42;&#125;&#88;&#32;&#92;&#115;&#105;&#109;&#38;&#32;&#102;&#95;&#88;&#40;&#120;&#41;&#32;&#92;&#92;&#32;&#89;&#32;&#92;&#115;&#105;&#109;&#38;&#32;&#102;&#95;&#89;&#40;&#121;&#41;&#32;&#92;&#101;&#110;&#100;&#123;&#97;&#108;&#105;&#103;&#110;&#42;&#125;" title="Rendered by QuickLaTeX.com" />
</p>

<p style="text-align: justify;">
  This notation denotes that each random variable follows a different probability distribution. We will assume that these two variables are independent, and our purpose is to compute the pdf of its sum <img src="/wp-content/ql-cache/quicklatex.com-7e3a6e078392ca7a17a7a92efd1303a2_l3.png" class="ql-img-inline-formula quicklatex-auto-format" alt="&#90;&#32;&#61;&#32;&#88;&#43;&#89;" title="Rendered by QuickLaTeX.com" height="14" width="88" style="vertical-align: -2px;" />. To do so, I will start from the <a href="https://en.wikipedia.org/wiki/Cumulative_distribution_function">cumulative distribution function</a> (cdf):
</p>

<p class="ql-center-displayed-equation" style="line-height: 147px;">
  <span class="ql-right-eqno"> (2) </span><span class="ql-left-eqno"> &nbsp; </span><img src="/wp-content/ql-cache/quicklatex.com-fc5b9120bff4c772f218bd0fc003e65c_l3.png" height="147" width="370" class="ql-img-displayed-equation quicklatex-auto-format" alt="&#92;&#98;&#101;&#103;&#105;&#110;&#123;&#97;&#108;&#105;&#103;&#110;&#42;&#125; &#70;&#95;&#90;&#40;&#122;&#41;&#32;&#38;&#61;&#32;&#92;&#116;&#101;&#120;&#116;&#123;&#80;&#114;&#111;&#98;&#125;&#92;&#108;&#101;&#102;&#116;&#40;&#32;&#90;&#32;&#92;&#108;&#101;&#32;&#122;&#32;&#92;&#114;&#105;&#103;&#104;&#116;&#41;&#32;&#32;&#32;&#92;&#92; &#38;&#61;&#92;&#116;&#101;&#120;&#116;&#123;&#80;&#114;&#111;&#98;&#125;&#92;&#108;&#101;&#102;&#116;&#40;&#32;&#88;&#43;&#89;&#32;&#92;&#108;&#101;&#32;&#122;&#32;&#92;&#114;&#105;&#103;&#104;&#116;&#41;&#32;&#61;&#32;&#92;&#116;&#101;&#120;&#116;&#123;&#80;&#114;&#111;&#98;&#125;&#92;&#108;&#101;&#102;&#116;&#40;&#32;&#89;&#32;&#92;&#108;&#101;&#32;&#122;&#32;&#45;&#32;&#88;&#32;&#92;&#114;&#105;&#103;&#104;&#116;&#41;&#32;&#92;&#92; &#38;&#61;&#32;&#92;&#105;&#110;&#116;&#95;&#123;&#45;&#92;&#105;&#110;&#102;&#116;&#121;&#125;&#94;&#123;&#92;&#105;&#110;&#102;&#116;&#121;&#125;&#32;&#92;&#33;&#92;&#33;&#92;&#33;&#92;&#33;&#92;&#33;&#32;&#92;&#112;&#97;&#114;&#116;&#105;&#97;&#108;&#32;&#120;&#32;&#92;&#105;&#110;&#116;&#95;&#123;&#45;&#92;&#105;&#110;&#102;&#116;&#121;&#125;&#94;&#123;&#122;&#32;&#45;&#32;&#120;&#125;&#32;&#92;&#33;&#92;&#33;&#92;&#33;&#92;&#33;&#92;&#33;&#32;&#102;&#95;&#123;&#88;&#89;&#125;&#40;&#120;&#44;&#121;&#41;&#32;&#92;&#112;&#97;&#114;&#116;&#105;&#97;&#108;&#32;&#121;&#32;&#92;&#92; &#38;&#61;&#32;&#92;&#105;&#110;&#116;&#95;&#123;&#45;&#92;&#105;&#110;&#102;&#116;&#121;&#125;&#94;&#123;&#92;&#105;&#110;&#102;&#116;&#121;&#125;&#32;&#92;&#33;&#92;&#33;&#92;&#33;&#92;&#33;&#92;&#33;&#32;&#102;&#95;&#123;&#88;&#125;&#40;&#120;&#41;&#32;&#92;&#112;&#97;&#114;&#116;&#105;&#97;&#108;&#32;&#120;&#32;&#92;&#105;&#110;&#116;&#95;&#123;&#45;&#92;&#105;&#110;&#102;&#116;&#121;&#125;&#94;&#123;&#122;&#32;&#45;&#32;&#120;&#125;&#32;&#92;&#33;&#92;&#33;&#92;&#33;&#92;&#33;&#92;&#33;&#32;&#102;&#95;&#123;&#89;&#125;&#40;&#121;&#41;&#32;&#92;&#112;&#97;&#114;&#116;&#105;&#97;&#108;&#32;&#121; &#92;&#101;&#110;&#100;&#123;&#97;&#108;&#105;&#103;&#110;&#42;&#125;" title="Rendered by QuickLaTeX.com" />
</p>

<p style="text-align: justify;">
  Now, we want to compute the pdf, i.e. the derivative of the cdf. Some people will freak out here, since we have to derive an integral. No worries, fortunately we have the <a href="https://en.wikipedia.org/wiki/Leibniz_integral_rule">Leibniz rule</a>, coming into play:
</p>

<p class="ql-center-displayed-equation" style="line-height: 41px;">
  <span class="ql-right-eqno"> (3) </span><span class="ql-left-eqno"> &nbsp; </span><img src="/wp-content/ql-cache/quicklatex.com-3ba42a755e14660a35f30bfb9135cbf8_l3.png" height="41" width="451" class="ql-img-displayed-equation quicklatex-auto-format" alt="&#92;&#98;&#101;&#103;&#105;&#110;&#123;&#97;&#108;&#105;&#103;&#110;&#42;&#125; &#102;&#95;&#123;&#90;&#125;&#40;&#122;&#41;&#32;&#61;&#32;&#92;&#102;&#114;&#97;&#99;&#123;&#92;&#112;&#97;&#114;&#116;&#105;&#97;&#108;&#125;&#123;&#92;&#112;&#97;&#114;&#116;&#105;&#97;&#108;&#32;&#122;&#125;&#32;&#70;&#95;&#90;&#40;&#122;&#41;&#32;&#61;&#32;&#92;&#105;&#110;&#116;&#95;&#123;&#45;&#92;&#105;&#110;&#102;&#116;&#121;&#125;&#94;&#123;&#92;&#105;&#110;&#102;&#116;&#121;&#125;&#32;&#92;&#33;&#92;&#33;&#92;&#33;&#92;&#33;&#92;&#33;&#32;&#102;&#95;&#123;&#88;&#125;&#40;&#120;&#41;&#32;&#102;&#95;&#123;&#89;&#125;&#40;&#122;&#45;&#120;&#41;&#32;&#92;&#112;&#97;&#114;&#116;&#105;&#97;&#108;&#32;&#120;&#32;&#61;&#32;&#102;&#95;&#123;&#88;&#125;&#40;&#122;&#41;&#32;&#42;&#32;&#102;&#95;&#123;&#89;&#125;&#40;&#122;&#41; &#92;&#101;&#110;&#100;&#123;&#97;&#108;&#105;&#103;&#110;&#42;&#125;" title="Rendered by QuickLaTeX.com" />
</p>

<p style="text-align: justify;">
  For those not familiar, the operator <img src="/wp-content/ql-cache/quicklatex.com-55ccbd1f971fb555b3e2cbf1d77f1dba_l3.png" class="ql-img-inline-formula quicklatex-auto-format" alt="&#42;" title="Rendered by QuickLaTeX.com" height="9" width="7" style="vertical-align: 0px;" /> is extensively used as the <a href="https://en.wikipedia.org/wiki/Convolution">convolution</a>. This operation is quite important in signal processing, since the output of <a href="https://en.wikipedia.org/wiki/Linear_time-invariant_theory">linear system</a> is the convolution of the output by the impulse response of the system, and it becomes the product in case of working in the frequency domain (after Fourier transforms). So, to conclude, the result can be read as follows:
</p>

<p style="text-align: center;">
  &#8220;<em>The pdf of the sum of two independent random variables is given by the<br /> convolution of the two pdf&#8217;s of those variables&#8221;</em>
</p>

<p style="text-align: justify;">
  And that&#8217;s it, folks! If you enjoyed this (short) post please like, and in case of any suggestion, do not hesitate to comment!
</p>

<div id="wp-ulike-post-343" class="wpulike wpulike-default " >
  <div class="wp_ulike_general_class wp_ulike_is_unliked">
    <a data-ulike-id="343" data-ulike-nonce="b769cf0835" data-ulike-type="likeThis" data-ulike-status="3" class="wp_ulike_btn wp_ulike_put_image"> </a> <span class="count-box"></span>
  </div>
</div>
