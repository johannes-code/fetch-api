
const content = document.getElementById("content")

async function getData() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=9999")
    const data = await response.json()
    // console.log(data.results)

    const pokemonUrls = data.results.map((pokemon) => pokemon.url)
    // console.log(pokemonUrls))
    
    const pokemonPromises = await pokemonUrls.map((url) => fetch(url).then((response)=> response.json()))
    // console.log(pokemonPromises)
    const pokeDetails = await Promise.all(pokemonPromises)
    console.log(pokeDetails)
    content.innerHTML = (pokeDetails.map((pokemon) => {
        const abilities = pokemon.abilities.map(ability => ability.ability.name).join(", ")
        console.log(abilities)
        return (
          `  
        <div class="pokemon-card">
            <h2>${pokemon.name.toUpperCase()}</h2>
            <img src="${pokemon.sprites.front_default}"></img>
            <div class="cardinfo">
              <div class="id">
                <h4>Id: </h4> 
                <p class="id">${pokemon.id}</p>
              </div>  
              <div class="height">
                <h4>Height: </h4>
                <p class="height">${pokemon.height}</p>
              </div>
              <div class="weight">
                <h4>Weight: </h4>
                <p>${pokemon.weight}</p>
              </div>
              <div class="basexp">
                <h4>Base xp: </h4>
                <p>${pokemon.base_experience}</p>
              </div>
              <div class="abilities">
                <h4>Abilities: </h4>
                ${pokemon.abilities.map((allAbilities) => `
                <p>${allAbilities.ability.name}
                `)}
              </div>
              <div class="type">
                <h4>Type:</h4>
                ${pokemon.types.map((allTypes) => `
                <p>${allTypes.type.name}</p>
                `).join(" ")} 
                </div>
            </div>
        </div>
            `
        )
    }).join(" "))
}

getData()



// async function getData() {
//     const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
//     const data = await response.json()
//     const pokemonPromises = data.results.map(async (pokemon) => {
//         const pokemonResponse = await fetch(pokemon.url)
//         const pokemonData = await pokemonResponse.json()
//         // console.log(pokemonData)
//         return {
//             name: pokemonData.name,
//             imageUrl: pokemonData.sprites.front_default

//         }

//     })
       
//     content.innerHTML = (data.results.map((pokemon) => {
//         return (
//         `
//         <div class="card"> 
//         <h2>${pokemon.results.name}</h2>
//         <p>URL: $pokemon.url}</p>
//         // <img src="${movie.image}" />
        
//         </div>
        
        
//         `
//         )
//     }).join(""))

// }
// getData()


