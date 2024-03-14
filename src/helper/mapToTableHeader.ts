import { HEADER_CONVERSION } from "./header_constants";

// key: TABLE_HEADER
type itemObject = {
	[key: string]: any;
};

// This maps according to the back response to match the frontend headers
export const mapToTableHeader = (items: itemObject[]) => {
	return items.map((item) => {
		const mappedObject: any = {};
		Object.keys(item).forEach((key) => {
			const value = item[key];
			const mappedKey = HEADER_CONVERSION[key] ?? key;
			mappedObject[mappedKey] = value;
		});
		return mappedObject;
	});
};

// INPUT
// {tamano: Chico, familia: Jalapeño}
// {tamano: Tamaño}

// OUTPUT
// {Tamaño: Chico, Familia: Jalapeño}
