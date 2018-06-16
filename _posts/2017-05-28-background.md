---
title:  Background
date: 2017-05-30T16:04:03+00:00
permalink: /posts/background/
categories:
  - Academia
---

<i> If latex formulas are not shown in your browser, please make sure you allow loading insecure scripts from this page. Right hand side of the address bar in chrome you will see a placeholder where this can be enabled.</i>

<p style="text-align: justify;">Sometimes I get my mind back to 2009, when Prof. Josep Vidal came to me with <a href="https://arxiv.org/abs/0707.0323">this</a> then recently published amazing paper. At that moment, I had never imagined that <a href="http://www.ece.uci.edu/~syed/">Jafar</a>, a name that I related more to Disney Aladdin's <a href="https://en.wikipedia.org/wiki/List_of_Disney%27s_Aladdin_characters#Jafar">antagonist</a>, would be the origin of my PhD. In short, the thing is that two \( very smart \) guys: Syed Ali Jafar and his PhD student Viveck Cadambe, ideated an innovative an disruptive way of communicating nodes in a wireless network.</p>
<p style="text-align: justify;">The main achievement is that, regardless the number of active nodes located in a network, each achieves the same performance! To be practical, consider a room with 2 pairs of people, all communicating by turns. This means that to understand each other, each pair can only talk during half the time. So we say that the <em>efficiency </em>is of 50% per pair or 0.5 per pair. What this incredible result claims is that, if we now put 100 pairs in the same room, this same per-pair efficiency can be maintained, so there is way to transmit information where they don't mind how many people there is in the room!
<p style="text-align: justify;">In a world where there are increasingly more and more devices communicating at the same time, one can understand how this idea may bring a revolution to the wireless communications.</p>
<p style="text-align: justify;">To understand the idea, probably it is necessary some background. I will try to make things simpler than they are, but obviously some maths are needed.</p>

<div style="text-align: center">
<img src="/content/2016/11/BC-300x85.png" width="40%"/>
<p> <span style="font-size: 10pt;">Figure 1: The Broadcast Channel (BC)</span> </p>
</div>


<h3><strong>Null Steering</strong></h3>
<p style="text-align: justify;">To explain the concept of Interference Alignment, let's start by explaining first the well-known idea of <em><a href="https://en.wikipedia.org/wiki/Zero-forcing_precoding">Zero Forcing</a> at the transmitter</em> or <em>Null Steering</em>. In this regard, consider a network as in Figure 1, where there is one transmitter (Tx), who wants to send information to two receivers (Rx1 and Rx2). This model is known as the Broadcast Channel (BC). In this case, we consider the case where transmitter has two antennas, whereas receivers have only one. We can model the signal received at Rx<em>i </em>as follows:</p>
<p style="text-align: center;">\begin{equation} {y}_i = \mathbf{h}^T_i (\mathbf{v}_1 x_1 + \mathbf{v}_2 x_2) + n_i  \end{equation}</p>
<p style="text-align: justify;">where $ \mathbf{h}^T_i $ is a vector whose two components denote the channel gains from each antenna of the transmitter to the single antenna of $\text{Rx}i$. As you may notice from the figure, $\mathbf{x}_i$ denotes messages intended to each receiver, while $\hat{\mathbf{x}}_i$ denotes its estimation, hopefully the true one.</p>
<p style="text-align: justify;">Regarding the term $n_i$, it represents the noise originated at the receiver when "listening". This noise may be the result of a number of unknown contributions such as external interference, fluctuations in the receiving antennas, and others. For these reasons, it is usually assumed to be Gaussian and <a href="https://en.wikipedia.org/wiki/White_noise">white</a>. My intention is that the reader does not need to understand all these concepts to catch the main message, but do not hesitate to contact me or post a comment if any extra info is wished. I would be more than happy to provide answers up to the limits of my knowledge.</p>
<p style="text-align: justify;">As you may have noticed, I have left the beamforming vectors $\mathbf{v}_i$ for the last part. The name basically tells us what they do: steer the transmitted signal to some desired direction.  This can be used twofold: to increase the power a desired signal is received with, or to alleviate or remove the interference a signal causes. Most of the scenarios considered in my thesis and papers always focus on the case where the transmission power is not problem, so we assume that we can spend as much power as required, and the only problem is the interference. Therefore, we are more oriented to remove the interference rather than increasing the desired signal power. To this end, consider the following constraints:</p>
<p style="text-align: center;">\begin{equation} \begin{matrix}\mathbf{h}^T_1 \mathbf{v}_2 = 0 \\ \mathbf{h}^T_2 \mathbf{v}_1 = 0 \end{matrix}    \end{equation}</p>
<p style="text-align: justify;">which can be read as follows: there exists one direction for vector $\mathbf{v}_i$, such that when the signal travels through the channel it is null out. This direction, clearly, is pointed by a vector orthogonal to the channel, thus it is straightforward to derive a system completely removing the interference!</p>
<p style="text-align: justify;">This idea can be generalized to the case with $M$ antennas and $K=M$ single-antenna users by forcing the following general set of constraints:</p>
<p style="text-align: center;">\begin{equation} \displaystyle \mathbf{h}^T_i \mathbf{v}_j = 0, \, \forall j \neq i \end{equation}</p>
Then, each $\mathbf{v}_j$ appears in $K-1$ equations, written in matrix form as:
<p style="text-align: center;">\begin{equation} \displaystyle \begin{bmatrix}\mathbf{h}^T_i \\ \vdots \\ \mathbf{h}^T_{i-1}\\  \mathbf{h}^T_{i-1} \\ \vdots \\ \mathbf{h}^T_{K} \end{bmatrix} \mathbf{v}_j = \tilde{\mathbf{H}}_j\mathbf{v}_j = \mathbf{0} \end{equation}</p>
<p style="text-align: justify;">The design above is usually referred to as <em>Null Steering</em>, since each transmitter steers its signal along the direction where the receivers have nulls in their antenna pattern diagram. Moreover, notice that the vector $\mathbf{v}_j$ lies on the <em>null space</em> of $\tilde{\mathbf{H}}_j$, denoted as <span style="font-family: 'courier new', courier, monospace;">null</span>$\left(\tilde{\mathbf{H}}\right)$. This null space may not always exists, and actually depends on the parameters of the system $M$ and $K$.</p>

<div style="text-align: center">
  <img src="/content/2016/11/2MAC-300x89.png" width="40%" />
  <p> <span style="font-size: 10pt;">Figure 2: The two-user multiple-access channel (MAC)</span> </p>
</div>

<h3><strong>Zero-forcing</strong></h3>
<p style="text-align: justify;">The dual case of the broadcast channel is the multiple-access channel (MAC), where there are $K$ transmitters, and a single receiver, see Fig. 2. Consider the case where the receiver is equipped with $M=K$ antennas, i.e. as antennas as users, and transmitters are single-antenna. Then, similarly to the null steering idea, the receiver may filter out the directions the interference comes from, by processing the received signal with a linear filter $\mathbf{w}_i$. Such approach is usually denoted as Zero-Forcing (ZF), and this is the reason why Null Steering may also be denoted as Zero Forcing at the transmitter.</p>
<p style="text-align: justify;">Given the idea, let's see how this translates to maths. Assuming that $\mathbf{w}_i$ is used to decode $x_i$, for the $K=M=2$ case the processed signal is given by:</p>
<p style="text-align: justify;">\begin{equation} {z}_i = \mathbf{w}^T_i \left( \mathbf{h}_1 x_1 + \mathbf{h}_2 x_2 +\mathbf{n}_i \right)   \end{equation}</p>
<p style="text-align: justify;">where channels are now 2x1 (2 antennas at the receiver, 1 antenna at each transmitter), and precoding vectors have been omitted since with only one antenna we cannot give direction to the transmitted signals. According to the above equation, we force the following set of constraints:</p>
<p style="text-align: justify;">\begin{equation} \begin{matrix} \mathbf{w}^T_1 \mathbf{h}_2 = \mathbf{0} \\ \mathbf{w}^T_2 \mathbf{h}_1 = \mathbf{0} \end{matrix}\end{equation}</p>
<p style="text-align: justify;">such that all the interference is removed when decoding each signal. To do so, the rows of the receiving filter (in this case only one since we are decoding a single message) should be contained on the left null space of the channels, similarly to the case of null steering explained above. A generalization to the case of general $K=M$ users is straightforward following the same approach as for null steering.</p>

<h3><strong>Degrees of Freedom</strong></h3>
<p style="text-align: justify;">During this post I have talked about efficiency, referring to what rigorously is denoted as the *degrees of freedom* (DoF) of the channel. I'm not going to explain in detail this concept, because I think it's the less interesting part for common people who don't have passion for maths.</p>

<p style="text-align: justify;">To put it simply, think about the DoF as the number of messages that can be transmitted per time unit, received without interference. For each scenario (topology, number of users, and distribution of antennas), there is a value which is the optimal. This means that it's not feasible to obtain more than this. I will refer to this as the *optimal* DoF, or just the *DoF of the channel*.</p>

<p style="text-align: justify;">In addition to this, based on (usually) complicated Information Theory tools, it is possible to bound the DoF of the channel, such that we know that more than this is not possible to achieve. This is known as DoF *upper bound* or *outer bound*.</p>

<p style="text-align: justify;">Finally, for each proposed transmission technique we can analyze how many DoF are achieved, leading to a DoF *inner bound*. Therefore, the only way to derive the DoF of the channel is to find the DoF of the channel is to find a DoF inner bound coinciding with a DoF upper bound.</p>

<h3><strong>Conclusion</strong></h3>
<p style="text-align: justify;">In this first post, we have seen the ideas of zero forcing and null steering. In short, the idea in the former is to make use of multiple antennas to transmit in such a way that no interference is generated to other users. Likewise, for the latter all signals received through directions corresponding to other users' channels are filtered out. Both techniques are formulated in mathematical terms by referring to the concept of <em>null space </em>of a matrix.</p>

<p style="text-align: justify;">Finally, I have explained the concept of Degrees of Freedom, used to explain the efficiency of a technique in terms of transmission rate. For the two scenarios explained in this post, BC and MAC, the two techniques explained are sufficient to attain the DoF of the channel for any number of users and antennas. The problems arise when we consider other topologies, such as the Interference Channel, and here is where Interference Alignment comes to the rescue.</p>

<p style="text-align: justify;">I hope to you enjoyed these concepts as much as I do, and still want to continue in this journey through my research days in academia. If so, go to my next post dedicated on the <a href="/posts/interference-alignment/">Interference Alignment</a> concept. Comments and likes more than welcome!</p>
