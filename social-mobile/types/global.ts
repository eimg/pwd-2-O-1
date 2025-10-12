export type PostType = {
	id: number;
	content: string;
	created: string;
	user: {
		name: string;
	};
	comments: CommentType[];
	likes: [];
};

export type CommentType = {
	id: number;
	content: string;
	created: string;
	user: {
		name: string;
	};
};
