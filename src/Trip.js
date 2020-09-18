import moment from 'moment'

export default class Trip {
  constructor(userID, destinationID, travelers = 1, date, duration = 1) {
    this.userID = userID;
    this.destinationID = destinationID;
    this.travelers = travelers;
    this.date = date;
    this.duration = duration;
    this.status = 'pending';
    this.suggestedActivities = [];
    this.endDate = moment(new Date(this.date))
                    .add(this.duration, 'd').format('YYYY/MM/DD');
  }
}