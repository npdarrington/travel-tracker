import moment from 'moment'

export default class Trip {
  constructor(id, userID, destinationID, date, travelers = 1, duration = 1) {
    this.id = id;
    this.userID = userID;
    this.destinationID = destinationID;
    this.date = date;
    this.travelers = travelers;
    this.duration = duration;
    this.status = 'pending';
    this.suggestedActivities = [];
    this.endDate = moment(new Date(this.date))
                    .add(this.duration, 'd').format('YYYY/MM/DD');
  }

  calculateTripPrice(destinationData) {
    const foundTrip = destinationData.find(destination => destination.id === this.destinationID);
    let estimatedFlightCost = foundTrip.estimatedFlightCostPerPerson * this.travelers;
    let estimatedLodgingCost = foundTrip.estimatedLodgingCostPerDay * this.duration * this.duration;
    let travelAgentFee = (estimatedFlightCost + estimatedLodgingCost) * .10;
    return ((((estimatedFlightCost + estimatedLodgingCost) + travelAgentFee) * 100) / 100).toFixed(2);
  }

  editTrip(userID, destinationID, date, travelers = 1, duration = 1) {
    return new Trip(this.id, userID, destinationID, date, travelers,  duration);
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