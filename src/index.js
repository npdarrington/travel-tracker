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

const getAllTripsData = () => {
  return fetches.getAllTrips()
    .then(data => {
      data.forEach(trip => {
        let newTrip = new Trip(trip);
        allTripsData.push(newTrip);
      });
    })
    .catch(err => {
      console.log(err.message);
      return `Something went wrong and we were not able to get your trip data. Please refesh and try again!`;
    });
}

const getAllDestinationData = () => {
  return fetches.getAllDestinations()
    .then(data => {
      data.forEach(destination => {
        let newDestination = new Destination(destination);
        allDestinationsData.push(newDestination);
      })
      console.log(allDestinationsData)
    })
    .catch(err => {
      console.log(err.message);
      return `Something went wrong and we were not able to load the available destination data. Please refesh and try again!`;
    });
}

const getTravelerData = () => {
  return fetches.getAllTravelers()
    .then(data => {
      currentTraveler = new Traveler(data[Math.floor(Math.random() * data.length)]);
      todaysDate = moment().format('YYYY/MM/DD');
      domUpdates.setGlobalData(currentTraveler, todaysDate);
      domUpdates.updatePageOnLogin();
    })
    .catch(err => {
      console.log(err.message);
      return `Something went wrong and we were not able to get your data. Please refesh and try again!`;
    })
}

window.addEventListener('load', getAllDestinationData);
