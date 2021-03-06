import http from "./httpService";

const apiSession = '/sessions';

export async function getHistoryItems(param) {

  const { data: history } = await http.get(apiSession, { params: param });
  return history;
}

// import * as genresAPI from "./fakeGenreService.js";
// import http from "./httpService";

// const apiMovies = '/movies';

// function MovieUrl(id){
//   return `${apiMovies}/${id}`
// }

// export async function getMovies() {
//   const { data: movies } = await http.get(apiMovies);
//   return movies;
// }

// export async function getMovie(id) {
//   const { data: movie } = await http.get(MovieUrl(id));
//   return movie;
// }

// export async function saveMovie(movie) {

//   if (movie._id === ''){
//     delete movie._id;
//     //create new movie in database
//     const { data: mov } = await http.post(apiMovies, movie);
//   }
//   else{
//     //update existing movie
//     const id = movie._id;
//     delete movie._id;
//     const { data: mov } = await http.put(MovieUrl(id), movie);
//   }
// }

// export async function deleteMovie(movieId) {
//   const res = await http.delete(MovieUrl(movieId));
//   return res;
// }
