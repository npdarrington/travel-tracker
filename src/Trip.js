import moment from 'moment'

export default class Trip {
  constructor(id, userID, destinationID, travelers = 1, date, duration = 1) {
    this.id = id;
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

  deleteTrip(userID, tripID, tripData) {
    tripData.forEach((trip, i) => {
      if (trip.userID === userID && trip.id === tripID) {
        tripData.splice(i, 1);
      }
    });
    return tripData;
  }
}