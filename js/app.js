const API_KEY = 'f929092fa2c5d337af8590ea505a1e45'
const BASE_URL = 'https://gateway.marvel.com/v1/public/'
const COMICS_URL = BASE_URL + 'comics?apikey=' + API_KEY

fetch(COMICS_URL)
  .then((res) => res.json())
  .then((res) => console.log(res.data))
