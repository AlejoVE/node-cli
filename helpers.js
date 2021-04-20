const axios = require('axios').default;
const countryList = require('country-list');

const getHolidays = async (year, countryCode) => {
	try {
		const response = await axios(
			`https://date.nager.at/api/v2/publicholidays/${year}/${countryCode}`
		);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

const validateYear = (year) => {
	let isNumber = Number.isInteger(year);

	if (!isNumber) {
		console.log('Please enter a valid year');
		return false;
	}

	return true;
};

const getCountryCode = (country) => {
	if (country === undefined) {
		console.log('Please  enter a country');
		return false;
	}

	let countryCode = countryList.getCode(country);
	return countryCode;
};

module.exports = { getHolidays, validateYear, getCountryCode };
