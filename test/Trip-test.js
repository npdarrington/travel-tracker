const { expect } = require("chai");

import travelerData from './test-data/traveler-test-data';
import tripsData from './test-data/trips-test-data';
import Traveler from '../src/Traveler';
import Trip from '../src/Trip';

describe('Trip', () => {
  let traveler, trip;
  beforeEach(() => {
    traveler = new Traveler(travelerData[0]);
    trip = new Trip(traveler.id);
  });

  it('A Trip should be an instance of a trip', () => {
    expect(trip).to.be.an.instanceof(Trip);
  });

  describe('Trip Properties', () => {
    it('Should have the traveler that is logged in be the main reference for the trip', () => {
      expect(trip.userID).to.eq(1);
    })
  });
})