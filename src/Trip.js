export default class Trip {
  constructor(userID, destinationID, travelers = 1, date) {
    this.userID = userID;
    this.destinationID = destinationID;
    this.travelers = travelers;
    this.date = date;
  }
}