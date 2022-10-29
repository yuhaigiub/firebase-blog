import React, { useEffect, useReducer } from "react";

import { useParams, useNavigate } from "react-router-dom";

import { db } from "../../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";

// type
import type {
	PostWithoutId,
	FormAction,
	ButtonFunction,
} from "../../interface";

// style
import { Typography, Input, Form, Button } from "antd";

const { Title } = Typography;
const { TextArea } = Input;

const PostForm: React.FC<Props> = ({ formType, onButtonClick }) => {
	const [form] = Form.useForm();

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { postId } = useParams();

	const [state, formDispatch] = useReducer(formReducer, initialState);

	const canSave = [state.title, state.content].every(Boolean);
	// ---------------------------------------------------------------------------

	const handleClick = () => {
		onButtonClick(state, dispatch, formDispatch, canSave, postId, navigate);
	};

	useEffect(() => {
		if (formType === "Update") {
			getPost(formDispatch, postId);
		}
	}, [postId, formType]);

	return (
		<section>
			<Title>{formType + " "}Post</Title>
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
						onClick={handleClick}
						disabled={!canSave}>
						{formType}
					</Button>
				</Form.Item>
			</Form>
			<Button
				danger
				type="primary"
				size="large"
				onClick={() => {
					navigate("/");
				}}>
				Back to Post
			</Button>
		</section>
	);
};

export default PostForm;

interface Props {
	formType: "Create" | "Update";
	onButtonClick: ButtonFunction;
}

const initialState: PostWithoutId = {
	title: "",
	content: "",
	date: "",
};

const formReducer = (state: PostWithoutId, action: FormAction): any => {
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

const getPost = async (formDispatch: any, postId?: string) => {
	const postRef = doc(db, "posts", postId || "");
	const post = await getDoc(postRef);
	if (post.exists()) {
		formDispatch({
			type: "changePost",
			payload: post.data(),
		});
	}
};
