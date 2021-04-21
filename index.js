#!/usr/bin/env node

//To get directory path
var path = require('path');

const { getHolidays, validateYear, getCountryCode } = require(path.resolve(
	__dirname,
	'./helpers'
));

let country = process.argv[2];
let today = new Date();
let year = today.getFullYear();
let input = process.argv;

//This argument can be part of the country name or a year
let thirdArg = input[3];

if (thirdArg) {
	//Evaluate if argument is a number or not
	let isNumber = Number.isInteger(parseInt(thirdArg));

	if (isNumber) {
		year = Number(thirdArg);
	} else {
		country = `${input[2]} ${thirdArg}`;
	}
}

if (input[4]) {
	country = `${input[2]} ${input[3]}`;
	year = Number(`${input[4]}`);
}

let countryCode = getCountryCode(country);
let isValidYear = validateYear(year);

if (countryCode === undefined) {
	return console.log(`We could not get the holidays of ${country}, sorry`);
}

if (!isValidYear) {
	console.log('Invalid year');
	return;
}

const myHolidays = [];
const holidays = getHolidays(year, countryCode);
holidays.then((data) => {
	const myHolidays = [];

	data.forEach(({ date, name, localName }) => {
		myHolidays.push({
			date,
			['Holiday Name']: name,
			['Local Name']: localName,
		});
	});

	console.table(myHolidays);
});
