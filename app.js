// Movie Class: Represents a Movie

class Movie {
  constructor(name, director, genre, frame, link) {
    this.name = name;
    this.director = director;
    this.genre = genre;
    this.frame = frame;
    this.link = link;
  }
}
class Genre extends Movie {
  constructor(name, director, frame, link) {
    super(name,director, frame, link);
  }
}
// UI Class: Handle UI Tasks
class UI {
  static displayMovies() {
    const movies = Store.getMovies();

    movies.forEach((movie) => UI.addMovieToList(movie));
  }

  static addMovieToList(movie) {
    const list = document.querySelector('#movie-list');

    const movieCard = document.createElement('div');
    movieCard.className = "movieCardField";

    movieCard.innerHTML = `
      <div class="card">
        <img src="${movie.frame}"/>
        <span class="tag tag-teal card-texts">${movie.genre}</span>
        <h3 class="mt-3 card-texts">${movie.name}</h3>
        <p class=" card-texts">${movie.director}</p>
        <div class = "pb-5">
        
        <span class=" mb-5 card-texts"><a href="${movie.link}" class="btn text-center border-0 btn-primary btn-sm link float-right">Watch</a></span>

        <span class=" mb-5 card-texts"><a href="#" class="btn text-center border-0 btn-danger btn-sm delete float-left">Remove</a></span>
        </div>
        
      </div>
      `;

    list.appendChild(movieCard);
  }

  static deleteMovie(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.parentElement.remove();
    }
  }
  static watchMovie(el) {
    if (el.classList.contains('link')) {
      // console.log("Hi!")
      // el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#movie-form');
    container.insertBefore(div, form);

    // Vanish in 3 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

  static clearFields() {
    document.querySelector('#name').value = '';
    document.querySelector('#director').value = '';
    document.querySelector('#genre').value = '';
    document.querySelector('#frame').value = '';
    document.querySelector('#link').value = '';
  }
}

// Store Class: Handles Storage
class Store {
  static getMovies() {
    let movies;
    if (localStorage.getItem('movies') === null) {
      movies = [];
    } else {
      movies = JSON.parse(localStorage.getItem('movies'));
    }

    return movies;
  }

  static addMovie(movie) {
    const movies = Store.getMovies();
    movies.push(movie);
    localStorage.setItem('movies', JSON.stringify(movies));
  }

  static removeMovie(genre) {
    const movies = Store.getMovies();

    movies.forEach((movie, index) => {
      if (movie.genre === genre) {
        movies.splice(index, 1);
      }
    });

    localStorage.setItem('movies', JSON.stringify(movies));
  }
}

// Event: Display Movies
document.addEventListener('DOMContentLoaded', UI.displayMovies);

// Event: Add a Movie
document.querySelector('#movie-form').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault();

  // Get form values
  const name = document.querySelector('#name').value;
  const director = document.querySelector('#director').value;
  const genre = document.querySelector('#genre').value;
  const frame = document.querySelector('#frame').value;
  const link = document.querySelector('#link').value;

  // Validate
  if (name === '' || director === '' || genre === '' || frame === ''|| link === '') {
    UI.showAlert('Please fill in all fields', 'danger');
  } else {
    // Instatiate movie
    const movie = new Movie(name, director, genre, frame, link);

    // Add Movie to UI
    UI.addMovieToList(movie);

    // Add movie to store
    Store.addMovie(movie);

    // Show success message
    UI.showAlert('Movie Added', 'success');

    // Clear fields
    UI.clearFields();
  }
});

// Event: Remove a movie
document.querySelector('#movie-list').addEventListener('click', (e) => {
  // Remove movie from UI
  UI.deleteMovie(e.target);
  // UI.watchMovie(e.target);

  // Remove movie from store
  // Store.removeMovie(e.target.parentElement.previousElementSibling.textContent);
  Store.removeMovie(e.target.parentElement.previousElementSibling.textContent);

  // Show success message
  UI.showAlert('Movie Removed', 'success');
});