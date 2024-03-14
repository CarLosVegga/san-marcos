import React from "react";
import { Multiselect } from "multiselect-react-dropdown";
import "./MultiSelect.css";

type Props = {
	isSingleSelect: boolean;
	title: string;
	options: (string | Date)[];
	placeholder: string;
	onChangeFilters: (
		list: string,
		action: "add" | "delete",
		item: string
	) => void;
};

export const MultiSelect = ({
	isSingleSelect,
	title,
	options,
	placeholder,
	onChangeFilters,
}: Props) => {
	return (
		<div className="multiselect">
			<h4 className="multiselect-title">{title}</h4>
			<Multiselect
				options={options}
				selectionLimit={isSingleSelect ? 1 : -1}
				onRemove={(_selectedList, selectedItem) =>
					onChangeFilters(title, "delete", selectedItem)
				}
				onSelect={(_selectedList, selectedItem) =>
					onChangeFilters(title, "add", selectedItem)
				}
				isObject={false}
				placeholder={placeholder}
				avoidHighlightFirstOption={true}
				hidePlaceholder={true}
				emptyRecordMsg={
					options.length > 0 ? "Sin más opciones" : "No hay opciones"
				}
				style={{
					chips: {
						background: "var(--primary-800)",
						fontSize: "var(--body-size-4)",
						margin: "0 0.2rem",
					},
					multiselectContainer: {
						borderRadius: "0.5rem",
						background: "var(--primary-300)",
					},
					optionContainer: {
						// To change css for option container
						background: "var(--primary-50)",
					},
					inputField: {
						color: "var(--white)",
					},
					option: {
						borderLeft: "0.1rem solid var(--primary-300)",
						borderBottom: "0.1rem solid var(--primary-300)",
						fontSize: "var(--body-size-4)",
					},
				}}
			/>
		</div>
	);
};
