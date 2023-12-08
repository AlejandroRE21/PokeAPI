import React, {useState, useEffect} from 'react';
import axios from 'axios';

const PokemonSearch = () => {
    const [pokemonName, setPokemonName] = useState('');
    const [pokemonData, setPokemonData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (pokemonName.trim() !== ''){
                try {
                    const response  = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
                    setPokemonData(response.data);
                }catch (error){
                    console.error('Error fetching Data', error);
                    setPokemonData(null);
                }
            } else {
                setPokemonData(null);
            } 
        };
        
        fetchData();
    }, [pokemonName]);
    
    return (
        <div>
            <h1>Buscador de Pokemones</h1>
            <label>
                <input
                type = "text"
                placeholder="Buscar personaje de Pokemon"
                values={pokemonName}
                onChange={(e) => setPokemonName(e.target.value)}
                />
            </label>

                {pokemonData && (
                    <div>
                        <h2>{pokemonData.name}</h2>
                        <img src={pokemonData.sprites.front_shiny} alt={pokemonData.name}/>
                        <div>
                            <strong>Abilities:</strong>
                            <ul>
                                {pokemonData.abilities.map((ability, index) => (
                                    <li key={index}>{ability.ability.name}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                        <strong>Base Experiencia: </strong> {pokemonData.base_experience}
                        </div>
                    </div>
                )}
        </div>
    );
};

export default PokemonSearch;