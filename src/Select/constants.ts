import { SIZE_HEADER, FAMILY_HEADER } from "../helper/header_constants";

export const TAMAÑOS = ["Chico", "Mediano", "Grande"];

export const FAMILIAS = ["Jalapeños", "Rajas verdes", "Rodajas"];

export const SELECT_HEADERS = [FAMILY_HEADER, SIZE_HEADER];

export const SELECT_DICT_TO_ID = {
	[TAMAÑOS[0]]: 0,
	[TAMAÑOS[1]]: 1,
	[TAMAÑOS[2]]: 2,
	[FAMILIAS[0]]: 0,
	[FAMILIAS[1]]: 1,
	[FAMILIAS[2]]: 2,
};
