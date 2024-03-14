import type { Producto_Back, Producto_Front } from "./constants";

export const mapKeys = (headers: string[], data: Producto_Back[]): any[] => {
	return data.map((item) => {
		const mappedItem: Producto_Front = {
			Tamaño: "",
			Familia: "",
			Descripción: "",
			SKU: -1,
		};
		headers.forEach((header) => {
			switch (header) {
				case "Tamaño":
					mappedItem[header] = item.tamano;
					break;
				case "Familia":
					mappedItem[header] = item.familia;
					break;
				case "SKU":
					mappedItem[header] = item.sku;
					break;
				case "Descripción":
					mappedItem[header] = item.descripcion;
					break;
				default:
					break;
			}
		});
		return mappedItem;
	});
};
