import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import {
	collection,
	getDocs,
	addDoc,
	deleteDoc,
	doc,
	updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase-config";

// type
import { RootState } from "../../app/store";
import { PostWithoutId } from "../../App";

interface Post extends PostWithoutId {
	id: string;
}

interface Posts {
	posts: Post[];
	status: string;
	error: null | string;
}

const postsRef = collection(db, "posts");
// async thunks

export const fetchPosts: any = createAsyncThunk(
	"posts/fetchPosts",
	async () => {
		const data = await getDocs(postsRef);

		const posts = data.docs.map((doc) => {
			return { ...doc.data(), id: doc.id };
		});

		return posts;
	}
);

export const addNewPost: any = createAsyncThunk(
	"posts/addNewPost",
	async (initialPost: PostWithoutId) => {
		let min = 1;
		initialPost.date = sub(new Date(), { minutes: min++ }).toISOString();
		const newPost = await addDoc(postsRef, initialPost);
		return { id: newPost.id, ...initialPost };
	}
);

export const deletePost: any = createAsyncThunk(
	"posts/deletePost",
	async (id: string) => {
		const postDoc = doc(db, "posts", id);
		await deleteDoc(postDoc);
		return id;
	}
);

export const updatePost: any = createAsyncThunk(
	"posts/updatePost",
	async (newPost: any) => {
		const id = newPost.id;
		console.log("new post is: " + JSON.stringify(id));
		const postDoc = doc(db, "posts", id);
		delete newPost.id;
		let min = 1;
		newPost.date = sub(new Date(), { minutes: min++ }).toISOString();
		await updateDoc(postDoc, newPost);
		return { id, ...newPost };
	}
);

const initialState: Posts = {
	posts: [],
	status: "idle",
	error: null,
};

export const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPosts.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.posts = action.payload;
			})
			.addCase(fetchPosts.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.console.error.message;
			})
			.addCase(fetchPosts.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(addNewPost.fulfilled, (state, action) => {
				state.posts.push(action.payload);
			})
			.addCase(deletePost.fulfilled, (state, action) => {
				state.posts = state.posts.filter((post) => post.id !== action.payload);
			})
			.addCase(updatePost.fulfilled, (state, action) => {
				const index = state.posts.findIndex(
					(post) => post.id === action.payload.id
				);

				state.posts[index] = action.payload;
			});
	},
});

export const getAllPosts = (state: RootState) => state.posts.posts;

export const getPostById = (state: RootState, postId: string) =>
	state.posts.posts.find((post) => post.id === postId);
export const getPostsStatus = (state: RootState) => state.posts.status;

export default postsSlice.reducer;
