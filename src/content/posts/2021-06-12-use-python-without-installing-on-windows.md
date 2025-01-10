---
title:  Python without installing on Windows
date: 2021-06-11T19:04:03+00:00
permalink: /posts/cx_freeze/
categories:
  - Divulgation
heroImage: /content/tremp.jpeg
---

<p style="text-align: justify;">
For some weeks, I went back to Barcelona to renew documents and meet friends. And,
of course, to enjoy the sun 😎
</p>


It's funny how on videocalls you usually don't get past the life updates, but in 
a face to
face conversation everything flows better. While I'm a fan of working remotely, I
do appreciate that f2f has its advantages. It was in one of those where a friend 
was telling me how
in his work as an Industrial Engineer he needs to do what I usually call a
"monkey job", many times a month. 

 Disclaimer:
 * The code in this post is not optimal, and does not pretend to be.
 But it works, and my friend does not really care about it taking 1 or 5 seconds,
 or some stuff being hardcoded. The objective is just to show something working
  end to end.
 * I did all development in my Bootcamp'd Windows 10, where I installed Python. 
 Tested in two native Windows 10 machines, where Python was not installed.

## The problem

My friend works, among many other things, configuring the sensors and widgets that 
interact with chemical reactors to produce drugs. Oftentimes, he needs to modify 
the configuration by updating some values. His current approach is to open the file
 with Notepad++ and use find/replace some
 dozens of times. In addition to automation, he would like to delegate the task to 
 to more junior employees but it is somewhat risky as any mistake might make
 the whole production to stop.

 In this regard, he was asking me whether this could be automated, and how I would
 do it. As a Data Scientist working 99% of the last 6 years with Python, I obviously
 suggested to use this. The way I framed it was the following. Someone (him)
 would add a configuration file where each row would be a tuple with the keyword to
 find and the keyword to replace. Then, a Python script would take the input file
  and generate an output file given the configuration. For someone seasoned in
 Python, the above is no more than 10min coding. Easy-peasy.

 Let's see an example of what I had in mind after my first answer:

config.csv:
 ```bash
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

<p style="text-align: justify;">
Cool, so with a few lines of code it's solved. My friend, though, does not know
Python at all, and his natural follow-up question was:
</p>

- Ok, but how Python works? Do I have to install anything?
- Well... yes. But it's minimal. Nothing to worry about.
- I don't want to install anything. Can't we do this with a ".exe" or ".bat"?
I'm sure you can code in Windows without having to install Python.

While for some folks the above questions might be excessive, there is an underlying
motivation in all these, which I then discovered. He wants to use this in the
client's machine, having <b>Windows</b>, where he **cannot install anything**.

## The solution

[CX_freeze](https://cx-freeze.readthedocs.io/en/latest/) is a Python library that

> creates standalone executables from Python scripts, with the same performance.
It is cross-platform and should work on any platform that Python itself works on.

The solution is then straightforward. Install `cx_freeze` and just run:

```bash
cxfreeze -c main.py
```


and it should work. Does it? Well, the reality is that there is an annoying
dependency Windows needs called `vcruntime140.dll`. I'm not sure what this does,
but I just downloaded it (there are thousands of places where you can find it),
and placed it next to the `python3.dll` file. After this, it worked like a charm!



## Lighweighting the package


The above is enough for a minimum PoC, but produces a <b>134 MB package</b>.
How come? This is just a few lines of code!
Well, the reason is we are using `pandas`, a Python library that can do
many other things, but absolutely not required for this trivial task. 
Let's do everything with the Python standard library and remove the dependency:


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

<p style="text-align: justify;">
In addition to this, I found out that the Python version also impacts the final
package size:
</p>

| python | pandas |  size  |
|:------:|:------:|:------:|
|   3.9  |    T   | 134 MB |
|   3.9  |    F   |  30 MB |
|   3.8  |    F   |  30 MB |
|   3.7  |    F   |  16 MB |


So I recreated my conda environment with 3.7 as in:

```shell
conda create -n find_replace_script python=3.7
```

<p style="text-align: justify;">
and produced the final package, obtaining a tiny <b>8MB file</b> after zip compression.
</p>

---

<p style="text-align: justify;">
And that's all for today, hope you enjoyed the story, or find this useful if you
arrive here via Google Search :)
</p>

Don't hesitate to ask me if you have questions about the above. Have fun!
