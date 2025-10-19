import Movie from "@/components/movie";
import type { MovieType } from "@/types/global";

async function fetchPopular(): Promise<MovieType[]> {
	const res = await fetch("https://api.themoviedb.org/3/movie/popular", {
		headers: {
			Authorization: `Bearer ${process.env.TMDB_KEY}`,
		},
	});

	const data = await res.json();

	return data.results;
}

export default async function Home() {
    const popular = await fetchPopular();

	return <div>
        <h2 className="text-lg font-bold pb-2 mb-4 border-b">Popular</h2>
        <div className="flex flex-wrap gap-4">
            {popular.map(movie => {
                return (
					<Movie key={movie.id} movie={movie} />
				);
            })}
        </div>
    </div>;
}
