import { getPokemonDatas } from "../requests/request-pokemon-datas"
import styled, { css } from "styled-components";
import { ThemeTogglerButton } from "../toggler-button/toogler-button";
import { DivTop, Tittle, StatsInfo, StatInfo, SpanInfo, Name } from "./pokemons";
import { useContext } from "react";
import { ThemeContext } from "../contexts/theme-context";
import { Link } from "react-router-dom";
import { PokeballLoading } from "../loading/pokeball-loading";

function PokemonPage() {
    const { theme } = useContext(ThemeContext)
    const { pokemonDetails, isLoadingDetails, isErrorDetails, habilityDetails, isLoadingHabilityDetails, isErrorHability } = getPokemonDatas()
    console.log(pokemonDetails);
    console.log(habilityDetails);
    return (

        <>
            {isErrorDetails ? "ERROR LOADING POKEMON DETAILS" :
                <>
                    {isLoadingDetails ? <PokeballLoading /> : (
                        <>
                            {pokemonDetails && (
                                <>
                                    <DivTop>
                                        <Link to={"/"}>
                                            <HomeButton theme={`${theme}`}>POKEMON CARDS</HomeButton>
                                        </Link>
                                        <Tittle theme={`${theme}`}>POKEMON INFOS</Tittle>
                                        <ThemeTogglerButton />
                                    </DivTop>
                                    <Section>

                                        <Card theme={`${theme}`}>
                                            <DivInfo>
                                                <Name>
                                                    <SpanInfo>TYPE: {pokemonDetails.pokemonData.types[0].type.name.toUpperCase()}</SpanInfo>
                                                    <SpanInfo>EXP: {pokemonDetails.pokemonData.base_experience}</SpanInfo>
                                                </Name>

                                                <PokemonImageDiv>
                                                    <PokemonImage src={pokemonDetails.pokemonData.sprites.front_default} alt={pokemonDetails.pokemonData.name} />
                                                </PokemonImageDiv>

                                                <SpanInfo>NAME: {pokemonDetails.pokemonData.name.toUpperCase()}</SpanInfo>
                                                <StatsInfo>
                                                    {pokemonDetails.pokemonData.stats.map(function (stats, index) {
                                                        return (
                                                            <StatInfo key={index} theme={`${theme}`}><SpanInfo>{stats.stat.name.toUpperCase()}:</SpanInfo> {stats.base_stat}</StatInfo>
                                                        )
                                                    })}
                                                </StatsInfo>
                                                {isErrorHability ? "ERROR LOADING POKEMON ABILITIES" :
                                                    <>
                                                        {isLoadingHabilityDetails ? "LOADING ABILITIES..." : (
                                                            <>
                                                                {pokemonDetails && (
                                                                    <Habilitys>
                                                                        <Span>HABILITIES</Span>
                                                                        {habilityDetails.map(function (hability, index) {
                                                                            return (
                                                                                <Hability key={index} theme={`${theme}`}>
                                                                                    <p ><Span>{hability.data.name.toUpperCase()}:</Span></p>
                                                                                    <p >{hability.data.effect_entries[1].effect.toUpperCase()}</p>
                                                                                </Hability>
                                                                            )
                                                                        })}
                                                                    </Habilitys>
                                                                )}
                                                            </>
                                                        )}
                                                    </>
                                                }
                                            </DivInfo>
                                        </Card>
                                        <DivMoves theme={`${theme}`}>
                                            <SpanMoves>MOVES</SpanMoves>
                                            <Moves>
                                                {pokemonDetails.pokemonData.moves.map(function (moves, index) {
                                                    return (
                                                        <Move key={index} theme={`${theme}`}>{moves.move.name.toUpperCase()}</Move>
                                                    )
                                                })}
                                            </Moves>
                                        </DivMoves>
                                    </Section>
                                </>
                            )}
                        </>
                    )}

                </>
            }

        </>
    )
}

const Section = styled.section`
    width: 100%;
    display: grid;
    grid-template-columns: 550px auto;
    @media(max-width: 1024px){
        grid-template-columns: auto;
    }
`
const HomeButton = styled.button`
    width: 120px;
    height: 50px;
    border-radius: 10px;
    padding: 5px;
    ${props => props.theme === "light" ? css`
        background-color: #ffd700;
    ` : css`
        background-color: #ffff;
        color: #385c7c;
    `}
    font-weight: 700;
    cursor: pointer;
`
const Card = styled.div`
    max-height: max-content;
    margin: 5px;
    border-radius: 10px;
    padding: 10px;
    ${props => props.theme === "light" ? css`
        background-color: #ffd700;
        ` : css`
        background-color: transparent;
        color: #ffff;
        `}
        @media(max-width: 425px){
        margin: 0;
    }
`

const DivInfo = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    border-radius: 10px;
    padding: 10px;
    box-shadow: 1px 1px 5px 3px rgba(0,0,0,0.75);
`

const PokemonImageDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 95%;
    height: 200px;
    background-color: aliceblue;
    border-radius: 5px;
    box-shadow: 1px 1px 5px 3px rgba(0,0,0,0.75);
    margin-bottom: 10px;
`

const PokemonImage = styled.img`
    width: 200px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
`

const Habilitys = styled.ul`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 95%;
    max-height: max-content;
    padding: 3px;
    margin: 10px 0px;
    border-radius: 5px;
    box-shadow: 1px 1px 5px 3px rgba(0,0,0,0.75);
`
const Hability = styled.li`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    ${props => props.theme === "light" ? css`
        background-color: #ebe1b1;
        ` : css`
        background-color: #385c7c;
        `}
        padding: 5px;
    margin: 2px;
    border-radius: 5px;
`

const Span = styled.span`
    font-weight: 700;
`
const SpanMoves = styled(Span)`
    width: 100%;
    padding: 3px;
    margin-bottom: 10px;
    border-radius: 5px;
    box-shadow: 1px 1px 5px 3px rgba(0,0,0,0.75);
    text-align: center;
`

const DivMoves = styled(Card)`
    max-height: max-content;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Moves = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 5px;
    box-shadow: 1px 1px 5px 3px rgba(0,0,0,0.75);
    border-radius: 10px;
`

const Move = styled.li`
    width: 48%;
    padding: 5px;
    margin: 5px;
    text-align: center;
    border-radius: 10px;
    ${props => props.theme === "light" ? css`
        background-color: #ebe1b1;
        ` : css`
        background-color: #385c7c;
        `}
        @media(max-width: 1115px){
        width: 47%
    }
    @media(max-width: 390px){
        width: 100%
    }
`

export { PokemonPage }