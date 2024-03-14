import React from "react";
import { Header } from "../../Header/Header";
import {
	headers,
	modifiableHeaders,
	patchHeaders,
	deleteHeaders,
	FILTER_VALUES,
	PRODUCTOS_URL,
} from "./constants";
import { Table } from "../../Table/Table";
import "./Productos.css";
import { MultiSelect } from "../../MultiSelect/MultiSelect";
import { useFilters } from "../../hooks/useFilters";
import { mapToTableHeader } from "../../helper/mapToTableHeader";
import { useFetch } from "../../hooks/useFetch";
import { Loading } from "../Loading/Loading";

export const Productos = () => {
	const { data, loading, error, reloadRequest } = useFetch(PRODUCTOS_URL);
	const mappedProducts = mapToTableHeader(data);

	const {
		onChangeFilters,
		elements,
		onChangeSorting,
		sortingHeader,
		isSortAscending,
	} = useFilters(mappedProducts, headers[0]);

	if (loading) {
		return (
			<>
				<Header />
				<Loading />
			</>
		);
	}

	return (
		<div className="productos">
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
					patchPath={PRODUCTOS_URL}
					headers={headers}
					modifiableHeader={modifiableHeaders}
					patchHeaders={patchHeaders}
					deleteHeaders={deleteHeaders}
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
