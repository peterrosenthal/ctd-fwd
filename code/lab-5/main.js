function showDogPic(data) {
  const wrapper = document.createElement('div');
  document.body.querySelector('main').appendChild(wrapper);

  if (data.url.substring(data.url.length - 3) != 'mp4') {
    const img = document.createElement('img');
    img.src = data.url;
    wrapper.appendChild(img);
  } else {
    const p = document.createElement('p');
    p.textContent = 'Couldn\'t display image properly, wrong file format, refresh to try again with a different image.';
    wrapper.appendChild(p);
  }
}

function showDogFact(data) {
  const p = document.createElement('p');
  p.textContent = data[Math.floor(Math.random() * data.length)].fact;
  document.body.querySelector('main').appendChild(p);
}

fetch('https://random.dog/woof.json')
  .then(response => response.json())
  .then(data => showDogPic(data))
  .catch(error => console.log(error));

fetch('https://dog-facts-api.herokuapp.com/api/v1/resources/dogs/all')
  .then(response => response.json())
  .then(data => showDogFact(data))
  .catch(error => {
    console.log(error);
    fetch('backup-dog-facts.json')
      .then(response => response.json())
      .then(data => showDogFact(data))
      .catch(arrrerrorrer => console.log(arrrerrorrer));
  });
