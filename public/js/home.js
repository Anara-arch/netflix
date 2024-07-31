const main = document.querySelector('.main');

fetch(genres_list_http + new URLSearchParams({
     api_key: api_key
 }))
 .then(res => res.json())
 .then(data => {
     data.genres.forEach(item => {
         fetchMoviesListByGenres(item.id, item.name);
     })
 });

 const fetchMoviesListByGenres = (id, genres) => {
   fetch(movie_genres_http + new URLSearchParams({
        api_key: api_key,
         with_genres: id,
        page: Math.floor(Math.random() * 3) + 1
   }))
    .then(res => res.json())
    .then(data => {
         makeCategoryElement(`${genres}_movies`, data.results);
     })
     .catch(err => console.log(err));
 }

const makeCategoryElement = (category, data) => {
     main.innerHTML +=`
     <div class="movie-list">
            <button class="pre-btn"><p><svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7"/>
              </svg></p></button>
            <h1 class="movie-category">${category.split("_").join(" ")}</h1>
            <div class="movie-container" id="${category}">
            </div>
            <button class="nxt-btn"><p><svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/>
              </svg></p></button>
          </div>
    `;
     makeCards(category, data);
 }

 const makeCards = (id, data) => {
     const movieContainer = document.getElementById(id);
     data.forEach((item, i) => {
         if(item.backdrop_path == null){
             item.backdrop_path == item.poster_path;
             if(item.backdrop_path == null){
                 return;
             }
         }

         movieContainer.innerHTML += `
          <div class="movie" onclick="location.href = '/${item.id}'">
             <img src="${img_url}${item.backdrop_path}" alt="">
             <p class="movie-title">${item.title}</p>
         </div>
         `;

         if(i == data.lenght - 1){
             setTimeout(() => {
                 setupScrolling();
             }, 100);
         }
     })
 }