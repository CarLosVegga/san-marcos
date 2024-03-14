import React from "react";
import { Header } from "../../Header/Header";
import "./Compra.css";
import { useFilters } from "../../hooks/useFilters";
import {
	FILTER_VALUES,
	headers,
	modifiableHeaders,
	COMPRA_URL,
	patchHeaders,
	deleteHeaders,
} from "./constants";
import { MultiSelect } from "../../MultiSelect/MultiSelect";
import { Table } from "../../Table/Table";
import { mapToTableHeader } from "../../helper/mapToTableHeader";
import { useFetch } from "../../hooks/useFetch";

export const Compra = () => {
	const { data, loading, error, reloadRequest } = useFetch(COMPRA_URL);
	const mappedCompras = mapToTableHeader(data);

	const {
		onChangeFilters,
		elements,
		onChangeSorting,
		sortingHeader,
		isSortAscending,
	} = useFilters(mappedCompras, headers[0]);

	return (
		<div className="Compra">
			<Header />
			<div className="content">
				<div className="filtros">
					{FILTER_VALUES.map(
						({ title, options, placeholder, isSingleSelect }) => (
							<MultiSelect
								key={title}
								title={title}
								options={options}
								placeholder={placeholder}
								onChangeFilters={onChangeFilters}
								isSingleSelect={isSingleSelect}
							/>
						)
					)}
				</div>
				<Table
					headers={headers}
					modifiableHeader={modifiableHeaders}
					patchHeaders={patchHeaders}
					deleteHeaders={deleteHeaders}
					patchPath={COMPRA_URL}
					bodyElements={elements}
					onChangeSorting={onChangeSorting}
					sortingHeader={sortingHeader}
					isSortingAscending={isSortAscending}
					onReload={reloadRequest}
				/>
			</div>
		</div>
	);
};
