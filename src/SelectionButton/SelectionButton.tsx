import React from "react";
import "./SelectionButton.css";

type Props = {
	optionA: string;
	optionB: string;
	setActiveOption: (option: string) => void;
	isFirstOptionActive: boolean;
};

export const SelectionButton = ({
	optionA,
	optionB,
	setActiveOption,
	isFirstOptionActive,
}: Props) => {
	return (
		<div className="selection-buttons">
			<button
				className={isFirstOptionActive ? "active" : "inactive"}
				type="button"
				onClick={() => setActiveOption(optionA)}
			>
				{optionA}
			</button>
			<button
				className={!isFirstOptionActive ? "active" : "inactive"}
				type="button"
				onClick={() => setActiveOption(optionB)}
			>
				{optionB}
			</button>
		</div>
	);
};
