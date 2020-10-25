'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var API_KEY = 'f929092fa2c5d337af8590ea505a1e45';
var BASE_URL = 'https://gateway.marvel.com/v1/public/';
var COMICS_URL = BASE_URL + 'comics?apikey=' + API_KEY;

fetch(COMICS_URL).then(function (res) {
  return res.json();
}).then(function (res) {
  return handleComicsData(res.data);
});

var e = React.createElement;

var ReactApp = function (_React$Component) {
  _inherits(ReactApp, _React$Component);

  function ReactApp(props) {
    _classCallCheck(this, ReactApp);

    var _this = _possibleConstructorReturn(this, (ReactApp.__proto__ || Object.getPrototypeOf(ReactApp)).call(this, props));

    _this.state = { liked: false };
    return _this;
  }

  _createClass(ReactApp, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      if (this.state.liked) {
        return 'You liked this.';
      }

      return e('button', { onClick: function onClick() {
          return _this2.setState({ liked: true });
        } }, 'Like');
    }
  }]);

  return ReactApp;
}(React.Component);

function handleComicsData(comicsData) {
  var appDiv = document.getElementById('app');
  var formattedComicsData = formatComicsData(comicsData);

  buildApp(appDiv, formattedComicsData);
}

function formatComicsData(comicsData) {
  var formattedComicsData = [];

  for (var i = 0; i < comicsData.results.length; i++) {
    var thisResult = comicsData.results[i];

    formattedComicsData.push({
      id: thisResult.id,
      title: thisResult.title,
      description: thisResult.description
    });
  }

  return formattedComicsData;
}

function buildApp(appDiv, data) {
  // Build an array of divs, one for each character
  var characterDivs = buildCharacterDivs(data);

  // Now we have an array called characterDivs
  // Each element in the array is a div
  // For each element in the array, append a child
  // to our top-level app div
  for (var i = 0; i < characterDivs.length; i++) {
    var thisParticularCharacterDiv = characterDivs[i];

    appDiv.appendChild(thisParticularCharacterDiv);
  }
}

function buildCharacterDivs(characters) {
  var characterDivs = characters.map(function (character) {
    return buildCharacterDiv(character);
  });

  return characterDivs;
}

function buildCharacterDiv(character) {
  var characterHeading = buildCharacterHeading(character.title);
  var characterParagraph = buildCharacterParagraph(character.description);
  var characterDiv = fillCharacterDiv(characterHeading, characterParagraph);

  return characterDiv;
}

function buildCharacterHeading(characterTitle) {
  var h3El = document.createElement('h3');
  h3El.innerText = characterTitle;

  return h3El;
}

function buildCharacterParagraph(characterDescription) {
  var pEl = document.createElement('p');
  pEl.innerHTML = characterDescription;

  return pEl;
}

function fillCharacterDiv(characterHeading, characterParagraph) {
  var filledDiv = document.createElement('div');
  filledDiv.appendChild(characterHeading);
  filledDiv.appendChild(characterParagraph);

  return filledDiv;
}