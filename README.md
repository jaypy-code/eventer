# Eventer
A simple widgets for Linux / MacOS / MS Windows. You want a countdown timer for the day(s) left of your event. 
For example: Next week, you'll go to a party at 6:00 PM. So you have a config file ( You can open and edit it with pressing F3 when "Eventer" is open ) and you'll have a JSON file and edit value of "Date" to your date and time. Today is 2020/02/23 and you should set for 2020/03/01 and a space and write 18:00. So you want go to a party, You must set a title for the event, like "BFF Party" and done. Back to Eventer and press F5 to read and refresh that config file in your system.

Your config file must be like:
```
{ "date": "2020/03/01 18:00", "title": "BFF Party", "background": "rgba(0, 0, 0, 0.35)", "color": "white" }
```


# Colours in Eventer
You can make a beautiful window on your screen ( Playing with colours ). Again back to your config file with Pressing F3 when Eventer is open and you'll see two keys "background" and "color". You can edit both of them and write rgb, rgba, hex or colour name and etc. Then press F5 to refresh your config and see your changes.

Like:
```
{ "date": "2020/03/01 18:00", "title": "BFF Party", "background": "back", "color": "#fff" }
```

# Build your own Eventer
You know how much is size of released setup, More then 50MB and it's hard to upload and downlod but it's easy to build it. You can build it with *npm* and edit your app name, app icon and more things.

1) Download and install dependencies: 
```
# npm i
    or
# yarn install 
```
2) And build it:
```
# npm build
    or
# yarn build
```