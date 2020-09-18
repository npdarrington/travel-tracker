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
    console.log(traveler);
    expect(traveler.id).to.eq(1);
  });
});