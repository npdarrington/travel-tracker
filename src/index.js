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

const submitNewTripBtn = document.querySelector('#btnSubmit');
const newTripSection = document.querySelector('.new-trip');

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
  fetches.postNewlyBookedTrip(newTripEntry);
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

window.addEventListener('load', getAllInfoOnLogin);
submitNewTripBtn.addEventListener('click', newTripSubmission);
newTripSection.addEventListener('change', calculateTripSelectionPricing);