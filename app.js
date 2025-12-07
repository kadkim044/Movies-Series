const API_key = "9a046b2b";
const search = document.getElementById("search");
const resultsContainer = document.querySelector(".results");
function debounce(fn,delay=400){
    let timer;
    return function(...args){
        clearTimeout(timer);
        timer=setTimeout(()=>fn.apply(this,args),delay)
    }
}
async function getData() {

    resultsContainer.innerHTML = "";

    let title = this.value;
    if (title.trim() === "") return;

    try {
        const initial = await fetch(`https://www.omdbapi.com/?apikey=${API_key}&t=${title}`);
        const data = await initial.json();

        if (data.Response === "False") {
            resultsContainer.textContent = "Not found";
            return;
        }

        const result = document.createElement("div");
        const titre = document.createElement("p");
        const poster = document.createElement("img");
        const plot = document.createElement("p");
        
        poster.src = data.Poster;
        titre.textContent = data.Title;
        plot.textContent = data.Plot;

        resultsContainer.appendChild(result);
        result.appendChild(titre);
        result.appendChild(poster);
        result.appendChild(plot);

    } catch (error) {
        resultsContainer.textContent = "Not found";
    }
}

search.addEventListener("input", debounce(getData));
