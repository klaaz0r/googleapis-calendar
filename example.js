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
        "dateTime": '2018-04-21T12:30:47.000Z,
        "timeZone": 'Europe/Amsterdam'
    },
    end: {
        "dateTime": '2018-04-21T14:30:47.000Z,
        "timeZone": 'Europe/Amsterdam'
    }
}

calendar.createEvent(fixedTimeEvent)
    .then(event => {
        // do something with the event
    })