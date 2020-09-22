import moment from 'moment'

export default class Trip {
  constructor({ id, userID, destinationID, date, travelers = 1, duration = 1, status = 'pending' }) {
    this.id = id;
    this.userID = userID;
    this.destinationID = destinationID;
    this.date = date;
    this.travelers = travelers;
    this.duration = duration;
    this.status = status;
    this.suggestedActivities = [];
    this.endDate = moment(new Date(this.date))
                    .add(this.duration, 'd').format('YYYY/MM/DD');
  }

  calculateTripPrice(destinationData) {
    const foundTrip = destinationData.find(destination => destination.id === this.destinationID);
    let estimatedFlightCost = foundTrip.estimatedFlightCostPerPerson * this.travelers;
    let estimatedLodgingCost = foundTrip.estimatedLodgingCostPerDay * this.duration * this.travelers;
    let travelAgentFee = (estimatedFlightCost + estimatedLodgingCost) * .1;
    return (estimatedFlightCost + estimatedLodgingCost + travelAgentFee).toFixed(2);
  }

  editTrip(id, userID, destinationID, date, travelers = 1, duration = 1, status = 'pending') {
    return new Trip({ id, userID, destinationID, date, travelers,  duration, status });
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