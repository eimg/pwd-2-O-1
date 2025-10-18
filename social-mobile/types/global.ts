export type PostType = {
	id: number;
	content: string;
	created: string;
	user: UserType;
	comments: CommentType[];
	likes: { id: number; userId: number }[];
};

export type CommentType = {
	id: number;
	content: string;
	created: string;
	user: UserType;
	postId: number;
};

export type UserType = {
	id: number;
	name: string;
	username: string;
    bio?: string;
};