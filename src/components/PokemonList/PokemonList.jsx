import { useEffect, useState } from "react";
import axios from "axios";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";
function PokemonList() {
  const [pokemonList, setPokemosList] = useState([]);
  const [isLoding, setIsLoding] = useState(true);

  const [pokedexUrl , setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon') ;

  const [nextUrl, setNextUrl]=useState('');
  const [preUrl, setPreUrl]=useState('');

  async function dawnlodPkemons() {
    setIsLoding(true);
    const response = await axios.get(pokedexUrl);
    const pokemonsResult = response.data.results;
    console.log(response.data);
    setNextUrl(response.data.next);
    setPreUrl(response.data.previous);
    const pokemonResultPromise = pokemonsResult.map((pokemon) =>
      axios.get(pokemon.url)
    );
    const pokemonData = await axios.all(pokemonResultPromise);
    console.log(pokemonData);
    const pokeListResult = pokemonData.map((pokeData) => {
      const pokemon = pokeData.data;
      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other
          ? pokemon.sprites.other.dream_world.front_default
          : pokemon.sprites.front_shiny,
        types: pokemon.types,
      };
    });
    console.log(pokeListResult);
    setPokemosList(pokeListResult);

    setIsLoding(false);
  }

  useEffect(() => {
    dawnlodPkemons();
  }, [pokedexUrl]);

  return (
    <div className="pokemon-list-wrapper">
      
      <div className="pokemon-wrapper">
        {isLoding
          ? "Loading..."
          : pokemonList.map((p) => (
              <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />
            ))}
      </div>
      <div className="controls">
        <button disabled={preUrl == null} onClick={()=> setPokedexUrl(preUrl)}>Per</button>
        <button disabled={nextUrl == null} onClick={()=> setPokedexUrl(nextUrl)}>Next</button>
      </div>
    </div>
  );
}
export default PokemonList;
