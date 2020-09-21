const { expect } = require("chai");

import destinationData from './test-data/destination-test-data';
import travelerData from './test-data/traveler-test-data';
import tripsData from './test-data/trips-test-data';
import Destination from '../src/Destination';
import Traveler from '../src/Traveler';
import Trip from '../src/Trip';

describe('Traveler', () => {
  let traveler, trip, trip1, trip2, trip3, trip4, trip5, allTrips, allDestinations;

  beforeEach(() => {
    traveler = new Traveler(travelerData[0]);
    trip = new Trip(tripsData[0]);
    trip1 = new Trip(tripsData[1]);
    trip2 = new Trip(tripsData[2]);
    trip3 = new Trip(tripsData[3]);
    trip4 = new Trip(tripsData[4]);
    trip5 = new Trip(tripsData[5]);
    allTrips = [trip, trip1, trip2, trip3, trip4, trip5];
    allDestinations = [];
    destinationData.forEach(destination => {
      let newDestination = new Destination(destination);
      allDestinations.push(newDestination);
    })
  });

  describe('Traveler Properties', () => {
    it('Should be an instantiation of a traveler', () => {
      expect(traveler).to.be.an.instanceof(Traveler);
    });
  
    it('A traveler should have an id', () => {
      expect(traveler.id).to.eq(1);
    });
  
    it('A traveler should have a name', () => {
      expect(traveler.name).to.eq('Ham Leadbeater');
    });
  
    it('A traveler should be able to have multiple traveler type values', () => {
      expect(traveler.travelerType).to.eq('relaxer');
    });
  
    it('A traveler should instantiate with an empty array of past trips they have taken', () => {
      expect(traveler.pastTrips).to.deep.eq([]);
    });
  
    it('A traveler should instantiate with an empty array of current trips they are currently on', () => {
      expect(traveler.currentTrips).to.deep.eq([]);
    });
  
    it('A traveler should instantiate with an empty array of current trips that are upcoming', () => {
      expect(traveler.upcomingTrips).to.deep.eq([]);
    });
  
    it('A traveler should instantiate with an empty array of current trips that are pending', () => {
      expect(traveler.pendingTrips).to.deep.eq([]);
    });
  });
  
  describe('Traveler sortTripsByStatus Method', () => {
    it('Sort a travelers destination trip data into past trips for past trips that have ended', () => {
      traveler.sortTripsByStatus("2019/09/18", allTrips);
      expect(traveler.pastTrips[0]).to.deep.eq(allTrips[3]);
    });
  
    it('Sort a travelers destination trip data into current trips for current trips they are on', () => {
      traveler.sortTripsByStatus("2019/09/18", allTrips);
      expect(traveler.currentTrips[0]).to.deep.eq(allTrips[2]);
    });
  
    it('Sort a travelers destination trip data into upcoming trips for current trips that have been approved', () => {
      traveler.sortTripsByStatus("2019/09/18", allTrips);
      expect(traveler.upcomingTrips[0]).to.deep.eq(allTrips[0, 5]);
    });
  
    it('Sort a travelers destination trip data into pending trips for current trips that have not been approved', () => {
      traveler.sortTripsByStatus("2019/09/18", allTrips);
      expect(traveler.pendingTrips[0]).to.deep.eq(allTrips[1]);
    });
  });

  describe('Traveler getYTDTotal', () => {
    it('Should show how much a user has spent for the entire year, not including pending trips', () => {
      expect(traveler.getYTDTotal('2020', allTrips, allDestinations)).to.eq('12595.00');
    });
  });
});