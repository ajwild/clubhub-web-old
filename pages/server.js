const fetch = require('node-fetch')

function getPokemonIdFromUrl(url) {
  return url.split('/').slice(-2)[0]
}

function Server({ pokemon }) {
  return (
    <div>
      <h1>Server</h1>
      <ul>
        {pokemon.map(poke => (
          <li key={getPokemonIdFromUrl(poke.url)}>{poke.name}</li>
        ))}
      </ul>
    </div>
  )
}

export async function getServerSideProps(context) {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10')
  const { results: pokemon } = await response.json()

  return {
    props: {
      pokemon,
    },
  }
}

export default Server
