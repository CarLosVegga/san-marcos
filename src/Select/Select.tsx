import React from "react";
import { FAMILIAS, TAMAÑOS } from "./constants";

type Props = {
	type: "Familia" | "Tamaño" | "Otra";
	selected: number;
	onSelect: (id: number) => void;
	options: string[];
};

export const Select = ({ type, onSelect, options, selected }: Props) => {
	const isFamilyOrSize = type === "Familia" || type === "Tamaño";

	const getOptions = () => {
		if (isFamilyOrSize) {
			if (type === "Familia") return FAMILIAS;
			return TAMAÑOS;
		}
		return options;
	};

	const selectOptions = getOptions();

	return (
		<select
			name="select"
			onChange={(event) => onSelect(parseInt(event.target.value, 10))}
		>
			{selectOptions.map((option, i) => (
				<option
					key={option}
					value={isFamilyOrSize ? i : option}
					selected={selected === i}
				>
					{option}
				</option>
			))}
		</select>
	);
};
