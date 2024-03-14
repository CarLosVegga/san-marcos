import React from "react";
import editSrc from "../../img/Edit.png";
import deleteSrc from "../../img/Delete.png";
import saveSrc from "../../img/Save.png";
import "./TableButton.css";

type Props = {
	value: number;
	type: "edit" | "delete" | "save";
	onClick: (i: number) => void;
	isDisabled: boolean;
};

export const TableButton = ({ value, type, onClick, isDisabled }: Props) => {
	if (type === "edit") {
		return isDisabled ? (
			<div className="table-button-disabled" onClick={() => {}}>
				<img src={editSrc}></img>
			</div>
		) : (
			<div className="table-button" onClick={() => onClick(value)}>
				<img src={editSrc}></img>
			</div>
		);
	}
	if (type === "save") {
		return isDisabled ? (
			<div className="table-button-disabled" onClick={() => {}}>
				<img src={saveSrc}></img>
			</div>
		) : (
			<div className="table-button" onClick={() => onClick(value)}>
				<img src={saveSrc}></img>
			</div>
		);
	}
	// DELETE
	return isDisabled ? (
		<div className="table-button-disabled" onClick={() => onClick(value)}>
			<img src={deleteSrc}></img>
		</div>
	) : (
		<div className="table-button" onClick={() => onClick(value)}>
			<img src={deleteSrc}></img>
		</div>
	);
};
