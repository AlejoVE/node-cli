#!/usr/bin/env node

//To get directory path
var path = require('path');

const { getHolidays, validateYear, getCountryCode } = require(path.resolve(
	__dirname,
	'./helpers'
));

let input = process.argv;
let country = input[2];
let today = new Date();
let year = today.getFullYear();

//This argument can be part of the country name or a year
let secondArg = input[3];

if (secondArg) {
	//Evaluate if argument is a number or not
	let isNumber = Number.isInteger(parseInt(secondArg));

	if (isNumber) {
		year = Number(secondArg);
	} else {
		country = `${input[2]} ${secondArg}`;
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
