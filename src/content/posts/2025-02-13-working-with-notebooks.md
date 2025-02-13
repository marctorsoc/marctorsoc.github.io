---
title: Working with notebooks
date: '2025-02-13 00:00:00 +0000'
permalink: /posts/working-with-notebooks
categories:
- Dev tools
isPinned: true
---

In data science, experimentation is key. You often need to explore datasets, visualize results, tweak models, and iterate quickly. **Jupyter notebooks** provide an ideal environment for this workflow:

* 📝 Interactive execution: Run code in small, manageable chunks instead of executing entire scripts.
* 📊 Rich outputs: Easily display tables, charts, and even interactive visualizations inline.
* 🔄 Reproducibility: Keep code, results, and documentation together in a structured way.

Because of these benefits, Jupyter notebooks have become a go-to tool for data scientists. 

## Working with Jupyter

For years, I used to work first in the classic Jupyter Notebooks, and later on with JupyterLab. But still, I felt myself 
transitioning from prototyping in Jupyter on the browser, to writing *serious code* in my IDE (at the time, 
Pycharm). When working remotely, I had my system where I would have a service in the EC2 instance,
create a tunnel, and access via browser as if the Jupyter server was local. See [here](/posts/jupyter-lab-on-a-remote-machine/) for details of my old config.


## VSCode: A Better Integrated Experience

But while working at Globality, I figured that not having a good way to edit Python files (not notebooks) with the advantages of an IDE was a big impairment of my workflow. And here's where I embraced VSCode. I was very reluctant to VSCode at first, because for me their Git integration was not as good as Pycharm. But eventually the many advantages surpassed this little issue (which I still miss, to be honest). The main reasons for my move to VSCode were:

- **Integrated Development Environment (IDE)**: VSCode has an excellent IDE with features like code completion, imports, navigation to sources, and syntax highlighting directly in the editor itself, for notebooks. So you can edit Python scripts and notebooks within the same app!
- **Remote Development**: VSCode allows easily to connect to remote via ssh, and edit files with the same experience you would have if the files were local. Same for interaction with remote notebooks.
- **Easy navigation**: I used to employ this [extension](https://github.com/jupyterlab/jupyterlab-toc) to help me navigate through my notebooks via the markdown headers. In VSCode, this is already integrated in the IDE (called `outline`).

### Autocomplete

With the recent advances in AI, now we can run a small LLM (yes, sounds like a contradiction a small large language model) in our laptops. This is great, because it means we can have autocompletions **for free** and **without requiring an internet connection**. It even has privacy implications.

In my case, I have an M3 and I use [ollama](https://ollama.com/library/qwen2.5-coder:1.5b) and [continue](https://docs.continue.dev/customize/model-providers/ollama#autocomplete-model), an extension for VSCode. This is my config
```json
"tabAutocompleteModel": {
    "title": "Qwen2.5-Coder 1.5B",
    "model": "qwen2.5-coder:1.5b-base",
    "provider": "ollama"
  },
```
but feel free to try another model you like. This was good enough to me, and extremely fast. 

By the way, if getting issues with the extension, try `ollama ls` and make sure the name in `model` matches on the models you have downloaded. This was an issue for me because in one laptop I had `qwen2.5-coder:1.5b-base` and in the other one **the same model** was called `qwen2.5-coder:1.5b` 🤷‍♂️


### Shortcuts

I love automating things. That's probably the main reason why I'm working on AI. And shortcuts are definitely one of my favorite things. These are the shortcuts I strongly recommend you to configure in VSCode, together with my current key stroke:

#### General

- `Cmd + D`: Duplicate line
- `Cmd + Shift + D`: Remove current line
- `` Ctrl + ` ``: Move focus from editor/terminal to terminal/editor
- `Ctrl + Shift + F`: Find in all files
- `Cmd + Shift + F`: Find file by name
- `Cmd + Y`: Reveal definition of current symbol/function
- `Shift, then Shift`: Toggle Sidebar visibility
- `Cmd + Shift + U`: Transform to upper case
- `Cmd + Shift + Ctrl + U`: Transform to upper case
- `Cmd + Alt + Z`: Navigate Back
- `Alt + Shift + F`: Format document (and I use [globality-black](https://github.com/marctorsoc/globality-black) for this)
- `Alt + Down`: Creates another cursor for the line below. This is nice when you want to edit multiple lines at the same time. To exit this mode, remember to press `Esc`.

To be honest, I don't remember which of these come already configured in VSCode, but these are the top ones that came to mind. If you have any other suggestions, or there's one that you cannot find how to configure in VSCode, please let me know.

#### Notebooks

Here the only shortcut that I configured myself was `Cmd + Shift + 0, then 0`, to restart the notebook kernel. This is very useful to me. But everything else I left as is. You can check the official shortcuts e.g. [here](https://code.visualstudio.com/docs/datascience/jupyter-notebooks).


### VSCode struggles with long outputs

Sometimes, you'll notice that when displaying a long output in a notebook in VSCode, it will slow down, or simply force you restart the kernel. This happened to me recently. In my project, I had a structure like this:
```python
@dataclass
class Page:
    url: str
    text: str

    parent: Optional["Page"] = None
    children: list["Page"] = field(default_factory=list)
```
that represent a page in my website. Note that is a recursive data structure, since every page has pointers to their parent and children. When showing a single in a notebook, VSCode will try to show its parent and children, which in turn have parents and children themselves, etc. One solution I found was to modify the default `__repr__` and `__repr_html__` methods of the class:
```python
def _repr_html_(self) -> str:
    """
    Used when showing the Page directly on the notebook
    """

    # Trim the text to a reasonable length
    trimmed_text = (
        (self.text[:200] + "...")
        if len(self.text) > 200
        else self.text
    )

    # Get the parent URL (if exists)
    parent_url = self.parent.url if self.parent else "None"

    # Get the URLs of the children (max 5, with "..." if more)
    children_urls = [child.url for child in self.children]
    if len(children_urls) > 5:
        children_urls = children_urls[:5] + ["..."]
    children_html = (
        "<ul>" + "".join(f"<li>{url}</li>" for url in children_urls) + "</ul>"
    )
    extras_html = json.dumps(self.extras, indent=4)

    # Create an HTML representation
    html = f"""
    <div style="border: 1px solid #ccc; padding: 10px; margin: 10px;">
        <strong>URL:</strong> {self.url}<br>
        <strong>Text:</strong> {trimmed_text}<br>
        <strong>Parent URL:</strong> {parent_url}<br>
        <strong>Children: {children_html if children_urls else "None"}</strong>
    </div>
    """
    return html
```
and 
```python
def __repr__(self) -> str:
    """
    Used when showing the Page within e.g. a list on the notebook
    (list calls _repr_html_, but for each element calls __repr__)
    """
    
    # Trim the text to a reasonable length
    trimmed_text = (
        (self.text[:100].replace("\n", " ") + "...")
        if len(self.text) > 100
        else self.text
    )

    # Get the parent URL (if exists)
    parent_url = self.parent.url if self.parent else "None"

    # Get the URLs of the children (max 5, with "..." if more)
    children_urls = [child.url for child in self.children]
    if len(children_urls) > 5:
        children_urls = children_urls[:5] + ["..."]
    if children_urls:
        children_str = "\n- " + "\n- ".join(children_urls)
    else:
        children_str = "None"

    # Create the representation
    output = f"""
    * URL: {self.url}
    * Text: {trimmed_text}
    * Parent URL: {parent_url}
    * Children: {children_str}
    """
    return output
```

This shows representations like this:
<div style="text-align: center">
  <img src="/content/page-repr.jpg" alt="" width="80%"/>
</div>

### New from 2025

#### Inline values

[This](https://code.visualstudio.com/updates/v1_97#_inline-values-upon-cell-execution) is something I found recently. Are you still writing cells like this?
```python
result = long_function(params)
result
```
so you can visualize the result? Now, by turning on
```json
"notebook.inlineValues": true,
```
in your VSCode, you can see the values directly.
<div style="text-align: center">
  <img src="/content/notebook-inline-value.jpg" alt="" width="80%"/>
  </div>


#### Verbose time execution

You might have noticed that after the cell is executed, we can see within the cell status bar some execution time information. This is a setting I missed and [requested](https://github.com/microsoft/vscode-jupyter/issues/13338#issuecomment-1645393350) from the very beginning of adopting VSCode, and was partially released [here](https://github.com/microsoft/vscode/issues/168792#issuecomment-2512350627). The docs for this are [here](https://code.visualstudio.com/updates/v1_96#_cell-execution-time-verbosity). TLDR:
```json
"notebook.cellExecutionTimeVerbosity": "verbose",
```

But, I'm still missing one of the benefits I was getting in Jupyter with [this extension](https://jupyter-contrib-nbextensions.readthedocs.io/en/latest/nbextensions/execute_time/readme.html). There, this information would be stored within the notebook metadata, which had two advantages:
1. Whe one restarts VScode, it's really useful to understand how long a particular cell took to run. But now all such information is lost.
2. When transforming the notebook into a HTML report (e.g. with [nbconvert](https://nbconvert.readthedocs.io/en/latest/)), I'd like to have this info there too. I used to have a template that would leverage this, and dump it to the HTML too.

For this reason, I opened this [issue](https://github.com/microsoft/vscode/issues/240405). If you read this, please support me in asking for this feature 😊

#### Run cells in section

If you are like me, and organize your notebook with markdown headers, this allows you to easily navigate via the `Outline` section on the sidebar. But now, there's another big plus! As explained [here](https://code.visualstudio.com/updates/v1_96#_run-cells-in-section-for-markdown), now we can run entire "section" of cells defined by a markdown header. It is as easy as simple as right-click and select:
<div style="text-align: center">
  <img src="/content/notebook-run-cells-section.jpg" alt="" width="80%"/>
</div>


## Tools related to notebooks

### jupytext

*Have you always wished Jupyter notebooks were plain text documents? Wished you could edit them in your favorite IDE? And get clear and meaningful diffs when doing version control? Then, Jupytext may well be the tool you’re looking for!*

This is the elevator speech of [jupytext](https://jupytext.readthedocs.io/en/latest/), and to be honest, it is quite convincing! However, things have changed a bit since it was first released. Now, VSCode [supports](https://code.visualstudio.com/docs/datascience/jupyter-notebooks#_custom-notebook-diffing) diffing Jupyter notebooks quite nicely. My understanding is that this is a relatively new feature, because I did not see if before. But I could not find its release notes.

In any case, you probably don't want to add to version control your notebook files:
1. Because they contain the outputs, and that might be heavy information
2. Because the outputs might be heavy
3. Because when looking at it online, it's just simpler to look at a plain text `.py` file.

Whichever is your reason, these are the two basic commands to work with Jupytext:
```bash
jupytext --to py <notebook>.ipynb
jupytext --to ipynb <notebook>.py
```
and I'll defer you to the [docs](https://jupytext.readthedocs.io/en/latest/) for more.

#### Missing features in VScode

This yet another feature that I'm missing from the transition from Jupyter to VSCode. 
In Jupyter, one has the ability to [pair](https://jupytext.readthedocs.io/en/latest/paired-notebooks.html) a notebook with its python file. It works as follows:

* When a paired notebook is opened, the inputs are loaded from the most recent file in the pair, and the outputs are loaded from the `.ipynb` file.

* When a paired notebook is saved, the corresponding python file is updated, as it would with a `jupytext --to py` run.

To the best of my knowledge, this feature is not yet (2025) available in VSCode. So I still find myself running the CLI for the "basic behavior". There's this long standing [issue](https://github.com/microsoft/vscode-jupyter/issues/1240) if you want to track this.

### logger

Due to the **inability of persisting execution times** in VSCode notebooks, I use a simple Python logger when displaying messages in my notebooks. This is not perfect but it's better than nothing. It also provides a way to time the steps of a cell execution. The config is as simple as this:
```python
logging.basicConfig(format="%(asctime)s - %(message)s")
log = logging.getLogger("lang-examples")
log.setLevel(logging.INFO)
log.info("Starting ...")
```
showing e.g:
```
2024-11-18 18:33:21,544 - Starting ...
```

Note that if you run this in the notebook, then you can **retrieve the same logger** within your Python files with 
```python
log = logging.getLogger("lang-examples")
```
and don't need to configure the logger again. Another great, but sometimes unknown feature of loggers is that you can set their level (as done above). So a common practice when debugging would be to wrap the line in your notebook like this:
```python
log.setLevel(logging.DEBUG)
run_long_function_to_debug()
log.setLevel(logging.INFO)
```

### autoreload

If you are working on a Jupyter Notebook, then it is very convenient to use the `autoreload` extension. It will automatically reload all modules that have been imported in your notebook when they change (e.g. if you edit them). This can be done by running:
```python
%load_ext autoreload
%autoreload 2
```
But there's a small trick some people don't know. If you have constants defined in a Python file, **they won't be reloaded**. This happened to me when working with LLMs, where you might define prompt templates as constants and import when creating a chain. In order to reload the prompt without restarting the kernel, my hack was to wrap the constant in a function that returns it:
```python
def get_prompt_template():
    return """
    You are a helpful assistant...
    """
```

## Working with DataFrames in notebooks


### DataFrames side by side

```python
import pandas as pd
from IPython.display import display_html

def display_side_by_side(*dfs: pd.DataFrame) -> None:
    """Displays multiple DataFrames side by side in a Jupyter Notebook with top alignment."""
    html_str = "".join(df.to_html() for df in dfs)
    styled_html = html_str.replace("<table", '<table style="display:inline; vertical-align: top;"')
    display_html(styled_html, raw=True)

def display_side_by_side_dflist(dfs: list[pd.DataFrame], max_columns: int = 3) -> None:
    """Displays a list of DataFrames side by side, limiting to max_columns per row."""
    for start_idx in range(0, len(dfs), max_columns):
        display_side_by_side(*dfs[start_idx:start_idx + max_columns])
```
and here an example:
<div style="text-align: center">
  <img src="/content/side_by_side_example.jpg" alt="" width="80%"/>
</div>

### Full display

We often want to see the a DataFrame with full column width. This method allows to do this, and show all rows as well if desired: 

```python
def full_display(df, max_rows=None, max_colwidth=None):
    with pd.option_context(
        "display.max_rows",
        max_rows,
        "display.max_colwidth",
        max_colwidth,
    ):
        display(df)
```

### Display foldable

In order to show multiple dataframes after a cell, we can show them side by side as explained above, or we can show them one by one, and allow the user to fold / unfold each of them. This can be achieved with the code [here](https://github.com/marctorsoc/lang-examples/blob/main/lang-examples-common/lang_examples_common/utils/display_utils.py#L35). See an example:

<div style="text-align: center">
  <img src="/content/display-foldable.jpg" alt="" width="80%"/>
</div>


### Display foldable for nested structures

Imagine you have an object like this
```python
movies = [
    {
        "Title": "Inception",
        "Year": 2010,
        "Genres": ["Action", "Sci-Fi", "Thriller"],
        "Ratings": {"IMDB": 8.8, "Rotten Tomatoes": "87%"},
        "Cast": [
            {"Actor": "Leonardo DiCaprio", "Role": "Dom Cobb"},
            {"Actor": "Joseph Gordon-Levitt", "Role": "Arthur"},
        ],
    },
    {
        "Title": "The Matrix",
        "Year": 1999,
        "Genres": ["Action", "Sci-Fi"],
        "Ratings": {"IMDB": 8.7, "Rotten Tomatoes": "83%"},
        "Cast": [
            {"Actor": "Keanu Reeves", "Role": "Neo"},
            {"Actor": "Laurence Fishburne", "Role": "Morpheus"},
        ],
    },
]
```
In the following image, you can see how it would look if we just display:
<div style="text-align: center">
  <img src="/content/render-nested-false.jpg" alt="" width="100%"/>
</div>

and now if we use the power of `render_nested=True`:
<div style="text-align: center">
  <img src="/content/render-nested-true.jpg" alt="" width="35%"/>
</div>

### Pipes

We often want to do some filtering on our data, and log the length of the dataframe at each step. This is where we can make use of pipes. I have two pipes that I use often:
```python
def log_len(df, message=""):
    print(f"{message}: {len(df)}")
    return df


def log_df(df):
    display(df)
    return df
```
and here is an example:

```python
df = pd.DataFrame(
    [
        {"Title": "Superbad", "Year": 2007, "Rating": 7.6, "genre": "Comedy"},
        {"Title": "Step Brothers", "Year": 2008, "Rating": 6.9, "genre": "Comedy"},
        {"Title": "The Big Lebowski", "Year": 1998, "Rating": 8.1, "genre": "Comedy"},
        {"Title": "The Shining", "Year": 1980, "Rating": 8.4, "genre": "Horror"},
        {"Title": "Get Out", "Year": 2017, "Rating": 7.8, "genre": "Horror"},
        {"Title": "It", "Year": 2017, "Rating": 7.3, "genre": "Horror"},
        {"Title": "Interstellar", "Year": 2014, "Rating": 8.7, "genre": "Sci-Fi"},
        {"Title": "The Martian", "Year": 2015, "Rating": 7.5, "genre": "Sci-Fi"},
        {"Title": "Inception", "Year": 2010, "Rating": 8.8, "genre": "Sci-Fi"},
        {"Title": "Blade Runner", "Year": 1982, "Rating": 9.3, "genre": "Sci-Fi"},
        {"Title": "Blade Runner 2049", "Year": 2017, "Rating": 8.0, "genre": "Sci-Fi"},
    ]
)
filtered_movies = (
    movies.pipe(log_len, "Initial dataset")
    .query("genre in ['Comedy', 'Sci-Fi']")
    .pipe(log_len, "After filtering by Comedy or Sci-Fi")
    .query("year > 2000")
    .pipe(log_len, "After filtering movies older than 2000")
    .pipe(log_df)
)
```
which shows:
<div style="text-align: center">
  <img src="/content/pipes-example.jpg" alt="" width="40%"/>
</div>

### Visualizing dfs with multi-line texts

If you use `full_display` when a cell in a dataframe contains a text with multiple lines, you will see the newline characters as part of the text. Here is a solution to show the text nicely:

```python
data = {
    'title': ['Inception', 'The Matrix', 'Interstellar'],
    'year': [2010, 1999, 2014],
    'rating': [8.8, 8.7, 8.6],
    'synopsis': [
        "A thief who steals corporate secrets\nby entering the subconscious of his targets\nfaces his greatest challenge yet.",
        "A computer hacker learns from mysterious rebels\nabout the true nature of his reality\nand his role in the war against its controllers.",
        "A team of explorers travel through a wormhole\nin space in an attempt to ensure humanity's survival."
    ]
}

df = pd.DataFrame(data)

# Full display of the dataframe
full_display(df)

# Display the DataFrame with HTML rendering
display(
    HTML(
        df
        .assign(synopsis=lambda df: df.synopsis.str.replace("\n", "<br>"))
        .to_html(escape=False, justify="left")
    )
)
```
which produces:
<div style="text-align: center">
  <img src="/content/render-df-with-multi-line-texts.jpg" alt="" width="100%"/>
</div>
