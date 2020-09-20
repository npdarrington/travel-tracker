const domUpdates = {
  currentTraveler: null,
  todaysDate: null,

  setGlobalData(user, todaysDate) {
    this.currentTraveler = user;
    this.todaysDate = todaysDate;
  },

  updatePageOnLogin() {
    this.displayCurrentTraveler();
  },

  displayCurrentTraveler() {
    document.querySelector('.travel-background-cta').innerText = `Let's book your next getaway ${this.currentTraveler.getFirstName()}!`;
  }
}

export default domUpdates;