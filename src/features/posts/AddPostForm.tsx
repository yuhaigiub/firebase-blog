import React from "react";
import { useReducer } from "react";

import { useDispatch } from "react-redux/es/exports";
import { addNewPost } from "./postsSlice";

import { Link } from "react-router-dom";

//type
import type { PostWithoutId } from "../../App";

// style
import { Form, Typography, Input, Button } from "antd";
const { Title } = Typography;
const { TextArea } = Input;

const AddPostForm: React.FC = () => {
	const [form] = Form.useForm();

	const dispatch = useDispatch();
	const [state, formDispatch] = useReducer(formReducer, initialState);

	const canSave = [state.title, state.content].every(Boolean);

	const onCreateClick = () => {
		if (canSave) {
			dispatch(addNewPost(state))
				.unwrap()
				.catch((error: Error) => console.log(error.message));
		}
		formDispatch({ type: "reset" });
	};

	return (
		<>
			<section>
				<Title>Create Post</Title>
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
								formDispatch({
									type: "changeContent",
									payload: e.target.value,
								});
							}}
						/>
					</Form.Item>
					<Form.Item>
						<Button
							type="primary"
							size="large"
							onClick={onCreateClick}
							disabled={!canSave}>
							Create
						</Button>
					</Form.Item>
				</Form>
				<Link to="/">
					<Button danger type="primary" size="large">
						Back To Post
					</Button>
				</Link>
			</section>
		</>
	);
};

export default AddPostForm;

type formType = "changeTitle" | "changeContent" | "reset";

interface formAction {
	type: formType;
	payload?: string;
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
		case "reset":
			return initialState;
	}
};
