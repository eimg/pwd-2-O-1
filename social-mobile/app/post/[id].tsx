import { ScrollView, View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { PostType, CommentType } from "@/types/global";

import { useQuery } from "@tanstack/react-query";

import Card from "@/components/card";
import Comment from "@/components/comment";

const api = "http://192.168.1.5:8800/posts";

async function fetchPost(id: string) {
	const res = await fetch(`${api}/${id}`);
	return res.json();
}

export default function Post() {
    const { id } = useLocalSearchParams();
    const { data: post, isLoading, error } = useQuery({
        queryKey: ["post", id],
        queryFn: () => fetchPost(id as string)
    });

    if (error) {
		return (
			<View>
				<Text>{error.message}</Text>
			</View>
		);
	}

	if (isLoading) {
		return (
			<View>
				<Text>Loading...</Text>
			</View>
		);
	}

    return <ScrollView>
        <Card post={post} />
        <View>
            {(post as PostType).comments.map(comment => {
                return <Comment key={comment.id} comment={comment} />
            })}
        </View>
    </ScrollView>
}
