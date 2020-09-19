const { expect } = require("chai");

import Destination from '../src/Destination';
import destinationData from './test-data/destination-test-data';

describe("Destination", () => {
  let destination;
  beforeEach(() => {
    destination = new Destination();
  });

  it('Should be an instance of a destination', () => {
    expect(destination).to.be.an.instanceof(Destination);
  });
})