'use client';

import axios from "axios"
import { IGetPostsResponse } from "./route"
import { useEffect, useState } from "react"

export const useGetPosts = () => {
	const [data, setData] = useState<undefined | IGetPostsResponse>(undefined);
	const [loading, setIsLoading] = useState(false);

	// @TODO implement SWR and eliminate double calling for some reason
	useEffect(() => {
		(async () => {
			const response = await axios.get('/api/posts');

			setData(response.data);
			setIsLoading(false);
		})();
	}, [setData, setIsLoading]);

	return {
		data,
		loading
	}
}
