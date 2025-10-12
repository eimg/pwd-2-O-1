import { ScrollView, View, Text } from "react-native";
import { useQuery } from "@tanstack/react-query";
import Card from "@/components/card";

import { PostType } from "@/types/global";

const api = "http://192.168.1.5:8800/posts";

async function fetchPosts() {
    const res = await fetch(api);
    return res.json();
}

export default function Home() {
    const { data: posts, isLoading, error } = useQuery({
        queryKey: ["posts"],
        queryFn: fetchPosts,
    });

    if (error) {
		return (
			<View>
				<Text>{error.message}</Text>
			</View>
		);
	}

    if(isLoading) {
        return <View><Text>Loading...</Text></View>;
    }

	return (
		<ScrollView>
			{(posts as PostType[]).map(post => {
                return <Card post={post} key={post.id} />
            })}
		</ScrollView>
	);
}
