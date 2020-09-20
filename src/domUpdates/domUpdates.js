const domUpdates = {
  currentUser: null,
  todaysDate: null,

  setGlobalData(user, todaysDate) {
    this.currentUser = user;
    this.todaysDate = todaysDate;
  },

  displayCurrentUser() {
    document.querySelector('#user-name').innerText = `${this.currentUser.getFirstName()}'s Travel Tracker`;
  }
}

export default domUpdates;