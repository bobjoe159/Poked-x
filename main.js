let pokemon_name = document.querySelector('.pokemon_name')
let pokemon_number = document.querySelector('.pokemon_number')
let pokemon_image = document.querySelector('.pokemon_image')
let form = document.querySelector('.form')
let input_search = document.querySelector('.input_search')

const fetchPokemon = async pokemon => {
  const APIPokemon = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`
  )
  if (APIPokemon.status == 200) {
    const data = await APIPokemon.json()
    return data
  }
}

const renderPokemon = async pokemon => {
  const data = await fetchPokemon(pokemon)

  if (data) {
    pokemon_name.innerHTML = data.name
    pokemon_number.innerHTML = data.id
    pokemon_image.src =
      data['sprites']['versions']['generation-v']['black-white']['animated'][
        'front_default'
      ]
  }
}

form.addEventListener('submit', function (event) {
  event.preventDefault()
  renderPokemon(input_search.value)
  input_search.value = ''
})
