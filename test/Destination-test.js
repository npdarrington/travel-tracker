const { expect } = require("chai");

import Destination from '../src/Destination';
import destinationData from './test-data/destination-test-data';

describe("Destination", () => {
  let destination;
  beforeEach(() => {
    destination = new Destination(destinationData[0]);
  });

  it('Should be an instance of a Destination', () => {
    expect(destination).to.be.an.instanceof(Destination);
  });

  describe("Destination Properties", () => {
    it('Should have an id', () => {
      expect(destination.id).to.eq(1);
    });

    it('Should have a Destination', () => {
      expect(destination.destination).to.eq('Lima, Peru');
    });

    it('Should have an estimated lodging cost per day', () => {
      expect(destination.estimatedLodgingCostPerDay).to.eq(70);
    });

    it('Should have an estimated flight cost per person', () => {
      expect(destination.estimatedFlightCostPerPerson).to.eq(400);
    });

    it('Should have an image to showcase the Destination', () => {
      expect(destination.image).to.eq('https://images.unsplash.com/,photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&,ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&,w=2089&q=80');
    });

    it('Should have an alt tag associated with the showcase image', () => {
      expect(destination.alt).to.eq('overview of city buildings with a clear sky');
    })
  })
})