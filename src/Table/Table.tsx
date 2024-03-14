import React from "react";
import "./Table.css";
import { ActionButton } from "../ActionButton/ActionButton";
import { SELECT_DICT_TO_ID, SELECT_HEADERS } from "../Select/constants";
import { Select } from "../Select/Select";
import usePatch from "../hooks/usePatch";
import { mapToRequestKey } from "../helper/mapToRequestKey";
import useDelete from "../hooks/useDelete";
import { DATE_HEADER, QUANTITY_HEADER } from "../helper/header_constants";
import { fromDateToText } from "../helper/months";
import axios from "axios";
import { DB_PATH } from "../paths";

type StringOrNumber = string | number;

export interface BodyElement {
	[key: string]: StringOrNumber;
}

type Props = {
	headers: string[];
	modifiableHeader: string[];
	patchHeaders: string[];
	deleteHeaders: string[];
	bodyElements: BodyElement[];
	patchPath: string;
	onChangeSorting: (shouldBeAscending: boolean, title: string) => void;
	onReload: () => void;
	sortingHeader: string;
	isSortingAscending: boolean;
	shouldDisplayDateAsMonthYear?: boolean;
};

// Initial state to keep track of changes according to modifiable values
const getHeaderDict = (modifiableHeader: string[]) => {
	return modifiableHeader.reduce((acc, curr) => {
		acc[curr] = "";
		return acc;
	}, {} as { [key: string]: string });
};

export const Table = ({
	headers,
	modifiableHeader,
	patchHeaders,
	deleteHeaders,
	bodyElements,
	patchPath,
	onChangeSorting,
	onReload,
	sortingHeader,
	isSortingAscending,
	shouldDisplayDateAsMonthYear = false,
}: Props) => {
	const PATCH = usePatch(patchPath);
	const DELETE = useDelete(patchPath);

	const [modifiedItem, setModifiedItem] = React.useState<number>(-1);

	const [changedValues, setChangedValues] = React.useState<{
		[key: string]: string | number;
	}>(getHeaderDict(patchHeaders));

	const downloadInfo = async () => {
		const elements = bodyElements.map((row) => {
			return headers.map((header) => row[header]);
		});
		const body = [headers, ...elements];
		try {
			const response = await axios.post(
				`${DB_PATH}/generate_file`,
				body,
				{
					responseType: "arraybuffer", // Set responseType to 'arraybuffer' for binary data
				}
			);
			// Create a Blob from the response data with MIME type for Excel file
			const fileBlob = new Blob([response.data], {
				type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
			});

			// Create a URL for the Blob object
			const fileUrl = window.URL.createObjectURL(fileBlob);

			// Create a link element
			const link = document.createElement("a");
			link.href = fileUrl;

			// Set the filename for the downloaded file (if available in response headers)
			const disposition = response.headers["content-disposition"];
			const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
			const matches = filenameRegex.exec(disposition);
			const filename =
				matches != null && matches[1]
					? matches[1].replace(/['"]/g, "")
					: "download.xlsx";
			link.setAttribute("download", filename);

			// Programmatically click the link to initiate the download
			link.click();

			// Clean up
			window.URL.revokeObjectURL(fileUrl);
		} catch (error) {
			console.error(error);
		}
	};

	const handleSaveItem = async () => {
		const values = mapToRequestKey(changedValues);
		try {
			const success = await PATCH.sendPatchRequest(values); // Pass your patch data here
			if (success) {
				onReload();
				setChangedValues(getHeaderDict(patchHeaders));
				setModifiedItem(-1);
			} else {
				console.error("PATCH request failed");
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	const handleEditItem = (index: number) => {
		if (index === modifiedItem) {
			handleSaveItem();
		} else {
			setModifiedItem(index);
		}
	};

	const handleDeleteItem = async (index: number) => {
		const body: any = {};
		const row = bodyElements[index];
		deleteHeaders.forEach((header) => (body[header] = row[header]));
		try {
			const success = await DELETE.sendDeleteRequest(
				mapToRequestKey(body)
			);
			if (success) {
				onReload();
				setChangedValues(getHeaderDict(patchHeaders));
				setModifiedItem(-1);
			} else {
				console.error("DELETE request failed");
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	// Start by default values of the current row
	React.useEffect(() => {
		if (modifiedItem > -1) {
			const copy: any = {};
			Object.keys(changedValues).forEach((header) => {
				const row = bodyElements[modifiedItem];
				const value = row[header];
				if (SELECT_HEADERS.includes(header)) {
					copy[header] = SELECT_DICT_TO_ID[value];
				} else {
					copy[header] = `${value}`;
				}
			});
			setChangedValues(copy);
		}
	}, [modifiedItem]);

	const isActiveButton = (
		header: string,
		sortingHeader: string,
		isSortingAscending: boolean,
		isButtonAscending: boolean
	) => {
		return (
			header === sortingHeader && isSortingAscending === isButtonAscending
		);
	};

	const getFormType = (header: string) => {
		if (header === DATE_HEADER) return "date";
		if (header === QUANTITY_HEADER) return "number";
		return "text";
	};

	return (
		<>
			<div className="table-title">
				<div className="table-results">
					<h3>Resultados</h3>
					<p>{bodyElements.length} registros encontrados</p>
				</div>
				<ActionButton
					type="download"
					onClick={downloadInfo}
					value={1}
					isDisabled={false}
				/>
			</div>
			<table>
				<thead>
					<tr>
						{headers.map((header) => (
							<th key={header}>
								<div className="header-content">
									<div className="sort-button">
										<button
											className={
												isActiveButton(
													header,
													sortingHeader,
													isSortingAscending,
													true
												)
													? "sort-button-text-active"
													: "sort-button-text"
											}
											onClick={() =>
												onChangeSorting(true, header)
											}
										>
											&#8679;
										</button>
										<button
											className={
												isActiveButton(
													header,
													sortingHeader,
													isSortingAscending,
													false
												)
													? "sort-button-text-active"
													: "sort-button-text"
											}
											onClick={() =>
												onChangeSorting(false, header)
											}
										>
											&#8681;
										</button>
									</div>
									{header}
								</div>
							</th>
						))}
						<th id="action-header">Acción</th>
					</tr>
				</thead>
				<tbody>
					{bodyElements.map((row, index) => {
						return (
							<tr key={index}>
								{headers.map((header, colIndex) => {
									const cellValue = row[header];
									const shouldSelect =
										SELECT_HEADERS.includes(header);
									const isRowEditable =
										index === modifiedItem &&
										modifiableHeader.includes(header);
									if (isRowEditable) {
										return (
											<td key={`${index}${colIndex}`}>
												{shouldSelect ? (
													<Select
														key={header}
														options={[]}
														selected={
															changedValues[
																header
															] as number
														}
														type={
															header as
																| "Familia"
																| "Tamaño"
														}
														onSelect={(
															id: number
														) =>
															setChangedValues({
																...changedValues,
																[header]: id,
															})
														}
													/>
												) : (
													<input
														key={cellValue}
														type={getFormType(
															header
														)}
														defaultValue={cellValue}
														onChange={(e) =>
															setChangedValues({
																...changedValues,
																[header]:
																	e.target
																		.value,
															})
														}
													/>
												)}
											</td>
										);
									}
									return (
										<td
											key={`${header}${row[header]}${colIndex}`}
										>
											{shouldDisplayDateAsMonthYear &&
											header === DATE_HEADER
												? fromDateToText(
														row[header] as string
												  )
												: row[header]}
										</td>
									);
								})}
								<td className="action-buttons">
									<ActionButton
										key={`${index}first-button`}
										value={index}
										type={
											index === modifiedItem
												? "save"
												: "edit"
										}
										onClick={handleEditItem}
										isDisabled={false}
									/>
									<ActionButton
										key={`${index}second-button`}
										value={index}
										type={"delete"}
										onClick={handleDeleteItem}
										isDisabled={index === modifiedItem}
									/>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
};
