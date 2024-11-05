import { getData } from "../requests/request-pokemons-data/";
import styled, {css} from "styled-components";
import { Link } from "react-router-dom";
import {ThemeTogglerButton} from "../toggler-button/toogler-button"
import { useContext } from 'react'
import { ThemeContext } from '../contexts/theme-context'
import { PokeballLoading } from "../loading/pokeball-loading";

function PokemonCards() {
    const { handleQuantity, usePokemonData } = getData()
    const { data, isLoading, isError } = usePokemonData()
    const {theme} = useContext(ThemeContext)

    return (
        <>
        {isError ? "ERROR LOADING POKEMON CARDS" : 
            <>
                {isLoading ? <PokeballLoading/> : 
                <Section>
                    <DivTop >
                        <Tittle theme={`${theme}`}>POKEMON CARDS</Tittle>
                        <ThemeTogglerButton/>
                    </DivTop >
                    <Ul>  
                        {data.map(function (pokemon, index) {
                                 return (
                                    <Link to={`/pokemon/${pokemon.data.name}`} key={index}>
                                        <Card theme={`${theme}`}>
                                            <Divinfo>
                                                <Name>
                                                    <SpanInfo>NAME: {pokemon.data.name.toUpperCase()}</SpanInfo>
                                                    <SpanInfo>EXP: {pokemon.data.base_experience}</SpanInfo>
                                                </Name>
                                                <Image src={pokemon.data.sprites.front_default} alt={`Imagem do pokemon ${pokemon.data.name}`} />
                                            </Divinfo>
                                            <StatsInfo>
                                                <p></p>
                                                {pokemon.data.stats.map(function (stats, index) {
                                                    return (
                                                        <StatInfo key={index} theme={`${theme}`}><SpanInfo>{stats.stat.name.toUpperCase()}:</SpanInfo> {stats.base_stat}</StatInfo>
                                                    )
                                                })}
                                            </StatsInfo>
                                        </Card>
                                    </Link>
                                )
                            })}
                    </Ul>
                    <Button onClick={handleQuantity} theme={`${theme}`}>SHOW MORE</Button>
                </Section >}
            </>
        }
        </>
    )
}

const Section = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const DivTop = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    text-align: center;
    margin: 20px;
`

export const Tittle = styled.h1`
    ${props => props.theme === "light" ? css`
        color: #ffd700;
        ` :  css`
        color: #ffff;
        `}
    text-shadow:
    -2px -2px 0 black,
    2px -2px 0 black,
    -2px 2px 0 black,
    2px 2px 0 black;
    font-size: 50px;
    font-weight: 700;
    margin: 0px 10px;
`


const Ul = styled.ul`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 10px;
    
`

export const Card = styled.li`
    width: 280px;
    height: 440px;
    border-radius: 10px;
    margin: 8px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 1px 1px 5px 3px rgba(0,0,0,0.75);
    color: black;
    ${props => props.theme === "light" ? css`
        background-color: #ffd700;
        ` :  css`
        background-color: transparent;
        color: #ffff;
        `}
    cursor: pointer;
    &:hover{
        scale: 1.1;
        transition: 0.4s ease-in-out;
    }
    
`

const Divinfo = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const Image = styled.img`
    width: 95%;
    height: 150px;
    background-color: aliceblue;
    border-radius: 5px;
    box-shadow: 1px 1px 5px 3px rgba(0,0,0,0.75);
`

export const Name = styled.ul`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 95%;
    padding: 3px;
    margin: 10px 0px;
    border-radius: 5px;
    box-shadow: 1px 1px 5px 3px rgba(0,0,0,0.75);
`

export const StatsInfo = styled(Name)`
    height: 210px;
    width: 95%;
    padding: 3px;
    margin: 10px 0px;
    border-radius: 5px;
    box-shadow: 1px 1px 5px 3px rgba(0,0,0,0.75);
    flex-direction: column;
    align-items: center;
`

export const SpanInfo = styled.span`
    font-weight: 700;
`

 export const StatInfo = styled.li`
    width: 100%;
    ${props => props.theme === "light" ? css`
        background-color: #ebe1b1;
        ` :  css`
        background-color: #385c7c;
        `}
    padding: 5px;
    margin: 2px;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
`

const Button = styled.button`
    width: 300px;
    height: 50px;
    padding: 10px;
    border-radius: 10px;
    ${props => props.theme === "light" ? css`
        background-color: #ffd700;
        ` :  css`
        background-color: #ffff;
        color: #385c7c;
        `}
    font-weight: 700;
    cursor: pointer;
`
export { PokemonCards }