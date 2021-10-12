const url = new URL('https://dog-facts-api.herokuapp.com/api/v1/resources/dogs');

fetch(url)
  .then(response => { response.json() })
  .then((data) => {
    const p = document.createElement('p');
    p.textContent = data[0].fact;
    document.body.appendChild(p);
  })
  .catch(error => console.log(error));