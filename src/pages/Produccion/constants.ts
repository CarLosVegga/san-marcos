import {
	FAMILY_FILTER,
	SIZE_FILTER,
	START_DATE_FILTER,
	END_DATE_FILTER,
} from "../../helper/filter_constants";

// "cantidad": 69420,
//         "descripcion": "Bote jalapeños 215",
//         "familia": "Jalapeños",
//         "fecha": "2024-02-01",
//         "id_familia": 1,
//         "id_tamano": 1,
//         "sku": 100001,
//         "tamano": "Chico"

import {
	QUANTITY_HEADER,
	DESCRIPTION_HEADER,
	DATE_HEADER,
	FAMILY_HEADER,
	SIZE_HEADER,
	SKU_HEADER,
} from "../../helper/header_constants";

export const headers = [
	FAMILY_HEADER,
	SIZE_HEADER,
	SKU_HEADER,
	DESCRIPTION_HEADER,
	DATE_HEADER,
	QUANTITY_HEADER,
];

export const modifiableHeaders = [QUANTITY_HEADER];

export const patchHeaders = [SKU_HEADER, DATE_HEADER, QUANTITY_HEADER];

export const deleteHeaders = [SKU_HEADER, DATE_HEADER];

export const FILTER_VALUES = [
	FAMILY_FILTER,
	SIZE_FILTER,
	START_DATE_FILTER,
	END_DATE_FILTER,
];

export const PRODUCCION_URL = "/plan_de_produccion";
