export type PostType = {
	id: number;
	content: string;
	created: string;
	user: UserType;
	comments: CommentType[];
	likes: [];
};

export type CommentType = {
	id: number;
	content: string;
	created: string;
	user: UserType;
};

export type UserType = {
	id: number;
	name: string;
	username: string;
    bio?: string;
};