import React from "react";
import { HEADER_WITH_NUMERIC_VALUES } from "../helper/header_constants";
import { isDateAfterStartDate, isDateBeforeEndDate } from "../helper/months";

export const useFilters = (items: any[], defaultSortingHeader: string) => {
	const [activeFamily, setActiveFamily] = React.useState<string[]>([]);
	const [activeSize, setActiveSize] = React.useState<string[]>([]);
	const [activeStartDate, setActiveStartDate] = React.useState<string>("");
	const [activeEndDate, setActiveEndDate] = React.useState<string>("");

	const [isSortAscending, setIsSortAscending] = React.useState<boolean>(true);
	const [sortingHeader, setSortingHeader] =
		React.useState<string>(defaultSortingHeader);

	const onChangeSorting = (shouldBeAscending: boolean, title: string) => {
		setIsSortAscending(shouldBeAscending);
		setSortingHeader(title);
	};

	const onChangeFilters = (
		list: string,
		action: "add" | "delete",
		item: string
	) => {
		if (list === "Familia del chile") {
			if (action === "add") {
				setActiveFamily([...activeFamily, item]);
			} else {
				const cleanedList = activeFamily.filter(
					(family) => family !== item
				);
				setActiveFamily(cleanedList);
			}
		} else if (list === "Tamaño del chile") {
			if (action === "add") {
				setActiveSize([...activeSize, item]);
			} else {
				const cleanedList = activeSize.filter((size) => size !== item);
				setActiveSize(cleanedList);
			}
		} else if (list === "Fecha de inicio") {
			if (action === "add") {
				setActiveStartDate(item);
			} else {
				setActiveStartDate("");
			}
		} else if (list === "Fecha de cierre") {
			if (action === "add") {
				setActiveEndDate(item);
			} else {
				setActiveEndDate("");
			}
		}
	};

	const filteredProducts = items
		.filter((item) => {
			if (activeSize.length > 0) return activeSize.includes(item.Tamaño);
			return true;
		})
		.filter((item) => {
			if (activeFamily.length > 0)
				return activeFamily.includes(item.Familia);
			return true;
		})
		.filter((item) => {
			if (activeStartDate.length > 0) {
				return isDateAfterStartDate(item.Fecha, activeStartDate);
			}
			return true;
		})
		.filter((item) => {
			if (activeEndDate.length > 0)
				return isDateBeforeEndDate(item.Fecha, activeEndDate);
			return true;
		});

	const sortElements = () => {
		if (HEADER_WITH_NUMERIC_VALUES.includes(sortingHeader)) {
			return isSortAscending
				? filteredProducts.sort(
						(a, b) => a[sortingHeader] - b[sortingHeader]
				  )
				: filteredProducts.sort(
						(a, b) => b[sortingHeader] - a[sortingHeader]
				  );
		}
		return isSortAscending
			? filteredProducts.sort((a, b) =>
					a[sortingHeader].localeCompare(b[sortingHeader])
			  )
			: filteredProducts.sort((a, b) =>
					b[sortingHeader].localeCompare(a[sortingHeader])
			  );
	};

	const elements = sortElements();

	return {
		onChangeFilters,
		onChangeSorting,
		elements,
		sortingHeader,
		isSortAscending,
	};
};
