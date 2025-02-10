---
title: Jupyterlab on a Remote Machine
date: '2019-02-08 00:00:00 +0000'
permalink: /posts/jupyter-lab-on-a-remote-machine/
categories:
- Dev tools
isPinned: false
---

Today we'll see my config for running Jupyter notebooks when working on a Remote Machine. This is typical in a data scientist / ML engineer life as typical laptops eventually cannot process tasks due to limitations on memory, speed or disk space.

 **Disclaimer**: all info written in this post assumes a Mac as your local, and Ubuntu as remote. Most of it should work also with other combinations of these two.


## Notebooks

Jupyter notebooks are very powerful tools for easy prototyping in Python (or even R!), but also for intensive development. However, one typically runs the Jupyter server in local, and connect via browser. How do we do this when we want the Python to run in our remote box?

1. Install Jupyter lab in the remote box to be able to run the notebook server, e.g. `conda install jupyterlab` if working with `conda`.

1. `jupyter lab --no-browser --port=8089.`

1. Now in your local terminal run: `ssh -N -L 8000:localhost:8089 marc@172.16.6.32`.

There will be no answer, just leave this open.
This creates a tunnel from your port `8000` to the port `8089` in the remote machine (these ports are just examples and can be changed to any number), where the Jupyter server is listening. Note that if you
have multiple servers, they can all listen in the same port e.g. `8089`, but you have to tunnel them to different *local* ports, so changing the `8000`!

Open a browser and go to `localhost:8000`, and that's it!

**Optional**: add the tunnel as in `ssh -fN -L 8000:localhost:8089 marc@172.16.6.32`
to your `~/.bashrc`. This will make the tunnel always active but in the background, and started every time you open a new terminal. So no need to have a terminal blocked (but do not close it!).
To make it effective either restart the terminal or `source ~/.bashrc`.


## Jupyter lab as a service

Now you're able to run notebooks on the remote machine, and accessing to them via browser. So, even though it says `localhost:8000`, you're in the server! However, it's really annoying going to the remote machine and start the Jupyter lab server every time. This can be automated by running it as a service <a href="https://aichamp.wordpress.com/2017/06/13/setting-up-jupyter-notebook-server-as-service-in-ubuntu-16-04/">source</a>:

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


and that's it. Every time the machine starts, will start this service and let it listen for incoming requests.


 ## Conclusion

In this short post, I have shown how to spin up a Jupyter server in your remote machine. This way we can run notebooks in the remote machine with the same experience as if the Jupyter server was running locally!

As always, any recommendation, suggestion or improvement, please let me know. Thanks for reading!
