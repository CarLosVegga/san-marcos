import React from "react";
import { TableButton } from "./TableButton/TableButton";
import submitSrc from "../img/submit.png";
import downloadSrc from "../img/Download.png";
import "./ActionButton.css";

type Props = {
	value: number;
	type: "edit" | "delete" | "add" | "save" | "download";
	onClick: (i: number) => void;
	isDisabled: boolean;
};

export const ActionButton = ({ value, type, onClick, isDisabled }: Props) => {
	if (type === "edit" || type === "delete" || type === "save") {
		return (
			<TableButton
				value={value}
				type={type}
				onClick={onClick}
				isDisabled={isDisabled}
			/>
		);
	}
	if (type === "download") {
		return (
			<div
				className="interact-button"
				id="download"
				onClick={() => onClick(value)}
			>
				<p>Descargar</p>
				<img src={downloadSrc}></img>
			</div>
		);
	}
	return (
		<div
			className="interact-button"
			id="submit"
			onClick={() => onClick(value)}
		>
			<p>Agregar</p>
			<img src={submitSrc}></img>
		</div>
	);
};
