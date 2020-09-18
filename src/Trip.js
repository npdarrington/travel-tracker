export default class Trip {
  constructor(userID, destinationID, travelers = 1, date, duration = 1) {
    this.userID = userID;
    this.destinationID = destinationID;
    this.travelers = travelers;
    this.date = date;
    this.duration = duration;
    this.status = 'pending';
  }
}