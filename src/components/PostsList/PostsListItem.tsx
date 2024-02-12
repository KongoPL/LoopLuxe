'use client';

import { IPost, IUser, isUserModel } from "@/models";
import './style.scss';
import { useCallback, useContext, useEffect, useMemo, useRef } from "react";
import { displayPrettyNumber } from "@/utils";
import { PostViewportVisibilityContext } from "@/contexts";
import Link from "next/link";
import moment from "moment";

interface IProps {
	post: IPost
}

export const PostsListItem: React.FC<IProps> = ({post}) => {
	const postItemRef = useRef<HTMLDivElement>(null);
	const videoRef = useRef<HTMLVideoElement>(null);
	const {updateVisibilityData, observerOptions, mostVisiblePost} = useContext(PostViewportVisibilityContext);

	// Is the video that should be interactive (i.e. playing) for user:
	const isInteractiveVideo = useMemo(
		() => mostVisiblePost?.postId === post.id,
		[mostVisiblePost?.postId, post.id]
	);

	const onLikeClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault();
		alert("Like!");
	}, []);

	const onCommentsClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault();
		alert("comments!");
	}, []);

	const onSaveClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault();
		alert("save!");
	}, []);

	useEffect(() => {
		if(postItemRef.current === null) {
			return;
		}

		const observer = new IntersectionObserver(([{isIntersecting, intersectionRatio}]) => {
			updateVisibilityData({
				postId: post.id,
				intersectionRatio,
				isIntersecting,
			})
		}, observerOptions);

		observer.observe(postItemRef.current);

		return () => {
			observer.disconnect()
		}
	}, [observerOptions, post.id, updateVisibilityData]);

	useEffect(() => {
		const shouldPauseVideo = !isInteractiveVideo;

		if(!videoRef.current || videoRef.current.paused === shouldPauseVideo) {
			return;
		}

		if(shouldPauseVideo) {
			videoRef.current.pause();
		} else {
			videoRef.current.play();
			//videoRef.current.muted = false;
			// You can't play and unmute video, except there is some mouse event
			// Probably needs to be bypassed as Chrome is.
		}
	}, [isInteractiveVideo]);

	useEffect(() => {
		function onVisibilityChange() {
			if(!isInteractiveVideo) {
				return;
			}

			if(document.hidden) {
				videoRef.current?.pause();
			} else if(isInteractiveVideo) {
				videoRef.current?.play();
			}
		};

		document.addEventListener("visibilitychange", onVisibilityChange);

		return () => {
			document.removeEventListener("visibilitychange", onVisibilityChange);
		}
	}, [isInteractiveVideo]);

	return (
		<div ref={postItemRef} className="PostsList-PostsListItem">
			<div className="post-details">
				{isUserModel(post.user) && <header>
					<Link href={`/user/${post.user.id}`}>@{post.user.name}</Link> {/* @TODO fix link route */}
					&nbsp;&bull;&nbsp;
					<Link href={`/post/${post.id}`}>
						{moment(post.createdAt).calendar()}
					</Link>
				</header>}
				{post.description}
			</div>
			<Link href={`/post/${post.id}`}>
				<video
					ref={videoRef}
					src={post.resource.url}
					className="resource"
					loop
					muted
					preload="metadata"
					disablePictureInPicture
					disableRemotePlayback
					onContextMenu={(event) => {event.preventDefault();}}
				/>
			</Link>
			<ul className="post-actions no-styling text-center">
				<li>
					<a href="#" className="no-styling" onClick={onLikeClick}>
						<i className="bi bi-heart-fill fs-2"></i>
						<div>
							{!post.stats.likes ? 'Like' : displayPrettyNumber(post.stats.likes)}
						</div>
					</a>
				</li>
				<li>
					<a href="#" className="no-styling" onClick={onCommentsClick}>
						<i className="bi bi-chat fs-2"></i>
						<div>
							{!post.stats.comments ? 'Comment' : displayPrettyNumber(post.stats.comments)}
						</div>
					</a>
				</li>
				<li>
					<a href="#" className="no-styling" onClick={onSaveClick}>
						<i className="bi bi-bookmark-fill fs-2"></i>
						<div>
							{!post.stats.saves ? 'Save' : displayPrettyNumber(post.stats.saves)}
						</div>
					</a>
				</li>
			</ul>
		</div>
	);
}
