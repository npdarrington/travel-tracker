export default class Destination {
  constructor({ id, destination, estimatedLodgingCostPerDay, estimatedFlightCostPerPerson }) {
    this.id = id;
    this.destination = destination;
    this.estimatedLodgingCostPerDay = estimatedLodgingCostPerDay;
    this.estimatedFlightCostPerPerson = estimatedFlightCostPerPerson;
  }
}