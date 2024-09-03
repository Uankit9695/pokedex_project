import { useEffect, useState } from "react";
import axios from "axios";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";

function PokemonList() {
  const [pokemonListState, setPokemosListState] = useState({
    pokemonList: [],
    isLoding: true,
    pokedexUrl: 'https://pokeapi.co/api/v2/pokemon',
    nextUrl: '',
    preUrl: ''
  });

  async function dawnlodPkemons() {
    setPokemosListState({ ...pokemonListState, isLoding: true });
    
    try {
      const response = await axios.get(pokemonListState.pokedexUrl);
      const pokemonsResult = response.data.results;
      console.log(response.data);

      setPokemosListState((state) => ({
        ...state,
        nextUrl: response.data.next,
        preUrl: response.data.previous,
      }));

      const pokemonResultPromise = pokemonsResult.map((pokemon) =>
        axios.get(pokemon.url)
      );
      const pokemonData = await axios.all(pokemonResultPromise);

      const pokeListResult = pokemonData.map((pokeData) => {
        const pokemon = pokeData.data;
        return {
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.sprites.other?.dream_world.front_default || pokemon.sprites.front_shiny,
          types: pokemon.types,
        };
      });

      setPokemosListState((state) => ({
        ...state,
        pokemonList: pokeListResult,
        isLoding: false,
      }));
      
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
      setPokemosListState({ ...pokemonListState, isLoding: false });
    }
  }

  useEffect(() => {
    dawnlodPkemons();
  }, [pokemonListState.pokedexUrl]);

  return (
    <div className="pokemon-list-wrapper">
      <div className="pokemon-wrapper">
        {pokemonListState.isLoding
          ? "Loading..."
          : pokemonListState.pokemonList.map((p) => (
              <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />
            ))}
      </div>
      <div className="controls">
        <button
          disabled={pokemonListState.preUrl == null}
          onClick={() => {
            const urlToSet = pokemonListState.preUrl;
            setPokemosListState({ ...pokemonListState, pokedexUrl: urlToSet });
          }}
        >
          Per
        </button>

        <button
          disabled={pokemonListState.nextUrl == null}
          onClick={() => {
            const urlToSet = pokemonListState.nextUrl;
            setPokemosListState({ ...pokemonListState, pokedexUrl: urlToSet });
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PokemonList;
