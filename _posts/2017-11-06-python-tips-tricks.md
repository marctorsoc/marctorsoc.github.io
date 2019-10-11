---
title: Python tips & tricks
date: '2017-11-06 01:51:21 +0000'
permalink: /posts/python-tips-tricks/
categories:
- Divulgation
---

<p style="text-align: justify;">Today I'm going to explain some of the lessons and tools I've found that could be useful for someone developing data science (and also general purpose projects) in Python:</p>

  * Ipython
  * Notebooks
  * Tricks for python in a terminal

<p style="text-align: justify;">For the readers already working in Python, probably some of these items are already known. But I love shortcuts and ways to save time, so maybe you can still find something useful in what follows.</p>

**IPython**

<p style="text-align: justify;">An improved version of the typical python shell. Actually the "i" comes from "interactive", but I would rather say that it's more an improved version.</p>

<p style="text-align: justify;">Installing ipython is as easy as any other package in python:</p>

<p style="text-align: center;">
  <span style="font-family: 'courier new', courier, monospace;">pip install ipython</span>
</p>

In case you are in Ubuntu, you can also run

<p style="text-align: center;">
  <span style="font-family: 'courier new', courier, monospace;">sudo apt install python-ipython</span>
</p>

<p style="text-align: justify;">Hey, it's not a mistake. , since last versions, apt-get has been simplified to just <a href="https://itsfoss.com/apt-vs-apt-get-difference/">apt</a>. The advantages of ipython w.r.t. classical python shell are many, let's enumerate some:</p>

  * <p style="text-align: justify;">As in a unix terminal, you can autocomplete and see suggestions using the tab command. Something really appreciated when introducing filenames, names of variables, etc.</p>
  * <p style="text-align: justify;">Using the alt key, ipython allows to move the cursor word by word. This feature is not available (at least in my Mac) when using the classical python shell</p>
  * <p style="text-align: justify;">More explicit and colour-highlighted error messages</p>
  * <p style="text-align: justify;">Basic UNIX shell integration (you can run simple shell commands such as cp, ls, rm, cp, etc. directly from the IPython command line)</p>
  * <p style="text-align: justify;">Help to commands directly from terminal, e.g:</p>

  <div style="text-align: center">
    <img src="/content/ipython_help.png" alt="" width="80%" />
  </div> <p> </p>

<span style="font-size: 12pt;"><strong>Profiles</strong></span>

<p style="text-align: justify;">Have you ever been programming in your favorite IDE and thought: "Is numpy/pandas accepting this? I'm gonna try in a terminal a toy example, just to be sure". Then you go to a terminal, write <span style="font-family: 'courier new', courier, monospace;">[i]python </span>and you have to write, for 334th time in a week, the famous:</p>

<p style="text-align: center;">
  <span style="font-family: 'courier new', courier, monospace;">import numpy as np<br /> import pandas as pd</span>
</p>

<p style="text-align: justify;">Isn't it possible to load them automatically? The answer is ipython profiles. So you can create a profile with your preferred libraries, and automatically import them from start. Step by step:</p>

  1. Create a profile with: <span style="font-family: 'courier new', courier, monospace;">ipython profile create name_profile<br /> </span>

  <div style="text-align: center">
    <img src="/content/ipython_profile_test.png" alt="" width="80%" />
  </div> <p> </p>

2. Modify the profile config file, e.g. with vim (see image above for location), as follows:

<div style="text-align: center">
  <img src="/content/ipython_profile_config.png" alt="" width="80%" />
</div> <p> </p>

3. Launch ipython using the profile with: <span style="font-family: 'courier new', courier, monospace;">ipython &#8211;profile=profile_name</span>.

<p style="text-align: justify;">You can see in the first image how pd and np are understood without the need of importing. Notice that WordPress render the double dash as one large dash, so in this case there is a double "-" before profile, and similar for other cases below.</p>

<p style="text-align: justify;">Ok, so once you have the profile created you can save the time to import those packages that you're always using at the cost of using <span style="font-family: 'courier new', courier, monospace;">&#8211;profile=profile_name</span> after ipython. Not bad&#8230; but can this be ever more simplified? There are two options:</p>

  1. Modify the default profile, found in the same directory as the profiles we create
  2. Create an alias, see last section in this post

**Notebooks**

<p style="text-align: justify;">Jupyter notebooks are really powerful environments where you can develop applications not only in Python, but also other programming languages such as R. They are a complete world, and I'm not gonna explain the entire list of features they have. See an example <a href="https://nbviewer.jupyter.org/github/marctorrellas/christmas_routes/blob/master/christmas_routes.ipynb">here</a>. As you can see they might be useful to present work to other people, but also to have a more dynamic environment where you can run just some pieces of the code, so standing as an intermediate player between the terminal an running code in IDEs.</p>

Installing the notebook feature is as easy as

<p style="text-align: center;">
  <span style="font-family: 'courier new', courier, monospace;">pip install jupyter</span>
</p>

and you can run it by

<p style="text-align: center;">
  <span style="font-family: 'courier new', courier, monospace;">jupyter notebook</span>
</p>

<p style="text-align: justify;">This will open a tab in your browser, and you'll be able to work in it. If you have conda installed, this same thing can be installed with</p>

<p style="text-align: center;">
  <span style="font-family: 'courier new', courier, monospace;">conda install notebook</span>
</p>

<p style="text-align: justify;">I love keyboard shortcuts (more in the next section), and notebooks have many. The ones I more often use are:</p>

  * intro (when a cell is selected): enter edit mode
  * esc (when editing a cell): exit edit mode
  * control+intro: execute current cell
  * shift+intro: execute current cell, and move to next cell
  * d twice: remove current cell
  * z: undo deletion
  * a/b: insert cell above/below
  * h: show help for other shortcuts

<p style="text-align: justify;">Another feature I like is notebook <a href="https://github.com/dunovank/jupyter-themes">themes</a>. Some of us don't like to code in a black on white schema (white background, black fonts) , though there is a lot of controversy about this. To be honest, before writing this post I always thought that it was healthier for my eyes, but it turns out that it depends on the environment light, and also everyone eyesight. In any case, if you feel better or at least the same with dark themes, you can do your bit and saving battery and energy, which is both good for your pocket and your planet. Instructions can be found at the link.</p>

 **Python in a terminal**

<p style="text-align: justify;">I highly recommend working in an Integrated Development Environment (IDE) to develop code and use Version Control System (VCS). My favorites are <a href="https://www.jetbrains.com/pycharm/">Pycharm</a> and <a href="http://rogerdudler.github.io/git-guide/">Git</a>, respectively. They are free, popular, and enough for almost any task. However, in some situations we prefer/have to work in a python shell. Here I give you some tips and tricks to improve your experience in that situation.</p>

<p style="text-align: justify;">The first resource I'm gonna share has worked for me in MacOS and Ubuntu, and I think it should do for all Unix-based systems as well. The idea is to save time when launching the python shell by the use of alias. To do so, edit the bash config file with</p>

<p style="text-align: center;">
  <span style="font-family: 'courier new', courier, monospace;">sudo vim ~/.bash_profile</span>
</p>

<p style="text-align: justify;">and introduce your own aliases. Depending on your <a href="https://www.cyberciti.biz/faq/ubuntu-linux-user-profile-bash-configuration/">system</a> you should edit the .bashrc file in the system location. Here some examples of aliases I currently use:</p>

<p style="text-align: center;">
  <span style="font-family: 'courier new', courier, monospace;">alias i=ipython<br /> alias id=ipython &#8211;profile=dscience</span><br /> <span style="font-family: 'courier new', courier, monospace; font-size: 10pt;">alias notebook="ipython notebook &#8211;notebook-dir=~/Dropbox/PycharmProjects/notebooks >/dev/null 2>&1 &"</span>
</p>

<p style="text-align: justify;">Remember that when editing the bash config files, you must source them, or close and open a new terminal to reload the config.</p>

These alias just create shortcuts to save time, e.g:

<div style="text-align: center">
  <img src="/content/i_ipython.png" alt="" width="80%"/>
</div> <p> </p>

<p style="text-align: justify;">Specially interesting is the last one, with which you can automate the directory opened for notebooks, and also the terminal can still be used while the notebook is running. Notice however that if you close the terminal, the notebook system is gonna break down, so take care. Also take care when copying the command, you probably will have to rewrite the double quotes (blogging issues...), so it's: (double-dash)notebook(dash)dir. Apart from this, it should work both in Mac and Linux.</p>

<p style="text-align: justify;">Another interesting resource I want to share is using a better terminal client than the one natively provided. In Mac I use <a href="https://www.iterm2.com/features.html">iTerm2</a>, whereas in Ubuntu one might use <a href="https://apps.ubuntu.com/cat/applications/precise/terminator/">Terminator</a>. In addition to some better color scheme, the main advantage for me is that you can split the window into two terminals, and move from one to the other with control+tab, or the shortcut of your choice. This is specially useful when building client-server applications, where you need two terminals at the same time.</p>

<p style="text-align: justify;">Finally, some shortcuts useful when running ipython in a unix terminal. I'm not gonna be rigorous with the terminology, just explain what they do in plain English:</p>

  * <p style="text-align: justify;">control+c: kills the current process. When you are in Python terminal, it's useful to delete the current line, so saving time specially if it's long.</p>
  * <p style="text-align: justify;">control+d: when pressed in Python terminal, you are asked to type yes or no to confirm exiting. The default is yes, so if you press intro the python shell ends. This saves you some (mili)seconds at the end of a week by pressing control+d+enter.</p>
  * <p style="text-align: justify;">control+z: send to sleep (background) current process. This can be useful if you want to try something in terminal without losing your workspace in Python. Or if you want to work with two different python environments at the same time, since typing Python will start a new and completely independent environment. To return to the last slept process, run <span style="font-family: 'courier new', courier, monospace;">fg</span> (foreground). A list of the current processes in a terminal can be obtained by running <span style="font-family: 'courier new', courier, monospace;">jobs</span>. More info about this <a href="http://www.thegeekstuff.com/2010/05/unix-background-job/">here</a>.</p>
  * <p style="text-align: justify;">I love using *home* and *end* buttons, but in my Mac I don't have them, and first days I was really disappointed. In some applications, such as in the browser, you can move cursor to beginning and end of line by pressing cmd+left/right cursor, but it doesn't work in the terminal. In such a case, the default shortcut is control+a and control+e. This works for the ipython shell as well.</p>

 **Conclusion**

<p style="text-align: justify;">Today we have reviewed some tips and tricks for working with Python in a more agile way.  There are many many other things that I could recommend, but they'll probably be matter of future posts. Mainly, we have reviewed the usefulness of ipython as a better interface to run python commands rather than the classical shell; notebooks as an innovate way of working and presenting work with Python; and finally some tips and tricks for using Python and related tools in a terminal.</p>

<p style="text-align: justify;">I hope you enjoy this post and found something useful in it.None of the tools presented here are strictly necessary, but they make our life easier 🙂</p>

<p style="text-align: justify;">As always, any recommendation, suggestion or improvement, please welcome. Thanks for reading!</p>
