import React from "react";
import { useEffect, useState } from "react";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase-config";

import { Link, useParams } from "react-router-dom";

import { Typography, Space, Button, Divider } from "antd";
import PostTime from "./PostTime";

const { Title, Paragraph } = Typography;

const initialState = {
	title: "",
	content: "",
};

const SinglePostPage: React.FC = () => {
	const { postId } = useParams();
	const [post, setPost] = useState<any>(initialState);

	useEffect(() => {
		const getPost = async () => {
			const postRef = doc(db, "posts", postId || "");
			const data = await getDoc(postRef);
			if (data.exists()) {
				setPost(data.data());
			}
		};

		getPost();
	}, [postId]);

	return (
		<Space
			direction="vertical"
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}>
			<Title>{post.title}</Title>
			<PostTime timestamp={post.date} />
			<hr />
			<Paragraph style={{ textAlign: "justify" }}>{post.content}</Paragraph>
			<Link to="/">
				<Button type="primary" danger size="large">
					Back to Posts
				</Button>
			</Link>
		</Space>
	);
};

export default SinglePostPage;
