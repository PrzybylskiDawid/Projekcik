const IMG_URL = 'https://image.tmdb.org/t/p/w500/';
const PopularneURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=1e1a19cd7136c245a895276fd909e7c9"

agenrees = [{
        "id": 28,
        "name": "Action"
    },
    {
        "id": 12,
        "name": "Adventure"
    },
    {
        "id": 16,
        "name": "Animation"
    },
    {
        "id": 35,
        "name": "Comedy"
    },
    {
        "id": 80,
        "name": "Crime"
    },
    {
        "id": 99,
        "name": "Documentary"
    },
    {
        "id": 18,
        "name": "Drama"
    },
    {
        "id": 10751,
        "name": "Family"
    },
    {
        "id": 14,
        "name": "Fantasy"
    },
    {
        "id": 36,
        "name": "History"
    },
    {
        "id": 27,
        "name": "Horror"
    },
    {
        "id": 10402,
        "name": "Music"
    },
    {
        "id": 9648,
        "name": "Mystery"
    },
    {
        "id": 10749,
        "name": "Romance"
    },
    {
        "id": 878,
        "name": "Science Fiction"
    },
    {
        "id": 10770,
        "name": "TV Movie"
    },
    {
        "id": 53,
        "name": "Thriller"
    },
    {
        "id": 10752,
        "name": "War"
    },
    {
        "id": 37,
        "name": "Western"
    }
]

function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        showMovies(data.results.filter((value, index) => index < 10));
    })
}

function getImages(url) {
    fetch(url).then(res => res.json()).then(data => {
        showImages(data);
    })
}

function sanitize(str) {
    return str.replace("'", '').replace('"', '').replace('`', '')
}

// wyświetlanie filmów
function showMovies(data) {
    document.getElementById("popularne").innerHTML = '';
    document.getElementById("specificMovie").innerHTML = '';
    document.getElementById("specificMovie").classList.remove('specificMovie');
    data.forEach(movie => {
        const {
            id,
            title,
            poster_path,
            overview,
            release_date,
            vote_average,
            vote_count,
            genre_ids
        } = movie;
        const movies = document.createElement('div');
        movies.className = 'popularMovies';
        movies.innerHTML += `<img onclick="showMovie(${id}, '${sanitize(title)}', '${poster_path}', '${sanitize(overview)}', '${release_date}', '${vote_average}', '${vote_count}', '${genre_ids}')" src="${IMG_URL + poster_path}"><br><p>${title} <img class="star" src="star.png">${vote_average}</p>`
        document.getElementById('popularne').appendChild(movies);
    })

}


// wyświetlenie pojedyńczego filmu

function showMovie(id, title, poster_path, overview, release_date, vote_average, vote_count, genre_ids) {
    document.getElementById("specificMovie").classList.add('specificMovie');
    document.getElementById("popularne").innerHTML = '';
    document.getElementById("specificMovie").innerHTML =
        `<img id="imgurl" src="${IMG_URL + poster_path}"><br>
    <center>${title} <img class="star" src="star.png">${vote_average}<span style="color: gray;">(${vote_count})</span></center>
    release date: ${release_date}<br>
    genres: `;
    const words = genre_ids.split(',');
    for (let i = 0; i < words.length; i++) {
        let genre = agenrees.find(element => element.id == words[i]);
        document.getElementById("specificMovie").innerHTML += genre.name + ", ";
    }

    document.getElementById("specificMovie").innerHTML += `<br>
    director:<br><br>
    overview: ${overview}
    <a href="https://www.themoviedb.org/movie/${id}" style="text-decoration: none; margin: 10px; BORDER: 1px solid black;">link do TMDB</a>
    <div id="images" style=" margin: 15px; float: left; width: 90%; height: auto;"></div><br> 
    <center>TRAILER</center>`;
    getImages('https://api.themoviedb.org/3/movie/' + id + '/images?api_key=1e1a19cd7136c245a895276fd909e7c9');

}

// sortowanie po gatunku  

function SortByGenre(genreId) {
    var elems = document.querySelector(".active");
    elems.classList.remove("active");
    document.getElementById(genreId).classList.add('active');
    document.getElementById("popularne").innerHTML = '';
    if (genreId == 10) {
        genreId = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=1e1a19cd7136c245a895276fd909e7c9"
    } else {
        genreId = 'https://api.themoviedb.org/3/discover/movie?with_genres=' + genreId + '&sort_by=popularity.desc&api_key=1e1a19cd7136c245a895276fd909e7c9'
    }
    getMovies(genreId);
}


function showImages(data) {
    data.backdrops.slice(0, 3).forEach(image => {
        const {
            file_path
        } = image;
        document.getElementById('images').innerHTML += `<img style="float: left; bottom: 0;" src="${IMG_URL + file_path}">`

    })

}

// search

function Search() {

    searchInput = document.getElementById('search').value;
    searchInput = searchInput.replace(' ', '%20')
    searchResult = 'https://api.themoviedb.org/3/search/movie?api_key=1e1a19cd7136c245a895276fd909e7c9&language=en-US&query=' + searchInput + '&page=1&include_adult=false'
    getMovies(searchResult);
}

// search by genre

function SearchGenre() {

    searchInput = document.getElementById('search2').value;
    searchInput = searchInput.toLowerCase();
    searchInput = searchInput.charAt(0).toUpperCase() + searchInput.slice(1);
    searchInput = agenrees.find(element => element.name == searchInput);
    if (searchInput === undefined) {
        alert("This Genre doesn't exists")
    }
    searchResult = 'https://api.themoviedb.org/3/discover/movie?with_genres=' + searchInput.id + '&sort_by=popularity.desc&api_key=1e1a19cd7136c245a895276fd909e7c9'
    getMovies(searchResult);
}

const input = document.getElementById("search");
const log = document.getElementById('popularne');

input.addEventListener('input', updateValue);

// sugestie do wyszukiwania za pomocą gatunków

function updateValue() {
    searchInput = document.getElementById('search').value;
    searchResult = 'https://api.themoviedb.org/3/search/movie?api_key=1e1a19cd7136c245a895276fd909e7c9&language=en-US&query=' + searchInput + '&page=1&include_adult=false'
    fetch(searchResult).then(res => res.json()).then(data => {
        data = data.results.filter((value, index) => index < 5)

        const suggestionList = [];
        data.forEach(movie => {
            const {
                title
            } = movie;
            suggestionList.push(title)
        });

        addSuggestions(suggestionList, suggestions);
    })
}

function addSuggestions(list, container) {
    document.getElementById("suggestions").innerHTML = '';
    list.forEach(function(item) {
        const option = document.createElement('option');

        option.setAttribute('value', item);
        container.appendChild(option);
    });
}

// sugestie do wyszukiwania za pomocą gatunków

(function(genres) {

    function addItems(list, container) {
        list.forEach(function(item) {
            const option = document.createElement('option');

            option.setAttribute('value', item);
            container.appendChild(option);
        });
    }

    const browserList = ['Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music', 'Mystery', 'Romance', 'Science Fiction', 'TV Movie', 'Thriller', 'War', 'Western'];
    addItems(browserList, genres);
}(document.getElementById('genres')));


getMovies(PopularneURL);