import Movie from "@/components/movie";
import type { MovieType } from "@/types/global";

async function fetchMovies(id: string): Promise<MovieType[]> {
	const res = await fetch(
		`https://api.themoviedb.org/3/discover/movie?with_genres=${id}`,
		{
			headers: {
				Authorization: `Bearer ${process.env.TMDB_KEY}`,
			},
		}
	);

	const data = await res.json();

	return data.results;
}

export default async function Genre({
	params,
}: {
	params: Promise<{ id: string; name: string }>;
}) {
	const { id, name } = await params;
	const movies = await fetchMovies(id);

	return (
		<div>
			<h2 className="text-lg font-bold pb-2 mb-4 border-b">{name}</h2>
			<div className="flex flex-wrap gap-4">
				{movies.map(movie => {
					return (
						<Movie
							key={movie.id}
							movie={movie}
						/>
					);
				})}
			</div>
		</div>
	);
}
