import './css/base.scss';

import './images/turing-logo.png'

import fetches from './fetch';
import domUpdates from './domUpdates/domUpdates';
import Traveler from './Traveler';
import Trip from './Trip';
import Destination from './Destination';
import moment from 'moment';

let currentTraveler, todaysDate;
let allTripsData = [];
let allDestinationsData = [];

const getAllInfoOnLogin = () => {
  let allFetchData = [
    fetches.getAllTrips(),
    fetches.getAllDestinations(),
    fetches.getAllTravelers(),
  ]
  Promise.all(allFetchData)
    .then(data => {
      data[0].forEach(trip => {
        let newTrip = new Trip(trip);
        allTripsData.push(newTrip);
      })
      data[1].forEach(destination => {
        let newDestination = new Destination(destination);
        allDestinationsData.push(newDestination);
      });
      currentTraveler = new Traveler(data[2][Math.floor(Math.random() * data[2].length)]);
      todaysDate = moment().format('YYYY/MM/DD');
      domUpdates.setGlobalData(currentTraveler, todaysDate, allTripsData, allDestinationsData);
      domUpdates.updatePageOnLogin();
    });
}

const newTripSubmission = () => {
  let selectedDate = document.querySelector('#new-trip-date').value;
  let getDestinationID = document.querySelector('#new-trip-destination').value;
  let getTravelerCount = document.querySelector('#new-trip-travelers').value;
  let getDuration = document.querySelector('#new-trip-duration').value;
  let newTripEntry = {
    id: Date.now(),
    userID: currentTraveler.id,
    destinationID: getDestinationID,
    date: moment(new Date(selectedDate)).format('YYYY/MM/DD'),
    travelers: getTravelerCount, 
    duration: getDuration,
    status: 'pending',
    suggestedActivities: []
  }
  // insert fetch call here with newTripEntry as argument
}

window.addEventListener('load', getAllInfoOnLogin);