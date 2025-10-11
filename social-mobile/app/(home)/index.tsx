import { ScrollView } from "react-native";

import Card from "@/components/card";

export default function Home() {
	return (
		<ScrollView style={{ paddingVertical: 10 }}>
			<Card />
			<Card />
			<Card />
			<Card />
			<Card />
		</ScrollView>
	);
}
