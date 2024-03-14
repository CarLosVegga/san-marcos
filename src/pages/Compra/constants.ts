import {
	SIZE_FILTER,
	START_DATE_FILTER,
	END_DATE_FILTER,
} from "../../helper/filter_constants";

import {
	FAMILY_HEADER,
	PROVIDER_HEADER,
	DATE_HEADER,
	QUANTITY_HEADER,
	SIZE_HEADER,
} from "../../helper/header_constants";

export const headers = [
	SIZE_HEADER,
	PROVIDER_HEADER,
	DATE_HEADER,
	QUANTITY_HEADER,
];

export const patchHeaders = [...headers, "id_compra"];

export const deleteHeaders = ["id_compra"];

export const COMPRA_URL = "/compras";

export const modifiableHeaders = [
	SIZE_HEADER,
	PROVIDER_HEADER,
	DATE_HEADER,
	QUANTITY_HEADER,
];

export const FILTER_VALUES = [SIZE_FILTER, START_DATE_FILTER, END_DATE_FILTER];
