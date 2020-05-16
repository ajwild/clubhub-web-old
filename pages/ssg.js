import React from 'react';
import PropTypes from 'prop-types';
import fetch from 'node-fetch';

function getPokemonIdFromUrl(url) {
  return url.split('/').slice(-2)[0];
}

const SSG = ({ pokemon }) => {
  return (
    <div>
      <h1>SSG</h1>
      <ul>
        {pokemon.map((poke) => (
          <li key={getPokemonIdFromUrl(poke.url)}>{poke.name}</li>
        ))}
      </ul>
    </div>
  );
};

SSG.propTypes = {
  pokemon: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
    })
  ),
};

export async function getStaticProps() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
  const { results: pokemon } = await response.json();

  return {
    props: {
      pokemon,
    },
  };
}

export default SSG;
