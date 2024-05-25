'use strict'
let odpoved = {
	"reaction": {
		"sts": 200,
		"msg": "description",
		"Usernamez": null
	},
	"User": [{
			"Email": "phil.juza2@gmail.com",
			"Username": null,
			"Gender_id": 2
		},
		{
			"Email": "phil.juza@gmail.com",
			"Username": "ShenHU1",
			"Gender_id": 1
		},
		{
			"Email": null,
			"Username": "ShenHU",
			"Gender_id": 2
		}
	],
	"dssad": 'dffsdfds',
	"dssads": 'dffsdfdsss',
	"babel": "¬1"
}
const GetDataFromServices = {
	'start': 'Dec 13, 2023 ',
	__getObjectValues(object) {
		if (object === undefined || object === null) return
		return Object.values(object)
	},
	__getObjectKeys(object) {
		return Object.keys(object)
	},
	__isPrimitive(obj) {
		return typeof obj !== 'object' || obj === null
	},
	__isNotArrayOfObjects(array) {
		if (Array.isArray(array)) return array.every(element => typeof element !== 'object')
	},
	__getSingleDataTypesOfArrays(data) {
		return this.__getObjectValues(data)
			.flatMap(element => {
				if (!element) return
				return this.__isNotArrayOfObjects(element) ? [...element] : []
			})
	},
	__getPrimitiveIntoObject(obj) {
		let object = {};
		this.__getObjectKeys(obj)
			.forEach(item => {
				const key = obj[item];
				this.__isPrimitive(key) ? object[item] = key : null
			})
		return [object]
	},
	__getNestedObject(res) {
		return this.__getObjectValues(res).map(value => value instanceof Object ? this.__getObjectValues(value) : [value])
			.reduce((acc, next) => acc.concat(...next), [])
			.reduce((acc, cur) => typeof cur === 'object' ? [...acc, cur] : acc, []);
	},
	__getSimpleObjects(data) {
		if (!Array.isArray(data)) {
			return this.__getObjectValues(data)
				.reduce((acc, cur, i, arr) => cur 
				&& typeof cur === 'object' 
				&& !Array.isArray(cur)  || cur === null
				&& this.__getObjectValues(cur).every(value => typeof value !== 'object') ? [...acc, cur] : acc, [])
		} else {
			return this.__getObjectValues(data)
				.reduce((acc, cur, i, arr) => cur 
				&& typeof cur === 'object' || Array.isArray(arr) || cur === null
				&& !Array.isArray(cur) && this.__getObjectValues(cur).every(value => typeof value !== 'object') ? [...acc, cur] : acc, [])
		}
	},
	__getKeysValuesToArray(data) {
		const primitives = this.__getPrimitiveIntoObject(data);
		const nestedObjects = this.__getNestedObject(data)
		const simpleObjects = this.__getSimpleObjects(data)
		const complex = this.__getObjectValues(data)
			.reduce((acc, cur) => cur && !Array.isArray(cur) && this.__getObjectValues(cur).some(value => Array.isArray(value)) ? [...acc, cur] : acc, [])
		let simpleArray = this.__getSingleDataTypesOfArrays(data)
		let array;
		array = [...primitives, ...nestedObjects, ...simpleObjects]
		if (simpleArray.length > 0) array = [...array, simpleArray]
		return array.reduce((acc, cur) => cur && !Object.keys(cur).length < 1 ? [...acc, cur] : acc, []);
	},
};
const processData = Object.create(GetDataFromServices)
processData.__enumerateDuplicates = function(obj) {
	let i = 1;
	if (Array.isArray(obj)) {
		const numbersNonNumbers = obj.reduce((acc, cur) => {
				const original = cur;
				while (acc.includes(cur)) {
					i++;
					cur = `${original}${i}`;
				}
				i = 1;
				return [...acc, cur];
			}, [])
			.map(numbersNonNumbers => !(/\d/).test(numbersNonNumbers) ? `${numbersNonNumbers}1` : `${numbersNonNumbers}`);
		return numbersNonNumbers;
	}
	return obj;
	return numbersNonNumbers
};
processData.__getUnauthorized = function(data, unauthorized) {
	const extracted = {};
	Object.keys(data)
		.filter(key => unauthorized.includes(key))
		.forEach(key => extracted[key] = data[key])
	return extracted
};
processData.__removeUnauthorized = function(data, unauthorized) {
	Object.keys(data)
		.filter(key => unauthorized.includes(key))
		.forEach(key => delete data[key]);
}
processData.__unifyData = function(result) {
	const collectedData = GetDataFromServices.__getKeysValuesToArray(result)
	const arrKeys = [];
	const arrValues = []
	collectedData.forEach(obj => {
		if (obj === undefined || obj === null) return
		Object.entries(obj).forEach(([key, val]) => {
			if (Array.isArray(val)) {
				this.__isNotArrayOfObjects(val) ? val : []

			}
			if (typeof val === 'object') {
				for (const key in val) {
					if (Object.hasOwnProperty.call(val, key)) {
						if (Array.isArray(val)) {
							this.__isNotArrayOfObjects(val) ? val : []

						}
						arrKeys.push(key)
						const element = val[key];
						arrValues.push(element)
						if (typeof element !== 'object') return;
					}
				}
			}
			if (typeof val !== 'object') {
				arrKeys.push(key)
				arrValues.push(val)
			}
		});
	});
	return [arrKeys, arrValues]
}
processData.__getObjectByValue = function(data, searchedValue) {
	const keys = this.__getObjectKeys(data);
	for (const key of keys) {
		const value = data[key];
		if (value === searchedValue) {
			return {
				[key]: value
			};
		}
		if (typeof value === 'object' && value !== null) {
			const nestedRes = this.__getObjectByValue(value, searchedValue);
			if (nestedRes) {
				return {
					[key]: nestedRes
				}
			}
		}

	}
	return null;
}
processData.__isSingleObject = function(obj) {
	return this.__getObjectValues(obj).map(element => (typeof element).match(/(number)|(boolean)|(string)/))
}
processData.__modifyKeyNamesComplexObj = function(res) {
	let array = [];
	let objects = [];
	const toFind = this.__unifyData(res)[1];
	const found = toFind.map(item => this.__getObjectByValue(res, item));
	found.forEach(val => {
		for (const key in val) {
			if (Object.hasOwnProperty.call(val, key)) {
				const element = val[key];
				if (typeof element === 'string') return;
				for (let k in element) {
					if (Object.hasOwnProperty.call(element, k)) {
						if (!isNaN(+k)) {
							k = +k + 1;
						}
						array.push(`${key}_${k}`);
					}
				}
			}
		}
	});
	const price = Object.entries(this.__getPrimitiveIntoObject(res)[0])[0]
	if (price) array.unshift(price[0])
	return array
}
processData.__getValuesFromArray = function(data) {
	const unauthorized = this.__getUnauthorized(data, Object.getOwnPropertyNames(this.__getPrimitiveIntoObject(data)[0]))
	this.__removeUnauthorized(data, Object.getOwnPropertyNames(this.__getPrimitiveIntoObject(unauthorized)[0]))
	const keys1 = this.__modifyKeyNamesComplexObj(data)
	const keys2 = this.__unifyData(data)[0]
	const result = [keys1, keys2]
	const values = this.__unifyData(data)[1]
	const getValues = (keys1, keys2) => {
		const key1 = keys1.flat();
		const key2 = keys2.flat();
		const combined = key1.map((item, i) => {
			let string = `${item}_${key2[i]}`
			string = Array.from(new Set(Object.values(string.split('_'))))
			return string.join('_')
		})
		return combined
	}
	const cleanedUp = getValues(keys1, keys2)
	const formatted = cleanedUp.map(item => {
		return item
			.split('_')
			.map((part, index) => (index > 0 && !isNaN(part) ? part : index === 0 ? part : `_${part}`))
			.join('');
	});
	const resultObj = {};
	formatted.forEach((key, index) => {
		resultObj[key] = values[index];
	});
	Object.keys(unauthorized).forEach((key) => resultObj[key] = unauthorized[key]);
	return resultObj
}
processData.__saveKeysValuesIntoEnvironment = function(data, usedFunc) {
	let nulls = this.__getKeysValuesToArray(data)
		.flatMap((obj) => Object.keys(obj).reduce((acc, o) => obj[o] === null ? [...acc, o] : acc, []))
	nulls = this.__enumerateDuplicates(nulls)
	//console.log(...nulls,null);
	if (nulls) {
		nulls.forEach(element => {
			console.log(element, null);
			//pm.environment.set(element,null);
		});
	}
	//if(nulls) pm.environment.set(...nulls,null);
	//usedFunc.push(primitives)
	Object.entries(usedFunc).forEach(([key, value]) => {
		//pm.environment.set(key,value);
		console.log(key, value);
	})
}
processData.__saveKeysValuesIntoEnvironment(response, processData.__getValuesFromArray(response))