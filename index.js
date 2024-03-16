/**
 * SpreadsheetData v1.0
 * Check API URL and request and returns spreadsheet data as an object array
 * Copyright (c) 2024 René Frings
 * License: GNU Affero General Public License v3.0
 */

class SpreadsheetData {
	/** Declare private properties */
	#_strApiKey;
	#_strSheetID;
	#_strSheetName;
	#_apiURL;

	constructor(strApiKey, strSheetID, strSheetName) {
		/** Save validated paramters as private properties */
		this.#_strApiKey = this.#_checkApiKey(strApiKey);
		this.#_strSheetID = this.#_checkSheetID(strSheetID);
		this.#_strSheetName = this.#_checkSheetName(strSheetName);
		/** Create and save the API URL. */
		this.#_apiURL = `https://sheets.googleapis.com/v4/spreadsheets/${
			this.#_strSheetID
		}/values/${this.#_strSheetName}?alt=json&key=${this.#_strApiKey}`;
	}

	/**
	 * Fetch the sheet data and returns it in a transformed object array
	 */
	get load() {
		/** URL Request */
		return (
			fetch(this.#_apiURL)
				/** After the request it returns a response object. */
				.then((response) => {
					/** If response failed */
					if (!response.ok) {
						/** Throw an error with status. */
						throw `for load - status: ${response.status}. Please check the following things: 
							1. Api key.
							2. ID and sheet name.
							3. Share settings for this spreadsheet. Have you shared the spreadsheet so that anyone who has the link can open it?
							`;
					} else {
						/** If response successful */
						return response.json();
					}
				})
				/**
				 * data includes an array from the API request with all sheet data in this form: [{colName1:cellValue1,colName2:cellValue2...},{colName1:cellValue1,colName2:cellValue2...}]
				 * This sheet data will transformed to a new object array, where each row is an object and the first row values are the keys: [{Title:'Prometheus',Year:'2012'...},{...}],
				 */
				.then((data) => {
					// Save first row values for key names
					const keys = data.values[0];

					// Create object array
					const arrDatasets = data.values
						// All rows (arrays) without the first, because they will be the key names
						.slice(1)
						.map((innerArray) => {
							const obj = {};
							keys.forEach((key, index) => {
								// Set for each key the value
								obj[key] = innerArray[index];
							});
							return obj;
						});

					/** Returns the final object */
					return arrDatasets;
				})
				/** If the API request failed. */
				.catch((err) => {
					throw new Error(err);
				})
		);
	}

	/** Check API Key */
	#_checkApiKey(strApiKey) {
		try {
			/** If empty */
			if (strApiKey === '') throw 'is empty';
			/** If only multiple whitespaces */
			if (strApiKey.match(/\S/i) === null) throw 'consists only whitespaces';
			/** If consists whitespaces */
			if (strApiKey.match(/\s/i)) throw 'consists whitespaces';
			/** If to short */
			if (strApiKey.length < 10) throw 'seems to short';
			/** API key is ok and can returned */
			return strApiKey;
		} catch (err) {
			throw new Error(
				`Paramter 1 - API Key: ${err}. Please add a valid API key as parameter!`
			);
		}
	}

	/** Check sheet ID */
	#_checkSheetID(strSheetID) {
		try {
			/** If strSpreadsheetId is empty */
			if (strSheetID.length === '') throw 'is empty';
			/** If strSpreadsheetId consists only multiple whitespaces */
			if (strSheetID.match(/\S/i) === null) throw 'consists only whitespaces';
			/** If strSpreadsheetId is to short */
			if (strSheetID.length < 5) throw 'is to short';
			/** Sheet ID is ok and can returned */
			return strSheetID;
		} catch (err) {
			throw new Error(
				`Paramter 2 - Spreadsheet ID: ${err}. Please add a valid spreadsheet ID as parameter!`
			);
		}
	}

	/** Check sheet Name */
	#_checkSheetName(strSheetName) {
		try {
			/** If strSheetName is empty */
			if (strSheetName.length === '') throw 'is empty';
			/** If strSheetName consists only multiple whitespaces */
			if (strSheetName.match(/\S/i) === null) throw 'consists only whitespaces';
			/** Sheet name is ok and can returned */
			return strSheetName;
		} catch (err) {
			throw new Error(
				`Paramter 3 - Sheet Name: ${err}. Please add a valid sheetname as parameter! `
			);
		}
	}
}

export { SpreadsheetData };
