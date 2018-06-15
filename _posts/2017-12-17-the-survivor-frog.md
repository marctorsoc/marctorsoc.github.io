---
title: The survivor frog
layout: single
author_profile: true
date: 2017-12-17T02:10:45+00:00
comments: true
permalink: /posts/the-survivor-frog/
categories:
  - Divulgation
---
<p style="text-align: justify;">In this maths puzzle, a frog is trying to escape from [introduce your preferred evil force]. In an attempt to catch the frog, a trap is positioned occupying $x \in (p,1)$, with the frog initially located at $x=0$, see figure.</p>

<div style="text-align: center">
  <img src="/content/2017/12/amphibian-1295172_640.png" alt="" width="60%" />
</div> <p> </p>

<p style="text-align: justify;">Ok, cheese is for mouses, not frogs, but was a really intuitive way of illustrating the scenario :-)</p>
<p style="text-align: justify;">We assume that our green friend jumps a distance $d \in (0,1)$ with uniform probability, and it jumps an infinite number of times unless it's caught. Our mission here is to compute the <strong>probability of catching the frog</strong>.</p>

<h3><strong>Caught probability for one jump</strong></h3>
<p style="text-align: justify;">Using the fact that the jump size follows a distance uniform between 0 and 1, it is easy to see that:</p>
\begin{align} \text{Prob}(\text{caught} | x = t) = 1 - p, \quad \forall t \le p. \end{align}
<p style="text-align: justify;">Consequently, if the frog is at position $x \leq p$,  it does not matter where the frog is, the probability is always $1-p$. Otherwise, the prob. is simply 0. This result will be quite useful next.</p>

<h3><strong>Divide jumps and conquer</strong></h3>
<p style="text-align: justify;">We can split the problem in many subproblems by considering the different jumps. Thus,  the probability of get caught starting from position $x=0$ can be written as follows:</p>
\begin{align}
\text{Prob}(\text{caught} | x = 0) &= \text{Prob}(\text{caught 1st jump} | x = 0)+  \\\ &  \text{Prob}(\text{caught 2nd jump} | x = 0) + \ldots \\\
&= \sum_{i=0}^{\infty} \text{Prob} \left(\text{caught $n$th jump} | x = 0 \right)  \\\
&= \sum_{i=0}^{\infty} \text{Prob} \left(\sum_{i=1}^{n-1} s_i \le p  \cap \sum_{i=1}^{n} s_i \in (p,1) \right) \\\
&= (1-p) \sum_{i=0}^{\infty} \text{Prob}\left(\sum_{i=1}^{n-1} s_i \le p \right).
\end{align}
<p style="text-align: justify;">where $s_i$ is the $i$th jump size. In words, the probability of get caught is the sum of probs for the 1st, 2nd, 3rd jump, and so on, and there is no intersection because the frog cannot get caught in two different jumps. The next step states that getting caught in the $n$th jump means that the frog is still before the threshold point $x=p$, and it is caught in the trap exactly at the $n$th jump. Using the result in (1) we can finally simplify the expression.</p>

<h3><strong>Distribution of the sum of jumps</strong></h3>
<p style="text-align: justify;">In (2) we have concluded that everything just depends on the prob. of being at position $x \le p$ after $n$ jumps. Hence, since all jumps have the same distribution, we face a problem involving the sum of <a href="https://en.wikipedia.org/wiki/Independent_and_identically_distributed_random_variables">i.i.d.</a> random variables. Indeed, those variables are independent, i.e. one jump does not depend on the last one (unless the frog gets caught). If needed, you can check my <a href="/posts/pdf-of-the-sum-of-independent-random-variables/">post</a> about how to compute the pdf for the sum of random variables. The main result is that the pdf of $Z= X+Y$ can be expressed as a convolution:</p>
\begin{align}
f_{Z}(z) =f_{X}(z) * f_{Y}(z) = \int_{-\infty}^{\infty} \\!\\!\\!\\!\\! f_{X}(x) f_{Y}(z-x) \partial x.
\end{align}

<h3><strong>And... all pieces together</strong></h3>

<p style="text-align: justify;">The prob. of being before the trap after the first jump is trivial: $\text{Prob}(s_1  \le p) = p $. Let's calculate the prob. of being before the trap after 2 jumps:</p>
\begin{align}
\text{Prob}(s_1 + s_2 \le p) &= \int_{0}^{p} \partial x \int_{-\infty}^{\infty} \\!\\!\\!\\!\\! f\_{S_1}\\!(\tau) \,\, f\_{S_2}\\!(x-\tau)\,\, \partial \tau  \\\
&= \int_{0}^{p}\partial x \int_{0}^{x} \\!\\!\\!\\!\\! 1 \cdot 1 \\,\\, \partial \tau  \\\
&=\int_{0}^{p} x\\,\\, \partial x  = \frac{p^2}{2}.
\end{align}
<p style="text-align: justify;">Similarly, for 3 jumps we get $\text{Prob}(s_1 + s_2 \le p) = \frac{p^3}{6}$, and so on. Consequently:</p>
\begin{align}
\text{Prob}(\text{caught}) &= (1-p) \left( 1 + p + \frac{p^2}{2} + \ldots \right) \\\
&= (1-p) \sum_{i=0}^{\infty} \frac{p^n}{n} = (1-p) e^p.
\end{align}
<p style="text-align: justify;">where I have applied the <a href="https://en.wikipedia.org/wiki/Taylor_series#Exponential_function">Taylor series</a> of the exponential. This result, apart from being so elegant, makes sense at extreme values. On the one hand, for $p=1$, i.e. there is no trap, there is 0 probability of get caught. On the other hand, if $p=0$, the frog will get caught with probability 1 in the first jump, since the trap occupies the whole range  of the frog potential jump.</p>

<h3><strong>Conclusion</strong></h3>
<p style="text-align: justify;">Today I have presented a puzzle involving a frog trying to avoid a fixed trap. This problem has been the perfect excuse to review concepts in probability theory, such as the probability of the union and the distribution of the sum of random variables.</p>
<p style="text-align: justify;">And that's it, folks! If you enjoyed this post please like, and in case of any suggestion, do not hesitate to comment!</p>
