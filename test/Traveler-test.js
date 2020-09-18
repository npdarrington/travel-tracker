const { expect } = require("chai");

import travelerData from './test-data/traveler-test-data';
import Traveler from '../src/Traveler';

describe('Traveler', () => {
  let traveler;

  beforeEach(() => {
    traveler = new Traveler(travelerData[0]);
  });

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