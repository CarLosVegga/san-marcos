import React from "react";
import { Header } from "../../Header/Header";
import { SelectionButton } from "../../SelectionButton/SelectionButton";
import { POST_HEADERS, POST_PATH, SUBMISSION_TYPES } from "./constants";
import { HEADER_VALUES } from "./constants";
import { ActionButton } from "../../ActionButton/ActionButton";
import { TableMultipleForm } from "../../TableMultipleForm/TableMultipleForm";
import { SELECT_HEADERS } from "../../Select/constants";
import { useNavigate } from "react-router-dom";
import usePost from "../../hooks/usePost";
import { mapToRequestKey } from "../../helper/mapToRequestKey";
import { useFetch } from "../../hooks/useFetch";
import { PATHS } from "../../paths";
import { PRODUCTOS_URL } from "../Productos/constants";
import { mapToTableHeader } from "../../helper/mapToTableHeader";
import "./Agregar.css";

type FormEntry = {
	[key: string]: string | number;
};

const getModifiableHeaderDict = (headerInput: string[]) => {
	return headerInput.reduce((acc, curr) => {
		if (SELECT_HEADERS.includes(curr)) {
			acc[curr] = 0;
		} else {
			acc[curr] = "";
		}
		return acc;
	}, {} as FormEntry);
};

export const Agregar = () => {
	const nagivate = useNavigate();
	const [type, setType] = React.useState<string>(SUBMISSION_TYPES[0]);
	const headers = HEADER_VALUES[type];
	const post_headers = POST_HEADERS[type];
	const post_url = POST_PATH[type];
	const { sendPostRequest } = usePost(post_url);

	const [form, setForm] = React.useState<FormEntry[]>([
		getModifiableHeaderDict(headers),
	]);

	const { data, loading, error, reloadRequest } = useFetch(PRODUCTOS_URL);
	const mappedProducts = mapToTableHeader(data);

	const addRow = () => {
		const newInfo = [...form, getModifiableHeaderDict(headers)];
		setForm(newInfo);
	};

	const removeRow = () => {
		if (form.length > 1) {
			const newInfo = form.slice(0, -1);
			setForm(newInfo);
		}
	};

	const modifyRows = (action: "add" | "remove") => {
		if (action === "add") {
			addRow();
		} else {
			removeRow();
		}
	};

	const changeForm = (index: number, header: string, newValue: any) => {
		const formCopy = form;
		const newFormItem = form[index];
		newFormItem[header] = newValue;
		formCopy[index] = newFormItem;
		setForm(formCopy);
	};

	const onSubmit = async () => {
		const values = form.map((formElement) => mapToRequestKey(formElement));
		console.log(values[0]);
		const isEmpty = values[0]["proveedor"].length === 0;
		if (isEmpty) {
			nagivate(PATHS.compras);
			return;
		}
		try {
			const success = await sendPostRequest(values); // Pass your patch data here
			if (success) {
				setType(SUBMISSION_TYPES[0]);
				nagivate(PATHS.compras);
			} else {
				console.error("PATCH request failed");
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	// const mappedProducts = mapToTableHeader(RESPONSE);

	return (
		<div className="agregar">
			<Header />
			<div className="content">
				<form>
					<h3>Selecciona a qué sección añadiremos información</h3>
					<SelectionButton
						optionA={SUBMISSION_TYPES[0]}
						optionB={SUBMISSION_TYPES[1]}
						setActiveOption={(value: string) => setType(value)}
						isFirstOptionActive={type === SUBMISSION_TYPES[0]}
					/>
					<h3>Ingresa los datos manualmente ó</h3>
					<TableMultipleForm
						key={type}
						headers={headers}
						formElements={form}
						productos={mappedProducts}
						post_headers={post_headers}
						post_url={post_url}
						modifyRows={modifyRows}
						onChangeForm={changeForm}
					/>

					<h3>Seleccione un archivo .xlsx</h3>
					<input type="file" accept=".xlsx" />
					<div className="submit-addition">
						<ActionButton
							type="add"
							onClick={onSubmit}
							isDisabled={false}
							value={0}
						/>
					</div>
				</form>
			</div>
		</div>
	);
};
