let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");


// apiden veri çekme

let getMovie = () =>{
    let movieName = movieNameRef.value;
    let url = `http://www.omdbapi.com/?t=${movieName}&apikey=13b197e2`;

    // eğer input boşsa verilecek hata mesajı
    
    if (movieName.length<=0) {
        result.innerHTML = `<h3 class="msg">Lütfen bir film ismi girin...</h3>`
    }

    // input boş değilse burdan devam edecek

    else {
        fetch(url).then((resp) => resp.json()).then((data) =>{
            // eğer sonuç datada varsa
            if(data.Response == "True"){
                result.innerHTML = `
                <div class="info">
                    <img src=${data.Poster} class="poster">
                    <div>
                        <h2>${data.Title}</h2>
                        <div class="rating">
                            <img src="star-icon.svg">
                            <h4>${data.imdbRating}</h4>
                        </div>
                        <div class="details">
                            <span>${data.Rated}</span>
                            <span>${data.Year}</span>
                            <span>${data.Runtime}</span>
                        </div>
                        <div class="genre">
                            <div>${data.Genre.split(",").join("</div><div>")}</div>
                        </div>
                    </div>
                </div>
                <h3>Plot:</h3>
                <p>${data.Plot}</p>
                <h3>Cast:</h3>
                <p>${data.Actors}</p>
            `;
            }

            // eğer sonuç datada yoksa
            else {
                result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
            }
        })
        
        // başka bir hata oluşursa 
        .catch(() =>{
            result.innerHTML  = `<h3 class="msg">Error Occured</h3>`;
        })
    }
}

searchBtn.addEventListener("click", getMovie)
window.addEventListener("load", getMovie)