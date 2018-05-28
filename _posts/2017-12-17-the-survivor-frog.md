---
id: 356
title: The survivor frog
date: 2017-12-17T02:10:45+00:00
author: admin_mtorrellas
layout: post
guid: https://marctorrellas.com/?p=356
permalink: /the-survivor-frog/
dojodigital_toggle_title:
  - 'on'
categories:
  - Teaching
---
<p style="text-align: justify;">
  In this maths puzzle, a frog is trying to escape from [introduce your preferred evil force]. In an attempt to catch the frog, a trap is positioned occupying <img src="https://marctorrellas.com/wp-content/ql-cache/quicklatex.com-87e51820566742debbba4bf080ec9804_l3.png" class="ql-img-inline-formula quicklatex-auto-format" alt="&#120;&#32;&#92;&#105;&#110;&#32;&#40;&#112;&#44;&#49;&#41;" title="Rendered by QuickLaTeX.com" height="18" width="70" style="vertical-align: -4px;" />, with the frog initially located at <img src="https://marctorrellas.com/wp-content/ql-cache/quicklatex.com-07c80c594c7f3571eed9d9a49ab9474d_l3.png" class="ql-img-inline-formula quicklatex-auto-format" alt="&#120;&#61;&#48;" title="Rendered by QuickLaTeX.com" height="12" width="43" style="vertical-align: 0px;" />, see figure.
</p>

[<img class=" wp-image-391 aligncenter" src="https://marctorrellas.com/wp-content/uploads/2017/12/amphibian-1295172_640.png" alt="" width="542" height="122" srcset="https://marctorrellas.com/wp-content/uploads/2017/12/amphibian-1295172_640.png 731w, https://marctorrellas.com/wp-content/uploads/2017/12/amphibian-1295172_640-300x68.png 300w" sizes="(max-width: 542px) 100vw, 542px" />](https://marctorrellas.com/wp-content/uploads/2017/12/amphibian-1295172_640.png)

<p style="text-align: justify;">
  ok, cheese is for mouses, not frogs, but was a really intuitive way of illustrating the scenario 🙂
</p>

<p style="text-align: justify;">
  We assume that our green friend jumps a distance <img src="https://marctorrellas.com/wp-content/ql-cache/quicklatex.com-1abd331f3ba89d291aa720d968c37dc3_l3.png" class="ql-img-inline-formula quicklatex-auto-format" alt="&#100;&#32;&#92;&#105;&#110;&#32;&#40;&#48;&#44;&#49;&#41;" title="Rendered by QuickLaTeX.com" height="18" width="70" style="vertical-align: -4px;" /> with uniform probability, and it jumps an infinite number of times unless it&#8217;s caught. Our mission here is to compute the <strong>probability of catching the frog</strong>.
</p>

### **Caught probability for one jump**

<p style="text-align: justify;">
  Using the fact that the jump size follows a distance uniform between 0 and 1, it is easy to see that:
</p>

<p class="ql-center-displayed-equation" style="line-height: 18px;">
  <span class="ql-right-eqno"> (1) </span><span class="ql-left-eqno"> &nbsp; </span><img src="https://marctorrellas.com/wp-content/ql-cache/quicklatex.com-8380750fb71c29c389131aaafce73f5d_l3.png" height="18" width="290" class="ql-img-displayed-equation quicklatex-auto-format" alt="&#92;&#98;&#101;&#103;&#105;&#110;&#123;&#97;&#108;&#105;&#103;&#110;&#42;&#125;&#32;&#92;&#116;&#101;&#120;&#116;&#123;&#80;&#114;&#111;&#98;&#125;&#40;&#92;&#116;&#101;&#120;&#116;&#123;&#99;&#97;&#117;&#103;&#104;&#116;&#125;&#32;&#124;&#32;&#120;&#32;&#61;&#32;&#116;&#41;&#32;&#61;&#32;&#49;&#32;&#45;&#32;&#112;&#44;&#32;&#92;&#113;&#117;&#97;&#100;&#32;&#92;&#102;&#111;&#114;&#97;&#108;&#108;&#32;&#116;&#32;&#92;&#108;&#101;&#32;&#112;&#46;&#32;&#92;&#101;&#110;&#100;&#123;&#97;&#108;&#105;&#103;&#110;&#42;&#125;" title="Rendered by QuickLaTeX.com" />
</p>

<p style="text-align: justify;">
  Consequently, if the frog is at position <img src="https://marctorrellas.com/wp-content/ql-cache/quicklatex.com-05dd9b552e9ee67c89e7e4ac69a22fd7_l3.png" class="ql-img-inline-formula quicklatex-auto-format" alt="&#120;&#32;&#92;&#108;&#101;&#113;&#32;&#112;" title="Rendered by QuickLaTeX.com" height="16" width="43" style="vertical-align: -4px;" />,  it does not matter where the frog is, the probability is always <img src="https://marctorrellas.com/wp-content/ql-cache/quicklatex.com-cc188c0109a787acc6ffc737d83c1b65_l3.png" class="ql-img-inline-formula quicklatex-auto-format" alt="&#49;&#45;&#112;" title="Rendered by QuickLaTeX.com" height="16" width="39" style="vertical-align: -4px;" />. Otherwise, the prob. is simply 0. This result will be quite useful next.
</p>

### **Divide jumps and conquer**

<p style="text-align: justify;">
  We can split the problem in many subproblems by considering the different jumps. Thus,  the probability of get caught starting from position <img src="https://marctorrellas.com/wp-content/ql-cache/quicklatex.com-07c80c594c7f3571eed9d9a49ab9474d_l3.png" class="ql-img-inline-formula quicklatex-auto-format" alt="&#120;&#61;&#48;" title="Rendered by QuickLaTeX.com" height="12" width="43" style="vertical-align: 0px;" /> can be written as follows:
</p>

<p class="ql-center-displayed-equation" style="line-height: 229px;">
  <span class="ql-right-eqno"> (2) </span><span class="ql-left-eqno"> &nbsp; </span><img src="https://marctorrellas.com/wp-content/ql-cache/quicklatex.com-524616f44c78e9fdbc80b4ee0204421c_l3.png" height="229" width="466" class="ql-img-displayed-equation quicklatex-auto-format" alt="&#92;&#98;&#101;&#103;&#105;&#110;&#123;&#97;&#108;&#105;&#103;&#110;&#42;&#125; &#92;&#116;&#101;&#120;&#116;&#123;&#80;&#114;&#111;&#98;&#125;&#40;&#92;&#116;&#101;&#120;&#116;&#123;&#99;&#97;&#117;&#103;&#104;&#116;&#125;&#32;&#124;&#32;&#120;&#32;&#61;&#32;&#48;&#41;&#32;&#38;&#61;&#32;&#92;&#116;&#101;&#120;&#116;&#123;&#80;&#114;&#111;&#98;&#125;&#40;&#92;&#116;&#101;&#120;&#116;&#123;&#99;&#97;&#117;&#103;&#104;&#116;&#32;&#49;&#115;&#116;&#32;&#106;&#117;&#109;&#112;&#125;&#32;&#124;&#32;&#120;&#32;&#61;&#32;&#48;&#41;&#32;&#32;&#92;&#92;&#32;&#38;&#43;&#32;&#32;&#92;&#116;&#101;&#120;&#116;&#123;&#80;&#114;&#111;&#98;&#125;&#40;&#92;&#116;&#101;&#120;&#116;&#123;&#99;&#97;&#117;&#103;&#104;&#116;&#32;&#50;&#110;&#100;&#32;&#106;&#117;&#109;&#112;&#125;&#32;&#124;&#32;&#120;&#32;&#61;&#32;&#48;&#41;&#32;&#43;&#32;&#92;&#108;&#100;&#111;&#116;&#115;&#32;&#92;&#92; &#38;&#61;&#32;&#92;&#115;&#117;&#109;&#95;&#123;&#105;&#61;&#48;&#125;&#94;&#123;&#92;&#105;&#110;&#102;&#116;&#121;&#125;&#32;&#92;&#116;&#101;&#120;&#116;&#123;&#80;&#114;&#111;&#98;&#125;&#32;&#92;&#108;&#101;&#102;&#116;&#40;&#92;&#116;&#101;&#120;&#116;&#123;&#99;&#97;&#117;&#103;&#104;&#116;&#32;&#36;&#110;&#36;&#116;&#104;&#32;&#106;&#117;&#109;&#112;&#125;&#32;&#124;&#32;&#120;&#32;&#61;&#32;&#48;&#32;&#92;&#114;&#105;&#103;&#104;&#116;&#41;&#32;&#32;&#92;&#92; &#38;&#61;&#32;&#92;&#115;&#117;&#109;&#95;&#123;&#105;&#61;&#48;&#125;&#94;&#123;&#92;&#105;&#110;&#102;&#116;&#121;&#125;&#32;&#92;&#116;&#101;&#120;&#116;&#123;&#80;&#114;&#111;&#98;&#125;&#32;&#92;&#108;&#101;&#102;&#116;&#40;&#92;&#115;&#117;&#109;&#95;&#123;&#105;&#61;&#49;&#125;&#94;&#123;&#110;&#45;&#49;&#125;&#32;&#115;&#95;&#105;&#32;&#92;&#108;&#101;&#32;&#112;&#32;&#32;&#92;&#99;&#97;&#112;&#32;&#92;&#115;&#117;&#109;&#95;&#123;&#105;&#61;&#49;&#125;&#94;&#123;&#110;&#125;&#32;&#115;&#95;&#105;&#32;&#92;&#105;&#110;&#32;&#40;&#112;&#44;&#49;&#41;&#32;&#92;&#114;&#105;&#103;&#104;&#116;&#41;&#32;&#92;&#92; &#38;&#61;&#32;&#40;&#49;&#45;&#112;&#41;&#32;&#92;&#115;&#117;&#109;&#95;&#123;&#105;&#61;&#48;&#125;&#94;&#123;&#92;&#105;&#110;&#102;&#116;&#121;&#125;&#32;&#92;&#116;&#101;&#120;&#116;&#123;&#80;&#114;&#111;&#98;&#125;&#92;&#108;&#101;&#102;&#116;&#40;&#92;&#115;&#117;&#109;&#95;&#123;&#105;&#61;&#49;&#125;&#94;&#123;&#110;&#45;&#49;&#125;&#32;&#115;&#95;&#105;&#32;&#92;&#108;&#101;&#32;&#112;&#32;&#92;&#114;&#105;&#103;&#104;&#116;&#41;&#46; &#92;&#101;&#110;&#100;&#123;&#97;&#108;&#105;&#103;&#110;&#42;&#125;" title="Rendered by QuickLaTeX.com" />
</p>

<p style="text-align: justify;">
  where <img src="https://marctorrellas.com/wp-content/ql-cache/quicklatex.com-45cc5ed26f6044b8593dd2fe2b9aa4f3_l3.png" class="ql-img-inline-formula quicklatex-auto-format" alt="&#115;&#95;&#105;" title="Rendered by QuickLaTeX.com" height="11" width="13" style="vertical-align: -3px;" /> is the <img src="https://marctorrellas.com/wp-content/ql-cache/quicklatex.com-8511b1f6cf9db17d46ddabb67bac99f5_l3.png" class="ql-img-inline-formula quicklatex-auto-format" alt="&#105;" title="Rendered by QuickLaTeX.com" height="12" width="6" style="vertical-align: 0px;" />th jump size. In words, the probability of get caught is the sum of probs for the 1st, 2nd, 3rd jump, and so on, and there is no intersection because the frog cannot get caught in two different jumps. The next step states that getting caught in the <img src="https://marctorrellas.com/wp-content/ql-cache/quicklatex.com-a63eb5ff0272d3119fa684be6e7acce8_l3.png" class="ql-img-inline-formula quicklatex-auto-format" alt="&#110;" title="Rendered by QuickLaTeX.com" height="8" width="11" style="vertical-align: 0px;" />th jump means that the frog is still before the threshold point <img src="https://marctorrellas.com/wp-content/ql-cache/quicklatex.com-413386df21cf1184e42c35b24fd570a3_l3.png" class="ql-img-inline-formula quicklatex-auto-format" alt="&#120;&#61;&#112;" title="Rendered by QuickLaTeX.com" height="12" width="43" style="vertical-align: -4px;" />, and it is caught in the trap exactly at the <img src="https://marctorrellas.com/wp-content/ql-cache/quicklatex.com-a63eb5ff0272d3119fa684be6e7acce8_l3.png" class="ql-img-inline-formula quicklatex-auto-format" alt="&#110;" title="Rendered by QuickLaTeX.com" height="8" width="11" style="vertical-align: 0px;" />th jump. Using the result in (1) we can finally simplify the expression.
</p>

### **Distribution of the sum of jumps**

<p style="text-align: justify;">
  In (2) we have concluded that everything just depends on the prob. of being at position <img src="https://marctorrellas.com/wp-content/ql-cache/quicklatex.com-cbbfec75422d70292e1e3546a91093e6_l3.png" class="ql-img-inline-formula quicklatex-auto-format" alt="&#120;&#32;&#92;&#108;&#101;&#32;&#112;" title="Rendered by QuickLaTeX.com" height="16" width="43" style="vertical-align: -4px;" /> after <img src="https://marctorrellas.com/wp-content/ql-cache/quicklatex.com-a63eb5ff0272d3119fa684be6e7acce8_l3.png" class="ql-img-inline-formula quicklatex-auto-format" alt="&#110;" title="Rendered by QuickLaTeX.com" height="8" width="11" style="vertical-align: 0px;" /> jumps. Hence, since all jumps have the same distribution, we face a problem involving the sum of <a href="https://en.wikipedia.org/wiki/Independent_and_identically_distributed_random_variables">i.i.d.</a> random variables. Indeed, those variables are independent, i.e. one jump does not depend on the last one (unless the frog gets caught). If needed, you can check my <a href="https://marctorrellas.com/pdf-of-the-sum-of-independent-random-variables/">post</a> about how to compute the pdf for the sum of random variables. The main result is that the pdf of <img src="https://marctorrellas.com/wp-content/ql-cache/quicklatex.com-e3265008bdbf273e3519ff18ab13cef8_l3.png" class="ql-img-inline-formula quicklatex-auto-format" alt="&#90;&#61;&#32;&#88;&#43;&#89;" title="Rendered by QuickLaTeX.com" height="14" width="88" style="vertical-align: -2px;" /> can be expressed as a convolution:
</p>

<p class="ql-center-displayed-equation" style="line-height: 41px;">
  <span class="ql-right-eqno"> (3) </span><span class="ql-left-eqno"> &nbsp; </span><img src="https://marctorrellas.com/wp-content/ql-cache/quicklatex.com-1437424cd00d9464c3b644808ae41df3_l3.png" height="41" width="363" class="ql-img-displayed-equation quicklatex-auto-format" alt="&#92;&#98;&#101;&#103;&#105;&#110;&#123;&#97;&#108;&#105;&#103;&#110;&#42;&#125; &#102;&#95;&#123;&#90;&#125;&#40;&#122;&#41;&#32;&#61;&#102;&#95;&#123;&#88;&#125;&#40;&#122;&#41;&#32;&#42;&#32;&#102;&#95;&#123;&#89;&#125;&#40;&#122;&#41;&#32;&#61;&#32;&#92;&#105;&#110;&#116;&#95;&#123;&#45;&#92;&#105;&#110;&#102;&#116;&#121;&#125;&#94;&#123;&#92;&#105;&#110;&#102;&#116;&#121;&#125;&#32;&#92;&#33;&#92;&#33;&#92;&#33;&#92;&#33;&#92;&#33;&#32;&#102;&#95;&#123;&#88;&#125;&#40;&#120;&#41;&#32;&#102;&#95;&#123;&#89;&#125;&#40;&#122;&#45;&#120;&#41;&#32;&#92;&#112;&#97;&#114;&#116;&#105;&#97;&#108;&#32;&#120;&#46; &#92;&#101;&#110;&#100;&#123;&#97;&#108;&#105;&#103;&#110;&#42;&#125;" title="Rendered by QuickLaTeX.com" />
</p>

### **And&#8230; all pieces together**

<p style="text-align: justify;">
  The prob. of being before the trap after the first jump is trivial: <img src="https://marctorrellas.com/wp-content/ql-cache/quicklatex.com-80d53e470463b8eeca7dbf73fcbed33a_l3.png" class="ql-img-inline-formula quicklatex-auto-format" alt="&#92;&#116;&#101;&#120;&#116;&#123;&#80;&#114;&#111;&#98;&#125;&#40;&#115;&#95;&#49;&#32;&#32;&#92;&#108;&#101;&#32;&#112;&#41;&#32;&#61;&#32;&#112;" title="Rendered by QuickLaTeX.com" height="18" width="133" style="vertical-align: -4px;" />. Let&#8217;s calculate the prob. of being before the trap after 2 jumps:
</p>

<p class="ql-center-displayed-equation" style="line-height: 139px;">
  <span class="ql-right-eqno"> (4) </span><span class="ql-left-eqno"> &nbsp; </span><img src="https://marctorrellas.com/wp-content/ql-cache/quicklatex.com-7211c3826fccf57715400178ed01d137_l3.png" height="139" width="391" class="ql-img-displayed-equation quicklatex-auto-format" alt="&#92;&#98;&#101;&#103;&#105;&#110;&#123;&#97;&#108;&#105;&#103;&#110;&#42;&#125; &#92;&#116;&#101;&#120;&#116;&#123;&#80;&#114;&#111;&#98;&#125;&#40;&#115;&#95;&#49;&#32;&#43;&#32;&#115;&#95;&#50;&#32;&#92;&#108;&#101;&#32;&#112;&#41;&#32;&#38;&#61;&#32;&#92;&#105;&#110;&#116;&#95;&#123;&#48;&#125;&#94;&#123;&#112;&#125;&#32;&#92;&#112;&#97;&#114;&#116;&#105;&#97;&#108;&#32;&#120;&#32;&#92;&#105;&#110;&#116;&#95;&#123;&#45;&#92;&#105;&#110;&#102;&#116;&#121;&#125;&#94;&#123;&#92;&#105;&#110;&#102;&#116;&#121;&#125;&#32;&#92;&#33;&#92;&#33;&#92;&#33;&#92;&#33;&#92;&#33;&#32;&#102;&#95;&#123;&#83;&#95;&#49;&#125;&#40;&#92;&#116;&#97;&#117;&#41;&#32;&#102;&#95;&#123;&#83;&#95;&#50;&#125;&#40;&#120;&#45;&#92;&#116;&#97;&#117;&#41;&#92;&#44;&#92;&#44;&#32;&#92;&#112;&#97;&#114;&#116;&#105;&#97;&#108;&#32;&#92;&#116;&#97;&#117;&#32;&#32;&#92;&#92; &#38;&#61;&#32;&#92;&#105;&#110;&#116;&#95;&#123;&#48;&#125;&#94;&#123;&#112;&#125;&#92;&#112;&#97;&#114;&#116;&#105;&#97;&#108;&#32;&#120;&#32;&#92;&#105;&#110;&#116;&#95;&#123;&#48;&#125;&#94;&#123;&#120;&#125;&#32;&#92;&#33;&#92;&#33;&#92;&#33;&#92;&#33;&#92;&#33;&#32;&#49;&#32;&#92;&#99;&#100;&#111;&#116;&#32;&#49;&#32;&#92;&#44;&#92;&#44;&#32;&#92;&#112;&#97;&#114;&#116;&#105;&#97;&#108;&#32;&#92;&#116;&#97;&#117;&#32;&#32;&#92;&#92; &#38;&#61;&#32;&#92;&#105;&#110;&#116;&#95;&#123;&#48;&#125;&#94;&#123;&#112;&#125;&#32;&#120;&#92;&#44;&#92;&#44;&#32;&#92;&#112;&#97;&#114;&#116;&#105;&#97;&#108;&#32;&#120;&#32;&#32;&#61;&#32;&#92;&#102;&#114;&#97;&#99;&#123;&#112;&#94;&#50;&#125;&#123;&#50;&#125;&#46; &#92;&#101;&#110;&#100;&#123;&#97;&#108;&#105;&#103;&#110;&#42;&#125;" title="Rendered by QuickLaTeX.com" />
</p>

<p style="text-align: justify;">
  Similarly, for 3 jumps we get <img src="https://marctorrellas.com/wp-content/ql-cache/quicklatex.com-2ed1828e1a73cb038f17828c03ca7ee4_l3.png" class="ql-img-inline-formula quicklatex-auto-format" alt="&#92;&#116;&#101;&#120;&#116;&#123;&#80;&#114;&#111;&#98;&#125;&#40;&#115;&#95;&#49;&#32;&#43;&#32;&#115;&#95;&#50;&#32;&#92;&#108;&#101;&#32;&#112;&#41;&#32;&#61;&#32;&#92;&#102;&#114;&#97;&#99;&#123;&#112;&#94;&#51;&#125;&#123;&#54;&#125;" title="Rendered by QuickLaTeX.com" height="25" width="177" style="vertical-align: -6px;" />, and so on. Consequently:
</p>

<p class="ql-center-displayed-equation" style="line-height: 102px;">
  <span class="ql-right-eqno"> (5) </span><span class="ql-left-eqno"> &nbsp; </span><img src="https://marctorrellas.com/wp-content/ql-cache/quicklatex.com-1b0e0544865dcdfdde6ecccde52b0fa7_l3.png" height="102" width="331" class="ql-img-displayed-equation quicklatex-auto-format" alt="&#92;&#98;&#101;&#103;&#105;&#110;&#123;&#97;&#108;&#105;&#103;&#110;&#42;&#125; &#92;&#116;&#101;&#120;&#116;&#123;&#80;&#114;&#111;&#98;&#125;&#40;&#99;&#97;&#117;&#103;&#104;&#116;&#41;&#32;&#38;&#61;&#32;&#40;&#49;&#45;&#112;&#41;&#32;&#92;&#108;&#101;&#102;&#116;&#40;&#32;&#49;&#32;&#43;&#32;&#112;&#32;&#43;&#32;&#92;&#102;&#114;&#97;&#99;&#123;&#112;&#94;&#50;&#125;&#123;&#50;&#125;&#32;&#43;&#32;&#92;&#108;&#100;&#111;&#116;&#115;&#32;&#92;&#114;&#105;&#103;&#104;&#116;&#41;&#32;&#92;&#92; &#38;&#61;&#32;&#40;&#49;&#45;&#112;&#41;&#32;&#92;&#115;&#117;&#109;&#95;&#123;&#105;&#61;&#48;&#125;&#94;&#123;&#92;&#105;&#110;&#102;&#116;&#121;&#125;&#32;&#92;&#102;&#114;&#97;&#99;&#123;&#112;&#94;&#110;&#125;&#123;&#110;&#125;&#32;&#61;&#32;&#40;&#49;&#45;&#112;&#41;&#32;&#101;&#94;&#112;&#46; &#92;&#101;&#110;&#100;&#123;&#97;&#108;&#105;&#103;&#110;&#42;&#125;" title="Rendered by QuickLaTeX.com" />
</p>

<p style="text-align: justify;">
  where I have applied the <a href="https://en.wikipedia.org/wiki/Taylor_series#Exponential_function">Taylor series</a> of the exponential. This result, apart from being so elegant, makes sense at extreme values. On the one hand, for <img src="https://marctorrellas.com/wp-content/ql-cache/quicklatex.com-abdeb0a6487242cb6f05fc62f43800dd_l3.png" class="ql-img-inline-formula quicklatex-auto-format" alt="&#112;&#61;&#49;" title="Rendered by QuickLaTeX.com" height="16" width="42" style="vertical-align: -4px;" />, i.e. there is no trap, there is 0 probability of get caught. On the other hand, if <img src="https://marctorrellas.com/wp-content/ql-cache/quicklatex.com-2f07f30eb38a79fc42e5bd38715b4bb6_l3.png" class="ql-img-inline-formula quicklatex-auto-format" alt="&#112;&#61;&#48;" title="Rendered by QuickLaTeX.com" height="16" width="43" style="vertical-align: -4px;" />, the frog will get caught with probability 1 in the first jump, since the trap occupies the whole range  of the frog potential jump.
</p>

### **Conclusion**

<p style="text-align: justify;">
  Today I have presented a puzzle involving a frog trying to avoid a fixed trap. This problem has been the perfect excuse to review concepts in probability, such as the probability of the union and the distribution of the sum of variables.
</p>

<p style="text-align: justify;">
  And that&#8217;s it, folks! If you enjoyed this post please like, and in case of any suggestion, do not hesitate to comment!
</p>

<div id="wp-ulike-post-356" class="wpulike wpulike-default " >
  <div class="wp_ulike_general_class wp_ulike_is_unliked">
    <a data-ulike-id="356" data-ulike-nonce="6b1176f1a2" data-ulike-type="likeThis" data-ulike-status="3" class="wp_ulike_btn wp_ulike_put_image"> </a> <span class="count-box"></span>
  </div>
</div>