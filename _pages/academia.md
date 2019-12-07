---
date: 2016-10-23T21:36:20+00:00
permalink: /academia
header:
  image: "/content/academia.png"
---

<p style="text-align: justify;">
I developed a PhD in Wireless Communications during four years (2011-2015). Prior to that, while finishing my M.Sc (2006-2011), I became an intern (2009-2011) at the Signal Theory and Communications (TSC)
<a href="https://spcom.upc.edu/">group</a> of the Universitat Politècnica de Catalunya (UPC), in Barcelona.
</p>

<div style="text-align: justify;">
All papers produced during and after my PhD, as well as my thesis, can be found in  <a href="https://scholar.google.es/citations?user=__4XCdYAAAAJ&hl=en">Google Scholar</a>, with most of them also available on <a href="https://arxiv.org/">arXiv</a>.
</div>

Journal papers:

- M. Torrellas, A. Agustin de Dios, J. Vidal and O. Muñoz Medina, *"The DoF of the 3user MIMO Interference Channel"*, IEEE Transactions on Communications, September 2014. <a href="https://arxiv.org/pdf/1407.8359">PDF</a>.
- M. Torrellas, A. Agustin de Dios and J. Vidal, *"Achievable DoF-delay Trade-offs for the K-user MIMO Interference channel with delayed CSIT"*, IEEE Transactions on Information Theory, October 2016. <a href="https://arxiv.org/pdf/1504.05498">PDF</a>.
- M. Torrellas, A. Agustin de Dios, J. Vidal, *"On the Degrees of Freedom of the MISO Interference Broadcast Channel with Delayed CSIT"*, submitted to Transactions on Information Theory, November 2019. <a href="https://arxiv.org/pdf/1403.7012">PDF</a>

{% for post in site.posts %}
  {% if post.categories contains 'Academia' %}
    {% include archive-single.html %}
  {% endif %}
{% endfor %}
