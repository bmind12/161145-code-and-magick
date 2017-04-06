'use strict';

var CHARS_LIST_LENGTH = 4;
var NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];
var SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];
var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_TEMPLATE = 'similar-wizard-template';


var setupElement = document.querySelector('.setup');
setupElement.classList.remove('hidden');
var charactersList = generateSimilarCharacters();
var charactersHTML = generateCharactersHTML(charactersList, WIZARD_TEMPLATE);
document.querySelector('.setup-similar-list').appendChild(charactersHTML);
document.querySelector('.setup-similar').classList.remove('hidden');

function generateSimilarCharacters() {
  var similarCharacters = [];

  for (var i = 0; i < CHARS_LIST_LENGTH; i++) {

    var newCharacter = createCharcter({
      charName: NAMES[getRandomInt(0, NAMES.length - 1)],
      charSurname: SURNAMES[getRandomInt(0, SURNAMES.length - 1)],
      charCoatColor: COAT_COLORS[getRandomInt(0, COAT_COLORS.length - 1)],
      charEyeColor: EYE_COLORS[getRandomInt(0, EYE_COLORS.length - 1)],
    });

    similarCharacters.push(newCharacter);
  }

  return similarCharacters;
}

function generateCharactersHTML(list, templateClass) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < list.length; i++) {
    var template =
      document.querySelector('#' + templateClass).content.cloneNode(true);

    fillCharacterTemplate(template, list[i]);

    fragment.appendChild(template);
  }

  return fragment;
}

function fillCharacterTemplate(template, charData) {
  template.querySelector('.setup-similar-label').textContent = charData.name;
  template.querySelector('.wizard-coat').style.fill = charData.coatColor;
  template.querySelector('.wizard-eyes').style.fill = charData.eyeColor;
}

function createCharcter(charData) {
  var character = {
    name: charData.charName,
    surname: charData.charSurname,
    coatColor: charData.charCoatColor,
    eyeColor: charData.charEyeColor,
  };

  return character;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}
