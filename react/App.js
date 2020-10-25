var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import formatComicsData from './helpers/formatComicsData.js';

var API_KEY = 'f929092fa2c5d337af8590ea505a1e45';
var BASE_URL = 'https://gateway.marvel.com/v1/public/';
var COMICS_URL = BASE_URL + 'comics?apikey=' + API_KEY;

// This is a React component. It's a function that must return "jsx".
// See below at the return statement.
function App() {
  // This is how we store the results of our API call
  var _React$useState = React.useState(),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      formattedComicsData = _React$useState2[0],
      setFormattedComicsData = _React$useState2[1];

  // This function runs automatically when this component is mounted


  React.useEffect(function () {
    // Use fetch to hit the COMICS_URL
    fetch(COMICS_URL)
    // Convert the results to a JS object
    .then(function (res) {
      return res.json();
    })
    // Do something with that JS object
    .then(function (res) {
      // Format the object to our slimmed-down format
      var formattedComicsData = formatComicsData(res.data);

      // Set the formattedComicsData state to that formatted object
      setFormattedComicsData(formattedComicsData);
    });
  }, [COMICS_URL]);

  // Before the API call returns, formattedComicsData is undefined,
  // so this React component returns some jsx, which is a div that
  // says "Loading...".
  if (formattedComicsData === undefined) {
    return React.createElement(
      'div',
      null,
      'Loading...'
    );
  }

  // After the API call returns, the data will be processed and saved as
  // formattedComicsData.
  // The map method will loop over every object in the formattedComicsData
  // array and return "jsx" which looks like html but isn't.
  return formattedComicsData.map(function (character) {
    return React.createElement(
      'div',
      { key: character.id },
      React.createElement(
        'h3',
        null,
        character.title
      ),
      React.createElement(
        'p',
        null,
        character.description
      )
    );
  });
}

// This is how the React component above (App) gets mounted to the
// div in our react.html file.
var reactAppMountPoint = document.getElementById('reactAppMountPoint');
ReactDOM.render(React.createElement(App, null), reactAppMountPoint);