import { useState } from "react";
import { DB_PATH } from "../paths";
import axios from "axios";

const usePost = (url: string) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<any>(null);

	const sendPostRequest = async (data: any) => {
		const POST_URL = `${DB_PATH}${url}`;
		try {
			setLoading(true);
			await axios.post(POST_URL, data);
			setLoading(false);
			return true; // Return response data if successful
		} catch (err) {
			setError(err);
			setLoading(false);
			throw err; // Rethrow error for handling in the component
		}
	};

	return {
		loading,
		error,
		sendPostRequest,
	};
};

export default usePost;
