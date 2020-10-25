const API_KEY = 'f929092fa2c5d337af8590ea505a1e45'
const BASE_URL = 'https://gateway.marvel.com/v1/public/'
const COMICS_URL = BASE_URL + 'comics?apikey=' + API_KEY
const APP_DIV = document.getElementById('vanillaAppMountPoint')

// This will ge replaced in the buildApp function after the API call returns
APP_DIV.innerText = 'Loading...'

fetch(COMICS_URL)
  .then((res) => res.json())
  .then((res) => handleComicsData(APP_DIV, res.data))

function handleComicsData(appDiv, comicsData) {
  const formattedComicsData = formatComicsData(comicsData)

  buildApp(appDiv, formattedComicsData)
}

function formatComicsData(comicsData) {
  const formattedComicsData = []

  for (let i = 0; i < comicsData.results.length; i++) {
    const thisResult = comicsData.results[i]

    formattedComicsData.push({
      id: thisResult.id,
      title: thisResult.title,
      description: thisResult.description,
    })
  }

  return formattedComicsData
}

function buildApp(appDiv, data) {
  const characterDivs = buildCharacterDivs(data)

  // Clear out the loading message
  appDiv.innerText = ''

  characterDivs.forEach((characterDiv) => {
    appDiv.appendChild(characterDiv)
  })
}

function buildCharacterDivs(characters) {
  const characterDivs = characters.map((character) => {
    return buildCharacterDiv(character)
  })

  return characterDivs
}

function buildCharacterDiv(character) {
  const characterHeading = buildCharacterHeading(character.title)
  const characterParagraph = buildCharacterParagraph(character.description)
  const characterDiv = fillCharacterDiv(characterHeading, characterParagraph)

  return characterDiv
}

function buildCharacterHeading(characterTitle) {
  const h3El = document.createElement('h3')
  h3El.innerText = characterTitle

  return h3El
}

function buildCharacterParagraph(characterDescription) {
  const pEl = document.createElement('p')
  pEl.innerHTML = characterDescription

  return pEl
}

function fillCharacterDiv(characterHeading, characterParagraph) {
  const filledDiv = document.createElement('div')
  filledDiv.appendChild(characterHeading)
  filledDiv.appendChild(characterParagraph)

  return filledDiv
}
