import React from "react";

import { Routes, Route } from "react-router-dom";

import { addNewPost, updatePost } from "./features/posts/postsSlice";

// styling
import "./App.css";

import PostsList from "./features/posts/PostsList";
import PageLayout from "./components/PageLayout";
import SinglePostPage from "./features/posts/SinglePostPage";
import { ButtonFunction, PostWithoutId } from "./interface";
import PostForm from "./features/posts/PostForm";

const App = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<PageLayout />}>
					<Route index element={<PostsList />} />
					<Route path="post">
						<Route
							path="add"
							element={
								<PostForm formType="Create" onButtonClick={onCreateClick} />
							}
						/>
						<Route path=":postId" element={<SinglePostPage />} />
					</Route>
					<Route
						path="edit/:postId"
						element={
							<PostForm formType="Update" onButtonClick={onUpdateClick} />
						}
					/>
				</Route>
			</Routes>
		</>
	);
};

export default App;

const onCreateClick: ButtonFunction = (
	state: PostWithoutId,
	dispatch: any,
	formDispatch: any,
	canSave: boolean
) => {
	if (canSave) {
		dispatch(addNewPost(state))
			.unwrap()
			.catch((error: Error) => console.log(error.message));
	}
	formDispatch({ type: "reset" });
};

const onUpdateClick: ButtonFunction = (
	state: PostWithoutId,
	dispatch: any,
	formDispatch: any,
	canSave: boolean,
	postId?: string,
	navigate?: any
) => {
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
