const urlStart = `https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/`

const getAllTravelers = () => {
  return fetch(`${urlStart}travelers/travelers`)
    .then(response => response.json())
    .then(data => {
      return data.travelers;
    });
}