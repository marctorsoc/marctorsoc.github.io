---
title: uv and warp
date: '2025-01-10 00:00:00 +0000'
permalink: /posts/uv-and-warp
categories:
- Dev tools
isPinned: true
---

Today, I'm sharing a couple of tools I've been using recently and have been real **game-changers**. On the one hand, [uv](https://docs.astral.sh/uv) is an **ultra-fast** Python Package Manager that comes to replace [pip-tools](https://github.com/jazzband/pip-tools) and [conda](https://docs.conda.io/projects/conda/en/latest/user-guide/getting-started.html) in my case. On the other hand, [warp](https://www.warp.dev/) is an **AI-powered terminal** that made me move from [iterm2](https://iterm2.com/). Let's get started 🚀

## **uv**: The Rust-Powered Python Package Manager

### A little bit of my background

I've been using Python for years, and like many data scientists, I started using [conda](https://docs.conda.io/projects/conda/en/latest/user-guide/getting-started.html) for the Python environment management. With [conda](https://docs.conda.io/projects/conda/en/latest/user-guide/getting-started.html) I would:
- **Environment management**: `conda` creates isolated environments, that can be used to manage each project, so each project can have its own set of dependencies, their versions, but also potentially its **own Python version**. These environments are typically installed in the home directory, separated from the code. This was "the Python way" for me, even though for my pet project [LinguaQuest](https://play.google.com/store/apps/details?id=com.marc.torsoc.linguaquest) I was using `npm` and there, it looked to me more like the native `venv` module I was avoiding with `conda`.
- **Package Management for Non-Python Dependencies**:  A major strength of `conda` is its ability to manage dependencies that are not Python packages.  Many scientific computing packages rely on underlying C/C++ libraries, Fortran libraries, or other system-level dependencies.  Conda can install and manage these dependencies, which pip struggles with.
- **Binary Package Installations**: `Conda` often installs packages as pre-compiled binaries. This can be significantly faster than building packages from source, which is often what `pip` does.

Then I would have a `setup.py` declaring the dependencies for the project and `pip install` it.

However, when working in production projects, you want to make sure that the environment is reproducible. So you pin dependencies. The classical simple approach is to `pip freeze > requirements.txt`. 

But then, upgrading dependencies becomes a nightmare because we're pinning sub-dependencies. And conflict resolution is solved by pip, which a) might not be accurate, b) is terribly slow. Sometimes it has to download the package to understand its dependencies.

At the end of my adventure with Eigen, we started using [poetry](https://python-poetry.org/). This was solving some problems with dependency resolution, but was **realy really slow**.

Later, during my time at Globality we used [pip-tools](https://github.com/jazzband/pip-tools) to define projects' dependencies. This would look into the dependencies declared in `setup.py`, and generate a `requirements.txt` file. It was working well for most of the issues, but still, was really slow.

### uv to the rescue!

Built in Rust, `uv` resolves dependencies [10–100x faster](https://medium.com/@vanessagaigher/python-package-managers-is-uv-really-faster-than-poetry-478da7ff43e4) than `pip/poetry`. It also uses global caching and parallel processing to minimize redundant downloads (e.g., cached installations take ~2s vs 41s for pip). `uv` looks a bit closer to `npm` for Node.js than `conda`. It also creates a `uv.lock` file, but you just manage the `pyproject.toml` file. And the environment is created right inside the project within the `.venv` directory. In their words, it is

<div class="flex flex-col items-center justify-center space-y-4">
<em>A single tool to replace pip, pip-tools, pipx, poetry, pyenv, twine, virtualenv, and more.</em>
</div>

and for me, this means that I could remove `conda` and `pip-tools` from my workflow, and just stick to `uv`.


### Basic Commands
There is great [documentation](https://docs.astral.sh/uv), and it's not really worth replicating it here. 

#### Project Initialization
   Create a new Python project with `uv init`, which generates a `pyproject.toml` file and basic project structure:
   ```bash
   uv init myproject  # Creates project files and a virtual environment 
   ```
   Now you'll see

   ```bash
  $ tree myproject
  myproject/
   ├── pyproject.toml
   └── hello.py
   └── README.md
   └── .python-version
   └── .gitignore
   ```
   After this, I recommend doing `uv run hello.py` so the environment is created in `.venv`. Note that every time you do `uv run`, if there are dependencies that are not installed in the virtual environment, they will be automatically installed. See all details in [the documentation](https://docs.astral.sh/uv/concepts/projects/init/#applications).

#### Dependency Management
   Add or remove packages with `uv add` and `uv remove`, which automatically update the `uv.lock` file for reproducible builds:
   ```bash
   uv add pandas  # Installs pandas and its dependencies 
   uv remove requests  # Removes a package and its unused dependencies 
   uv add "httpx>=0.20"  # You can specify package versions with constraints 
   uv add "httpx @ git+https://github.com/encode/httpx"  # Install from git
   uv add ../httpx  # Install from local directory 
   ```
  To update a dependency, use also `uv add`.


#### Environment Synchronization
   Use `uv sync` to ensure the virtual environment matches the lockfile:
   ```bash
   uv sync  # Creates/updates .venv and resolves dependencies 
   ```

#### Updating the Python version

Simply go to the `.python-version` file and change the version number. Then, when you do `uv run`, it will automatically update the virtual environment and resolve dependencies.

#### A real example

This is a real example of `pyproject.toml` file for one of my personal projects:
```toml
[project]
name = "devs-scraper"
version = "0.1.0"
description = """
    A scraper for developments
"""
authors = [
    { name = "marctorsoc" }
]
readme = "README.md"
requires-python = ">=3.12"
dependencies = [
    "langchain>=0.3.15",
    "langchain-ollama>=0.2.2",
    "langfuse>=2.57.11",
    "langgraph>=0.2.65",
    "ollama>=0.4.6",
    "python-dotenv>=1.0.1",
    ...
    "nbconvert>=7.16.6",
]

[tool.uv.sources]
crawl4ai = { git = "https://github.com/marctorsoc/crawl4ai" }
deboiler = { git = "https://github.com/marctorsoc/deboiler" }

[project.scripts]
scrape = "scrape:main"

[build-system]
requires = ["setuptools>=64", "wheel", "cython"]
build-backend = "setuptools.build_meta"

[tool.setuptools]
packages = ["devs_scraper"]

[tool.setuptools.packages.find]
exclude = ["*.tests", "*.tests.*", "tests.*", "tests"]
```

Notes:
* Please see docs [here](https://docs.astral.sh/uv/concepts/projects/config/#build-systems) about configuring the build system. In this case, I chose `setuptools` as the backend. Note that if a build system is not defined, `uv` won't install the project itself, just the dependencies.
* See how to declare dependencies that are not in Pypi, e.g. in Github. I made a fork of each repository to be able to share the code with others. However, you can also use as source a local package and add it like explained above. That will create a new source, e.g. `deboiler = { path = "../deboiler" }`.
* You probably don't need both the section `[tool.setuptools]` and `[tool.setuptools.packages.find]`. Just use one of them to locate the package to be installed.

### Advanced Workflows
- **Jupyter from VSCode Integration**: While there is a [guide](https://docs.astral.sh/uv/guides/integration/jupyter/#using-jupyter-from-vs-code) on how to do this, I'd recommed simply make `.venv/bin/python` the kernel for the notebook. You don't really need to do anything, just click on the proper buttons 😁.
- **Docker & FastAPI support**: Check the official guides:  
  - [FastAPI Integration](https://docs.astral.sh/uv/guides/integration/fastapi/)   
  - [Docker Integration](https://docs.astral.sh/uv/guides/integration/docker/) 


## **Warp**: The AI-Powered Terminal for Modern Developers

Warp reimagines the terminal with features that boost productivity and reduce friction.

### A little bit of my background

When I started using terminals, I quickly figured I could not continue with the default one. Quickly I moved into the [Terminator](https://gnome-terminator.org/) and later on to [iterm2](https://iterm2.com/). They are both great, but the era of AI came.

### Key Features
1. **Agent Mode (AI Integration)**  
   - **Error Debugging**: Get explanations and fixes for errors directly in the terminal.
   - **Code Generation**: Generate scripts or commands using natural language (e.g., "Give me the command to check what's on port 8089").  

2. **IDE-Like Editing**  
   Edit commands directly in the terminal with syntax highlighting, multi-line support, easy copy-paste, and more.

2. **Smart Autocompletion**  
   Context-aware suggestions for commands, flags, and file paths, powered by your command history and system context.

4. **Typo Correction**  
   Warp detects typos (e.g., `got commit` → suggests `git commit`) and offers fixes.

3. **Split Panes**  
   Run multiple commands simultaneously in split views, ideal for monitoring logs or parallel workflows.


## Conlusion

Today, I've shared two powerful tools that I use every day:

- **uv** excels in Python workflows with speed and reproducibility.
- **Warp** transforms terminal usage into an AI-enhanced experience.  

Both tools prioritize developer ergonomics, making them indispensable for modern coding. Explore their full potential through their official documentation and community resources!
