const pokedexGrid = document.querySelector('.pokedex-grid');
const pokemonInput = document.getElementById('search-input');
const pokemonsNumber = 151;
const pkmnPromises = new Array();

const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const res = await fetch(url)
    const data = await res.json()
    pkmnPromises.push(data)
};

const fetchPokemons = async () => {
    for(let i = 1; i <= pokemonsNumber; i++) {
        await getPokemon(i)
    };

    Promise.all(pkmnPromises)
        .then(results => {
            const pokemon = results.map(result =>{
                createCard(result)
                }
            )                                
        }
    )
};

function createCard(pokemon) {

    const pkmnId = pokemon.id.toString().padStart(3, '0');

    const pkmnTypes = pokemon.types.map(typeNumber => typeNumber.type.name);

    const pokemonCard = `<div class="pokemon-card ${pkmnTypes[0]}">
                            <div class="pokemon-img">
                                <img class="pokemon-sprite" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" alt="${pokemon.name}">
                            </div>
                            <div class="pokemon-desc">
                                <div class="pokemon-id">#${pkmnId}</div>
                                <div class="pokemon-name">${pokemon.name}</div>
                                <div class="pokemon-type">${pkmnTypes.join(' | ')}</div>
                            </div>
                        </div>`;
    pokedexGrid.innerHTML += pokemonCard;
};

pokemonInput.addEventListener("input", () => {

    let pokemonName = pokemonInput.value.toLowerCase();
    let pokemonNameIsANumber = +pokemonName;
    let filteredPokemons = new Array();
    
    if (isNaN(pokemonNameIsANumber)) {
        for (let i in pkmnPromises) {
            if(pkmnPromises[i].name.includes(pokemonName)){
                filteredPokemons.push(pkmnPromises[i]);
            }    
        }
    } if (pokemonNameIsANumber) {
        for (let i in pkmnPromises) {
            if(pkmnPromises[i].id === pokemonNameIsANumber) {
                filteredPokemons.push(pkmnPromises[i]);
            }
        }
    } if (pokemonNameIsANumber === 0) {
        pokedexGrid.innerHTML=''
        for (let pokemon in pkmnPromises) {
            createCard(pkmnPromises[pokemon])
        }
        return
    }

    pokedexGrid.innerHTML=''
    for (let pokemon in filteredPokemons) {
        createCard(filteredPokemons[pokemon])
        }
    }
)

function hideLoading(){
    let loadingTitle = document.querySelector('.loading-title');
    loadingTitle.style.display = 'none'
  }

setTimeout(hideLoading, 1000);

fetchPokemons();



