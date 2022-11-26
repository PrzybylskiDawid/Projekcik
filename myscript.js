const IMG_URL = 'https://image.tmdb.org/t/p/w500/';
const PopularneURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=1e1a19cd7136c245a895276fd909e7c9"

function getMovies(url){
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results);
        showMovies(data.results.filter((value, index) => index < 6));
    })
}

function showMovies(data) {
    document.getElementById('popularne').innerHTML = '';
    data.forEach(movie => {
        const {title, poster_path, overview, release_date ,genres} = movie;
        const movies = document.createElement('div');
        movies.innerHTML = `
        <img src="${IMG_URL + poster_path}">
        <h2>${title}</h2>
        <h3>${overview}</h3>
        <h3>release date: ${release_date}</h3>
        <h3>genre: ${genres}</h3>
        `;
        document.getElementById('popularne').appendChild(movies);
    })
}
getMovies(PopularneURL);