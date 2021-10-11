import React from 'react'
import {  Wrapper,Container, Title, ThemeTogglerBox, ThemeLabel} from './style'
import {FaMoon,FaRegMoon} from 'react-icons/fa'

function Header(props) {
    return (
        <Wrapper >
            <Container className ='container'>
                <Title>Where in the world</Title>
                <ThemeTogglerBox onClick ={ props.toggleTheme}>
                     {props.theme === 'dark' 
                     ?<FaMoon size = {12} color = '#fff'/>
                     :<FaRegMoon size = {12} color = '#000'/>}
                    <ThemeLabel>Dark Mode</ThemeLabel>
                </ThemeTogglerBox>
                
            </Container>
        </Wrapper>
    )
}

export default Header
