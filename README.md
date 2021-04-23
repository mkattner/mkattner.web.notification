# mkattner.web.notification
This is a simple javascript and css functionality to display iOS like notifications in your web app. Can be used in apache cordova projects, in progressive web apps or on your website.
The popups use jQuery and javascript Promise functionality.

## Installation
You can try it with the index.html file. 
Clone the repository to your computer. 
Start a local webserver (e.g.: python -m http.server 80) or just open index.html

Or in your application:
1) Load jQuery https://jquery.com/
2) load notification.js and notification.css
3) Done! Use the functionality.

## Customize
Change the notification.css to adpat your personal style.

## Function: Alert()
like javascript window.alert()

e.g.: blocking popup: await Alert("Alarm Alarm Alarm") -> then()

e.g.: non-blocking popup: Alert("Alarm Alarm Alarm") -> then()

## Function: Prompt()
like javascript window.prompt()

e.g.: blocking popup: await Prompt("Enter something:") -> then(<value>) -> catch(<value>)
  
e.g.: non-blocking popup: Prompt("Enter something:") -> then(<value>) -> catch(<value>)

## Function: Confirm()
like javascript window.confirm()

e.g.: blocking popup: await Alert("Confirm?") -> then() -> catch()

e.g.: non-blocking popup: Alert("Confirm?") -> then() -> catch()

## Function: Wait()
e.g.: blocking popup: await Wait("We wait until the promise is either resolved or rejected.", promise) -> then(<value>) -> catch(<value>)
  
e.g.: non-blocking popup: Wait("We wait until the promise is either resolved or rejected.", promise) -> then(<value>) -> catch(<value>)
  
### Contact me
If you find a bug or want a new feature just write an issue.
