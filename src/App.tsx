import React from "react";

import { Routes, Route } from "react-router-dom";

import AddPostForm from "./features/posts/AddPostForm";
import PostsList from "./features/posts/PostsList";
import PageLayout from "./components/PageLayout";

// styling
import "./App.css";

import EditPostForm from "./features/posts/EditPostForm";
import SinglePostPage from "./features/posts/SinglePostPage";

const App = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<PageLayout />}>
					<Route index element={<PostsList />} />
					<Route path="post">
						<Route path="add" element={<AddPostForm />} />
						<Route path=":postId" element={<SinglePostPage />} />
					</Route>
					<Route path="edit/:postId" element={<EditPostForm />} />
				</Route>
			</Routes>
		</>
	);
};

export default App;

export interface PostWithoutId {
	title: string;
	content: string;
	date: string;
}

export interface PostWithId extends PostWithoutId {
	id: string;
}
