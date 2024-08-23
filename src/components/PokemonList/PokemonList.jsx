
import { useEffect, useState } from "react";
import axios from "axios";
import './PokemonList.css'
import Pokemon from "../Pokemon/Pokemon";
function PokemonList(){

    const [pokemonList , setPokemosList]=useState([]);
    const [isLoding , setIsLoding]= useState(true);

    const POKEDEX_URL='https://pokeapi.co/api/v2/pokemon';

    async function dawnlodPkemons() {
        const response = await axios.get(POKEDEX_URL);
        const pokemonsResult= response.data.results;
        console.log(response.data);
        const pokemonResultPromise=  pokemonsResult.map((pokemon)=>axios.get(pokemon.url));
        const pokemonData=await axios.all(pokemonResultPromise);
        console.log(pokemonData);
        const pokeListResult=pokemonData.map((pokeData)=>{
            const pokemon= pokeData.data;
            return{
                id:pokemon.id,
                name:pokemon.name, 
                image:(pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
                types:pokemon.types }
        });
        console.log(pokeListResult);
        setPokemosList(pokeListResult);
       
        setIsLoding(false);
    }

   

    useEffect(()=>{
        dawnlodPkemons();
    },[]);

    return (
        <div className="pokemon-list-wrapper">
            <div>pokemon list</div>
            {(isLoding)? 'Loading...':
                pokemonList.map((p)=> <Pokemon name={p.name} image={p.image} key={p.id}/>)
            }

        
        </div>
    )

}
export default PokemonList;