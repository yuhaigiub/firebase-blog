export interface PostWithoutId {
	title: string;
	content: string;
	date: string;
}

export interface PostWithId extends PostWithoutId {
	id: string;
}

export type FormType = "changeTitle" | "changeContent" | "changePost" | "reset";

export interface FormAction {
	type: FormType;
	payload?: any;
}

export interface Post extends PostWithoutId {
	id: string;
}

export interface Posts {
	posts: Post[];
	status: string;
	error: null | string;
}

export type ButtonFunction = (
	state: PostWithoutId,
	dispatch: any,
	formDispatch: any,
	canSave: boolean,
	postId?: string,
	navigate?: any
) => void;
