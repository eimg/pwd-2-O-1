import { MovieType } from "@/types/global";
import Link from "next/link";

export default function Movie({ movie }: { movie: MovieType }) {
	const url = "http://image.tmdb.org/t/p/w185";

	return (
		<div className="w-[185px] hover:scale-105 transition-all">
			<Link href={`/movie/${movie.id}`}>
				<img src={url + movie.poster_path} />
			</Link>
			<div className="text-center">
				<h3 className="font-bold">{movie.title}</h3>
				<span className="text-gray-600">
					{movie.release_date.split("-")[0]}
				</span>
			</div>
		</div>
	);
}
