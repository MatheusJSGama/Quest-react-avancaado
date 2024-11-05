import { useContext } from "react";
import { ThemeContext } from "../contexts/theme-context";
import styled, {css} from "styled-components";

function ThemeTogglerButton(){
    const {theme, toggleThemeMode} = useContext(ThemeContext)

    return(
        <SwitchButton onClick={toggleThemeMode} theme={`${theme}`}>{theme === "light" ? "Dark Mode" : "Light Mode"}</SwitchButton>
    )
}

const SwitchButton = styled.button`
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

export {ThemeTogglerButton}