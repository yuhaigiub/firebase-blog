import React, { useEffect, useReducer } from "react";

import { useParams, useNavigate, Link } from "react-router-dom";

import type { PostWithoutId } from "../../App";
import { db } from "../../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { updatePost } from "./postsSlice";
import { useDispatch } from "react-redux";

// style
import { Typography, Input, Form, Button } from "antd";

const { Title } = Typography;
const { TextArea } = Input;

const EditPostForm: React.FC = () => {
	const [form] = Form.useForm();

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { postId } = useParams();

	const [state, formDispatch] = useReducer(formReducer, initialState);

	const canSave = [state.title, state.content].every(Boolean);
	const onUpdateClick = () => {
		if (canSave) {
			dispatch(updatePost({ id: postId, ...state }))
				.unwrap()
				.then(() => {
					navigate("/");
				})
				.catch((error: Error) => console.log(error.message));
		}
		formDispatch({ type: "reset" });
	};

	useEffect(() => {
		const getPost = async () => {
			const postRef = doc(db, "posts", postId || "");
			const post = await getDoc(postRef);
			if (post.exists()) {
				formDispatch({
					type: "changePost",
					payload: post.data(),
				});
			}
		};

		getPost();
	}, [postId]);

	return (
		<section>
			<Title>Edit Post</Title>
			<Form form={form} layout="vertical">
				<Form.Item label="Title" htmlFor="postTitle">
					<Input
						placeholder="Basic usage"
						id="postTitle"
						type="text"
						value={state.title}
						onChange={(e) => {
							formDispatch({ type: "changeTitle", payload: e.target.value });
						}}
					/>
				</Form.Item>
				<Form.Item label="Content" htmlFor="postContent">
					<TextArea
						id="postContent"
						rows={4}
						value={state.content}
						onChange={(e) => {
							formDispatch({ type: "changeContent", payload: e.target.value });
						}}
					/>
				</Form.Item>
				<Form.Item>
					<Button
						type="primary"
						size="large"
						onClick={onUpdateClick}
						disabled={!canSave}>
						Update
					</Button>
				</Form.Item>
			</Form>
			<Link to="/">
				<Button danger type="primary" size="large">
					Back to Post
				</Button>
			</Link>
		</section>
	);
};

export default EditPostForm;

type formType = "changeTitle" | "changeContent" | "changePost" | "reset";

interface formAction {
	type: formType;
	payload?: any;
}

const initialState: PostWithoutId = {
	title: "",
	content: "",
	date: "",
};

const formReducer = (state: PostWithoutId, action: formAction): any => {
	switch (action.type) {
		case "changeTitle":
			return { ...state, title: action.payload };
		case "changeContent":
			return { ...state, content: action.payload };
		case "changePost":
			return { ...action.payload };
		case "reset":
			return initialState;
	}
};
