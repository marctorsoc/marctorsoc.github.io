---
title:  Use Python without installing on Windows
date: 2021-06-11T19:04:03+00:00
permalink: /posts/cx_freeze/
categories:
  - Divulgation
---

The last weeks I was in Barcelona renewing documents and meeting friends. And,
of course, enjoying the sun but that's implicit :)

It's funny how over Skype you usually don't get past the live updates, but in a face to
face conversation everything flows better. While I'm a fan of working remotely, I
do appreciate that f2f has its advantages. In one of those, a friend told me how
in his work as an Industrial Engineer he needs to do what I usually call a
"monkey job", many times a month. His work is on, among many other things, configuring
chemical reactors to produce drugs.

## The problem

Apart from automation, he also would like to delegate it to more junior employees.
His current approach is to open a file with Notepad++ and use find/replace some
 dozens of times, which is somewhat risky to delegate as missing some replacement
 means the pipeline could stop.

 In this regard, he was asking me whether this could be automated, and how I would
 do it. As a Data Scientist working 99% of the last 6 years with Python, I obviously
 suggested to use this. The way I framed it was the following. Someone (him)
 would add a configuration file where each row would be a tuple with the keyword to
 find and the keyword to replace. Then, a Python script would take the input file
 and using the configuration file generate an output file. For someone seasoned in
 Python, the above cannot be more than 10min coding. Easy-peasy.

 Let's see an example of what I had in mind after my first answer:

 Disclaimer:
 * The code in this post is not optimal, and does not pretend to be.
 But it works, and my friend does not really care about it taking 1 or 5 seconds,
 or some stuff being hardcoded. The objective is just to show something working
  end to end.
 * I did all development in my Bootcamp'd Windows 10, where I installed Python,
 and tested in two native Windows 10 machines.


config.csv:
 ```
 input,output
 PROTOCOL_A, PROTOCOL_B
 DRUG_X, DRUG_Y
 ```


main.py:
 ```python
 import re
 import pandas as pd

 if __name__ == "__main__":

     config = pd.read_csv("config.csv", index_col=0).output.to_dict()
     print(config)

     with open("input_file.csv", "r") as f:
         text = f.read()
     print(text)
     print()
     for input_value, output_value in config.items():
         text = re.sub(input_value, output_value, text)

     print(text)
     with open("output_file.csv", "w") as f:
         f.write(text)
 ```

Cool, so with 10 lines of code we can solve it. My friend, though, does not know
Python at all, and his natural follow-up question was:

- Ok, but how Python works? Do I have to install something?
- Well... yes. But it's minimal. Nothing to worry about.
- I don't want to install anything. Can't we do this with a ".exe" or ".bat"?
I'm sure you can code in Windows without having to install Python.

Why for some folks the above questions might be excessive, there is an underlying
motivation in all these, which I then discovered. He wants to use this in the
client's machine, having Windows, and he **cannot install anything**.

## The solution

[CX_freeze](https://cx-freeze.readthedocs.io/en/latest/) is a Python library that

```
creates standalone executables from Python scripts, with the same performance.
It is cross-platform and should work on any platform that Python itself works on.
```

The solution is then straightforward. Just run:

```
cxfreeze -c main.py
```

and it should work. Does it? Well, the reality is that there is an annoying
dependency Windows needs called `vcruntime140.dll`. I'm not sure what this does,
but I just downloaded it (there are thousands of places where you can find it),
and placed it next to the `python3.dll` file. After this, it worked like a charm!


## Lighweighting the package

The above is enough for a minimum PoC, but produces a **134 MB package**.
How come? This is just a few lines of code!
Well, the reason is we are using `pandas`, a Python library that can do
**many** other things. For this trivial task, we can survive without
it, let's remove the dependency:


 ```python
 import re

 if __name__ == "__main__":

     with open("config.csv", "r") as f:
         lines = f.readlines()
     config = [line.strip().split(",") for line in lines]
     config = {i[0]: i[1] for i in config[1:]}
     print(config)

     with open("input_file.csv", "r") as f:
         text = f.read()
     print(text)
     print()
     for input_value, output_value in config.items():
         text = re.sub(input_value, output_value, text)


     print(text)
     with open("output_file.csv", "w") as f:
         f.write(text)
 ```

In addition to this, I found out that the Python version also impacts the final
package size:


| python | pandas |  size  |
|:------:|:------:|:------:|
|   3.9  |    Y   | 134 MB |
|   3.9  |    N   |  30 MB |
|   3.8  |    N   |  30 MB |
|   3.7  |    N   |  16 MB |


So I recreated my conda environment with 3.7 as in:

```
conda create -n find_replace_script python=3.7
```

and produced the final package, obtaining a tiny **8MB file** after zip compression.

---

And that's all for today, hope you enjoyed the story, or find this useful if you
arrive here via Google Search :)

Don't hesitate to ask me if you have questions above the above. Have fun!
