import { MovieType, PersonType } from "@/types/global";

async function fetchMovie(id: string): Promise<MovieType> {
	const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
		headers: {
			Authorization: `Bearer ${process.env.TMDB_KEY}`,
		},
	});

	return await res.json();
}

async function fetchCast(id: string): Promise<PersonType[]> {
	const res = await fetch(
		`https://api.themoviedb.org/3/movie/${id}/credits`,
		{
			headers: {
				Authorization: `Bearer ${process.env.TMDB_KEY}`,
			},
		}
	);

	const data = await res.json();

	return data.cast;
}

export default async function Movie({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const movie = await fetchMovie(id);
	const cast = await fetchCast(id);

	const url = "http://image.tmdb.org/t/p/w1280";
	const profile = "http://image.tmdb.org/t/p/w185";

	return (
		<div>
			<h2 className="text-lg font-bold pb-2 mb-4 border-b">
				{movie.title} ({movie.release_date.split("-")[0]})
			</h2>
			<img src={url + movie.backdrop_path} />
			<p className="text-lg py-4">{movie.overview}</p>

			<h2 className="text-lg font-bold pb-2 my-4 border-b">Cast</h2>
			<div className="flex flex-wrap gap-4">
				{cast.map(person => {
					return (
						<div key={person.id}>
							{person.profile_path ? (
								<img src={profile + person.profile_path} />
							) : (
								<div className="w-[185px] h-[280px] bg-gray-100"></div>
							)}

							<div className="text-center mt-2">
								<h4 className="font-bold">{person.name}</h4>
								<span className="text-gray-600">
									{person.character}
								</span>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
