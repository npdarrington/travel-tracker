const { expect } = require("chai");

import travelerData from './test-data/traveler-test-data';
import tripsData from './test-data/trips-test-data';
import Traveler from '../src/Traveler';

describe('Trip', () => {
  let traveler;
  beforeEach(() => {
    traveler = new Traveler(travelerData[0]);
  });
})