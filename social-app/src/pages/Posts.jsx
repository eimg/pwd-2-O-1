import Post from "../components/Post";
import Form from "../components/Form";

import { useQuery } from "@tanstack/react-query";

const api = "http://localhost:8800";

async function fetchPosts() {
	const res = await fetch(`${api}/posts`);
	return res.json();
}

export default function Posts() {
	const {
		data: posts,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["posts"],
		queryFn: fetchPosts,
	});

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	return (
		<div>
			<Form />
			{posts.map(post => {
				return (
					<Post
						key={post.id}
						post={post}
					/>
				);
			})}
		</div>
	);
}
