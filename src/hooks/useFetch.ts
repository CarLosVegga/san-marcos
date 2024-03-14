import { useEffect, useState } from "react";
import { DB_PATH } from "../paths";
import axios from "axios";

export function useFetch(url: string, body?: any): any {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<any>(null);
	const [reload, setReload] = useState(false); // New reload state variable

	const reloadRequest = () => {
		setReload(!reload); // Toggle reload state to force a fetch request
	};

	useEffect(() => {
		const GET_URL = `${DB_PATH}${url}`;
		const fetchData = async () => {
			try {
				const response = await axios.get(GET_URL, { params: body });
				setData(response.data);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [url, reload]);

	return { data, loading, error, reloadRequest };
}
