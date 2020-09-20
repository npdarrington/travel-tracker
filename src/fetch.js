const urlStart = `https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/`

const getAllTravelers = () => {
  return fetch(`${urlStart}travelers/travelers`)
    .then(response => response.json())
    .then(data => {
      return data.travelers;
    });
}

const getSingleTraveler = id => {
  return fetch(`${urlStart}travelers/travelers/${id}`)
    .then(response => response.json())
    .then(data => {
      return data.travelers;
    });
}

const getAllTrips = () => {
  return fetch(`${urlStart}trips/trips`)
    .then(response => response.json())
    .then(data => {
      return data.trips;
    });
}

const getAllDestinations = () => {
  return fetch(`${urlStart}destinations/destinations`)
    .then(response => response.json())
    .then(data => {
      return data.destinations;
    });
}