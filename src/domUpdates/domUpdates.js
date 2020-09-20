const domUpdates = {
  currentUser: null,
  todaysDate: null,

  setGlobalData(user, todaysDate) {
    this.currentUser = user;
    this.todaysDate = todaysDate;
  }
}

export default domUpdates;