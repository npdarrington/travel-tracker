const { expect } = require("chai");

import travelerData from './test-data/traveler-test-data';
import tripsData from './test-data/trips-test-data';
import destinationData from './test-data/destination-test-data';
import Traveler from '../src/Traveler';
import Trip from '../src/Trip';

describe('Trip', () => {
  let traveler, trip;
  beforeEach(() => {
    traveler = new Traveler(travelerData[0]);
    trip = new Trip(traveler.id, destinationData[3].id, 6, '2019/09/18', 20);
  });

  it('A Trip should be an instance of a trip', () => {
    expect(trip).to.be.an.instanceof(Trip);
  });

  describe('Trip Properties', () => {
    it('Should have the traveler that is logged in be the main reference for the trip', () => {
      expect(trip.userID).to.eq(1);
    });

    it('Should have a destination id that the trip selection was booked for', () => {
      expect(trip.destinationID).to.eq(4);
    });

    it('Should have a default number of travelers as 1, for the traveler who booked the trip', () => {
      trip = new Trip(traveler.id, destinationData[3].id);
      expect(trip.travelers).to.eq(1);
    });

    it('Should be able to take in as many travelers as the person who books the trip allows', () => {
      expect(trip.travelers).to.eq(6);
    });

    it('Should have a trip that the Trip was booked for', () => {
      expect(trip.date).to.eq('2019/09/18');
    });

    it('Should have a default duration of at least 1 day for a trip', () => {
      trip = new Trip(traveler.id, destinationData[3].id, 6, '2019/09/18');
      expect(trip.duration).to.eq(1);
    });

    it('Should allow the user to enter in the amount of days duration for a trip', () => {
      expect(trip.duration).to.eq(20);
    });

    it('Should default all newly booked trips status to pending', () => {
      expect(trip.status).to.eq('pending');
    });
  });
})