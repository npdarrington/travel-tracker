const { expect } = require("chai");

import Destination from '../src/Destination';
import destinationData from './test-data/destination-test-data';

describe("Destination", () => {
  let destination;
  beforeEach(() => {
    destination = new Destination(destinationData[0]);
  });

  it('Should be an instance of a destination', () => {
    expect(destination).to.be.an.instanceof(Destination);
  });

  describe("Destination Properties", () => {
    it('Should have an id', () => {
      expect(destination.id).to.eq(1);
    });

    it('Should have a destination', () => {
      expect(destination.destination).to.eq('Lima, Peru');
    })
  })
})