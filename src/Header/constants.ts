interface InformationObject {
	[key: string]: { title: string; subtitle: string };
}

export const HEADER_INFORMATION: InformationObject = {
	"/": {
		title: "Bienvenido a la base de datos",
		subtitle: "Seleccione una opción para continuar",
	},
	"/produccion": {
		title: "Plan de producción",
		subtitle: "Consulta o edita información sobre el plan de producción.",
	},
	"/productos": {
		title: "Listado de productos",
		subtitle: "Consulta o edita información básica de los productos.",
	},
	"/compras": {
		title: "Plan de compras",
		subtitle: "Consulta o edita información sobre el plan de compras.",
	},
	"/agregar": {
		title: "Agregar datos",
		subtitle: "Carga la información de tu excel o ingresala en la página.",
	},
	error: {
		title: "Bienvenido a la base de datos",
		subtitle: "De click en el logo para volver a inicio",
	},
};
