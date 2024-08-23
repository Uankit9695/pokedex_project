import './pokemon.css';
function Pokemon({name , image}){
    return(
        <div className='pokemon'>
            <div className='pokenom-name'>{name}</div>
            <div>
                <img className='pokemon-image' src={image}/>
            </div>

        </div>
    )

}
export default Pokemon;