export default class Destination {
  constructor({ id, destination, estimatedLodgingCostPerDay, estimatedFlightCostPerPerson, image }) {
    this.id = id;
    this.destination = destination;
    this.estimatedLodgingCostPerDay = estimatedLodgingCostPerDay;
    this.estimatedFlightCostPerPerson = estimatedFlightCostPerPerson;
    this.image = image;
  }
}