const thumbBarEl = document.querySelector('.thumb-bar');
const displayedImage = document.querySelector('.displayed-img');
const btn = document.querySelector('.dark');
const overlay = document.querySelector('.overlay');

const photos = ['pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 'pic5.jpg'];

photos.forEach((photo) => {
  const thumbBar = document.createElement('img');
  thumbBar.src = `./images/${photo}`;
  thumbBar.alt = `${photo}`;
  thumbBarEl.appendChild(thumbBar);

  thumbBarEl.addEventListener('click', (event) => {
    imageSrc = event.target.getAttribute('src');
    displayedImage.src = imageSrc;
    imageAlt = event.target.getAttribute('alt');
    displayedImage.alt = imageAlt;
  });
});

btn.addEventListener('click', handleImageColor);

function handleImageColor(event) {
  const btnClass = event.target.getAttribute('class');
  if (btnClass === 'dark') {
    event.target.setAttribute('class', 'light');
    event.target.textContent = 'Lighten';
    overlay.style.backgroundColor = 'rgb(0 0 0 / 50%)';
  } else {
    event.target.setAttribute('class', 'dark');
    event.target.textContent = 'Darken';
    overlay.style.backgroundColor = 'rgb(0 0 0 / 0%)';
  }
}
