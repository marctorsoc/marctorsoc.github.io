---
title: Data Science on remote (OLD)
date: '2019-02-08 00:00:00 +0000'
permalink: /posts/data-science-in-remote-old/
categories:
- Dev tools
isPinned: false
---

Today we'll see some tips and tricks when working (but not only) on
remote. This is typical in a data scientist life as layman laptops, at some point,
and especially if you work with big data, entail limitations in memory and/or
speed.

In most companies or in academia, when you need
to run a huge task you are given a remote machine, either in AWS or in a company/uni
cluster. This means that you won't have physical access, and you can only connect
there remotely.

 **Disclaimer**: all info written in this post assumes a Mac as your local, and Ubuntu as remote. Most of it should work also with other combinations of these two.

## Access to a remote machine

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

## File transfer

Always do this from your local machine. Examples:

From cluster to local (the dot means that it will be copied to the current directory):

`scp marc@172.16.6.35:~/titanic.log .`

From local to cluster:

`scp -r ~/experiments/results marc@172.16.6.35:~/results/`

A way to just synchronise is using rsync:

`
rsync -arv --ignore-existing --progress marc@172.16.6.32:/home/marc/results experiments/results/`

## Run shells on background

The main application of having a server is not only to run experiments when you're connected, but to leave it the whole night, so that you don't have to wait. However, if you close the ssh connection, you'll lose everything you had. A workaround for that is running the processes on background, or using a terminal multiplexer. While I started with `screen`, I've finally adopted `tmux` as my favorite one. A short cheatsheet next:

* `tmux ls`
* `tmux new -s name`
* `tmux attach -t name`
* control + b, and then d => detach
* `killall tmux`

## Notebooks

As explained in the Python tips and tricks
<a href="/posts/python-tips-tricks/">post</a>, Jupyter notebooks are very powerful tools for Python easy prototyping, but also for intensive development. However, one typically runs the jupyter server in local, and connect via browser. How do we do this when we want the Python to run in our remote box?

1. Install Jupyter lab in the remote box to be able to run the notebook server: `conda install jupyterlab`

1. `jupyter lab --no-browser --port=8089.`

1. Now in your local terminal run: `ssh -N -L 8000:localhost:8089 marc@172.16.6.32`.

There will be no answer, just leave this open.
This creates a tunnel from your port 8000 to the port 8089 in the server (these ports are examples and can be changed to any number), where the jupyter server is listening. Note that if you
have multiple servers, they can all listen in the same port, but you have to tunnel them to different ports, so changing the 8000!

Open a browser and go to `localhost:8000`. The password in step2 will be asked, and you should be able to work as in local.

Optional: add the tunnel as in `ssh -fN -L 8000:localhost:8089 marc@172.16.6.32`
to your `~/.bashrc`, and it will be active but in the background, and started every time you open a new terminal. So no need to have a terminal blocked (but do not close it!).
To make it effective either restart terminal or `source ~/.bashrc`.


## Jupyter lab as a service

After previous section, you're able to run notebooks on the server, and accessing to them via browser. So, even though it says `localhost:8000`, you're in the server! (tunnels dark magic). However, it's really annoying going to the server and start the sever every time. This can be automated by running it as a service <a href="https://aichamp.wordpress.com/2017/06/13/setting-up-jupyter-notebook-server-as-service-in-ubuntu-16-04/">source</a>:

* Set the service file `/usr/lib/systemd/system/jupyter.service` (yes, you probably need to create some dirs) as in
```bash 
[Unit]
Description=Jupyter Lab

[Service]
Type=simple
PIDFile=/run/jupyter.pid
ExecStart=/home/marc/miniconda3/bin/jupyter lab --no-browser --port=8089
User=marc
Group=marc
WorkingDirectory=/home/marc
Restart=always
RestartSec=10
#KillMode=mixed
[Install]
WantedBy=multi-user.target
```

* `sudo systemctl enable jupyter.service`
* `sudo systemctl daemon-reload`
* `jupyter lab --generate-config`
* `jupyter lab password`
* `sudo systemctl restart jupyter.service`

## Notebook tips and tricks

### Autoreload

(<a href="https://ipython.org/ipython-doc/3/config/extensions/autoreload.html">source</a>)

When you change something in sources, usually you have to restart the kernel. This allows to automatically import functions again. Just add

`%load_ext autoreload` <br>
`%autoreload 2`

### Table of contents

Check out this useful [extension](https://github.com/jupyterlab/jupyterlab-toc).
Especially interesting when you're writing a tutorial out of a notebook.

### Kernels auto-discovery

Check out [this](https://github.com/Anaconda-Platform/nb_conda_kernels), allowing
you to have available every conda environment irrespective of which environment
you launched the server from. With this enabled, the `python -m spacy ipykernel ...`
in my previous post is no more required.

### Jupytext

Turn your notebooks into .py files automatically synchronised, see [this](https://github.com/mwouts/jupytext). Many advantages:
* Good to keep track in version control
* In this regard, when submitting a Pull Request this makes easier to comment on
notebooks if necessary
* One can potentially apply [black](https://github.com/psf/black) to auto-format the code in your notebok by
applying *black* to your .py file and then synchronising with the notebook


### Display various dataframes side by side


Use the following code:

<div style="text-align: center">
  <img src="/content/side_by_side.png" alt="" width="80%"/>
</div> <p> </p>

and even nicer, if you have a list of dataframes, the following will show them in rows of 3 columns:


<div style="text-align: center">
  <img src="/content/display_dfs.png" alt="" width="50%"/>
</div> <p> </p>

 ## Conclusion

In this post, I have shown some of the tricks I have learned in the recent years for working on remote and with Jupyter notebooks.

As always, any recommendation, suggestion or improvement, please let me know. Thanks for reading!
