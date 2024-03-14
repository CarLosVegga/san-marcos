import { useState } from "react";
import { DB_PATH } from "../paths";

import axios from "axios";

const useDelete = (url: string) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<any>(null);

	const sendDeleteRequest = async (body: any) => {
		const DELETE_URL = `${DB_PATH}${url}`;
		try {
			setLoading(true);
			const config = { data: body };
			await axios.delete(DELETE_URL, config);
			setLoading(false);
			return true;
		} catch (err) {
			setError(err);
			setLoading(false);
			return false;
		}
	};

	return {
		loading,
		error,
		sendDeleteRequest,
	};
};

export default useDelete;
