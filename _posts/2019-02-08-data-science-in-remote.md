---
title: Data Science in remote
layout: single
author_profile: true
date: '2019-02-08 00:00:00 +0000'
comments: true
permalink: /posts/data-science-in-remote/
categories:
- Divulgation
---

<style type='text/css'>
a { text-decoration: none; }
a:hover { text-decoration: underline; }
.justify { text-align: justify; }
.ccode {text-align: center; font-family: 'courier new'}
.icode {font-family: 'courier new'}
</style>

<p class="justify">Long time since my last post! But decided to come
back to explain some of typical tips and tricks when working (but not only) on
remote. This is typical in a data scientist life as layman laptops, at some point,
and especially if you work with big data, present limitations in memory and/or
speed. </p>

<p class="justify">In most companies or in academia, when you need
to run huge process you are given a remote machine, either in AWS or in a company/uni
cluster. This means that you won't have physical access, and you can only connect
there via ssh.</p>

<p class="justify">*Disclaimer*: all info written in this post assumes a Mac as your local, and Ubuntu as remote. Most of it should work also with other combinations of these two.</p>

**Access to a remote machine**

Accessing to the cluster usually is as easy as:

  <p class="ccode">ssh username@ip</p>

<p class="justify;">This will require you to write your password, but there is a solution to avoid writing your password all the time (all from your local, <a href="http://www.linuxproblem.org/art_9.html">source</a>):</p>

1. <p class="icode">ssh-keygen -t rsa</p>
2. <p class="icode">ssh username@ip mkdir -p .ssh</p>
3. <p class="icode">cat .ssh/id_rsa.pub | ssh username@ip 'cat >> .ssh/authorized_keys'</p>

<p class="justify;">In addition to this, I like to define my alias to access to it, so adding to the .bashrc file something like:</p>

<p class="ccode">
alias sshmarc=ssh username@ip
</p>

so that just typing something short I can access to it.

**File transfer**

Always do this from your local machine. Examples:

From cluster to local (the dot means that it will be copied to the current directory):

<p class="ccode">scp marc@172.16.6.35:~/titanic.log .</p>

From local to cluster:

<p class="ccode">scp -r ~/experiments/results marc@172.16.6.35:~/results/</p>

A way to just synchronise is using rsync:

<p class="ccode">rsync -arv --ignore-existing --progress marc@172.16.6.32:/home/marc/results experiments/results/</p>

**Run shells on background**

The main application of having a server is not only to run experiments when you're connected, but to leave it the whole night, so that you don't have to wait. However, if you close the ssh connection, you'll lose everything you had. A workaround for that is running the processes on background, or using a terminal multiplexer. While I started with `screen`, I've finally adopted `tmux`, as my favorite one. A short cheatsheet next:

* <p class="icode">tmux ls</p>
* <p class="icode">tmux new -s name</p>
* <p class="icode">tmux attach -t name</p>
* control + b, and then d => detach
* <p class="icode">killall tmux</p>

**Notebooks**

<p class"justify;">As explained in
<a href="https://marctorrellas.github.io/posts/python-tips-tricks/">this post</a>, Jupyter notebooks are very powerful tools for Python easy prototyping, but also for intensive development. However, one typically runs the notebook in local, and connect via browser. How do we do this when we want the Python to run in our remote box?</p>

1. Install Jupyter in the remote box to be able to run the notebook server: <span class="icode">pip install jupyter</span> or <span class="icode">conda install jupyter</span><br>

2. <p class="icode">jupiter notebook password</p>

3. <p class="icode">jupyter notebook --no-browser --port=8089.</p>

3. Go to your local box and run:  <span class="icode">ssh -N -L 8000:localhost:8089 marc@172.16.6.32</span>. There will be no answer, just leave this open.
This creates a tunnel from your port 8000 to the port 8089 in the server (these ports are examples and can be changes by any number), where the notebook server is listening. Note that if you
have multiple servers, they can all listen in the same port, but you have to tunnel them to different ports, so changing the 8000!

Open a browser and go to localhost:8000. The password in step2 will be asked, and you should be able to work as in local.

6. Optional: add the tunnel as in

<p class="ccode">
    ssh -fN -L 8000:localhost:8089 marc@172.16.6.32
</p>

to your ~/.bashrc, and it will be active but in the background. So no need to have a terminal blocked (but do not close it!).
To make it effective either restart terminal or <span class="icode">source ~/.bashrc</span>.


**Notebook as a service**

<p class="justify;">After previous section, you're able to run notebooks on the server, and accessing to them via browser. So, even though it says localhost:8000, you're in the server! (tunnels dark magic). However, it's really annoying going to the server and run the notebook every time. This can be automated by running the notebook as a service (source: https://aichamp.wordpress.com/2017/06/13/setting-up-jupyter-notebook-server-as-service-in-ubuntu-16-04/):</p>


1. Set the service file <span class="icode">/usr/lib/systemd/system/jupyter.service</span> (yes, you probably need to create some dirs) as in

  [Unit]<br>
  Description=Jupyter Notebook<br>

  [Service]<br>
  Type=simple<br>
  PIDFile=/run/jupyter.pid<br>
  ExecStart=/home/marc/miniconda3/bin/jupyter-notebook --no-browser --port=8089<br>
  User=marc<br>
  Group=marc<br>
  WorkingDirectory=/home/marc<br>
  Restart=always<br>
  RestartSec=10<br>
  #KillMode=mixed

  [Install]<br>
  WantedBy=multi-user.target<br>

2. <p class="icode">sudo systemctl enable jupyter.service</p>
3. <p class="icode">sudo systemctl daemon-reload</p>
4. <p class="icode">jupyter notebook --generate-config</p>
5. <p class="icode">jupyter notebook password</p>
6. <p class="icode">sudo systemctl restart jupyter.service</p>


**Notebook tips and tricks**

*Autoreload*
(source: <a href=https://ipython.org/ipython-doc/3/config/extensions/autoreload.html>)

When you change something in sources, usually you have to restart the kernel. This allows to automatically import functions again. Just add

<p class="icode">%load_ext autoreload</p>
<p class="icode">%autoreload 2</p>


*Use full width*

Add this to your import cell

<p class="icode">%load_ext autoreload</p>
<p class="icode">from IPython.core.display import display, HTML
display(HTML("<style>.container { width:100% !important; }</style>"))</p>



*Folding cells*

Create the dir <span class="icode">mkdir ~/.jupyter/custom</span> if not present

Edit <span class="icode">~/.jupyter/custom/custom.js</span> as:

<div style="text-align: center">
  <img src="/content/folding_code.png" alt="" width="80%"/>
</div> <p> </p>

You'll need to restart the notebook service. Cells are fold when double-click.


*Display various dataframes side by side*


Use the following code:

<div style="text-align: center">
  <img src="/content/side_by_side.png" alt="" width="80%"/>
</div> <p> </p>

and even nicer, if you have a list of dataframes, the following will show them in rows of 3 columns:


<div style="text-align: center">
  <img src="/content/display_dfs.png" alt="" width="50%"/>
</div> <p> </p>

 **Conclusion**

<p style="text-align: justify;">In this post, I have shown some of the tricks I have learned in the recent years for working on remote and with Jupyter notebooks. </p>

<p style="text-align: justify;">As always, any recommendation, suggestion or improvement, please welcome. Thanks for reading!</p>
