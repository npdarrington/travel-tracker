const domUpdates = {
  currentTraveler: null,
  todaysDate: null,
  allTripsData: null,
  allDestinationData: null,
  tripTimelines: ['past', 'current', 'upcoming', 'pending'],

  setGlobalData(user, todaysDate, allTripsData, allDestinationData) {
    this.currentTraveler = user;
    this.todaysDate = todaysDate;
    this.allTripsData = allTripsData;
    this.allDestinationData = allDestinationData;
  },

  updatePageOnLogin() {
    this.displayCurrentTraveler();
    this.sortTravelerTrips();
    this.populateDestinationsOnDOM();
    this.tripTimelines.forEach(time => {
      this.displayAllTravelerTrips(time);
    });
  },

  displayCurrentTraveler() {
    document.querySelector('.travel-background-cta').innerText = `Let's book your next getaway ${this.currentTraveler.getFirstName()}!`;
  },

  populateDestinationsOnDOM() {
    let targetDropDownSelect = document.querySelector('#new-trip-destination');
    this.allDestinationData.forEach(destination => {
      let newDestinationOption = `<option value=${destination.id}>${destination.destination}</option>`;
      targetDropDownSelect.insertAdjacentHTML("beforeend", newDestinationOption);
    });
  },

  sortTravelerTrips() {
    this.currentTraveler.sortTripsByStatus(this.todaysDate, this.allTripsData);
  },

  displayAllTravelerTrips(time) {
    let targetDOMBody = document.querySelector(`.trip-${time}`);
    let targetDOMTitle = document.querySelector(`.trip-${time} > .trip-card-title`);
    if (!this.currentTraveler[`${time}Trips`].length) {
      targetDOMTitle.innerText = `You have no ${time} trips`;
    } else {
      this.currentTraveler[`${time}Trips`].forEach(trip => {
        let displayTrip = this.buildHTMLForTrips(trip);
        targetDOMBody.insertAdjacentHTML('beforeend', displayTrip);
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
          <h4>${trip.date} for ${trip.duration} day(s)</h4>
          <h4>Brought ${trip.travelers} traveler(s)</h4>
        </article>
      </section>
    `;
  }
}

export default domUpdates;