# mkattner.web.notification
This is a simple javascript and css functionality to display iOS like notifications in your web app. Can be used in apache cordova projects, in progressive web apps or on your website.
The popups use jQuery and javascript Promise functionality.

## Installation
1) Load jQuery https://jquery.com/
2) load notification.js and notification.css
3) Done! Use the functions

## Alert
like javascript window.alert()

e.g.: await Alert("Alarm Alarm Alarm") -> then()

## Prompt
like javascript window.prompt()

e.g.: await Prompt("Do you want?") -> then(<value>) -> catch()

## Confirm
like javascript window.confirm()

e.g.: await Alert("Confirm?") -> then() -> catch()

## Wait
tbi
