# 🗓 Google Calendar API wrapper
## Ideal for servers

A super simpel wrapper for google calendar with only `googleapis` as a dependency. List and create events, nothing more. Setup can become a bit tricky.
You need to get the credentials file from google developers console, and add them to a service account. Once you have done that make sure your serivce account is added to the
google calendar if he is not in the same organization you have to edit the settings in `admin.google/com/yourdomain` and go to calendar sharing.  

```
npm install googleapis-calendar --save
```
or
```
yarn add googleapis-calendar 
```
Example config: 

```javascript
module.exports = {
  "private_key": "-----BEGIN PRIVATE KEY-----gW+KA==\n-----END PRIVATE KEY-----\n",
  "client_email": "yourdomain@yourdomain.iam.gserviceaccount.com",
  "calendarId": "yourdomain.1234@group.calendar.google.com"
}
```

The only thing you have to look out for is the `date` and `dateTime` inside of the event object. Date is used if you want to create an event that is the whole day. Datetime is what can be used if you want to make an event from x hours till y hours. All the other functions are self explanatory.

```javascript
const Calendar = require('./index')

const config = require('./config')

const calendar = new Calendar(config.calendarId)

calendar.authorize(config)

calendar.getCalendar()
    .then(cal => {
        // calendar details
    })

calendar.getEvents('startTime', 20)
    .then(events => {
        // all events
    })

const allDayEvent = {
    summary: 'Awesome party',
    description: 'some description',
    start: {
        "date": '2018-04-21',
        "timeZone": 'Europe/Amsterdam'
    },
    end: {
        "date": '2018-04-21',
        "timeZone": 'Europe/Amsterdam'
    }
}

const fixedTimeEvent = {
    summary: 'Meeting about having more meetings', // 
    description: 'some description',
    start: {
        "dateTime": '2018-04-21T12:30:47.000Z',
        "timeZone": 'Europe/Amsterdam'
    },
    end: {
        "dateTime": '2018-04-21T14:30:47.000Z',
        "timeZone": 'Europe/Amsterdam'
    }
}

calendar.createEvent(fixedTimeEvent)
    .then(event => {
        // do something with the event
    })
```
