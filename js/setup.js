'use strict';

var CHARACTERS_LIST_LENGTH = 4;
var CHARACTERS_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var CHARACTERS_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var CHARACTERS_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var CHARACTERS_EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var setupElement = document.querySelector('.setup');
setupElement.classList.remove('hidden');

var charactersList = generateSimilarCharacters();

var charactersHTML = generateCharactersHTML(charactersList);
document.querySelector('.setup-similar-list').appendChild(charactersHTML);
document.querySelector('.setup-similar').classList.remove('hidden');

function generateSimilarCharacters() {
  var charactersList = [];

  for (var i = 0; i < CHARACTERS_LIST_LENGTH; i++) {
    var characterName = CHARACTERS_NAMES[getRandomIntInclusive(0, CHARACTERS_NAMES.length - 1)];
    var characterSurname = CHARACTERS_SURNAMES[getRandomIntInclusive(0, CHARACTERS_SURNAMES.length - 1)];
    var characterCoatColor = CHARACTERS_COAT_COLORS[getRandomIntInclusive(0, CHARACTERS_COAT_COLORS.length - 1)];
    var characterEyeColor = CHARACTERS_EYE_COLORS[getRandomIntInclusive(0, CHARACTERS_EYE_COLORS.length - 1)];

    var newCharacter = new Charcter(characterName, characterSurname, characterCoatColor, characterEyeColor);
    charactersList.push(newCharacter);
  }

  return charactersList;
}

function generateCharactersHTML(list) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < list.length; i++) {
    var template = document.querySelector('#similar-wizard-template').content.cloneNode(true);
    template.querySelector('.setup-similar-label').textContent = list[i].name;
    template.querySelector('.wizard-coat').style.fill = list[i].coatColor;
    template.querySelector('.wizard-eyes').style.fill = list[i].eyeColor;

    fragment.appendChild(template);
  }

  return fragment;
}

function Charcter(name, surname, coatColor, eyeColor) {
  this.name = name;
  this.surname = surname;
  this.coatColor = coatColor;
  this.eyeColor = eyeColor;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}
