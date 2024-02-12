'use client';

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ReactNode } from "react";

interface IPostVisibilityData {
	postId: string;
	isIntersecting: boolean;
	intersectionRatio: number;
}

interface IContextOptions {
	observerOptions: IntersectionObserverInit;
	updateVisibilityData: (data: IPostVisibilityData) => void;
	mostVisiblePost?: IPostVisibilityData;
}

// @ts-ignore
export const PostViewportVisibilityContext = React.createContext<IContextOptions>(undefined);

// Provider component
export const PostViewportVisibilityProvider: React.FC<{children: ReactNode}> = ({ children }) => {
	const [postVisibilityData, setPostVisibilityData] = useState<IPostVisibilityData[]>([]);
	const [mostVisiblePost, setMostVisiblePost] = useState<IPostVisibilityData | undefined>(undefined);

	const observerOptions = useMemo(() => ({
		threshold: 0.6,
	}), []);

	const updateVisibilityData = useCallback((data: IPostVisibilityData) => {
		setPostVisibilityData((currentData) => ([
			...currentData.filter((d => d.postId !== data.postId)),
			data
		]));
	}, []);

	useEffect(() => {
		const mostVisiblePost = postVisibilityData.filter(d => d.isIntersecting)
			.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

		return setMostVisiblePost(mostVisiblePost);
	}, [postVisibilityData]);

	const options = {
		observerOptions,
		updateVisibilityData,
		mostVisiblePost
	} satisfies IContextOptions;

	return (
		<PostViewportVisibilityContext.Provider value={options}>
			{children}
		</PostViewportVisibilityContext.Provider>
	);
}
