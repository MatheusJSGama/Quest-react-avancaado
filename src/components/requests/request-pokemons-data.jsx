import axios from 'axios'
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

function getData() {
    async function getNameData(limitQuantity) {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limitQuantity}`)
        const pokemonsData = response.data.results
        const pokemonName = pokemonsData.map((pokemon)=>{
            return pokemon.name
         })
         return pokemonName
    }

    const [quantity, setQuantity] = useState(12)

    function handleQuantity() {
        setQuantity(quantity + 12)
        getNameData(quantity)
    }
    
    async function getPokemonData(){
        const pokemonName = await getNameData(quantity)
        const promises = pokemonName.map(name=>{
            return axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        })
        const response = await Promise.all(promises)
        return response
    }
    
    function usePokemonData(){
        const query = useQuery({
          queryKey: ["pokemon-data", quantity],
          queryFn: getPokemonData,
        })
    
        return query
      }
    
      return {handleQuantity, usePokemonData}
}

export { getData }