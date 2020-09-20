import { relativeTimeThreshold } from "moment";

const domUpdates = {
  currentTraveler: null,
  todaysDate: null,
  allTripsData: null,
  allDestinationData: null,

  setGlobalData(user, todaysDate, allTripsData, allDestinationData) {
    this.currentTraveler = user;
    this.todaysDate = todaysDate;
    this.allTripsData = allTripsData;
    this.allDestinationData = allDestinationData;
  },

  updatePageOnLogin() {
    this.displayCurrentTraveler();
    this.sortTravelerTrips();
    this.displayTravelerPastTrips();
  },

  displayCurrentTraveler() {
    document.querySelector('.travel-background-cta').innerText = `Let's book your next getaway ${this.currentTraveler.getFirstName()}!`;
  },

  sortTravelerTrips() {
    this.currentTraveler.sortTripsByStatus(this.todaysDate, this.allTripsData);
  },

  displayTravelerPastTrips() {
    let tripPreviousDOM = document.querySelector('.trip-previous');
    let tripPreviousDOMTitle = document.querySelector('.trip-previous > .trip-card-title');
    if (!this.currentTraveler.pastTrips.length) {
      tripPreviousDOMTitle.innerText = `You have no past trips`;
    } else {
      this.currentTraveler.pastTrips.forEach(trip => {
        let displayTrip = this.buildHTMLForTrips(trip);
        tripPreviousDOM.insertAdjacentHTML('beforeend', displayTrip);
      });
    }
  },

  buildHTMLForTrips(trip) {
    let destinationData = this.allDestinationData.find(destination => destination.id === trip.destinationID);
    return `
      <section class="trip-information">
        <article class="trip-picture">
          <img src="${destinationData.image}" alt="${destinationData.alt}">
        </article>
        <article class="trip-details">
          <h4>${destinationData.destination}</h4>
          <h4>${trip.date} for ${trip.duration} days</h4>
          <h4>Brought ${trip.travelers} travelers</h4>
        </article>
      </section>
    `;
  }
}

export default domUpdates;