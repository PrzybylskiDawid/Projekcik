const IMG_URL = 'https://image.tmdb.org/t/p/w500/';
const PopularneURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=1e1a19cd7136c245a895276fd909e7c9"

agenrees = [
    {"id":28,"name":"Action"},
    {"id":12,"name":"Adventure"},
    {"id":16,"name":"Animation"},
    {"id":35,"name":"Comedy"},
    {"id":80,"name":"Crime"},
    {"id":99,"name":"Documentary"},
    {"id":18,"name":"Drama"},
    {"id":10751,"name":"Family"},
    {"id":14,"name":"Fantasy"},
    {"id":36,"name":"History"},
    {"id":27,"name":"Horror"},
    {"id":10402,"name":"Music"},
    {"id":9648,"name":"Mystery"},
    {"id":10749,"name":"Romance"},
    {"id":878,"name":"Science Fiction"},
    {"id":10770,"name":"TV Movie"},
    {"id":53,"name":"Thriller"},
    {"id":10752,"name":"War"},
    {"id":37,"name":"Western"}]

function getMovies(url){
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results);
        showMovies(data.results.filter((value, index) => index < 10));
    })
}

// wyświetlanie filmów

function showMovies(data) {
    document.getElementById("popularne").innerHTML = '';
    document.getElementById("specificMovie").innerHTML = '';
    document.getElementById("specificMovie").classList.remove('specificMovie');
    //document.getElementById('popularne').innerHTML += '<center><h1 class="POPULARNE">POPULARNE</h1></center>';
    data.forEach(movie => {
        const {id, title, poster_path, overview, release_date ,vote_average, vote_count, genre_ids, director} = movie;
        const movies = document.createElement('div'); 
        movies.className = 'popularMovies';   
        movies.innerHTML += `<img onclick="showMovie(${id}, '${title}', '${poster_path}', '${overview}', '${release_date}', '${vote_average}', '${vote_count}', '${genre_ids}', '${director}')" src="${IMG_URL + poster_path}"><br><p>${title} <img class="star" src="star.png">${vote_average}</p>`
        document.getElementById('popularne').appendChild(movies);
    })
       
}
getMovies(PopularneURL);


// wyświetlenie pojedyńczego filmu

function showMovie(id, title, poster_path, overview, release_date, vote_average, vote_count, genre_ids, director) {
    document.getElementById("specificMovie").classList.add('specificMovie');
    document.getElementById("popularne").innerHTML = '';
    document.getElementById("home").classList.remove('active');
    document.getElementById("specificMovie").innerHTML =
    `<img id="imgurl" src="${IMG_URL + poster_path}"><br>
    <center>${title} <img class="star" src="star.png">${vote_average}<span style="color: gray;">(${vote_count})</span></center>
    release date: ${release_date}<br>
    genres: `;
    const words = genre_ids.split(',');
    for (let i = 0; i < words.length; i++) {
        let genre = agenrees.find(element => element.id == words[i]);
        document.getElementById("specificMovie").innerHTML += genre.name+ ", ";
    }

    document.getElementById("specificMovie").innerHTML += `<br>
    director: ${director}<br><br>
    overview: ${overview}
    `
}

// sortowanie po gatunku  

function SortByGenre(genreId) {
    var elems = document.querySelector(".active");
    elems.classList.remove("active");
    document.getElementById(genreId).classList.add('active');
    document.getElementById("popularne").innerHTML = '';
    genreId = 'https://api.themoviedb.org/3/discover/movie?with_genres='+genreId+'&sort_by=popularity.desc&api_key=1e1a19cd7136c245a895276fd909e7c9'
    getMovies(genreId);
}


// search

function Search() {

    searchInput = document.getElementById('search').value;
    searchInput = searchInput.replace(' ', '%20')
    searchResult = 'https://api.themoviedb.org/3/search/movie?api_key=1e1a19cd7136c245a895276fd909e7c9&language=en-US&query='+searchInput+'&page=1&include_adult=false'
    getMovies(searchResult);
}


