import './css/base.scss';

import './images/turing-logo.png'

import fetches from './fetch';
import domUpdates from './domUpdates/domUpdates';
import Traveler from './Traveler';
import moment from 'moment';

let currentTraveler, todaysDate;

const getTravelerData = () => {
  return fetches.getAllTravelers()
    .then(data => {
      currentTraveler = new Traveler(data[Math.floor(Math.random() * data.length)]);
      todaysDate = moment().format('YYYY/MM/DD');
      domUpdates.setGlobalData(currentTraveler, todaysDate);
      domUpdates.updatePageOnLogin();
    });
}

window.addEventListener('load', getTravelerData);
