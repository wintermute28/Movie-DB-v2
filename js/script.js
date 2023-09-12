'use strict';

document.addEventListener("DOMContentLoaded", () => { //код ниже сработает только после загркзки DOM-структуры
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    
    
    const adv = document.querySelectorAll(".promo__adv img"),
          poster = document.querySelector('.promo__bg'),
          genre = poster.querySelector('.promo__genre'),
          movieList = document.querySelector(".promo__interactive-list"),
          addForm = document.querySelector("form.add"),
          addInput = addForm.querySelector(".adding__input"),
          checkbox = addForm.querySelector("[type='checkbox']");
    

    addForm.addEventListener("submit", (event) => {
        event.preventDefault(); //отменяем дефолтное поведение браузера, что-бы страница не перезагружалась

        let newFilm = addInput.value.toUpperCase().trim();
        const favorite = checkbox.checked; // получаем true/false в зависимости от того стоит ли галочка

        if (newFilm) {
            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 22)}...`;
            }

            if (favorite) {
                console.log("Добавляем любимый фильм");
            }

            movieDB.movies.push(newFilm);
            sortArr(movieDB.movies);
    
            createMovieList(movieDB.movies, movieList);
        }

        event.target.reset();

    });


    const deleteAdv = (arr) => {
        arr.forEach(item => {
            item.remove();
        });
    };


    const makeChanges = () => {
        genre.textContent = 'драма';
        poster.style.backgroundImage = "url('img/bg.jpg')";
    };
    

    const sortArr = (arr) => {
        arr.sort();
    }


    function createMovieList(films, parent) {
        parent.innerHTML = ""; //очищаеи эту структуру
        sortArr(films);
        films.forEach((film, i) => {
            parent.innerHTML += `
                <li class="promo__interactive-item">${i + 1}. ${film}
                    <div class="delete"></div>
                </li>
            `;
        });


        document.querySelectorAll(".delete").forEach((btn, i) => {
            btn.addEventListener("click", () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);

                createMovieList(films, parent);
            })
        })

    }


    deleteAdv(adv);
    makeChanges();
    createMovieList(movieDB.movies, movieList);

});
