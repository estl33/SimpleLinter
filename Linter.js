function onClick() {
  if (inputsAreEmpty()) {
    label1.textContent = 'Error: one or both inputs are empty.';
    return;
  }
  updateLabel();
}
function inputsAreEmpty() {
  if (getNumber1() === '' || getNumber2() === '') {
    return true;
  } else {
    return false;
  }
}
function updateLabel() {
  var addend1 = getNumber1();
  var addend2 = getNumber2();
  var sum = addend1 + addend2;
  label1.textContent = 'Word Count: ' + getWordCount(addend1);
  label2.textContent = 'Sentence Count: ' + getSentenceCount(addend1);
  label3.textContent = 'Unwanted words count: ' + getUnwantedWordCount(addend1, addend2);
  label4.textContent = 'Most common word: ' + getMostCommonWord(addend1);
}
function getNumber1() {
  return inputs[0].value;
}
function getNumber2() {
  return inputs[1].value;
}

const overusedWords = ['really', 'very', 'basically'];
const unnecessaryWords = ['extremely', 'literally', 'actually' ];
const articleWords = ['the', 'The', 'a', 'A', 'an', 'An'];

function convertInputToArray(inputParagraph) {
	return inputParagraph.split(' ');
}

function getWordCount(inputParagraph) {
	return convertInputToArray(inputParagraph).length;
}

function getSentenceCount(inputParagraph) {
	let countSentence = 0;
	let wordsArray = convertInputToArray(inputParagraph);
	wordsArray.forEach(word => {
		if(word[word.length -1] === '.' || word[word.length -1] === '!'){
			countSentence ++;
		}});
	return countSentence;
}

function getUnwantedWordCount(inputParagraph, inputUnwantedWords) {
	let countUnwanted = 0;
	let wordsArray = convertInputToArray(inputParagraph);
	let unwantedArray = getUnwantedWordArray(inputUnwantedWords);
	wordsArray.forEach(word => {
		if(unwantedArray.includes(word)){
			countUnwanted ++;
		}});
	return countUnwanted;
}

function getModifiedInput(inputParagraph) {
	let wordsArray = convertInputToArray(inputParagraph);
	return wordsArray.filter(word => {return ! unnecessaryWords.includes(word)}).join();
}

function getMostCommonWord(inputParagraph) {
	let wordCounts = [];
	let wordsArray = convertInputToArray(inputParagraph);
	wordsArray = wordsArray.filter(word => {return !articleWords.includes(word)});
	
	return wordsArray.sort((a,b) =>
          wordsArray.filter(word => word===a).length
        - wordsArray.filter(word => word===b).length
    ).pop();
}

function getUnwantedWordArray(inputUnwantedWords) {
	return inputUnwantedWords.split(' ');
}

var inputs = document.querySelectorAll('textarea');
var label1 = document.querySelector('#wordCount');
var label2 = document.querySelector('#sentenceCount');
var label3 = document.querySelector('#UnwantedWordCount');
var label4 = document.querySelector('#MostCommonWord');
var button = document.querySelector('button');
button.addEventListener('click', onClick);