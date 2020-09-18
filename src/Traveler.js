export default class Traveler {
  constructor({ id, name, travelerType }) {
    this.id = id;
    this.name = name;
    this.travelerType = travelerType;
    this.pastTrips = [];
  }

  // trips
  // 0 = upcoming, 1 = pending, 2 = current, 3 = past
}