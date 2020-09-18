const { expect } = require("chai");

import travelerData from './test-data/traveler-test-data';
import tripsData from './test-data/trips-test-data';
import Traveler from '../src/Traveler';
import Trip from '../src/Trip';

describe('Trip', () => {
  let traveler, trip;
  beforeEach(() => {
    traveler = new Traveler(travelerData[0]);
    trip = new Trip();
  });

  describe('Trip Properties', () => {
    
  });
})