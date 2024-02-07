'use client';

import { useGetPosts } from "./api";

export default function Home() {
	const {data, loading} = useGetPosts();

	if(loading) {
		return <>Loading...</>
	}

	return (
		<>
			{
				data?.items.map(p => <div key={p.id}>
					{p.description}<br />
					<video src={p.resource.url} width="320" autoPlay />
				</div>)
			}
		</>
	);
}
