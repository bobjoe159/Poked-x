let pokemon_name = document.querySelector('.pokemon_name')
let pokemon_number = document.querySelector('.pokemon_number')
let pokemon_image = document.querySelector('.pokemon_image')
let form = document.querySelector('.form')
let input_search = document.querySelector('.input_search')
let btn_prev = document.querySelector('.btn-prev')
let btn_next = document.querySelector('.btn-next')

let searchPokemon = 1

const fetchPokemon = async pokemon => {
  const APIPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
  if (APIPokemon.status == 200) {
    const data = await APIPokemon.json()
    return data
  }
}

const renderPokemon = async pokemon => {
  pokemon_name.innerHTML = 'Loading...'
  pokemon_number.innerHTML = ''

  const data = await fetchPokemon(pokemon)

  if (data) {
    pokemon_name.innerHTML = data.name
    pokemon_number.innerHTML = data.id
    pokemon_image.src =
      data['sprites']['versions']['generation-v']['black-white']['animated'][
        'front_default'
      ]
    searchPokemon = data.id
  } else {
    pokemon_name.innerHTML = `Not found :/`
    pokemon_number.innerHTML = ``
    pokemon_image.src = `./pokemons/loading.gif`
  }
}

form.addEventListener('submit', function (event) {
  event.preventDefault()
  renderPokemon(input_search.value.toLowerCase())
  input_search.value = ''
})

renderPokemon(searchPokemon)

btn_prev.addEventListener('click', function () {
  if (searchPokemon > 1) {
    searchPokemon = searchPokemon - 1
    renderPokemon(searchPokemon)
  }
})

btn_next.addEventListener('click', function () {
  searchPokemon = searchPokemon + 1
  renderPokemon(searchPokemon)
})
