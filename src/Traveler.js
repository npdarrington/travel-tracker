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

  sortTripsByStatus(currentDate, tripsData) {
    tripsData.forEach(trip => {
      if (trip.date < currentDate && trip.status === "approved") {
        this.pastTrips.push(trip);
      }
    })
  }

  // trips
  // 0 = upcoming, 1 = pending, 2 = current, 3 = past, 4 = dummy data
}