import "./Produccion.css";
import { Header } from "../../Header/Header";
import { useFilters } from "../../hooks/useFilters";
import {
	FILTER_VALUES,
	headers,
	modifiableHeaders,
	PRODUCCION_URL,
	patchHeaders,
	deleteHeaders,
} from "./constants";
import { MultiSelect } from "../../MultiSelect/MultiSelect";
import { mapToTableHeader } from "../../helper/mapToTableHeader";

import { Table } from "../../Table/Table";
import { useFetch } from "../../hooks/useFetch";

export const Produccion = () => {
	const { data, loading, error, reloadRequest } = useFetch(PRODUCCION_URL);
	const mappedProducts = mapToTableHeader(data);

	const {
		onChangeFilters,
		elements,
		onChangeSorting,
		sortingHeader,
		isSortAscending,
	} = useFilters(mappedProducts, headers[0]);
	return (
		<div className="produccion">
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
					bodyElements={elements}
					onChangeSorting={onChangeSorting}
					sortingHeader={sortingHeader}
					isSortingAscending={isSortAscending}
					onReload={reloadRequest}
					patchPath={PRODUCCION_URL}
					shouldDisplayDateAsMonthYear={true}
				/>
			</div>
		</div>
	);
};
