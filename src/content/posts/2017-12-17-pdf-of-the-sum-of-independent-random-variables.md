---
title: PDF of the sum of independent random variables
date: 2017-12-17T01:02:19+00:00
permalink: /posts/pdf-of-the-sum-of-independent-random-variables/
categories:
  - Divulgation
---

<p style="text-align: justify;">
  Today I review a result that I'm gonna use in other posts, e.g. the <a href="/posts/the-survivor-frog/">survivor frog problem</a>. Also, it can be useful for you to solve mathematical problems, or to remember a simple but elegant proof. I'll give a simple but intuitive proof for the derivation of the <a href="https://en.wikipedia.org/wiki/Probability_density_function">probability density function</a> (pdf) of the sum of independent random variables.
</p>

Imagine you have two random variables:

\begin{align}
\begin{matrix}
X \sim f_X(x) \\ Y \sim f_Y(y) 
\end{matrix}
\end{align}

<p style="text-align: justify;">
  This notation denotes that each random variable follows a different probability distribution. We will assume that these two variables are independent, and our purpose is to compute the pdf of its sum $Z = X+Y$. To do so, I will start from the <a href="https://en.wikipedia.org/wiki/Cumulative_distribution_function">cumulative distribution function</a> (cdf):
</p>

\begin{align}
F_Z(z) &= \text{Prob}\left( Z \le z \right)   \nonumber \newline
&=\text{Prob}\left( X+Y \le z \right) \nonumber \newline &= \text{Prob}\left( Y \le z - X \right) \nonumber \newline
&= \int_{-\infty}^{\infty}  \partial x \int_{-\infty}^{z - x}  f_{XY}(x,y) \partial y \nonumber \newline
&= \int_{-\infty}^{\infty} f_{X}(x) \partial x \int_{-\infty}^{z - x}  f_{Y}(y) \partial y \nonumber
\end{align}


<p style="text-align: justify;">
  Now, we want to compute the pdf, i.e. the derivative of the cdf. Some people will freak out here, since we have to derive an integral. No worries, fortunately we have the <a href="https://en.wikipedia.org/wiki/Leibniz_integral_rule">Leibniz rule</a>, coming into play:
</p>

$$
f_{Z}(z) = \frac{\partial}{\partial z} F_Z(z) = \int_{-\infty}^{\infty} f_{X}(x) f_{Y}(z-x) \partial x = f_{X}(z) * f_{Y}(z)
$$

<p style="text-align: justify;">
  For those not familiar, the operator * is extensively used as the <a href="https://en.wikipedia.org/wiki/Convolution">convolution</a>. This operation is quite important in signal processing, since the output of <a href="https://en.wikipedia.org/wiki/Linear_time-invariant_theory">linear system</a> is the convolution of the output by the impulse response of the system, and it becomes the product in case of working in the frequency domain (after Fourier transforms). So, to conclude, the result can be read as follows:
</p>

<p style="text-align: center;">
  <em>The pdf of the sum of two independent random variables is given by the<br /> convolution of the two pdf's of those variables</em>
</p>

<p style="text-align: justify;">
  And that's it, folks! I hope you enjoyed this more mathsy post!
</p>
