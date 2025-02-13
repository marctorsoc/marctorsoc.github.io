---
title: Data Science on a Remote Machine
date: '2025-02-08 00:00:00 +0000'
permalink: /posts/data-science-in-remote/
categories:
- Dev tools
isPinned: false
---

In this post, I'll share some practical tips and tricks for using a remote machine for data science, covering first the why, then connection, tmux and more.

*Disclaimer: all info written in this post assumes a Mac as your local, and Ubuntu as remote. Most of it should work also with other combinations of these two.*

## Why Work on a Remote Machine?

There are several reasons to work on a remote machine, including:

- **Resource Limitations:** Running computationally heavy tasks that require more CPU, memory, or storage than your local machine can handle.  
- **Accessibility:** Accessing your environment from different locations when you're away from your primary computer.  
- **Collaboration:** Sharing a centralized machine with other team members for easier data and environment access.  
- **Security:** Using secure remote environments for sensitive data that shouldn't reside on a local device.  
- **Scalability:** Leveraging cloud-based resources that can be scaled up or down depending on workload needs.  
 
## Accessing a Remote Machine

To access a remote server, you can use:

```bash
ssh username@ip_address
```

This requires entering your password, but you can set up passwordless access using SSH keys:

1. Generate an SSH key pair locally:
   ```bash
   ssh-keygen -t rsa
   ```
2. Create the `.ssh` directory on the remote machine:
   ```bash
   ssh username@ip_address 
   mkdir -p .ssh
   ```
3. Copy the public key to the remote machine:
   ```bash
   cat .ssh/id_rsa.pub | ssh username@ip_address 'cat >> .ssh/authorized_keys'
   ```

## Simplifying SSH with Configuration

Instead of typing full SSH commands, configure shortcuts in `~/.ssh/config`:

```bash
Host marc
  HostName ip_address
  User username
  IdentityFile ~/.ssh/id_rsa
```

Now you can simply use:

```bash
ssh marc
```

and the same for any other command where you would write `username@ip_address`. You'll see some examples below.

## File Transfer

### Using `scp`

Transfer files between your local machine and the remote server.

- From remote to local:
  ```bash
  scp marc:~/titanic.log .
  ```
- From local to remote:
  ```bash
  scp -r ~/experiments/results marc:~/results/
  ```

### Using `rsync`

Synchronize directories efficiently with `rsync`. The following command synchronizes files from the remote machine to the local directory, skipping files that already exist:

```bash
rsync -arv --ignore-existing --progress marc:/home/marc/results experiments/results/
```

## Running Shells in the Background

Running long processes remotely requires keeping them active even if the connection drops. While `screen` is an option, I prefer using `tmux`. Here a cheatsheet of `tmux` commands:

- List sessions:
  ```bash
  tmux ls
  ```
- Create a new session:
  ```bash
  tmux new -s name
  ```
- Attach to an existing session:
  ```bash
  tmux attach -t name
  ```
- Detach from a session (`Control + b`, then `d`)
- Kill all sessions:
  ```bash
  killall tmux
  ```
- Scrolling: Enter scroll mode with `Control + b` followed by `[`. Navigate using arrow keys. To exit scroll mode, press `q`.

## VS Code's Remote Development: A Game Changer

If you checked my old posts, you'll see I was big proponent of Pycharm over VSCode. However, I used to run notebooks on a Jupyter server, and then connected via browser after setting up a tunnel. You can check [here](/posts/jupyter-lab-on-a-remote-machine/) my old config if still useful at all. I really liked Pycharm's Git integration, especially for merges and comparing branches. And, to be honest, I still think it's a better inferface than the one in VSCode. At least with all extensions I tried.

But at some point I found VSCode's Remotes feature, and it really became a game changer for me. VSCode supports:
- Opening notebooks directly in the IDE, which means you get all the advantages of being an IDE (code and imports completion, error highlighting, search, debugging, etc.)
- Running notebooks on the remote machine, with the same experience as if it was running locally
- LLM-powered autocomplete within the notebook itself!
- A table of contents (called Outline) to navigate the notebook.


 ## Conclusion

In this post, I shared some good practices for working with a remote machine, especially for data science projects. With these tools and techniques, you'll be more efficient and productive when working remotely.

As always, any recommendation, suggestion or improvement, please let me know. Thanks for reading!
