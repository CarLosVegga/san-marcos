import React from "react";
import { redirect, useNavigate } from "react-router-dom";
import "./Card.css";
import imgProductos from "../img/productos.png";
import imgCompra from "../img/compras.png";
import imgProduccion from "../img/produccion.png";
import imgAgregar from "../img/agregar.png";
import imgGraficos from "../img/dashboard.png";

type Props = {
	title: string;
	subtitle: string;
	path: string;
	hasExternalLink: boolean;
};

const getLogo = (title: string) => {
	if (title === "Productos") return imgProductos;
	if (title === "Produccion") return imgProduccion;
	if (title === "Compra") return imgCompra;
	if (title === "Agregar") return imgAgregar;
	if (title === "Gráficos") return imgGraficos;
};

export const Card = ({ title, subtitle, path, hasExternalLink }: Props) => {
	const navigate = useNavigate();
	return (
		<div
			className="tarjeta"
			onClick={() => {
				hasExternalLink
					? window.location.replace(path)
					: navigate(path);
			}}
		>
			<div className="encabezado">
				<img src={getLogo(title)}></img>
				<h3>{title}</h3>
			</div>
			<div className="descripcion">
				<p>{subtitle}</p>
			</div>
		</div>
	);
};
