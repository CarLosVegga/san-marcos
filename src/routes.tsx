import { createBrowserRouter } from "react-router-dom";
// import App from './App';
import { Home } from "./pages/Home/Home";
import { Productos } from "./pages/Productos/Productos";
import { Produccion } from "./pages/Produccion/Produccion";
import { Agregar } from "./pages/Agregar/Agregar";
import { Compra } from "./pages/Compra/Compra";

import { PATHS } from "./paths";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		// /produccion
		path: PATHS.produccion,
		element: <Produccion />,
	},
	{
		// /productos
		path: PATHS.productos,
		element: <Productos />,
	},
	{
		// /compras
		path: PATHS.compras,
		element: <Compra />,
	},
	{
		// /agregar
		path: PATHS.agregar,
		element: <Agregar />,
	},
	// {
	// 	path: "/test",
	// 	element: <MenuCard title={"Productos"} subtitle={"Consulta o edita información básica de los productos."} logo={"./img/productos.png"}/>
	// }
]);
