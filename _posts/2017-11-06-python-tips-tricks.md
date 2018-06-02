---
title: Python tips & tricks
layout: single
author_profile: true
date: '2017-11-06 01:51:21 +0000'
comments: true
permalink: /posts/python-tips-tricks/
categories:
- Divulgation
---

Today I&#8217;m going to explain some of the lessons and tools I&#8217;ve found that could be useful for someone developing data science (and also general purpose projects) in Python:

  * Ipython
  * Notebooks
  * Tricks for python in a terminal

For the readers already working in Python, probably some of these items are already known. But I love shortcuts and ways to save time, so maybe you can still find something useful in what follows.

## **IPython**

An improved version of the typical python shell. Actually the &#8220;i&#8221; comes from &#8220;interactive&#8221;, but I would rather say that it&#8217;s more an improved version.

Installing ipython is as easy as any other package in python:

<p style="text-align: center;">
  <span style="font-family: 'courier new', courier, monospace;">pip install ipython</span>
</p>

In case you are in Ubuntu, you can also run

<p style="text-align: center;">
  <span style="font-family: 'courier new', courier, monospace;">sudo apt install python-ipython</span>
</p>

It&#8217;s not an error, since last versions, apt-get has been simplified to just [apt](https://itsfoss.com/apt-vs-apt-get-difference/). The advantages of ipython w.r.t. classical python shell are many, let&#8217;s enumerate some:

  * As in a unix terminal, you can autocomplete and see suggestions using the tab command. Something really appreciated when introducing filenames, names of variables, etc.
  * Using the alt key, ipython allows to move the cursor word by word. This feature is not available (at least in my Mac) when using the classical python shell
  * More explicit and colour-highlighted error messages
  * Basic UNIX shell integration (you can run simple shell commands such as cp, ls, rm, cp, etc. directly from the IPython command line)
  * Help to commands directly from terminal, e.g:

[<img class=" wp-image-327 aligncenter" src="/content/2017/11/ipython_help.png" alt="" width="540" height="290" srcset="/content/2017/11/ipython_help.png 1034w, /content/2017/11/ipython_help-300x161.png 300w, /content/2017/11/ipython_help-768x413.png 768w, /content/2017/11/ipython_help-1024x551.png 1024w" sizes="(max-width: 540px) 100vw, 540px" />](/content/2017/11/ipython_help.png)

<span style="font-size: 12pt;"><strong>Profiles</strong></span>

Have you ever been programming in your favorite IDE and thought: &#8220;Is numpy/pandas accepting this? I&#8217;m gonna try in a terminal a toy example, just to be sure&#8221;. Then you go to a terminal, write <span style="font-family: 'courier new', courier, monospace;">[i]python </span>and you have to write, for 334th time in a week, the famous:

<p style="text-align: center;">
  <span style="font-family: 'courier new', courier, monospace;">import numpy as np<br /> import pandas as pd</span>
</p>

Isn&#8217;t it possible to load them automatically? The answer is ipython profiles. So you can create a profile with your preferred libraries, and automatically import them from start. Step by step:

  1. Create a profile with: <span style="font-family: 'courier new', courier, monospace;">ipython profile create name_profile<br /> </span>

[<img class="alignnone size-full wp-image-329" src="/content/2017/11/ipython_profile_test.png" alt="" width="1646" height="782" srcset="/content/2017/11/ipython_profile_test.png 1646w, /content/2017/11/ipython_profile_test-300x143.png 300w, /content/2017/11/ipython_profile_test-768x365.png 768w, /content/2017/11/ipython_profile_test-1024x486.png 1024w" sizes="(max-width: 1646px) 100vw, 1646px" />](/content/2017/11/ipython_profile_test.png)

2. Modify the profile config file, e.g. with vim (see image above for location), as follows:

[<img class="alignnone wp-image-328" src="/content/2017/11/ipython_profile_config.png" alt="" width="578" height="366" srcset="/content/2017/11/ipython_profile_config.png 1122w, /content/2017/11/ipython_profile_config-300x190.png 300w, /content/2017/11/ipython_profile_config-768x486.png 768w, /content/2017/11/ipython_profile_config-1024x648.png 1024w" sizes="(max-width: 578px) 100vw, 578px" />](/content/2017/11/ipython_profile_config.png)

3. Launch ipython using the profile with: <span style="font-family: 'courier new', courier, monospace;">ipython &#8211;profile=profile_name</span>.

You can see in the first image how pd and np are understood without the need of importing. Notice that WordPress render the double dash as one large dash, so in this case there is a double &#8220;-&#8221; before profile, and similar for other cases below.

Ok, so once you have the profile created you can save the time to import those packages that you&#8217;re always using at the cost of using <span style="font-family: 'courier new', courier, monospace;">&#8211;profile=profile_name</span> after ipython. Not bad&#8230; but can this be ever more simplified? There are two options:

  1. Modify the default profile, found in the same directory as the profiles we create
  2. Create an alias, see last section in this post

## **Notebooks**

Jupyter notebooks are really powerful environments where you can develop applications not only in Python, but also other programming languages such as R . They are a complete world, and I&#8217;m not gonna explain the entire list of features they have. See an example [here](http://nbviewer.jupyter.org/github/e-mon/EnergyDataSimulationChallenge/blob/master/challenge1/analysis/e-mon/prediction.ipynb). As you can see they can be useful to present work to other people, but also to have a more dynamic environment where you can run just some pieces of the code, so standing as an intermediate player between the terminal an running code in IDEs.

Installing the notebook feature is as easy as

<p style="text-align: center;">
  <span style="font-family: 'courier new', courier, monospace;">pip install jupyter</span>
</p>

and you can run it by

<p style="text-align: center;">
  <span style="font-family: 'courier new', courier, monospace;">jupyter notebook</span>
</p>

This will open a tab in your browser, and you&#8217;ll be able to work in it. If you have conda installed, this same thing can be installed with

<p style="text-align: center;">
  <span style="font-family: 'courier new', courier, monospace;">conda install notebook</span>
</p>

I love keyboard shortcuts (more in the next section), and notebooks have many. The ones I more often use are:

  * intro (when a cell is selected): enter edit mode
  * esc (when editing a cell): exit edit mode
  * control+intro: execute current cell
  * shift+intro: execute current cell, and move to next cell
  * d twice: remove current cell
  * z: undo deletion
  * a/b: insert cell above/below
  * h: show help for other shortcuts

Another feature I like is notebook [themes](https://github.com/dunovank/jupyter-themes). Some of us don&#8217;t like to code in a black on white schema (white background, black fonts) , though there is a lot of controversy about this. To be honest, before writing this post I always thought that it was healthier for my eyes, but it turns out that it depends on the environment light, and also everyone eyesight. In any case, if you feel better or at least the same with dark themes, you can do your bit and saving battery and energy, which is both good for your pocket and your planet. Instructions can be found at the link.

## **Python in a terminal**

I highly recommend working in an Integrated Development Environment (IDE) to develop code and use Version Control System (VCS). My favorites are [Pycharm](https://www.jetbrains.com/pycharm/) and [Git](http://rogerdudler.github.io/git-guide/), respectively. They are free, popular, and enough for almost any task. However, in some situations we prefer/have to work in a python shell. Here I give you some tips and tricks to improve your experience in that situation.

The first resource I&#8217;m gonna share has worked for me in MacOS and Ubuntu, and I think it should do for all Unix-based systems as well. The idea is to save time when launching the python shell by the use of alias. To do so, edit the bash config file with

<p style="text-align: center;">
  <span style="font-family: 'courier new', courier, monospace;">sudo vim ~/.bash_profile</span>
</p>

and introduce your own aliases. Depending on your [system](https://www.cyberciti.biz/faq/ubuntu-linux-user-profile-bash-configuration/) you should edit the .bashrc file in the system location. Here some examples of aliases I currently use:

<p style="text-align: center;">
  <span style="font-family: 'courier new', courier, monospace;">alias i=ipython<br /> alias id=ipython &#8211;profile=dscience</span><br /> <span style="font-family: 'courier new', courier, monospace; font-size: 10pt;">alias notebook=&#8221;ipython notebook &#8211;notebook-dir=~/Dropbox/PycharmProjects/notebooks >/dev/null 2>&1 &&#8221;</span>
</p>

Remember that when editing the bash config files, you must source them, or close and open a new terminal to reload the config.

These alias just create shortcuts to save time, e.g:

[<img class="wp-image-330 aligncenter" src="/content/2017/11/i_ipython.png" alt="" width="460" height="100" srcset="/content/2017/11/i_ipython.png 960w, /content/2017/11/i_ipython-300x65.png 300w, /content/2017/11/i_ipython-768x166.png 768w" sizes="(max-width: 460px) 100vw, 460px" />](/content/2017/11/i_ipython.png)

Specially interesting is the last one, with which you can automate the directory opened for notebooks, and also the terminal can still be used while the notebook is running. Notice however that if you close the terminal, the notebook system is gonna break down, so take care. Also take care when copying the command, you probably will have to rewrite the double quotes and also for some reason WordPress writes the double dash (-) as one, so it&#8217;s: (double-dash)notebook(dash)dir. Apart from this, it should work both in Mac and Linux.

Another interesting resource I want to share is using a better terminal client than the one natively provided. In Mac I use [iTerm2](https://www.iterm2.com/features.html), whereas in Ubuntu (at work) I use [Terminator](https://apps.ubuntu.com/cat/applications/precise/terminator/). In addition to some better color scheme, the main advantage for me is that you can split the window in two terminals, and move from one to the other with control+tab. This is specially useful when building client-server applications, where you need two terminals at the same time.

Finally, some shortcuts useful when running ipython in a unix terminal. I&#8217;m not gonna be rigorous with the terminology, just explain what they do in plain English:

  * control+c: kills the current process. When you are in Python terminal, it&#8217;s useful to delete the current line, so saving time specially if it&#8217;s long.
  * control+d: when pressed in Python terminal, you are asked to type yes or no to confirm exiting. The default is yes, so if you press intro the python shell ends. This saves you some (mili)seconds at the end of a week by pressing control+d+enter.
  * control+z: send to sleep (background) current process. This can be useful if you want to try something in terminal without losing your workspace in Python. Or if you want to work with two different python environments at the same time, since typing Python will start a new and completely independent environment. To return to the last slept process, run <span style="font-family: 'courier new', courier, monospace;">fg</span> (foreground). A list of the current processes in a terminal can be obtained by running <span style="font-family: 'courier new', courier, monospace;">jobs</span>. More info about this [here](http://www.thegeekstuff.com/2010/05/unix-background-job/).
  * I love using _home_ and _end_ buttons, but in my Mac I don&#8217;t have them, and first days I was really disappointed. In some applications, such as in the browser, you can move cursor to beginning and end of line by pressing cmd+left/right cursor, but it doesn&#8217;t work in the terminal. In such a case, the default shortcut is control+a and control+e. This works for the ipython shell as well.

## **Conclusion**

Today we have reviewed some tips and tricks for working with Python in a more agile way.  There are many many other things that I could recommend, but they&#8217;ll probably be matter of future posts. Mainly, we have reviewed the usefulness of ipython as a better interface to run python commands rather than the classical shell; notebooks as an innovate way of working and presenting work with Python; and finally some tips and tricks for using Python and related tools in a terminal.

I hope you enjoy this post and found something useful in it.None of the tools presented here are strictly necessary, but they make our life easier 🙂

As always, any recommendation, suggestion or improvement, please welcome. Thanks for reading!

<div id="wp-ulike-post-326" class="wpulike wpulike-default " >
  <div class="wp_ulike_general_class wp_ulike_is_unliked">
    <a data-ulike-id="326" data-ulike-nonce="699d24995b" data-ulike-type="likeThis" data-ulike-status="3" class="wp_ulike_btn wp_ulike_put_image"> </a> <span class="count-box">1+</span>
  </div>
</div>
