export default class Trip {
  constructor(userID, destinationID, travelers = 1) {
    this.userID = userID;
    this.destinationID = destinationID;
    this.travelers = travelers;
  }
}