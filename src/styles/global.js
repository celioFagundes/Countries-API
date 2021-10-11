import {createGlobalStyle} from 'styled-components'

export default createGlobalStyle`
    /* nunito-sans-300 - latin */

     *{
        margin:0;
        padding:0;
        box-sizing:border-box; 
        
    }
    
    body{
        background-color: ${props=> props.theme.colors.background};
        font-family: 'Nunito Sans', sans-serif;
        color : ${props => props.theme.colors.text};
        font-size:14px;
        font-weight: 700;

    }
    .container{
        max-width: 1200px;
        margin: 0 auto
    }
    
`;


