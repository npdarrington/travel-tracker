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
    getAllUserTrips.sort((tripA, tripB) => new Date(tripB.date) - new Date(tripA.date));
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

  getYTDTotal(currentYear, tripsData, destinationData) {
    const getAllUserTripsThisYear = tripsData.filter(trip => {
      return this.id === trip.userID && trip.date.includes(currentYear) && trip.status === 'approved';
    });
    const getYearlyTotal = getAllUserTripsThisYear.reduce((total, trip) => {
      destinationData.forEach(destination => {
        if (trip.destinationID === destination.id) {
          let tripFlightCost = destination.estimatedFlightCostPerPerson * trip.travelers;
          let tripLodgingCost = destination.estimatedLodgingCostPerDay * trip.duration * trip.travelers;
          let travelAgentFee = (tripFlightCost + tripLodgingCost) * .1;
          total += tripFlightCost + tripLodgingCost + travelAgentFee;
        }
      });
      return total;
    }, 0);
    return getYearlyTotal.toFixed(2);
  }
}