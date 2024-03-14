import React from "react";
import { ReactComponent as MySVG } from "../../img/Loading.svg";
import "./Loading.css";

export const Loading = () => {
	const [state, setState] = React.useState(false);

	function wait500ms() {
		return new Promise((resolve) => {
			setTimeout(resolve, 500);
		});
	}

	React.useEffect(() => {
		const changeStateAfter500ms = async () => {
			await wait500ms();
			setState(true);
		};
		changeStateAfter500ms();
	}, []);

	if (!state) return <></>;

	return (
		<div className="loading">
			<MySVG className="svg" />
			<h3>Cargando...</h3>
		</div>
	);
};
