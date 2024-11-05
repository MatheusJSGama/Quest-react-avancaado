import styled, { keyframes } from "styled-components"

function PokeballLoading() {
    return (
        <Container>
            <Pokeball>
                <RedPart/>
                <Line/>
                <Circle>
                    <MiniCircle/>
                </Circle>
                <WhitePart/>
            </Pokeball>
            <Loading>LOADING...</Loading>
        </Container>
    )
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Loading = styled.p`
    font-weight: 700;
`

const rotate = keyframes`
    rom {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const Pokeball = styled.div`
    width: 200px;
    height: 200px;
    border: 5px solid black;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    animation: ${rotate} 2s infinite;
    position: relative;
`

const RedPart = styled.div`
    background-color: red;
    height: 50%;
    width: 100%;
`

const WhitePart = styled.div`
    background-color: white;
    height: 50%;
    width: 100%;
`

const Line = styled.div`
    width: 100%;
    border: 3px solid black;
`

const Circle = styled.div`
    width: 30px;
    height: 30px;
    border: 5px solid black;
    border-radius: 50%;
    transform: translateY(80px);
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
`

const MiniCircle = styled.div`
    width: 20px;
    height: 20px;
    border: 2px solid black;
    border-radius: 50%;
`

export {PokeballLoading}
