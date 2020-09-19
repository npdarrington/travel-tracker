const { expect } = require("chai");

import travelerData from './test-data/traveler-test-data';
import destinationData from './test-data/destination-test-data';
import Traveler from '../src/Traveler';
import Trip from '../src/Trip';

describe('Trip', () => {
  let traveler, trip;
  beforeEach(() => {
    traveler = new Traveler(travelerData[0]);
    trip = new Trip(1000, traveler.id, destinationData[3].id, '2019/09/18', 6, 20);
  });

  it('A Trip should be an instance of a trip', () => {
    expect(trip).to.be.an.instanceof(Trip);
  });

  describe('Trip Properties', () => {
    it('The trip should have an id', () => {
      expect(trip.id).to.eq(1000);
    });

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

    it('Should default all newly booked trips should start with an array of empty activities', () => {
      expect(trip.suggestedActivities).to.deep.eq([]);
    });

    it('Should store the end date that is factored from the start date of the trip', () => {
      expect(trip.endDate).to.eq('2019/10/08');
    });
  });

  describe('Delete Trip Method', () => {
    it('Should be able to delete a user\'s trip', () => {
      const trip2 = new Trip(1001, 50, 4, 2, '2019/09/18', 5);
      const trip3 = new Trip(1002, 20, 3, 1, '2019/09/18', 2);
      const trips = [trip, trip2, trip3];
      trip.deleteTrip(1, trip.id, trips);
      expect(trips.length).to.eq(2);
    })
  });

  describe('Edit Trip Method', () => {
    it('Should be able to edit a user\'s trip', () => {
      expect(trip.editTrip(1, 16, '2019/12/11', 2, 4)).to.deep.eq({
        id: 1000,
        userID: 1,
        destinationID: 16,
        date: '2019/12/11',
        travelers: 2,
        duration: 4,
        status: 'pending',
        suggestedActivities: [],
        endDate: '2019/12/15'
      });
    });

    it('Should default to at least 1 traveler', () => {
      expect(trip.editTrip(1, 16, '2019/12/11')).to.deep.eq({
        id: 1000,
        userID: 1,
        destinationID: 16,
        date: '2019/12/11',
        travelers: 1,
        duration: 1,
        status: 'pending',
        suggestedActivities: [],
        endDate: '2019/12/12'
      });
    });

    it('Should default to at least 1 day duration', () => {
      expect(trip.editTrip(1, 16, '2019/12/11', 8)).to.deep.eq({
        id: 1000,
        userID: 1,
        destinationID: 16,
        date: '2019/12/11',
        travelers: 8,
        duration: 1,
        status: 'pending',
        suggestedActivities: [],
        endDate: '2019/12/12'
      });
    });
  });
})