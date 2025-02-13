const e=`---
title: Troubleshooting Docker
date: '2023-08-25 00:00:00 +0000'
permalink: /posts/docker
categories:
- Dev tools
isPinned: true
---

When I started moving beyond simple experiments and into the world of deploying AI models to production, the importance of Docker became crystal clear.  It wasn't just about making things run smoothly on my own machine anymore; it was about ensuring reliability, scalability, and maintainability in a real-world setting.  That's when I realized Docker wasn't optional – it was *essential*.  

This post focuses on the Docker commands and troubleshooting skills I found critical for taking AI projects from the lab to production. The first version of this post was written while I was at Globality, where we would containerize our AI models, train with AWS Sagemaker, and deploy to ECS. Sometimes the model would fail to train. Sometimes it would fail to deploy. Let’s get started 🚀

## Docker 101

### Core concepts

Docker is a containerization tool that allows you to package an application along with its dependencies into a lightweight, standalone container. This means that you can run the same application on any machine as long as it has Docker installed.

You might find a more comprehensive overview [here](https://docs.docker.com/get-started/docker-overview/#docker-objects), but let's cover a few concepts:
* **Container**: A container is an isolated environment that runs a single application.  It has its own file system, network stack, and processes.
* **Images**: These are like templates for containers. An image allows you to create multiple containers from it.  You can think of an image as a blueprint for building a container. Another analogy is that Docker *images are like classes* of any OOP language, and *containers are like instances* of those classes.
* **Registry**: A registry is a cloud location where images are stored. Dockerhub is the most popular public registry (like PyPi for Python packages) where you can store and share your own custom Docker images. While Docker Hub is the default and often the first place people go, organizations often use private registries for internal images that they don't want to share publicly. For AWS, that'd be [ECR](https://aws.amazon.com/es/ecr/).
* **Repository**: A repository is a collection of images. It's like a folder in your file system where all the images for your project are stored.

### Basic commands

Docker can seem intimidating at first, but mastering a few core commands will get you a long way.  This section covers the essentials to get you started.

#### Images

*   **\`docker pull <image_name>:<tag>\`:** Downloads an image from a registry (like Docker Hub).  If you don't specify a tag, it defaults to \`latest\`.  Example: \`docker pull ubuntu:latest\`
*   **\`docker images\`:** Lists all locally stored images. You can see both the image name and image id for each image.
*   **\`docker rmi <image_id>\` or \`docker rmi <image_name>\`:** Removes a local image. Be careful, you can't remove an image that's currently in use by a container.

#### Containers

* **\`docker build -t <image_name> .\`:** Builds an image from a Dockerfile in the current directory.

*   **\`docker run <image_name>\`:** Creates and starts a container from an image.  This is where you'll often add options:
    *   \`-d\`: Runs the container in detached mode (background).
    *   \`-p <host_port>:<container_port>\`: Publishes a container's port to the host.  Essential for accessing your application. Example: \`-p 8080:80\` maps port 80 inside the container to port 8080 on your machine.
    *   \`-v <host_path>:<container_path>\`: Mounts a volume (directory) from the host into the container.  Useful for persisting data and sharing code. Example: \`-v /path/on/host:/path/in/container\`
    *   \`--name <container_name>\`: Gives your container a memorable name.

*   **\`docker ps\`:** Lists running containers, while \`docker ps -a\` to list also stopped containers.
*   **\`docker {stop,restart,rm} {<container_id>,<container_name>}\`**: Stops, restarts or removes containers, based on id or name.

## Dockerfile

A Dockerfile is used to automate the creation of a Docker images. It defines a series of commands that will be executed when building an image. Here's a simple example:
\`\`\`dockerfile
# Start from a base image from Dockerhub.
FROM python:3.12-slim

# Install uv.
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

# Create a folder called app-folder for our app within the container
WORKDIR /app-folder

# Copy the application into the container, into /app-folder
COPY . .

# Install the application dependencies
RUN uv sync --frozen --no-cache

# Run the application
CMD [".venv/bin/fastapi", "run", "app/main.py", "--port", "80", "--host", "0.0.0.0"]
\`\`\`
inspired by uv's documentation [here](https://docs.astral.sh/uv/guides/integration/fastapi/#deployment). You might find the full code at my repo [here](https://github.com/marctorsoc/fastapi-with-uv-example). I simplified the source a bit to make clearer what the \`WORKDIR\` command does. Now, we would first build:
\`\`\`bash
docker build -t fastapi-with-uv-example .         
\`\`\`
and then run:
\`\`\`bash
docker run -p 8000:80 -it fastapi-with-uv-example
\`\`\`
Then, we can start a browser on http://localhost:8000/docs to see the FastAPI docs. If we don't want to see the logs, we can use \`-d\` to run it in detached mode, even though I suggest running it in a tmux session.

## Troubleshooting with the toy example


### How do I get into the container?

Let's say that we want to get into the container and run the app ourselves, or check something. This can be done as follows:
\`\`\`bash
docker run -it fastapi-with-uv-example bash
\`\`\`
This will *create* the container and give us a shell inside the container. We need \`-i\` to make the container interactive, \`-t\` to allocate a pseudo-TTY (terminal), and \`bash\` to run bash inside the container. This is actually overwriting the \`CMD\` from the Dockerfile above, with a new command.

If you rather want to get into a *running container*, then you'll do this instead:
\`\`\`bash
docker ps
docker exec -it <container name> /bin/bash
\`\`\`
Note that \`exec\` runs a command within a running container, while \`run\` starts the container and then runs the command. And by the way, to see the logs of such running container, we can do:
\`\`\`bash
docker logs -f <container name>
\`\`\`


### What's the difference between \`CMD\` and \`ENTRYPOINT\`?

The \`CMD\` and \`ENTRYPOINT\` are both used to specify a default command or program that should be executed when the container starts. However, they have different behaviors:
- \`ENTRYPOINT\` specifies a program that will be executed when the container starts. It can take arguments, but it's an executable program itself. It is overwritten by using \`--entrypoint\` with \`docker run\`.
- \`CMD\` specifies a default command that will be executed when the container starts. It can take arguments, but it's not an executable program itself. It is overwritten by adding arguments at the end of \`docker run\`, like we did with \`bash\`. 

Note that \`CMD\` can be used in conjuction with \`ENTRYPOINT\`, to give arguments to the executable from \`ENTRYPOINT\`, but that's a bit of a hack. 

### How to open a JupyterLab server to play from within the Docker container?

This might be a way to check dependencies, outputs or to debug in general with a nicer interace. First, let's run like this:
\`\`\`bash
docker run -p 8000:80 -p 8000:81 -it fastapi-with-uv-example bash
\`\`\`
This way we have one port for the FastAPI server and another for the JupyterLab server. Now, we would create a tmux session and run the FastAPI server, that we can check at http://localhost:8000/. Then we can open another tmux session and run:
\`\`\`bash
uv add jupyterlab
uv run jupyter lab --port 81 --no-browser -—allow-root --ip "0.0.0.0"
\`\`\`
Note that 1) it’s not "host" but "ip", and 2) we need the IP 0.0.0.0 to bind all network interfaces, which allows external connections to reach the JupyterLab server.


## Memory issues

During my time at Globality, I experimented several issues when training ML models, that were related to memory. That's why I found a bunch of tips and tricks that might be useful if you're in a similar situation.

### Ensuring all memory is shared

This is a bit more complicated that the question I posed, but if you are debugging and cannot make a high-performance computing application to work (like when training an ML model), it might help to add \`--ipc=host\` to the \`docker run\` command. See full reference in the Docker docs, since it comes with risks.

### Limiting container memory

To properly simulate the environment in production, you can limit the memory available to the container by using the \`--memory\` and \`--memory-swap\` flags (plus a few others, see Docker documentation).

Here an example:
\`\`\`bash
docker run --memory="10000m" --memory-swap=0 -it -v /<path-in-host>":<path-in-container>" --gpus all <docker-id> bash
\`\`\`
For ubuntu, this capability is not available immediately after Docker installation. See [this page](https://www.serverlab.ca/tutorials/containers/docker/how-to-limit-memory-and-cpu-for-docker-containers/) for instructions to enable it (verified on ubuntu 18.04).
To verify that the memory limit is applied once the container is running, and to see memory usage in real time, run \`docker stats\`.

### Checking memory limits within Docker container

The \`docker run\` container can be run with memory limits, as explained in [Check mem_limit within a docker container](https://stackoverflow.com/questions/42187085/check-mem-limit-within-a-docker-container). To check all limits that are set, add the following to one of the first lines of code that are run within the app:
\`\`\`python
try: 
   os.system("more /sys/fs/cgroup/memory/memory.* | cat") 
except Exception as e: 
   self.logger.info(e) 
   self.logger.info("Problem running \`more /sys/fs/cgroup/memory/memory.* | cat\`")
\`\`\`
See [here](https://www.kernel.org/doc/Documentation/cgroup-v1/memory.txt) for explanation of the fields. The most relevant are:

* memory.soft_limit_in_bytes

* memory.limit_in_bytes

* memory.memsw.limit_in_bytes

* memory.kmem.limit_in_bytes

You might also look at the \`*usage_in_bytes\` just to double-check the memory at that point is low.


## Problems with gpus

First make sure you are passing \`--gpus all\` to \`docker run\`. Then, you might also need

\`\`\`bash
sudo apt install nvidia-container-toolkit
sudo apt install nvidia-cuda-toolkit
sudo systemctl restart docker
\`\`\`

Now, e.g:

\`\`\`bash
watch -n 0.5 nvidia-smi 
\`\`\`
to keep track of GPU memory every 0.5 seconds.

## Rebuilding the Dockerfile

The following will give you an approximate idea of how the Docker container was created. Note that this will show ALL parents, so if you container inherits from others, it will include those as well:


\`\`\`bash
docker history --no-trunc -q <docker-id> > dockerfile_recreated
\`\`\`

## Docker Compose

If your application consists of multiple containers, Docker Compose simplifies management. It uses a \`docker-compose.yml\` file to define the services (containers) and their relationships. Here is an example of an app having backend, frontend, and a database:

\`\`\`yaml
version: "3.9"

services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    depends_on:
      - db
    environment:
      - DATABASE_URL=postgresql://user:password@db:5432/dbname
    volumes:
      - db_data:/var/lib/postgresql/data

  frontend:
    build: ./frontend
    ports:
      - "3000:80"
    depends_on:
      - backend

  db:
    image: postgres:13-alpine
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=dbname
    volumes:
      - db_data:/var/lib/postgresql/data

volumes:
  db_data:
\`\`\`
And the essential commands here:
*   **\`docker-compose up\`:** Builds (if necessary) and starts all the services defined in the \`docker-compose.yml\` file. Add \`-d\` for detached mode.
*   **\`docker-compose down\`:** Stops and removes the containers defined in the \`docker-compose.yml\` file.
`;export{e as default};
