import React from "react";
import { useEffect } from "react";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
	getAllPosts,
	getPostsStatus,
	fetchPosts,
	deletePost,
} from "./postsSlice";

//ant design
import { Button, Space } from "antd";

// type
import type { PostWithId } from "../../App";
import PostExcerpt from "./PostExcerpt";

const PostsList: React.FC = () => {
	const dispatch = useDispatch();
	const posts = useSelector(getAllPosts);
	const postsStatus = useSelector(getPostsStatus);

	const onDeleteClick = (id: string) => {
		dispatch(deletePost(id))
			.unwrap()
			.catch((error: Error) => {
				console.log(error.message);
			});
	};

	useEffect(() => {
		if (postsStatus === "idle") {
			dispatch(fetchPosts())
				.unwrap()
				.catch((error: Error) => {
					console.log(error.message);
				});
		}
	}, [postsStatus, dispatch]);

	let content;
	if (postsStatus === "loading") {
		content = <p>Loading...</p>;
	} else if (postsStatus === "succeeded") {
		const orderedPosts = posts
			.slice()
			.sort((a, b) => b.date.localeCompare(a.date));
		content = orderedPosts.map((post: PostWithId) => {
			return (
				<PostExcerpt key={post.id} post={post} onDeleteClick={onDeleteClick} />
			);
		});
	} else if (postsStatus === "failed") {
		content = <p>Error</p>;
	}

	return (
		<section>
			<Space
				direction="vertical"
				size="large"
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}>
				{content}
			</Space>
		</section>
	);
};

export default PostsList;
