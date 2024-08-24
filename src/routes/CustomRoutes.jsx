import { Route, Routes } from "react-router-dom";
import Pokedex from "../components/Pokedex/Pokedex";
import Pokemonetails from "../components/pokemonDetails/PokemonDetails";


function CustomRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Pokedex/>}/>
            <Route path="/pokemon/:id" element={<Pokemonetails/>}/>
            
        </Routes>

    );

}
export default CustomRoutes;