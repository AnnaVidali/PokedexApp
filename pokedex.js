// the number of current pokemon that exist as of 2024
const pokemonCount = 1025;
var pokedex = {}; // {1: {"name" : "bulbasaur", "img" : url, "types" : ["grass", "poison"], "desc" : "...."} }

//we need async because the getPokemon function is async
window.onload = async function () {
    //getPokemon(1);
    for(let i=1; i<=pokemonCount; i++){
        await getPokemon(i);

        //<div id="1" class="pokemon-name">BULBASAUR</div>
        let pokemon = document.createElement("div");
        pokemon.id = i;
        pokemon.innerText = i.toString() + ". " + pokedex[i]["name"].toUpperCase();
        pokemon.classList.add("pokemon-name");

        //add event listener to click and display pokemon info
        pokemon.addEventListener("click", updatePokemon);

        document.getElementById("pokemon-list").append(pokemon);
    }

    //to show description of bulbasaur which is the first pokemon
    document.getElementById("pokemon-description").innerText = pokedex[1]["desc"];

    console.log(pokedex);
}

//we need async because we use await in our function
async function getPokemon(num) {
    let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();

    //the fetch is asynchronous, so it needs the await in front
    let res = await fetch(url);
    let pokemon = await res.json();
    //console.log(pokemon);

    let pokemonName = pokemon["name"];
    let pokemonType = pokemon["types"];
    let pokemonImg = pokemon["sprites"]["front_default"];

    res = await fetch(pokemon["species"]["url"]);
    let pokemonDesc = await res.json();
    //console.log(pokemonDesc);

    pokemonDesc = pokemonDesc["flavor_text_entries"][0]["flavor_text"];

    //after getting all the info from json we need to map it with the pokedex object
    pokedex[num] = {"name" : pokemonName, "img" : pokemonImg, "types" : pokemonType, "desc" : pokemonDesc};
}

function updatePokemon(){
    //update image
    document.getElementById("pokemon-img").src = pokedex[this.id]["img"];

    //clear previous types
    let typesDiv = document.getElementById("pokemon-types");

    //while typesDiv has tags in it, it's going to clear it
    while(typesDiv.firstChild) {
        typesDiv.firstChild.remove();
    }

    //update types
    let types = pokedex[this.id]["types"];
    for(let i=0; i<types.length; i++){
        let type = document.createElement("span");
        type.innerText = types[i]["type"]["name"].toUpperCase();
        type.classList.add("type-box");
        type.classList.add(types[i]["type"]["name"]); //adds background and font color
        typesDiv.append(type);
    }

    //update description
    document.getElementById("pokemon-description").innerText = pokedex[this.id]["desc"];
}