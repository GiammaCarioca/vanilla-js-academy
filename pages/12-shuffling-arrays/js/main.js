/**
 * Randomly shuffle an array
 * https://stackoverflow.com/a/2450976/1293256
 * @param  {Array} array The array to shuffle
 * @return {String}      The first item in the shuffled array
 */
var shuffle = function(array) {
	var currentIndex = array.length;
	var temporaryValue, randomIndex;
	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
};

// The monsters and socks
const monsters = [
	'monster1',
	'monster2',
	'monster3',
	'monster4',
	'monster5',
	'monster6',
	'monster7',
	'monster8',
	'monster9',
	'monster10',
	'monster11',
	'sock'
];

const app = document.querySelector('#app');
const grid = document.querySelector('.row');

function createGridItems(monsters) {
	shuffle(monsters);
	return monsters.map(
		monster => `<img src="./assets/svg/${monster}.svg" alt="${monster}">`
	);
}

function buildGrid(gridItems) {
	return (grid.innerHTML = gridItems
		.map(item => `<div class="grid">${item}</div>`)
		.join(''));
}

const gridItems = createGridItems(monsters);
buildGrid(gridItems);
