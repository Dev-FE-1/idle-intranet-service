import axios from 'axios'

export function setupCounter(element) {
  let counter = 0

  const setCounterWithFetch = async () => {
    let resultMessage = 'fetching...'

    element.innerText = resultMessage

    try {
      const response = await fetch(`/api/counter?latest=${counter}`)

      if (!response.ok) {
        throw new Error('Fetch error!!')
      }

      const data = await response.json()
  
      counter = data.data

      resultMessage = `fetch count is ${counter}`
    } catch (error) {
      resultMessage = 'fetch error!'
    }

    element.innerText = resultMessage
  }

  const setCounterWithAxios = async () => {
    const response = await axios.get(`/api/counter?latest=${counter}`)

    if (response.status === 200) {
      counter = response.data.data
      element.innerHTML = `axios count is ${counter}`
    }
  }

  element.addEventListener('click', setCounterWithFetch)

  setCounterWithFetch()
}
