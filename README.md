# Eventer
A simple widgets for Linux / MacOS / MS Windows. You want a countdown timer for the day(s) left of your event. 
For example: Next week, you'll go to a party at 6:00 PM. So you have a config file ( You can open and edit it with pressing F3 when "Eventer" is open ) and you'll have a JSON file and edit value of "Date" to your date and time. Today is 2020/02/23 and you should set for 2020/03/01 and a space and write 18:00. So you want go to a party, You must set a title for the event, like "BFF Party" and done. Back to Eventer and press F5 to read and refresh that config file in your system.

Your config file must be like:
```
{ "date": "2020/03/01 18:00", "title": "BFF Party" }
```

# Make your event beautiful
Beautiful widget must be beautiful with changing colours and radius or size of widget. Your widget setting has **background** for background color, **color** for text color, **radius** to make window a bit circle, **size** is size of window and like a square, **disabled** or **hide** used for hide your event.

```
{
    "background": String, // Background colour - rgba, rgb, hex, ... - default is "rgba(0, 0, 0, 0.35)"
    "color": String, // Text color - rgba, rgb, hex, ... - default is "white"
    "colour": String, // Text colour - rgba, rgb, hex, ...
    "radius" String, // Window radius - px, cm, inch, em, rem, ... - default is "0.4rem"
    "size": Number, // Window size - 100, 200, 400, ... -  defualt is 200
    "disabled": Boolean, // Hide window - true/false - default is true,
    "hide": Boolean // Hide window - true/false
}
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