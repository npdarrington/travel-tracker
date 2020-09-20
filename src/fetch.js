const urlStart = `https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/`

const getAllTravelers = () => {
  return fetch(`${urlStart}travelers/travelers`)
    .then(response => response.json())
    .then(data => {
      return data.travelers;
    })
    .catch(err => {
      console.log(err.message);
      return `There was an error getting all of the travelers information.`;
    });
}

const getSingleTraveler = id => {
  return fetch(`${urlStart}travelers/travelers/${id}`)
    .then(response => response.json())
    .then(data => {
      return data.travelers;
    })
    .catch(err => {
      console.log(err.message);
      return `There was an error getting travelers #${id} information.`;
    });
}

const getAllTrips = () => {
  return fetch(`${urlStart}trips/trips`)
    .then(response => response.json())
    .then(data => {
      return data.trips;
    })
    .catch(err => {
      console.log(err.message);
      return `There was an error getting all of the trips information`;
    });
}

const getAllDestinations = () => {
  return fetch(`${urlStart}destinations/destinations`)
    .then(response => response.json())
    .then(data => {
      return data.destinations;
    })
    .catch(err => {
      console.log(err.message);
      return `There was an error getting all of the destinations information`;
    });
}

export default {
  getAllTravelers,
  getSingleTraveler,
  getAllTrips,
  getAllDestinations
}