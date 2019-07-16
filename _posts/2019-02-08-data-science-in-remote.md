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
.ccode {text-align: center; font-family: 'courier new'}
.icode {font-family: 'courier new'}
</style>

Long time since my last post! But decided to come
back to explain some of typical tips and tricks when working (but not only) on
remote. This is typical in a data scientist life as layman laptops, at some point,
and especially if you work with big data, present limitations in memory and/or
speed.

In most companies or in academia, when you need
to run huge process you are given a remote machine, either in AWS or in a company/uni
cluster. This means that you won't have physical access, and you can only connect
there via ssh.

 **Disclaimer**: all info written in this post assumes a Mac as your local, and Ubuntu as remote. Most of it should work also with other combinations of these two.

**Access to a remote machine**

Accessing to the cluster usually is as easy as writing:

  ```ssh username@ip```

This will require you to write your password, but there is a solution to avoid writing your password all the time (all from your local, <a href="http://www.linuxproblem.org/art_9.html">source</a>):

1. `ssh-keygen -t rsa`
1. `ssh username@ip mkdir -p .ssh`
1. `cat .ssh/id_rsa.pub | ssh username@ip 'cat >> .ssh/authorized_keys'`

In addition to this, I like to define my alias to access to it, so adding to the `.bashrc` file something like:

`
alias sshmarc=ssh username@ip
`

so that just typing something short I can access to it.

**File transfer**

Always do this from your local machine. Examples:

From cluster to local (the dot means that it will be copied to the current directory):

`scp marc@172.16.6.35:~/titanic.log .`

From local to cluster:

`scp -r ~/experiments/results marc@172.16.6.35:~/results/`

A way to just synchronise is using rsync:

`
rsync -arv --ignore-existing --progress marc@172.16.6.32:/home/marc/results experiments/results/`

**Run shells on background**

The main application of having a server is not only to run experiments when you're connected, but to leave it the whole night, so that you don't have to wait. However, if you close the ssh connection, you'll lose everything you had. A workaround for that is running the processes on background, or using a terminal multiplexer. While I started with `screen`, I've finally adopted `tmux` as my favorite one. A short cheatsheet next:

* `tmux ls`
* `tmux new -s name`
* `tmux attach -t name`
* control + b, and then d => detach
* `killall tmux`

**Notebooks**

As explained in
<a href="https://marctorrellas.github.io/posts/python-tips-tricks/">this post</a>, Jupyter notebooks are very powerful tools for Python easy prototyping, but also for intensive development. However, one typically runs the notebook in local, and connect via browser. How do we do this when we want the Python to run in our remote box?

1. Install Jupyter in the remote box to be able to run the notebook server: `pip install jupyter` or `conda install jupyter`

2. `jupiter notebook password`

3. `jupyter notebook --no-browser --port=8089.`

3. Go to your local box and run:

`ssh -N -L 8000:localhost:8089 marc@172.16.6.32`.

There will be no answer, just leave this open.
This creates a tunnel from your port 8000 to the port 8089 in the server (these ports are examples and can be changes by any number), where the notebook server is listening. Note that if you
have multiple servers, they can all listen in the same port, but you have to tunnel them to different ports, so changing the 8000!

Open a browser and go to localhost:8000. The password in step2 will be asked, and you should be able to work as in local.

Optional: add the tunnel as in

`
    ssh -fN -L 8000:localhost:8089 marc@172.16.6.32
`

to your `~/.bashrc`, and it will be active but in the background. So no need to have a terminal blocked (but do not close it!).
To make it effective either restart terminal or `source ~/.bashrc`.


**Notebook as a service**

After previous section, you're able to run notebooks on the server, and accessing to them via browser. So, even though it says localhost:8000, you're in the server! (tunnels dark magic). However, it's really annoying going to the server and run the notebook every time. This can be automated by running the notebook as a service <a href="https://aichamp.wordpress.com/2017/06/13/setting-up-jupyter-notebook-server-as-service-in-ubuntu-16-04/">source</a>:

* Set the service file `/usr/lib/systemd/system/jupyter.service` (yes, you probably need to create some dirs) as in

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

* `sudo systemctl enable jupyter.service`
* `sudo systemctl daemon-reload`
* `jupyter notebook --generate-config`
* `jupyter notebook password`
* `sudo systemctl restart jupyter.service`


**Notebook tips and tricks**

*Autoreload*
(<a href="https://ipython.org/ipython-doc/3/config/extensions/autoreload.html">source</a>)

When you change something in sources, usually you have to restart the kernel. This allows to automatically import functions again. Just add

`%load_ext autoreload` <br>
`%autoreload 2`


*Use full width*

Add this to your import cell

`from IPython.core.display import display, HTML
display(HTML("<style>.container { width:100% !important; }</style>"))`

(Note that with Jupyter lab this is not required)


*Folding cells*

Create the dir `mkdir ~/.jupyter/custom` if not present

Edit `~/.jupyter/custom/custom.js` as:

<div style="text-align: center">
  <img src="/content/folding_code.png" alt="" width="80%"/>
</div> <p> </p>

You'll need to restart the notebook service. Cells are fold when double-click.

(Note that with Jupyter lab this is not required)


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

In this post, I have shown some of the tricks I have learned in the recent years for working on remote and with Jupyter notebooks.

As always, any recommendation, suggestion or improvement, please welcome. Thanks for reading!
