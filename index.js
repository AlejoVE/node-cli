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

//This argument can be part of the country name or a year
let thirdArg = process.argv[3];

if (thirdArg) {
	//Evaluate if argument is a number or not
	let isNumber = Number.isInteger(parseInt(thirdArg));

	if (isNumber) {
		year = Number(thirdArg);
	} else {
		country = `${process.argv[2]} ${thirdArg}`;
	}
}

if (process.argv[4]) {
	country = `${process.argv[2]} ${process.argv[3]}`;
	year = Number(`${process.argv[4]}`);
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
