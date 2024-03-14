import {
	FAMILY_HEADER,
	HEADER_CONVERSION_TO_REQUEST,
	QUANTITY_HEADER,
	SIZE_HEADER,
	SKU_HEADER,
} from "./header_constants";

// key: TABLE_HEADER
type itemObject = {
	[key: string]: any;
};

const LIST_FAMILY_SIZE = [FAMILY_HEADER, SIZE_HEADER];
const LIST_PARSE_VALUE_TO_INT = [QUANTITY_HEADER, SKU_HEADER, "id_compra"];

// This maps according to the back response to match the frontend headers
export const mapToRequestKey = (item: itemObject) => {
	const mappedObject: any = {};
	Object.keys(item).forEach((key) => {
		const value = LIST_FAMILY_SIZE.includes(key)
			? item[key] + 1
			: item[key];

		const mappedKey = HEADER_CONVERSION_TO_REQUEST[key] ?? key;
		console.log({ mappedKey, value });
		console.log(LIST_PARSE_VALUE_TO_INT.includes(key));
		console.log({ parsed: parseInt(value, 10) });
		mappedObject[mappedKey] = LIST_PARSE_VALUE_TO_INT.includes(key)
			? parseInt(value, 10)
			: value;
	});
	console.log({ mappedObject });
	return mappedObject;
};
