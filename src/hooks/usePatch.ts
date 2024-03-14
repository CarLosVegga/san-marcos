import { useState } from "react";
import { DB_PATH } from "../paths";
import axios from "axios";

export const usePatch = (url: string, initialData = null, config = {}) => {
	const [data, setData] = useState(initialData);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<any>(null);

	const sendPatchRequest = async (patchData: any) => {
		const PATCH_URL = `${DB_PATH}${url}`;
		try {
			setLoading(true);
			const response = await axios.patch(PATCH_URL, patchData, config);
			setData(response.data);
			setLoading(false);
			return true; // Return true if successful
		} catch (err) {
			setError(err);
			setLoading(false);
			return false; // Return false if failed
		}
	};

	return {
		data,
		loading,
		error,
		sendPatchRequest,
	};
};

export default usePatch;
