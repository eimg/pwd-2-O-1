export type GenreType = {
	id: string;
	name: string;
};

export type MovieType = {
	id: number;
	title: string;
	overview: string;
	release_date: string;
	poster_path: string;
	backdrop_path: string;
};

export type PersonType = {
    id: number,
    name: string;
    character: string;
    profile_path: string;
}