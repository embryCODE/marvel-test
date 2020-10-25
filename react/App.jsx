import formatComicsData from './helpers/formatComicsData.js'

const API_KEY = 'f929092fa2c5d337af8590ea505a1e45'
const BASE_URL = 'https://gateway.marvel.com/v1/public/'
const COMICS_URL = BASE_URL + 'comics?apikey=' + API_KEY

// This is a React component. It's a function that must return "jsx".
// See below at the return statement.
function App() {
  // This is how we store the results of our API call
  const [formattedComicsData, setFormattedComicsData] = React.useState()

  // This function runs automatically when this component is mounted
  React.useEffect(() => {
    // Use fetch to hit the COMICS_URL
    fetch(COMICS_URL)
      // Convert the results to a JS object
      .then((res) => res.json())
      // Do something with that JS object
      .then((res) => {
        // Format the object to our slimmed-down format
        const formattedComicsData = formatComicsData(res.data)

        // Set the formattedComicsData state to that formatted object
        setFormattedComicsData(formattedComicsData)
      })
  }, [COMICS_URL])

  // Before the API call returns, formattedComicsData is undefined,
  // so this React component returns some jsx, which is a div that
  // says "Loading...".
  if (formattedComicsData === undefined) {
    return <div>Loading...</div>
  }

  // After the API call returns, the data will be processed and saved as
  // formattedComicsData.
  // The map method will loop over every object in the formattedComicsData
  // array and return "jsx" which looks like html but isn't.
  return formattedComicsData.map((character) => {
    return (
      <div key={character.id}>
        <h3>{character.title}</h3>
        {/* This dangerouslySetInnerHTML thing is a bit of a hack. Ignore. */}
        <p dangerouslySetInnerHTML={{ __html: character.description }} />
      </div>
    )
  })
}

// This is how the React component above (App) gets mounted to the
// div in our react.html file.
const reactAppMountPoint = document.getElementById('reactAppMountPoint')
ReactDOM.render(<App />, reactAppMountPoint)
