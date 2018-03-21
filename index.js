const { google } = require('googleapis');

const calendarApi = google.calendar('v3');

const scopes = ['https://www.googleapis.com/auth/calendar'];

class Calendar {
    constructor(calendarId) {
        if (calendarId === undefined) {
            throw new Error('"calendarId" is a required argument');
        }
        this.calendarId = calendarId;
        this.auth = null;
    }

    getCalendar() {
        return new Promise((resolve, reject) => {
            calendarApi.calendars.get({
                calendarId: this.calendarId,
                auth: this.auth
            }, function (err, response) {
                if (err) {
                    reject(err)
                }
                resolve(response.data)
            })
        })
    }

    getEvents(orderBy, maxResults) {
        return new Promise((resolve, reject) => {
            return calendarApi.events.list({
                auth: this.auth,
                calendarId: this.calendarId,
                timeMin: (new Date()).toISOString(),
                maxResults: maxResults,
                singleEvents: true,
                orderBy: orderBy
            }, function (err, response) {
                if (err) {
                    reject(err)
                }
                resolve(response.data.items)
            })
        })
    }

    createEvent(event) {
        return new Promise((resolve, reject) => {
            return calendarApi.events.insert({
                auth: this.auth,
                calendarId: this.calendarId,
                resource: event
            }, function (err, response) {
                if (err) {
                    reject(err)
                }
                resolve(response.data)
            })
        })
    }

    authorize(config) {
        try {
            this.auth = new google.auth.JWT(config.client_email, null, config.private_key, scopes, null)
        } catch (err) {
            throw new Error(err);
        }

    }
}

module.exports = Calendar