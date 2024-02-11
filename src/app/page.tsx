'use client';

import { PostsList } from "@/components";
import { useGetPosts } from "./api";

export default function Home() {
	const {data, loading} = useGetPosts();

	if(loading || !data?.items) {
		return <>Loading...</>
	}

	return (
		<>
			<PostsList posts={data.items} />
		</>
	);
}
