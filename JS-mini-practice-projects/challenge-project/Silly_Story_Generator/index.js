const inputEl = document.querySelector('.name-input');
const phRadioEl = document.querySelector('.ph-radio');
const amRadioEl = document.querySelector('.am-radio');
const generateBtn = document.querySelector('.generate-btn');
const storyEl = document.querySelector('.story');

function generateStoryPH() {
  let customName = inputEl.value;
  let insertX = ['Markiplier', 'Pewdipie', 'Ninong Ry'];
  let insertY = ['Sogo', 'Bahay ni BBM', '5J store'];
  let insertZ = [
    'kinalmot ni fabio sa pwet',
    'inalok ni BBM ng tyongke',
    'nag bato ng frag granade',
  ];

  let randomX = Math.floor(Math.random() * insertX.length);
  let randomY = Math.floor(Math.random() * insertY.length);
  let randomZ = Math.floor(Math.random() * insertZ.length);

  let storyText = `Tanghaling tapat, kaya si ${insertX[randomX]} ay umalis ng bahay para mamasyal. Nang sya ay makarating sa ${insertY[randomY]}, nagulat sya sa kanyang nakita, at sya ay ${insertZ[randomZ]}. Nakita ni Bob and mga nangyare, pero hindi na ito nagulat— si ${insertX[randomX]} ay nagchochongke sa umaga`;

  let bobName = storyText.indexOf('Bob');

  if (customName !== '') {
    let beforeBob = storyText.slice(0, bobName);
    let afterBob = storyText.slice(bobName + 'bob'.length);
    let newStory = `${beforeBob} ${customName} ${afterBob}`;
    storyEl.textContent = newStory;
  } else {
    storyEl.textContent = storyText;
  }

  inputEl.value = '';
  inputEl.focus();
}

function generateStoryAM() {
  let customName = inputEl.value;

  let insertX = ['Willy the Goblin', 'Big Daddy', 'Father Christmas'];
  let insertY = ['Disneyland', 'the soup kitchen', 'the White House'];
  let insertZ = [
    'spontaneously combusted',
    'melted into a puddle on the sidewalk',
    'turned into a slug and crawled away',
  ];

  let randomX = Math.floor(Math.random() * insertX.length);
  let randomY = Math.floor(Math.random() * insertY.length);
  let randomZ = Math.floor(Math.random() * insertZ.length);

  let storyText = `It was 94 fahrenheit outside, so ${insertX[randomX]} went for a walk. When they got to ${insertY[randomY]}, they stared in horror for a few moments, then ${insertZ[randomZ]}. Bob saw the whole thing, but was not surprised — ${insertX[randomX]} weighs 300 pounds, and it was a hot day.`;

  let bobName = storyText.indexOf('Bob');

  if (customName !== '') {
    let beforeBob = storyText.slice(0, bobName);
    let afterBob = storyText.slice(bobName + 'bob'.length);
    let newStory = `${beforeBob} ${customName} ${afterBob}`;
    storyEl.textContent = newStory;
  } else {
    storyEl.textContent = storyText;
  }

  inputEl.value = '';
  inputEl.focus();
}

phRadioEl.addEventListener('change', () => {
  if (phRadioEl.checked) {
    amRadioEl.disabled = true;
    phRadioEl.disabled = false;
  } else {
    amRadioEl.disabled = false;
  }
});

amRadioEl.addEventListener('change', () => {
  if (amRadioEl.checked) {
    phRadioEl.disabled = true;
    amRadioEl.disabled = false; // Ensure it remains enabled if it's checked
  } else {
    phRadioEl.disabled = false;
  }
});

generateBtn.addEventListener('click', () => {
  phRadioEl.checked ? generateStoryPH() : generateStoryAM();
});
