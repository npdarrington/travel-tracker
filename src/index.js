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
      currentTraveler = new Traveler(data[2][Math.floor(Math.random() * data.length)]);
      todaysDate = moment().format('YYYY/MM/DD');
      domUpdates.setGlobalData(currentTraveler, todaysDate, allTripsData, allDestinationsData);
      domUpdates.updatePageOnLogin();
    });
}

window.addEventListener('load', getAllInfoOnLogin);
