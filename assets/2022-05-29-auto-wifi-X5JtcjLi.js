const e=`---
title:  Auto wifi
date: 2022-05-29T04:04:03+00:00
permalink: /posts/auto-wifi/
header:
  image: /content/wifi.png
categories:
  - Off-topic
---

Sometimes, having some knowledge of coding can be useful at home. Today I bring one of my latest mini-projects. After moving back to Barcelona, I got a flat that is somewhat long. Unfortunately, my router is connected at one extreme of the house, thus I installed a [PLC](https://ca.wikipedia.org/wiki/Power_Line_Communication) repeater in the living room.

After doing a bit of research, I did not find a way (at least not for free) to make my Mac to connect automatically to the strongest signal. Hence, I opted for hacking something to do the polling and change of Wifi myself.

*Disclaimer: there might be a better solution for this. I just found this to be useful to me.*

### The script

\`\`\`python
{% highlight python linenos %}
import os
import subprocess

WIFI1, WIFI2 = "MIWIFI_rpac", "TP-Link_C16C"
PASSWORD1, PASSWORD2 = "XXX", "YYY"
SOUND = False

credentials = {
    WIFI1: f"{WIFI1} {PASSWORD1}",
    WIFI2: f"{WIFI2} {PASSWORD2}",
}

command_airport = "/System/Library/PrivateFrameworks/Apple80211.framework/Versions/A/Resources/airport"
command_current_wifi = command_airport + " -I | grep -e \\"SSID\\" | grep -v BSSID | awk '{print $2}'"
command_check_levels = command_airport + f" -s | grep '{WIFI1} \\|{WIFI2}'" + " | sort | awk '{print $3}'"
command_change_wifi = "/usr/sbin/networksetup -setairportnetwork en0 "

powers = subprocess.getoutput(command_check_levels).split("\\n")
if len(powers) < 2:
    if len(powers) == 1:
        print("Only 1 signal found")
        print(powers)
    else:
        print("No signals found")
    exit(0)
powers = {WIFI1: int(powers[0]), WIFI2: int(powers[1])}
print(powers)

current_wifi = subprocess.getoutput(command_current_wifi)
other_wifi = WIFI1 if current_wifi == WIFI2 else WIFI2

if powers[current_wifi] < powers[other_wifi]:
    print(f"Changing from {current_wifi} to {other_wifi}")
    os.system(command_change_wifi + credentials[other_wifi])
    if SOUND:
        os.system("say wifi")
else:
    print(f"Current wifi: {current_wifi}")
    print("All good. Best wifi selected")
{% endhighlight %}
\`\`\`

### How does it work?

1. Lines 4-6: Define constants. This is **mandatory** to change for this to work in your setting.
1. Lines 13-16: Define commands to check Wifi levels, and to change Wifi. This should work in any other Mac, 
but will need a change if you want to extend this to Windows.
1. Lines 18-27: Check power levels for the two signals of interest. If 1 or no Wifi's are found, just finish.
1. Lines 29-30: Find out what is the current Wifi and the other Wifi.
1. Lines 32-end: If the power of the other Wifi is higher, change to the other one. Otherwise, we are good.

### Run the script periodically

Obviously, if we have to run the script manually when we move to another room, it is just easier to do the 3 clicks to change the wifi. So let's automate this to run periodically. We will use \`cron\`, which is available for Linux and Mac. After a quick Google, I read that in Windows "cron jobs are known as Scheduled Tasks". It seems simple, but if you need help to implement this in Windows, happy to help!

Going back to \`cron\`, this how I implemented this:

\`\`\`bash
*/3 * * * *  date >> /tmp/cron-stdout.log 2>&1
*/3 * * * *  sleep 1 && python3 ~/Documents/Marc/autowifi.py  >> /tmp/cron-stdout.log 2>&1
\`\`\`

In short, every 3 minutes I add a timestamp with the date to a log file that allows me to check later what happened. Then, run the script after waiting for 1 second. I do this just to make sure the date is written before. Should not be needed, but does not hurt for this application. The output of the script is appended to the end of the file (with \`>>\`).

### Example of a log file

\`\`\`bash
Sat May 28 14:57:00 CEST 2022
Only 1 wifi found
['-49']
Sat May 28 15:00:00 CEST 2022
{'MIWIFI_rpac': -72, 'TP-Link_C16C': -43}
Current wifi: TP-Link_C16C
All good. Best wifi selected
Sat May 28 15:03:00 CEST 2022
{'MIWIFI_rpac': -75, 'TP-Link_C16C': -79}
Changing from TP-Link_C16C to MIWIFI_rpac
Sat May 28 15:06:01 CEST 2022
{'MIWIFI_rpac': -77, 'TP-Link_C16C': -39}
Changing from MIWIFI_rpac to TP-Link_C16C
Sat May 28 15:09:00 CEST 2022
{'MIWIFI_rpac': -74, 'TP-Link_C16C': -43}
Current wifi: TP-Link_C16C
All good. Best wifi selected
\`\`\`

From this logs we can see some events:
1. Initially, there is only 1 Wifi
2. Then, we see another Wifi, but still the current one is the best.
3. Next time, we change to the other Wifi since it's more powerful.
4. But in the next iteration we change back again.
5. Finally, we are in the best Wifi.

Some possible improvements to make:
1. When only 1 Wifi is found, we could log what Wifi we are in.
1. Adding some patience to the system might be useful, or making the change based on some threshold, not just if the other Wifi's strength is higher. Otherwise, we might change without really needing it, as in the example.
1. Adding some separator between each event would help on reading the logs.

### Conclusion

Today we saw how to quickly put some coding in action to solve a practical domestic problem. Again, not claimig this to be the cleanest, best, most efficient solution. But it works 😊

And that's it. Have a wonderful day!`;export{e as default};
