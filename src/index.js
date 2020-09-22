import './css/base.scss';

import './images/travel-tracker-logo.png';

import fetches from './fetch';
import domUpdates from './domUpdates/domUpdates';
import Traveler from './Traveler';
import Trip from './Trip';
import Destination from './Destination';
import moment from 'moment';

let currentTraveler, todaysDate;
let allTripsData = [];
let allDestinationsData = [];
let newTripEntry;

const loginBtn = document.querySelector('#btn-login-submit');
const submitNewTripBtn = document.querySelector('#btnSubmit');
const newTripSection = document.querySelector('.new-trip');
const headerSection = document.querySelector('header');

const validateLogin = () => {
  const usernameValue =  document.querySelector('#username').value;
  const passwordValue =  document.querySelector('#password').value;
  getAllInfoOnLogin();
}

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

const calculateTripSelectionPricing = () => {
  let destinationID = document.querySelector('#new-trip-destination').value;
  let selectedDate = document.querySelector('#new-trip-date').value;
  let travelerCount = document.querySelector('#new-trip-travelers').value;
  let tripDuration = document.querySelector('#new-trip-duration').value;
  const tripStatusMessage = document.querySelector('.new-trip-status');
  if ((selectedDate !== '' && new Date(selectedDate) > new Date(todaysDate)) && destinationID !== '-1' && travelerCount > 0 && tripDuration > 0) {
    tripStatusMessage.innerText = displayEstimatedTripPricing(destinationID, selectedDate, travelerCount, tripDuration);
  } else {
    tripStatusMessage.innerText = `Please fill out all the date, number of travelers, trip duration and a trip location to see a calculated price`;
    submitNewTripBtn.disabled = true;
  }
}

const newTripSubmission = () => {
  let newTripMessage = document.querySelector(`.new-trip-status`);
  let newTripFetchMessage = fetches.postNewlyBookedTrip(newTripEntry);
  newTripFetchMessage.then(response => {
    if (response === 'success') {
      newTripMessage.innerText = `Your trip has been successfully booked! Our Travel Agent will contact you shortly to finalize the details.`;
      updateUserDashboard(currentTraveler.id);
    } else {
      newTripMessage.innerText = `Something went wrong while booking your new trip! We apologize for any errors. Please refresh and try again or contact one of our Travel Agents to complete.`;
    }
  });
  submitNewTripBtn.disabled = true;
}

const updateUserDashboard = (userID) => {
  let allTripsData = [];
  let allDestinationsData = [];
  let allFetchData = [
    fetches.getAllTrips(),
    fetches.getAllDestinations(),
    fetches.getSingleTraveler(userID),
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
      currentTraveler = new Traveler(data[2]);
      todaysDate = moment().format('YYYY/MM/DD');
      domUpdates.setGlobalData(currentTraveler, todaysDate, allTripsData, allDestinationsData);
      domUpdates.updatePageOnLogin();
    })
    .then(() => domUpdates.displayAllTravelerTrips('pending'));
}

const buildNewTripObject = (destinationID, selectedDate, travelerCount, tripDuration) => {
  return  {
    id: Date.now(),
    userID: +currentTraveler.id,
    destinationID: +destinationID,
    date: moment.utc((new Date(selectedDate))).format('YYYY/MM/DD'),
    travelers: +travelerCount, 
    duration: +tripDuration,
    status: 'pending',
    suggestedActivities: []
  };
}

const displayEstimatedTripPricing = (destinationID, selectedDate, travelerCount, tripDuration) => {
  newTripEntry = buildNewTripObject(destinationID, selectedDate, travelerCount, tripDuration);
  let temporaryTrip = new Trip(newTripEntry);
  let temporaryPrice = temporaryTrip.calculateTripPrice(allDestinationsData);
  submitNewTripBtn.disabled = false;
  return `The calculated cost for this trip is ${temporaryPrice}. Let's go!`;
}

const navigateTripTimeline = (event) => {
  if (event.target.classList.contains('past')) {
    domUpdates.displayAllTravelerTrips('past');
  }
  if (event.target.classList.contains('current')) {
    domUpdates.displayAllTravelerTrips('current');
  }
  if (event.target.classList.contains('upcoming')) {
    domUpdates.displayAllTravelerTrips('upcoming');
  } 
  if (event.target.classList.contains('pending')) {
    domUpdates.displayAllTravelerTrips('pending');
  }
}

// window.addEventListener('load', getAllInfoOnLogin);
travelerLoginBtn.addEventListener('click')
submitNewTripBtn.addEventListener('click', newTripSubmission);
headerSection.addEventListener('click', navigateTripTimeline);
newTripSection.addEventListener('change', calculateTripSelectionPricing);