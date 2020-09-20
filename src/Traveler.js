export default class Traveler {
  constructor({ id, name, travelerType }) {
    this.id = id;
    this.name = name;
    this.travelerType = travelerType;
    this.pastTrips = [];
    this.currentTrips = [];
    this.upcomingTrips = [];
    this.pendingTrips = [];
  }

  getFirstName() {
    return this.name.split(' ')[0];
  }

  sortTripsByStatus(currentDate, tripsData) {
    const getAllUserTrips = tripsData.filter(trip => trip.userID === this.id);
    getAllUserTrips.forEach(trip => {
      if (currentDate >= trip.date && currentDate <= trip.endDate && trip.status === "approved") {
        this.currentTrips.push(trip);
      } else if (trip.date < currentDate && trip.status === "approved") {
        this.pastTrips.push(trip);
      } else if (currentDate <= trip.date && trip.status === "approved") {
        this.upcomingTrips.push(trip);
      } else if (trip.status === "pending") {
        this.pendingTrips.push(trip);
      }
    })
  }
}