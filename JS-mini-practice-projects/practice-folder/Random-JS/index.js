fetchPromise = fetch('');

fetchPromise
  .then((response) => {
    if (!response.ok) {
      throw new Error(`http error: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error(`can\'t get product: ${error}`);
  });

  //

async function fetchData() {
  try {
    const response = await fetch('url');
    const data = await response.json();
    console.log('data:', data);
  } catch (error) {
    console.error('error:', error);
  }
}

//

function alarm(person, delay) {
  return new Promise((resolve, reject) => {
        if (delay < 0) {
          throw new Error('Alarm is less than Zero')
        } setTimeout(() => {
          resolve(`wake up ${person}`)
        }, delay)
   })
}

btn.addEventListener('click', () => {
  alarm(something.value, delay.value)
  .then(message) = (something.textContent = message)
  .catch(error) = (something.textContent = `couldnt: ${error}`)
})
