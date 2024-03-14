import { FAMILY_FILTER, SIZE_FILTER } from "../../helper/filter_constants";
import {
	DESCRIPTION_HEADER,
	FAMILY_HEADER,
	SIZE_HEADER,
	SKU_HEADER,
} from "../../helper/header_constants";

export const headers = [
	SIZE_HEADER,
	FAMILY_HEADER,
	SKU_HEADER,
	DESCRIPTION_HEADER,
];

export const modifiableHeaders = [
	SIZE_HEADER,
	FAMILY_HEADER,
	DESCRIPTION_HEADER,
];

export const patchHeaders = headers;

export const deleteHeaders = [SKU_HEADER];

export const PRODUCTOS_URL = "/productos";

export interface Producto_Front {
	Tamaño: string;
	Familia: string;
	SKU: number;
	Descripción: string;
}

export interface Producto_Back {
	descripcion: string;
	familia: string;
	tamano: string;
	sku: number;
}

export const FILTER_VALUES = [SIZE_FILTER, FAMILY_FILTER];
