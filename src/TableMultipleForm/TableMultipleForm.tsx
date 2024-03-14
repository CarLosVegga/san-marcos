import React from "react";
import { SELECT_HEADERS } from "../Select/constants";
import { MULTIPLE_FORM_SELECT_CONSTANTS } from "./constants";
import { FAMILIAS, TAMAÑOS } from "../Select/constants";
import { Select } from "../Select/Select";
import type { BodyElement } from "../Table/Table";
import {
	DATE_HEADER,
	DESCRIPTION_HEADER,
	FAMILY_HEADER,
	QUANTITY_HEADER,
	SIZE_HEADER,
	SKU_HEADER,
} from "../helper/header_constants";

import "./TableMultipleForm.css";

type Props = {
	headers: string[];
	post_headers: string[];
	post_url: string;
	productos: any[];
	formElements: BodyElement[];
	onChangeForm: (i: number, h: string, v: any) => void;
	modifyRows: (action: "add" | "remove") => void;
};

export const TableMultipleForm = ({
	headers,
	post_headers,
	formElements,
	post_url,
	productos,
	onChangeForm,
	modifyRows,
}: Props) => {
	const getFormType = (header: string) => {
		if (header === DATE_HEADER) return "date";
		if (header === QUANTITY_HEADER) return "number";
		return "text";
	};

	const filterProducts = (i: number, header: string) => {
		const form = formElements[i];
		const appliedFilter = productos.filter(
			(p) =>
				p["id_tamano"] === (form[SIZE_HEADER] as number) + 1 &&
				p["id_familia"] === 1
		);

		if (header === SKU_HEADER) {
			return appliedFilter.map((producto) => producto[SKU_HEADER]);
		}
		return appliedFilter.map((producto) => producto[DESCRIPTION_HEADER]);
	};

	return (
		<>
			<table>
				<thead>
					<tr>
						{headers.map((header) => (
							<th key={header}>{header}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{Array.from(
						{ length: formElements.length },
						(_, rowIndex) => (
							<tr key={rowIndex}>
								{headers.map((header, colIndex) => {
									const shouldSelect =
										MULTIPLE_FORM_SELECT_CONSTANTS.includes(
											header
										);
									return (
										<td key={`${rowIndex}${colIndex}`}>
											{shouldSelect ? (
												<Select
													key={`${formElements[rowIndex][SIZE_HEADER]}${header}`}
													type={
														header as
															| "Familia"
															| "Tamaño"
													}
													selected={
														formElements[rowIndex][
															header
														] as number
													}
													options={filterProducts(
														rowIndex,
														header
													)}
													onSelect={(id: number) =>
														onChangeForm(
															rowIndex,
															header,
															id
														)
													}
												/>
											) : (
												<input
													required
													key={`${header}${rowIndex}`}
													className="table-form-input"
													defaultValue={""}
													type={getFormType(header)}
													onChange={(e) =>
														onChangeForm(
															rowIndex,
															header,
															e.target.value
														)
													}
												/>
											)}
										</td>
									);
								})}
							</tr>
						)
					)}
				</tbody>
			</table>
			<div className="alter-rows">
				<button
					id="add"
					onClick={() => modifyRows("add")}
					type="button"
				>
					Add row
				</button>
				<button
					id="remove"
					onClick={() => modifyRows("remove")}
					type="button"
				>
					Remove row
				</button>
			</div>
		</>
	);
};
