import { useParams } from "react-router-dom";
import {useQuery } from "@tanstack/react-query";
import axios from "axios";

function getPokemonDatas(){
    const {name} = useParams()

    async function getPokemonData(name) {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        const pokemonData = response.data
        const habilitysUrls = response.data.abilities.map(function(url){
            return url.ability.url
        })
        return {pokemonData, habilitysUrls}
    }

    function usePokemonDetails(){
        const queryPokemonData = useQuery({
            queryKey: ["pokemon-details"],
            queryFn: ()=> getPokemonData(name),
            refetchOnWindowFocus: false
        })

        return queryPokemonData
    }

    async function getHabilitysData() {
        const {habilitysUrls} = await getPokemonData(name)
        const promises = habilitysUrls.map((habilityUrl)=>{
            return axios.get(`${habilityUrl}`)
        })
        const response = await Promise.all(promises)
        return response
    }

    function usePokemonHabilities(){
        const queryPokemonHabilities = useQuery({
            queryKey: ["pokemon-habilitys"],
            queryFn: getHabilitysData,
            refetchOnWindowFocus: false
        })

        return queryPokemonHabilities
    }

    const {data: pokemonDetails, isLoading: isLoadingDetails, isError: isErrorDetails} = usePokemonDetails()
    const {data: habilityDetails, isLoading: isLoadingHabilityDetails, isError: isErrorHability} = usePokemonHabilities()

    return {pokemonDetails, isLoadingDetails, isErrorDetails, habilityDetails, isLoadingHabilityDetails, isErrorHability}
}

export {getPokemonDatas}