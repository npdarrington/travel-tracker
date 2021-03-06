const urlStart = `https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/`

const getAllTravelers = () => {
  return fetch(`${urlStart}travelers/travelers`)
    .then(response => response.json())
    .then(data => data.travelers)
    .catch(err => {
      return `There was an error getting all of the travelers information.`;
    });
}

const getSingleTraveler = id => {
  return fetch(`${urlStart}travelers/travelers/${id}`)
    .then(response => response.json())
    .then(data => data)
    .catch(err => {
      return `There was an error getting travelers #${id} information.`;
    });
}

const getAllTrips = () => {
  return fetch(`${urlStart}trips/trips`)
    .then(response => response.json())
    .then(data => data.trips)
    .catch(err => {
      return `There was an error getting all of the trips information`;
    });
}

const getAllDestinations = () => {
  return fetch(`${urlStart}destinations/destinations`)
    .then(response => response.json())
    .then(data => data.destinations)
    .catch(err => {
      return `There was an error getting all of the destinations information`;
    });
}

const postNewlyBookedTrip = tripInformation => {
  return fetch(`${urlStart}trips/trips`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(tripInformation)
  })
    .then(response => {
      return (response.ok) ? `success` : `failed`
    })
    .catch(() => `failed`);
}

export default {
  getAllTravelers,
  getSingleTraveler,
  getAllTrips,
  getAllDestinations,
  postNewlyBookedTrip
}