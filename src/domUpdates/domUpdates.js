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
    this.populateDestinationsOnDOM();
    this.displayAllTravelerTrips('upcoming');
    this.displayTravelerYTDTotal();
  },

  displayCurrentTraveler() {
    document.querySelector('.travel-background-cta').innerText = `Let's book your next getaway ${this.currentTraveler.getFirstName()}!`;
  },

  populateDestinationsOnDOM() {
    let targetDropDownSelect = document.querySelector('#new-trip-destination');
    let sortDestinations = this.allDestinationData.sort((destination1, destination2) => {
      if (destination1.destination < destination2.destination) {
        return -1
      } else {
        return 1
      }
    })
    sortDestinations.forEach(destination => {
      let newDestinationOption = `<option value=${destination.id}>${destination.destination}</option>`;
      targetDropDownSelect.insertAdjacentHTML("beforeend", newDestinationOption);
    });
  },

  sortTravelerTrips() {
    this.currentTraveler.sortTripsByStatus(this.todaysDate, this.allTripsData);
  },

  displayAllTravelerTrips(time) {
    let targetDOMBody = document.querySelector(`.trip-organizer-cards`);
    let targetDOMTitle = document.querySelector(`.trip-organizer-title > h3`);
    targetDOMBody.innerText = '';
    if (!this.currentTraveler[`${time}Trips`].length) {
      targetDOMTitle.innerText = `You have no ${time} trips`;
    } else {
      targetDOMTitle.innerText = `Your ${time} trips`;
      this.currentTraveler[`${time}Trips`].forEach(trip => {
        let displayTrip = this.buildHTMLForTrips(trip);
        targetDOMBody.insertAdjacentHTML('beforeend', displayTrip);
      });
    }
  },

  buildHTMLForTrips(trip) {
    let destinationData = this.allDestinationData.find(destination => destination.id === trip.destinationID);
    return `
      <article class="trip-card">
        <section class="trip-information">
          <article class="trip-picture">
            <img src="${destinationData.image}" alt="${destinationData.alt}">
          </article>
          <article class="trip-details">
            <h4>${destinationData.destination}</h4>
            <h4>Booked for ${trip.date} with a duration of ${trip.duration} day(s)</h4>
            <h4>Traveling with ${trip.travelers} traveler(s)</h4>
          </article>
        </section>
      </article>
    `;
  },

  displayTravelerYTDTotal() {
    const domTripYTDTitle = document.querySelector('.header-ytd-text');
    const yearlyYTDTotal = this.currentTraveler.getYTDTotal('2020', this.allTripsData, this.allDestinationData);
    domTripYTDTitle.innerHTML = `2020 YTD Total<br>$${yearlyYTDTotal}`;
  }
}

export default domUpdates;