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
  },

  displayCurrentTraveler() {
    document.querySelector('.travel-background-cta').innerText = `Let's book your next getaway ${this.currentTraveler.getFirstName()}!`;
  },
}

export default domUpdates;